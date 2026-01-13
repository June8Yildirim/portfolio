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

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  //TODO: add to modal next to each  othher. When opendd the
  //details moodal if user clicks detauil button open new projectg next ot parenal modal.
  // TODO: you may think to merge component merge into one AboutMe and ContactMe,
  //
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
                        This is a detailed view of the selected project. You can
                        add more information here like:
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>User authentication</li>
                        <li>Real-time updates</li>
                        <li>Responsive design</li>
                        <li>API integration</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          React
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Node.js
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          MongoDB
                        </span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <a href="#" className="text-blue-600 hover:underline">
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
