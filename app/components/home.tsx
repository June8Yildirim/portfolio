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
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      // Create a timeline for better control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Enter from right
      tl.fromTo(
        section,
        { x: "120%", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0,
      );

      // Stay visible
      tl.to(section, { x: 0, opacity: 1, duration: 0.3 }, 0.5);

      // Exit to top (starts after previous completes)
      tl.to(
        section,
        { y: "-180%", opacity: 0, duration: 0.5, ease: "power2.in" },
        0.8,
      );

      // Scrolling UP animations
      const reverseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "top top",
          scrub: 1,
        },
      });

      reverseTimeline.fromTo(
        section,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0,
      );

      reverseTimeline.to(
        section,
        { x: "-100%", opacity: 0, duration: 0.5, ease: "power2.in" },
        0.5,
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      // Scrolling DOWN: Animate in from right
      gsap.fromTo(
        section,
        {
          x: "120%",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top center",
            scrub: 1,
          },
        },
      );

      // Scrolling DOWN: Animate out to top
      gsap.to(section, {
        y: "-180%",
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          // This triggers when animation completes
          onLeave: () => {
            // Trigger next section to enter
            if (sectionsRef.current[index + 1]) {
              ScrollTrigger.refresh();
            }
          },
        },
      });

      // // Scrolling UP: Animate in from top
      // gsap.fromTo(
      //   section,
      //   {
      //     y: "-100%",
      //     opacity: 0,
      //   },
      //   {
      //     y: 0,
      //     opacity: 1,
      //     duration: 1,
      //     ease: "power2.out",
      //     scrollTrigger: {
      //       trigger: section,
      //       start: "bottom top",
      //       end: "bottom center",
      //       scrub: 1,
      //     },
      //   },
      // );

      // // Scrolling UP: Animate out to left
      // gsap.to(section, {
      //   x: "-100%",
      //   opacity: 0,
      //   duration: 1,
      //   ease: "power2.in",
      //   scrollTrigger: {
      //     trigger: section,
      //     start: "bottom bottom",
      //     end: "top bottom",
      //     scrub: 1,
      //   },
      // });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

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
  );
}
