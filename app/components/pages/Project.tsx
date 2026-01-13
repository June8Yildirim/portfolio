import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "~/constats/projects";

const Projects = ({
  setOpenDetail,
}: {
  setOpenDetail: (id: string) => void;
}) => {
  const projectsRef = useRef([]);

  useEffect(() => {
    projectsRef.current.forEach((project, index) => {
      gsap.fromTo(
        project,
        { x: "-100%", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        },
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <div
          key={index}
          ref={addToRefs}
          className={`bg-gradient-to-br ${project.gradient} rounded-2xl p-1 shadow-2xl`}
        >
          <div className="bg-slate-900 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-xl text-gray-400">{project.company}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`bg-gradient-to-r ${project.gradient} px-3 py-1 rounded-full text-sm text-white font-medium`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {project.achievements.map((achievement, achIndex) => (
                  <li
                    key={achIndex}
                    className="text-gray-400 flex items-start gap-3"
                  >
                    <span className="text-green-400 mt-1 shrink-0">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
                <button
                  className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:text-white transition-colors"
                  onClick={() => setOpenDetail(project.id)}
                >
                  Details
                </button>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
