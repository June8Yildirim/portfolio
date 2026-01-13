import { useState } from "react";
import { Briefcase, Calendar, MapPin, Code, Wrench } from "lucide-react";

const experienceData = [
  {
    id: 1,
    title: "Lead FullStack Developer",
    company: "Turina Tech",
    location: "Remote",
    period: "September 2024 — September 2025",
    type: "Full-time",
    technologies: [
      "ReactJs",
      "TailwindCSS",
      "React-Native",
      "Expo",
      "Docker",
      "Git",
      "Spring Boot",
      "Jira",
      "Firebase",
      ".NET",
      "Agile Dev.",
    ],
    responsibilities: [
      "Written the code to fix an existing issue, implemented new features, and added unit test cases.",
      "Participating in daily meetings with team members and checking the daily progress of our implementation.",
      "Creating tasks and user stories, and following up on these tasks' progress and team members' development.",
      "Created a mobile application and implemented iOS and Android features and differences are added.",
      "Collaborated with the QA team in daily meetings and updated code based on their daily test reports.",
      "After the assigned test's implementation is completed, a new pull request and PR are approved and merged into the main branch, so Incorporated with other developers.",
      "Helped improve the Figma design and gave UI/UX design teams more feedback.",
    ],
    category: "software",
  },
  {
    id: 2,
    title: "Computer Technician",
    company: "Dawson College",
    location: "Montreal, QC",
    period: "August 2024 — October 2024",
    type: "Contract",
    responsibilities: [
      "Fixed broken computers, printers or other devices.",
      "Deployed new Windows, MacOS or iOS based on the school security restrictions.",
      "Installed, configured, and upgraded software applications and operating systems.",
      "Troubleshooted and resolved software issues, including operating system errors and application crashes.",
      "Performed regular maintenance on computer systems to ensure operated efficiently.",
      "Troubleshoot hardware and software issues, including operating systems, applications, and network connectivity.",
      "Install, configure, and maintain IT equipment such as workstations, printers, and network devices in clinics and head office locations.",
      "Assist in setting up and managing user accounts, passwords, and permissions in accordance with IT policies.",
    ],
    category: "technical",
  },
  {
    id: 3,
    title: "Intern FullStack Developer",
    company: "Saadat Development",
    location: "Remote",
    period: "April 2024 — June 2024",
    type: "Internship",
    technologies: [
      "ReactJs",
      "TailwindCSS",
      "React-Query",
      "Socket.IO",
      "JWT",
      "React-Router",
      "Docker",
      "Git",
      "Jotai",
    ],
    responsibilities: [
      "Written the code to fix an existing issue or implemented 24 new features.",
      "Created 60 new test cases with Jest and React-Testing Library.",
      "Conducted a thorough review of the code base, creating a report to document and address any errors found, ensuring high code quality.",
      "Executed and managed global state to ensure data consistency across the application with Jotai.",
      "Enforced React-Query to handle integrated front-end components with RESTful APIs and data fetching, caching, and error handling.",
      "Incorporated the version control systems to manage code changes and collaborate with other developers.",
    ],
    category: "software",
  },
  {
    id: 4,
    title: "Computer Technician",
    company: "Dawson College",
    location: "Montreal, QC",
    period: "October 2023 — December 2023",
    type: "Contract",
    responsibilities: [
      "Fixed broken computers, printers or other devices.",
      "Deployed new Windows, MacOS or iOS based on the school security restrictions.",
      "Installed, configured, and upgraded software applications and operating systems.",
      "Troubleshooted and resolved software issues, including operating system errors and application crashes.",
      "Performed regular maintenance on computer systems to ensure operated efficiently.",
    ],
    category: "technical",
  },
  {
    id: 5,
    title: "Computer Technician",
    company: "Lester B. Pearson SB",
    location: "Montreal, QC",
    period: "November 2019 — February 2020",
    type: "Internship",
    responsibilities: [
      "Answered the school administration's and teachers' requests regarding computer or technical questions and suggestions.",
      "Repaired malfunctioning computers, printers, smart-boards, projections or other devices.",
      "Documented troubleshooting steps and solutions for future reference.",
    ],
    category: "technical",
  },
];

const ExperienceCard = ({ experience, isExpanded, onToggle }) => {
  const isSoftware = experience.category === "software";

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 hover:border-sky-400/50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div
            className={`p-3 rounded-lg ${isSoftware ? "bg-sky-500/20" : "bg-orange-500/20"}`}
          >
            {isSoftware ? (
              <Code className="w-6 h-6 text-sky-400" />
            ) : (
              <Wrench className="w-6 h-6 text-orange-400" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">
              {experience.title}
            </h3>
            <div className="flex items-center gap-2 text-sky-400 mb-2">
              <Briefcase className="w-4 h-4" />
              <span className="font-semibold">{experience.company}</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  experience.type === "Full-time"
                    ? "bg-green-500/20 text-green-400"
                    : experience.type === "Internship"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {experience.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies */}
      {experience.technologies && (
        <div className="mb-4">
          <h4 className="text-white/80 font-semibold mb-2 text-sm">
            Technologies:
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-xs font-medium border border-sky-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Responsibilities */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white/80 font-semibold text-sm">
            Key Responsibilities:
          </h4>
          <button
            onClick={onToggle}
            className="text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>

        <ul className="space-y-2">
          {(isExpanded
            ? experience.responsibilities
            : experience.responsibilities.slice(0, 3)
          ).map((resp, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-white/80 text-sm"
            >
              <span className="text-sky-400 mt-1">•</span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>

        {!isExpanded && experience.responsibilities.length > 3 && (
          <p className="text-white/50 text-xs mt-2">
            +{experience.responsibilities.length - 3} more responsibilities
          </p>
        )}
      </div>
    </div>
  );
};

export default function ExperienceModal() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredExperiences =
    filter === "all"
      ? experienceData
      : experienceData.filter((exp) => exp.category === filter);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">Experience</h1>
          <p className="text-white/70 text-xl mb-8">
            Professional journey and technical expertise
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-sky-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("software")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === "software"
                  ? "bg-sky-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Software Development
            </button>
            <button
              onClick={() => setFilter("technical")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === "technical"
                  ? "bg-sky-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Technical Support
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sky-500/30 hidden md:block" />

          {/* Experience Cards */}
          <div className="space-y-8">
            {filteredExperiences.map((experience) => (
              <div key={experience.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-sky-500 rounded-full border-4 border-slate-900 hidden md:block" />

                {/* Card with offset for timeline */}
                <div className="md:ml-16">
                  <ExperienceCard
                    experience={experience}
                    isExpanded={expandedId === experience.id}
                    onToggle={() => toggleExpand(experience.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-sky-400 mb-2">5+</div>
            <div className="text-white/80">Years Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-sky-400 mb-2">15+</div>
            <div className="text-white/80">Technologies</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-sky-400 mb-2">5</div>
            <div className="text-white/80">Companies</div>
          </div>
        </div>
      </div>
    </div>
  );
}
