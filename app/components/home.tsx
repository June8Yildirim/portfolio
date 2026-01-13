import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "~/constats/sections";
import Modal from "~/portal";

import Projects from "./pages/Project";
import ProjectsMain from "./Projects";
import HeroMain from "./Hero";
import ExperiencesMain from "./Experiences";
import SkillsMain from "./Skills";
import AboutMain from "./AboutMe";
import ContactMain from "./Contact";
import { projectDetail } from "~/constats/projects";
import type { ProjectDetail } from "~/types/ProjectDetails";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  //TODO: add to modal next to each  othher. When opendd the
  //details moodal if user clicks detauil button open new projectg next ot parenal modal.
  // TODO: you may think to merge component merge into one AboutMe and ContactMe,
  //

  useEffect(() => {
    const proj = projectDetail.find((pro) => pro.id === projectId);
    setProject(proj);
  }, [projectId]);
  return (
    <div ref={containerRef} className="main" id="hero">
      <div className="noisy -z-10" />
      {mounted && (
        <Modal
          isOpen={mounted}
          onClose={() => setMounted(false)}
          className="justify-start"
        >
          <div className="flex gap-6 w-full">
            <div
              className={`bg-slate-900 rounded-lg shadow-2xl max-h-[85vh] overflow-auto shrink-0 ${projectId ? "w-1/3" : "w-full max-w-2xl"}`}
            >
              <Projects setOpenDetail={setProjectId} />
            </div>

            {/* Detail Modal - slides in from right */}
            {projectId && (
              <div className="bg-white rounded-lg shadow-2xl max-h-[85vh] overflow-auto relative w-2/3 animate-slide-in">
                <button
                  onClick={() => setProjectId(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                >
                  ×
                </button>
                <div className="p-8 w-[500px]">
                  <h2 className="text-3xl font-bold mb-4">Project Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Project ID: {projectId}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {project?.app_identity["name"]}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {project?.app_identity["developer"]}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {project?.app_identity["tagline"]}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {project &&
                          project.key_features.map((feature, index) => (
                            <li key={index}>
                              <strong>{feature?.title}</strong>
                              <p className="ml-5">{feature?.description}</p>
                              <span className="ml-5 text-sm text-gray-500">
                                Automation: {feature?.automation_level}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    {project && (
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="ml-5 text-sm text-gray-500">
                          - {project.core_purpose["mission"]}
                        </p>
                        <p className="ml-5 text-sm text-gray-500">
                          - {project.core_purpose["positioning"]}
                        </p>
                        {project.core_purpose["problem_solved"].map((solve) => (
                          <p
                            className="ml-5 text-sm text-gray-500"
                            key={solve.toString()}
                          >
                            - {solve?.toString()}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {project &&
                          project.target_audience.map((feature, index) => (
                            <li key={index}>
                              <strong>{feature?.persona}</strong>
                              <span className="ml-5 text-sm text-gray-500">
                                {feature?.use_case}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <span className="ml-5 text-sm text-gray-500">
                      {project?.summary}
                    </span>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-2">Technologies:</h4>
                      {project?.app_identity.platforms.map((platform) => (
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {platform.toString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4">
                      <a
                        href={
                          project && project.app_identity.url
                            ? project.app_identity?.url
                            : ""
                        }
                        className={`${project?.app_identity.url} ? "text-blue-600: "text-gray-500" hover:underline`}
                      >
                        View Live Demo →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      <HeroMain
        index={0}
        length={sections.length}
        mounted={mounted}
        setMounted={setMounted}
      />
      <ProjectsMain
        index={1}
        length={sections.length}
        mounted={mounted}
        setMounted={setMounted}
      />
      <ExperiencesMain
        index={2}
        length={sections.length}
        mounted={mounted}
        setMounted={setMounted}
      />
      <SkillsMain
        index={3}
        length={sections.length}
        mounted={mounted}
        setMounted={setMounted}
      />
      <div className="flex flex-row gap-8 px-4 w-screen">
        <AboutMain
          index={4}
          length={sections.length}
          mounted={mounted}
          setMounted={setMounted}
        />
        <ContactMain
          index={5}
          length={sections.length}
          mounted={mounted}
          setMounted={setMounted}
        />
      </div>
    </div>
  );
}
