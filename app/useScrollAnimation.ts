// useScrollAnimation.ts - Custom hook for scroll animations
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  index: number;
  length: number;
  mounted: boolean;
}

export const useScrollAnimation = ({
  index,
  length,
  mounted,
}: AnimationConfig) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      // Different animations based on index
      switch (index) {
        case 0: // HeroMain - Fade in with scale
          gsap.fromTo(
            section,
            {
              opacity: 0,
              scale: 0,
              y: 50,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            },
          );
          break;

        case 1: // ProjectsMain - Slide in from left with rotation
          gsap.fromTo(
            section,
            {
              opacity: 0,
              x: -100,
              // rotateY: -15,
            },
            {
              opacity: 1,
              x: window.innerWidth - 700,
              // rotateY: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 25%",
                toggleActions: "play none none reverse",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
          break;

        case 2: // ExperiencesMain - Slide in from right with stagger
          gsap.fromTo(
            section,
            {
              opacity: 0,
              x: 100,
              clipPath: "inset(0 100% 0 0)",
            },
            {
              opacity: 1,
              x: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "top 30%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            },
          );
          break;

        case 3: // SkillsMain - Bounce in from bottom
          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: 150,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 25%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            },
          );
          break;

        case 4: // AboutMain - Fade in with blur effect
          gsap.fromTo(
            section,
            {
              opacity: 0,
              filter: "blur(20px)",
              y: 80,
            },
            {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "top 30%",
                toggleActions: "play none none reverse",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );
          break;

        case 5: // ContactMain - Elastic entrance
          gsap.fromTo(
            section,
            {
              opacity: 0,
              scale: 0.5,
              rotation: -10,
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            },
          );
          break;

        default:
          break;
      }
    }, section);

    return () => {
      ctx.revert();
      // Refresh ScrollTrigger after cleanup to ensure proper recalculation
      ScrollTrigger.refresh();
    };
  }, [index, mounted]);

  return sectionRef;
};
