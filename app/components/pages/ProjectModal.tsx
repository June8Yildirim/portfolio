import type { ProjectDetail } from "~/types/ProjectDetails";
import Projects from "./Project";

export default function ProjectDetailModal({
  projectId,
  project,
  setProjectId,
}: {
  project: ProjectDetail | null;
  setProjectId: (id: string) => void;
  projectId: string | null;
}) {
  return (
    <div className="radial-gradient flex flex-col md:flex-row gap-4 md:gap-6 w-full min-w-0">
      <div
        className={`bg-slate-900 rounded-lg shadow-2xl max-h-[50vh] md:max-h-[85vh] overflow-auto shrink-0 ${projectId ? "w-full md:w-1/3 min-w-0" : "w-full max-w-2xl"}`}
      >
        <Projects setOpenDetail={setProjectId} />
      </div>

      {/* Detail Modal - slides in from right */}
      {projectId && (
        <div className="radial-gradient rounded-lg shadow-2xl max-h-[50vh] md:max-h-[85vh] overflow-auto relative w-full md:w-2/3 min-w-0 animate-slide-in">
          <button
            onClick={() => setProjectId("")}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
          >
            ×
          </button>
          <div className="p-4 md:p-8 w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Project Details
            </h2>
            <div className="space-y-4 md:space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {project?.app_identity.name}
                </h3>
                <p className="text-gray-700 mb-2 md:mb-4 text-sm md:text-base">
                  {project?.app_identity.tagline}
                </p>
              </div>
              <div className="radial-gradient  flex-row justify-between items-start flex shadow-2xl p-4 gap-2 rounded">
                <div className="pt-4">
                  <a
                    href={project?.app_identity.url || "#"}
                    target={project?.app_identity.url ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                      project?.app_identity.url
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {project?.app_identity.url
                      ? "View Live Demo →"
                      : "Demo Not Available"}
                  </a>
                </div>
                <div className="flex-col justify-items-start items-start flex p-4 gap-2 rounded">
                  <h4 className="font-semibold mb-2">Platforms:</h4>
                  <div className="flex-wrap flex gap-2 rounded">
                    {project?.app_identity.platforms.map((platform, idx) => (
                      platform.link ? (
                        <a
                          href={platform.link}
                          key={idx}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                        >
                          {platform.name}
                        </a>
                      ) : (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {platform.name}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              </div>
              <div className="radial-gradient shadow-2xl p-3 md:p-4 rounded-2xl">
                <h4 className="font-semibold mb-2 text-sm md:text-base">
                  Features:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {project &&
                    project.key_features.map((feature, index) => (
                      <li key={index}>
                        <strong>{feature.title}</strong>
                        <p className="ml-5">{feature.description}</p>
                        <span className="ml-5 text-sm text-gray-500">
                          Automation: {feature.automation_level}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              {project && (
                <div className="radial-gradient shadow-2xl p-4 rounded-2xl">
                  <p className="ml-5 text-sm text-gray-500">
                    - {project.core_purpose.mission}
                  </p>
                  <p className="ml-5 text-sm text-gray-500">
                    - {project.core_purpose.positioning}
                  </p>
                  {project.core_purpose.problem_solved.map((solve, idx) => (
                    <p className="ml-5 text-sm text-gray-500" key={idx}>
                      - {typeof solve === "string" ? solve : solve.title}
                    </p>
                  ))}
                </div>
              )}
              <div className="radial-gradient shadow-2xl p-4  rounded-2xl">
                <h4 className="font-semibold mb-2">Target Audience:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {project &&
                    project.target_audience.map((audience, index) => (
                      <li key={index}>
                        <strong>{audience.persona}</strong>
                        <span className="ml-5 text-sm text-gray-500">
                          {audience.use_case}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <span className="ml-5 text-sm text-gray-500">
                {project?.summary}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
