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
  //TODO: add to modal next to each  othher. When opendd the
  //details moodal if user clicks detauil button open new projectg next ot parenal modal.
  // TODO: you may think to merge component merge into one AboutMe and ContactMe,
  //
  return (
    <div ref={containerRef} className="main" id="hero">
      <div className="noisy -z-10" />
      {mounted && (
        <Modal isOpen={mounted} onClose={() => setMounted(false)}>
          <Projects />
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
