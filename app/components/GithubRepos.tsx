import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

interface CommitData {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
      email: string;
    };
    message: string;
  };
  repository?: {
    name: string;
  };
}

interface RepoInfo {
  name: string;
  private: boolean;
  default_branch: string;
}

interface DailyContribution {
  date: string; // YYYY-MM-DD format
  count: number;
}

interface AggregatedStats {
  totalCommits: number;
  totalRepositories: number;
  commitsByMonth: { month: string; count: number }[];
  commitsByDay: { day: string; count: number }[];
  commitsByHour: { hour: number; count: number }[];
  commitsByRepo: { repo: string; count: number }[];
  dailyContributions: DailyContribution[];
  recentCommits: CommitData[];
  contributionStreak: {
    current: number;
    longest: number;
  };
}

interface GithubReposProps {
  username: string;
  githubToken?: string; // Optional: for private repos. Pass via env var or prop
  showAllContributions?: boolean; // If true, aggregates all repos
  maxRepos?: number; // Only used if showAllContributions is false
}

export default function GithubRepos({
  username,
  githubToken,
  showAllContributions = true,
  maxRepos = 5,
}: GithubReposProps) {
  const [aggregatedStats, setAggregatedStats] =
    useState<AggregatedStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [tokenStatus, setTokenStatus] = useState<{
    isValid: boolean;
    user?: string;
    scopes?: string[];
    rateLimit?: { remaining: number; limit: number; reset: Date };
  } | null>(null);

  // Get token from environment variable if not provided as prop
  const token =
    githubToken || (typeof window !== "undefined" ? undefined : undefined);
  // Note: In production, you'd want to use a backend API route to securely handle the token
  // For now, we'll use it directly but recommend moving to a backend proxy

  useEffect(() => {
    // Validate token if provided
    if (token) {
      validateToken(token);
    } else {
      setTokenStatus({ isValid: false });
    }

    if (showAllContributions) {
      fetchAllContributions();
    } else {
      // Original behavior - fetch specific repos
      fetchSpecificRepos();
    }
  }, [username, githubToken, showAllContributions]);

  const validateToken = async (tokenToValidate: string) => {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${tokenToValidate}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setTokenStatus({ isValid: false });
          return;
        }
        throw new Error("Failed to validate token");
      }

      const userData = await response.json();
      const scopes = response.headers.get("X-OAuth-Scopes")?.split(", ") || [];
      const rateLimitRemaining = parseInt(
        response.headers.get("X-RateLimit-Remaining") || "0",
      );
      const rateLimitLimit = parseInt(
        response.headers.get("X-RateLimit-Limit") || "0",
      );
      const rateLimitReset = parseInt(
        response.headers.get("X-RateLimit-Reset") || "0",
      );

      setTokenStatus({
        isValid: true,
        user: userData.login,
        scopes,
        rateLimit: {
          remaining: rateLimitRemaining,
          limit: rateLimitLimit,
          reset: new Date(rateLimitReset * 1000),
        },
      });
    } catch (err) {
      setTokenStatus({ isValid: false });
      console.error("Token validation error:", err);
    }
  };

  const getAuthHeaders = () => {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }
    return headers;
  };

  const fetchAllContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Fetch all repositories (including private if token provided)
      const allRepos = await fetchAllRepositories(username);
      setProgress({ current: 0, total: allRepos.length });

      // Step 2: Fetch commits from all repositories
      const allCommits: CommitData[] = [];
      const commitsByRepo: { [key: string]: number } = {};

      for (let i = 0; i < allRepos.length; i++) {
        const repo = allRepos[i];
        try {
          const commits = await fetchRepoCommits(
            username,
            repo.name,
            repo.default_branch,
          );

          // Add repo name to each commit for tracking
          commits.forEach((commit) => {
            allCommits.push({
              ...commit,
              repository: { name: repo.name },
            });
          });

          commitsByRepo[repo.name] = commits.length;
          setProgress({ current: i + 1, total: allRepos.length });
        } catch (err) {
          console.warn(`Failed to fetch commits for ${repo.name}:`, err);
          // Continue with other repos even if one fails
        }
      }

      // Step 3: Aggregate all the data
      const stats = aggregateAllCommits(
        allCommits,
        allRepos.length,
        commitsByRepo,
      );
      setAggregatedStats(stats);
    } catch (err) {
      let errorMessage = "Failed to fetch contributions";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage =
          "Network error: Unable to connect to GitHub API. Please check your internet connection.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecificRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const reposList = await fetchUserRepos(username, maxRepos);
      const allCommits: CommitData[] = [];

      for (const repo of reposList) {
        try {
          const commits = await fetchRepoCommits(
            username,
            repo.name,
            repo.default_branch,
          );
          commits.forEach((commit) => {
            allCommits.push({
              ...commit,
              repository: { name: repo.name },
            });
          });
        } catch (err) {
          console.warn(`Failed to fetch commits for ${repo.name}:`, err);
        }
      }

      const stats = aggregateAllCommits(allCommits, reposList.length, {});
      setAggregatedStats(stats);
    } catch (err) {
      let errorMessage = "Failed to fetch data";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage =
          "Network error: Unable to connect to GitHub API. Please check your internet connection.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllRepositories = async (
    username: string,
  ): Promise<RepoInfo[]> => {
    const allRepos: RepoInfo[] = [];
    let page = 1;
    const perPage = 100;

    try {
      while (true) {
        // Always use user-specific endpoint - token allows access to private repos the user has access to
        // The token authentication allows us to see private repos the authenticated user has access to
        const url = `https://api.github.com/users/${username}/repos?sort=updated&page=${page}&per_page=${perPage}&visibility=all`;

        const response = await fetch(url, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = "Failed to fetch repositories";

          if (response.status === 401) {
            errorMessage =
              "Invalid GitHub token. Please check your token permissions.";
          } else if (response.status === 403) {
            const rateLimitRemaining = response.headers.get(
              "X-RateLimit-Remaining",
            );
            if (rateLimitRemaining === "0") {
              const rateLimitReset = response.headers.get("X-RateLimit-Reset");
              const resetTime = rateLimitReset
                ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
                : "soon";
              errorMessage = `GitHub API rate limit exceeded. Rate limit resets at ${resetTime}. Consider using a GitHub token to increase limits.`;
            } else {
              errorMessage =
                "Access forbidden. The username may be private or the token lacks permissions.";
            }
          } else if (response.status === 404) {
            errorMessage = `User "${username}" not found. Please check the username.`;
          } else if (response.status === 422) {
            errorMessage = "Invalid request. The username may be invalid.";
          } else {
            try {
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.message || errorMessage;
            } catch {
              // If JSON parsing fails, use default message
            }
          }

          throw new Error(errorMessage);
        }

        const repos: RepoInfo[] = await response.json();
        if (repos.length === 0) break;

        allRepos.push(...repos);
        if (repos.length < perPage) break;
        page++;

        // Removed page limit to fetch ALL repositories
        // Large accounts might have many pages of repositories
      }
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error(
        "Failed to fetch repositories: Network error or invalid response",
      );
    }

    return allRepos;
  };

  const fetchUserRepos = async (
    username: string,
    maxRepos: number,
  ): Promise<RepoInfo[]> => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`,
        { headers: getAuthHeaders() },
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Failed to fetch repositories";

        if (response.status === 403) {
          const rateLimitRemaining = response.headers.get(
            "X-RateLimit-Remaining",
          );
          if (rateLimitRemaining === "0") {
            const rateLimitReset = response.headers.get("X-RateLimit-Reset");
            const resetTime = rateLimitReset
              ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
              : "soon";
            errorMessage = `GitHub API rate limit exceeded. Rate limit resets at ${resetTime}. Consider using a GitHub token to increase limits.`;
          } else {
            errorMessage =
              "Access forbidden. The username may be private or the token lacks permissions.";
          }
        } else if (response.status === 404) {
          errorMessage = `User "${username}" not found. Please check the username.`;
        } else if (response.status === 422) {
          errorMessage = "Invalid request. The username may be invalid.";
        } else {
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorMessage;
          } catch {
            // If JSON parsing fails, use default message
          }
        }

        throw new Error(errorMessage);
      }

      return response.json();
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error(
        "Failed to fetch repositories: Network error or invalid response",
      );
    }
  };

  const fetchRepoCommits = async (
    username: string,
    repoName: string,
    defaultBranch: string = "main",
  ): Promise<CommitData[]> => {
    let allCommits: CommitData[] = [];
    let page = 1;
    const perPage = 100;
    // Removed limit to fetch ALL commits from each repository
    // This may take longer but will show complete contribution history

    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/commits?sha=${defaultBranch}&page=${page}&per_page=${perPage}`,
        { headers: getAuthHeaders() },
      );

      if (!response.ok) {
        if (response.status === 404) {
          // Repo might not exist or be private without token
          return [];
        }
        if (response.status === 409) {
          // Empty repository
          return [];
        }
        if (response.status === 403) {
          // Rate limit or access denied - log warning but continue
          console.warn(
            `Rate limit or access denied for ${repoName}, skipping...`,
          );
          return allCommits;
        }
        throw new Error(`Failed to fetch commits for ${repoName}`);
      }

      const commits: CommitData[] = await response.json();
      if (commits.length === 0) break;

      allCommits = [...allCommits, ...commits];

      // If we got less than perPage, we've reached the end
      if (commits.length < perPage) break;
      page++;

      // Removed hard limit - fetch ALL commits
      // Note: Very large repositories may take significant time and API calls
      // The loop will naturally stop when GitHub returns empty results
    }

    return allCommits;
  };

  const aggregateAllCommits = (
    allCommits: CommitData[],
    totalRepos: number,
    commitsByRepoMap: { [key: string]: number },
  ): AggregatedStats => {
    // Don't filter by username - show ALL commits from ALL repositories the user has access to
    // This gives a complete picture of all contributions
    // If you want to filter to only user's commits, uncomment the filter below
    const userCommits = allCommits; // Show all commits

    // Alternative: Filter only commits by the username
    // const userCommits = allCommits.filter((commit) => {
    //   const authorEmail = commit.commit.author.email.toLowerCase();
    //   const authorName = commit.commit.author.name.toLowerCase();
    //   const usernameLower = username.toLowerCase();
    //   return (
    //     authorEmail.includes(usernameLower) ||
    //     authorName.includes(usernameLower) ||
    //     authorEmail.includes("@users.noreply.github.com") // GitHub no-reply emails
    //   );
    // });

    const commitsByMonth = processCommitsByMonth(userCommits);
    const commitsByDay = processCommitsByDay(userCommits);
    const commitsByHour = processCommitsByHour(userCommits);
    const dailyContributions = processDailyContributions(userCommits);
    console.log(JSON.stringify(commitsByDay));

    // Build commits by repo
    const commitsByRepo: { repo: string; count: number }[] = [];
    const repoMap = new Map<string, number>();

    userCommits.forEach((commit) => {
      const repoName = commit.repository?.name || "unknown";
      repoMap.set(repoName, (repoMap.get(repoName) || 0) + 1);
    });

    Array.from(repoMap.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([repo, count]) => {
        commitsByRepo.push({ repo, count });
      });

    const recentCommits = userCommits
      .sort(
        (a, b) =>
          new Date(b.commit.author.date).getTime() -
          new Date(a.commit.author.date).getTime(),
      )
      .slice(0, 10);

    const contributionStreak = calculateContributionStreak(userCommits);

    return {
      totalCommits: userCommits.length,
      totalRepositories: totalRepos,
      commitsByMonth,
      commitsByDay,
      commitsByHour,
      commitsByRepo: commitsByRepo.slice(0, 20), // Top 20 repos
      dailyContributions,
      recentCommits,
      contributionStreak,
    };
  };

  const processDailyContributions = (
    commits: CommitData[],
  ): DailyContribution[] => {
    const dayMap = new Map<string, number>();

    commits.forEach((commit) => {
      const date = new Date(commit.commit.author.date);
      const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format
      dayMap.set(dateKey, (dayMap.get(dateKey) || 0) + 1);
    });

    // Get the actual date range from commits (not just 1 year)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let earliestDate = today;
    if (commits.length > 0) {
      const commitDates = commits.map((c) => new Date(c.commit.author.date));
      const earliestCommitDate = new Date(
        Math.min(...commitDates.map((d) => d.getTime())),
      );
      earliestDate = new Date(earliestCommitDate);
      earliestDate.setHours(0, 0, 0, 0);
    }

    // Calculate days between earliest commit and today
    const daysDiff = Math.floor(
      (today.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    // Use at least 1 year (371 days) but extend if commits go back further
    // For GitHub-style heatmap, we'll show up to ~53 weeks (371 days) from today,
    // but include all dates that have commits
    const totalDays = Math.max(371, Math.min(daysDiff + 1, 371)); // Show last 371 days (53 weeks) for heatmap consistency

    // Generate all dates in the range
    const dailyContributions: DailyContribution[] = [];
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (totalDays - 1));

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split("T")[0];
      dailyContributions.push({
        date: dateKey,
        count: dayMap.get(dateKey) || 0,
      });
    }

    return dailyContributions;
  };

  const processCommitsByMonth = (commits: CommitData[]) => {
    const monthMap = new Map<string, number>();

    commits.forEach((commit) => {
      const date = new Date(commit.commit.author.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
    });

    return Array.from(monthMap.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12); // Last 12 months
  };

  const processCommitsByDay = (commits: CommitData[]) => {
    const dayMap = new Map<string, number>();

    commits.forEach((commit) => {
      const date = new Date(commit.commit.author.date);
      const dayKey = date.toLocaleDateString("en-US", {
        weekday: "short",
      });
      dayMap.set(dayKey, (dayMap.get(dayKey) || 0) + 1);
    });

    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return dayOrder.map((day) => ({
      day,
      count: dayMap.get(day) || 0,
    }));
  };

  const processCommitsByHour = (commits: CommitData[]) => {
    const hourMap = new Map<number, number>();

    commits.forEach((commit) => {
      const date = new Date(commit.commit.author.date);
      const hour = date.getHours();
      hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
    });

    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: hourMap.get(hour) || 0,
    }));
  };

  const calculateContributionStreak = (
    commits: CommitData[],
  ): { current: number; longest: number } => {
    if (commits.length === 0) return { current: 0, longest: 0 };

    // Sort commits by date
    const sortedCommits = commits
      .map((c) => new Date(c.commit.author.date))
      .sort((a, b) => a.getTime() - b.getTime());

    // Get unique dates
    const uniqueDates = new Set(
      sortedCommits.map((date) => date.toISOString().split("T")[0]),
    );

    const dates = Array.from(uniqueDates).sort();
    if (dates.length === 0) return { current: 0, longest: 0 };

    let currentStreak = 1;
    let longestStreak = 1;
    let tempStreak = 1;

    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i - 1]);
      const currDate = new Date(dates[i]);
      const diffDays = Math.floor(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    // Calculate current streak (from today backwards)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let checkDate = new Date(today);
    let streakCount = 0;

    while (uniqueDates.has(checkDate.toISOString().split("T")[0])) {
      streakCount++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    currentStreak = streakCount;

    return { current: currentStreak, longest: longestStreak };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-white text-lg mb-4">Loading contributions...</div>
        {progress.total > 0 && (
          <div className="w-full max-w-md bg-slate-800 rounded-full h-2.5 mb-2">
            <div
              className="bg-sky-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        )}
        <div className="text-gray-400 text-sm">
          {progress.total > 0
            ? `Processing ${progress.current} of ${progress.total} repositories...`
            : "Fetching repositories..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-400 text-lg mb-4 text-center max-w-2xl">
          <div className="mb-2">❌ Error: {error}</div>

          {error.includes("rate limit") && (
            <div className="text-gray-400 text-sm mt-4 space-y-2">
              <p className="font-semibold text-white mb-2">
                GitHub API Rate Limit Issues:
              </p>
              <ul className="list-disc list-inside space-y-1 text-left">
                <li>Without a token: 60 requests/hour</li>
                <li>With a token: 5,000 requests/hour</li>
              </ul>
              <p className="mt-3">
                <span className="text-sky-400 cursor-pointer hover:underline">
                  Create a token at: github.com/settings/tokens
                </span>
              </p>
              <p className="text-xs mt-2 text-gray-500">
                Token permissions needed: repo (for private repos), or no
                permissions needed for public repos
              </p>
            </div>
          )}

          {error.includes("token") && !error.includes("rate limit") && (
            <div className="text-gray-400 text-sm mt-4 text-center max-w-md">
              <p className="mb-2">
                To access private repositories, you need a GitHub Personal
                Access Token.
              </p>
              <p className="text-xs">
                Create one at:{" "}
                <span className="text-sky-400">github.com/settings/tokens</span>
              </p>
            </div>
          )}

          {error.includes("not found") && (
            <div className="text-gray-400 text-sm mt-4 text-center max-w-md">
              <p>Please verify the GitHub username is correct.</p>
              <p className="text-xs mt-2">
                Note: The username is case-sensitive
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setError(null);
            if (showAllContributions) {
              fetchAllContributions();
            } else {
              fetchSpecificRepos();
            }
          }}
          className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!aggregatedStats) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400 text-lg">No contributions found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Token Status Card */}
      {githubToken && <TokenStatusCard tokenStatus={tokenStatus} />}
      <AllContributionsVisualization
        stats={aggregatedStats}
        username={username}
      />
    </div>
  );
}

interface AllContributionsVisualizationProps {
  stats: AggregatedStats;
  username: string;
}

function AllContributionsVisualization({
  stats,
  username,
}: AllContributionsVisualizationProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "overview",
  );

  const maxMonthCommits = Math.max(
    ...stats.commitsByMonth.map((m) => m.count),
    1,
  );
  const maxDayCommits = Math.max(...stats.commitsByDay.map((d) => d.count), 1);
  const maxHourCommits = Math.max(
    ...stats.commitsByHour.map((h) => h.count),
    1,
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Overview Card */}
      <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          All Contributions for @{username}
        </h2>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-sky-400 mb-1">
              {stats.totalCommits.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Commits</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">
              {stats.totalRepositories}
            </div>
            <div className="text-gray-400 text-sm">Repositories</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">
              {stats.contributionStreak.current}
            </div>
            <div className="text-gray-400 text-sm">Current Streak</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
              {stats.contributionStreak.longest}
            </div>
            <div className="text-gray-400 text-sm">Longest Streak</div>
          </div>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Contribution Heatmap */}
        <ContributionHeatmap dailyContributions={stats.dailyContributions} />
      </div>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

interface TokenStatusCardProps {
  tokenStatus: {
    isValid: boolean;
    user?: string;
    scopes?: string[];
    rateLimit?: { remaining: number; limit: number; reset: Date };
  } | null;
}

function TokenStatusCard({ tokenStatus }: TokenStatusCardProps) {
  if (tokenStatus === null) {
    return (
      <div className="bg-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sky-400"></div>
          <span className="text-gray-400 text-sm">Validating token...</span>
        </div>
      </div>
    );
  }

  if (!tokenStatus.isValid) {
    return (
      <div className="bg-red-900/20 border-red-500 rounded-2xl p-4 md:p-6 shadow-2xl border">
        <div className="flex items-start gap-3">
          <span className="text-red-400 text-xl">⚠️</span>
          <div className="flex-1">
            <h3 className="text-red-400 font-semibold mb-2">
              Invalid GitHub Token
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              The provided token is invalid or has expired. Please check your
              token.
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• Verify the token is correct</p>
              <p>• Check if the token has expired</p>
              <p>• Ensure the token has the required scopes</p>
              <p className="mt-2">
                Create a new token at:{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  github.com/settings/tokens
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-900/20 border-green-500 rounded-2xl p-4 md:p-6 shadow-2xl border">
      <div className="flex items-start gap-3">
        <span className="text-green-400 text-xl">✓</span>
        <div className="flex-1">
          <h3 className="text-green-400 font-semibold mb-2">
            Token Valid - Authenticated as @{tokenStatus.user}
          </h3>

          {tokenStatus.scopes && tokenStatus.scopes.length > 0 && (
            <div className="mb-3">
              <p className="text-gray-300 text-sm mb-2">Token Scopes:</p>
              <div className="flex flex-wrap gap-2">
                {tokenStatus.scopes.map((scope, index) => (
                  <span
                    key={index}
                    className="bg-slate-800 text-sky-400 px-2 py-1 rounded text-xs font-medium"
                  >
                    {scope}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tokenStatus.rateLimit && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">API Rate Limit:</span>
                <span
                  className={`font-semibold ${
                    tokenStatus.rateLimit.remaining < 100
                      ? "text-red-400"
                      : tokenStatus.rateLimit.remaining < 500
                        ? "text-amber-400"
                        : "text-green-400"
                  }`}
                >
                  {tokenStatus.rateLimit.remaining.toLocaleString()} /{" "}
                  {tokenStatus.rateLimit.limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    tokenStatus.rateLimit.remaining < 100
                      ? "bg-red-500"
                      : tokenStatus.rateLimit.remaining < 500
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }`}
                  style={{
                    width: `${(tokenStatus.rateLimit.remaining / tokenStatus.rateLimit.limit) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-400">
                Resets at: {tokenStatus.rateLimit.reset.toLocaleTimeString()}
              </p>
            </div>
          )}

          {tokenStatus.scopes && !tokenStatus.scopes.includes("repo") && (
            <div className="mt-3 p-2 bg-amber-900/20 border border-amber-500 rounded text-xs text-amber-300">
              ⚠️ Token doesn't have "repo" scope. Private repositories may not
              be accessible.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  isExpanded,
  onToggle,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl border border-slate-700">
      <div
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={onToggle}
      >
        <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          {isExpanded ? "▼" : "▶"}
        </button>
      </div>
      {isExpanded && <div className="animate-slide-in">{children}</div>}
    </div>
  );
}

interface ContributionHeatmapProps {
  dailyContributions: DailyContribution[];
}

function ContributionHeatmap({ dailyContributions }: ContributionHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<DailyContribution | null>(null);

  // Calculate date range dynamically based on actual data
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  // Get the earliest date from contributions
  let startDate = new Date(endDate);
  if (dailyContributions.length > 0) {
    const earliestDate = dailyContributions[0].date;
    startDate = new Date(earliestDate);
    startDate.setHours(0, 0, 0, 0);
  } else {
    // Default to 1 year if no data
    startDate.setDate(startDate.getDate() - 371);
  }

  // Convert to format expected by react-calendar-heatmap
  const heatmapValues = dailyContributions.map((day) => ({
    date: day.date,
    count: day.count,
  }));

  // Calculate max count for color scaling
  const maxCount = Math.max(...dailyContributions.map((d) => d.count), 1);

  // Determine color class based on contribution count
  const classForValue = (value: any) => {
    if (!value || !value.count || value.count === 0) {
      return "color-empty";
    }
    if (value.count <= Math.max(1, maxCount * 0.25)) {
      return "color-scale-1";
    }
    if (value.count <= maxCount * 0.5) {
      return "color-scale-2";
    }
    if (value.count <= maxCount * 0.75) {
      return "color-scale-3";
    }
    return "color-scale-4";
  };

  // Tooltip formatter
  const tooltipDataAttrs = (value: any): Record<string, string> => {
    if (!value || !value.count) return { "data-tip": "" };
    const date = new Date(value.date);
    return {
      "data-tip": `${value.count} contribution${
        value.count !== 1 ? "s" : ""
      } on ${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`,
    };
  };

  // Handle day click/hover
  const handleDayClick = (value: any) => {
    if (value && value.date) {
      setHoveredDay({
        date: value.date,
        count: value.count || 0,
      });
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl border border-slate-700">
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
          Contribution Activity
        </h3>
        <p className="text-gray-400 text-sm">
          {dailyContributions.filter((d) => d.count > 0).length} days with
          contributions
        </p>
      </div>

      {/* Heatmap using react-calendar-heatmap */}
      <div className="overflow-x-auto pb-4">
        <style>{`
          .react-calendar-heatmap {
            font-family: inherit;
          }
          .react-calendar-heatmap text {
            font-size: 10px;
            fill: #9ca3af;
          }
          .react-calendar-heatmap .react-calendar-heatmap-small-text {
            font-size: 8px;
          }
          .react-calendar-heatmap rect:hover {
            stroke: #10b981;
            stroke-width: 2px;
            stroke-opacity: 0.8;
          }
          .react-calendar-heatmap .color-empty {
            fill: #1e293b;
            stroke: #334155;
            stroke-width: 1px;
          }
          .react-calendar-heatmap .color-scale-1 {
            fill: #059669;
          }
          .react-calendar-heatmap .color-scale-2 {
            fill: #10b981;
          }
          .react-calendar-heatmap .color-scale-3 {
            fill: #34d399;
          }
          .react-calendar-heatmap .color-scale-4 {
            fill: #6ee7b7;
          }
        `}</style>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapValues}
          classForValue={classForValue}
          tooltipDataAttrs={tooltipDataAttrs}
          onClick={handleDayClick}
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
        />
      </div>

      {/* Legend and Hover Info */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-slate-800 border border-slate-700" />
            <div className="w-3 h-3 rounded-sm bg-emerald-600" />
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
            <div className="w-3 h-3 rounded-sm bg-emerald-300" />
          </div>
          <span className="text-gray-400 text-xs">More</span>
        </div>

        {hoveredDay && (
          <div className="bg-slate-800 rounded-lg px-3 py-2 border border-slate-700">
            <div className="text-white text-sm font-semibold">
              {hoveredDay.count} contribution
              {hoveredDay.count !== 1 ? "s" : ""}
            </div>
            <div className="text-gray-400 text-xs">
              {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
