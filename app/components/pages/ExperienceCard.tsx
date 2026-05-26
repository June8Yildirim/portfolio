import { useState, useEffect, useRef } from "react";
import { Briefcase, Calendar, MapPin, Code, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import type { Experience } from "~/types/Experience";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceCardProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExperienceCard = ({ experience, isExpanded, onToggle }: ExperienceCardProps) => {
  const isSoftware = experience.category === "software";
  const techRef = useRef<HTMLDivElement>(null);
  const responsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // @ts-ignore
    const t1 = new SplitText(".t1", { type: "words" });
    // @ts-ignore
    const t2 = new SplitText(".t2", { type: "words" });
    // @ts-ignore
    const t3 = new SplitText(".t3", { type: "words" });
    // @ts-ignore
    const t4 = new SplitText(".t4", { type: "words" });
    // @ts-ignore
    const t5 = new SplitText(".t5", { type: "lines" });
    // @ts-ignore
    const t6 = new SplitText(".t6", { type: "lines" });
    t1.chars.forEach((ch: any) => ch.classList.add("text-gradient"));
    t2.chars.forEach((ch: any) => ch.classList.add("text-gradient"));
    t3.chars.forEach((ch: any) => ch.classList.add("text-gradient"));
    t4.chars.forEach((ch: any) => ch.classList.add("text-gradient"));

    gsap.from(t1.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.05,
      delay: 0.4,
    });
    gsap.from(t2.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.05,
      delay: 0.4,
    });
    gsap.from(t3.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.05,
      delay: 0.4,
    });
    gsap.from(t5.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.05,
      delay: 0.4,
    });
    gsap.from(t5.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.07,
      delay: 1,
    });
    gsap.from(t6.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.07,
      delay: 1,
    });
  }, []);

  // Animate expansion
  useEffect(() => {
    if (isExpanded && responsRef.current) {
      const items = responsRef.current.querySelectorAll("li");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }
  }, [isExpanded]);

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
            <h3 className="t1 text-2xl font-bold text-white mb-1">
              {experience.title}
            </h3>
            <div className="flex items-center gap-2 text-sky-400 mb-2">
              <Briefcase className="w-4 h-4" />
              <span className="font-semibold t2">{experience.company}</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm t3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-1 t4">
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
          <h4 className="t3 font-semibold mb-2 text-sm">Technologies:</h4>
          <div ref={techRef} className="t5 flex flex-wrap gap-2">
            {experience.technologies.map((tech: string, idx: number) => (
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
      <div ref={responsRef}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm t6">Key Responsibilities:</h4>
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
          ).map((resp: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 t5 text-sm">
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
