import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "~/constats/sections";
import Modal from "~/portal";

import ProjectsMain from "./ProjectsMain";
import HeroMain from "./Hero";
import ExperiencesMain from "./ExperiencesMain";
import SkillsMain from "./SkillsMain";
import AboutMain from "./AboutMeMain";
import ContactMain from "./ContactMain";
import { projectDetail } from "~/constats/projects";
import type { ProjectDetail } from "~/types/ProjectDetails";
import ProjectDetailModal from "./pages/ProjectModal";
import ExperienceSection from "./pages/ExperienceModal";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const containerRef = useRef(null);
  const [projectMounted, setProjectMounted] = useState(false);
  const [experienceMounted, setExperiencesMounted] = useState(false);
  const [skillsMounted, setSkillsMounted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  //TODO: add to modal next to each  othher. When opendd the
  //details moodal if user clicks detauil button open new projectg next ot parenal modal.
  // TODO: you may think to merge component merge into one AboutMe and ContactMe,
  //

  useEffect(() => {
    const proj = projectDetail.find((pro) => pro.id === projectId);
    proj && setProject(proj);
  }, [projectId]);
  return (
    <div ref={containerRef} className="main" id="hero">
      <div className="noisy -z-10" />
      {projectMounted && (
        <Modal
          isOpen={projectMounted}
          onClose={() => setProjectMounted(false)}
          className="justify-start"
          title={"Project Details"}
        >
          <ProjectDetailModal
            project={project}
            projectId={projectId}
            setProjectId={setProjectId}
          />
        </Modal>
      )}
      {experienceMounted && (
        <Modal
          title={"Experience Details"}
          isOpen={experienceMounted}
          onClose={() => setExperiencesMounted(false)}
          className="justify-start"
        >
          {experienceMounted && <ExperienceSection />}
        </Modal>
      )}

      <HeroMain index={0} length={sections.length} mounted={projectMounted} />
      <ProjectsMain
        index={1}
        length={sections.length}
        mounted={projectMounted}
        setMounted={setProjectMounted}
      />
      <ExperiencesMain
        index={2}
        length={sections.length}
        mounted={experienceMounted}
        setMounted={setExperiencesMounted}
      />
      <SkillsMain
        index={3}
        length={sections.length}
        mounted={skillsMounted}
        setMounted={setSkillsMounted}
      />
      <AboutMain index={4} length={sections.length} mounted={projectMounted} />
      <ContactMain
        index={5}
        length={sections.length}
        mounted={projectMounted}
      />
    </div>
  );
}
