import { useScrollAnimation } from "~/useScrollAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export default function ProjectsMain({
  index,
  length,
  mounted,
  setMounted,
}: {
  length: number;
  index: number;
  mounted: boolean;
  setMounted: (isOn: boolean) => void;
}) {
  // const sectionRef = useScrollAnimation({ index, length, mounted });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || mounted) return;

    const section = sectionRef.current;
    const componentWidth = section.offsetWidth / 2;
    const browserWidth = window.innerWidth;
    console.log(browserWidth);
    console.log(componentWidth);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          x: -100, // Start off-screen left (component width)
        },
        {
          opacity: 1,
          x: browserWidth - componentWidth, // End at normal position
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 25%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [mounted]);
  return (
    <div
      key={index}
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-start p-2 relative"
    >
      <div className={` rounded-3xl p-1 shadow-2xl max-w-2xl w-full mr-12`}>
        <div className="bg-transparent rounded-3xl p-12 h-full border-2 shadow-2xl shadow-amber-100">
          <div className="text-8xl mb-6">🚀</div>
          <h2 className={`text-6xl font-bold text-white mb-4  bg-clip-text`}>
            Projects
          </h2>
          <h3 className="text-3xl text-gray-300 mb-8 font-light">
            Recent Work
          </h3>
          <p className="text-xl text-gray-400 leading-relaxed mb-10">
            From e-commerce platforms to interactive dashboards, each project
            showcases attention to detail and innovation.
          </p>
          <div className="flex gap-4">
            <button
              className={`text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg`}
            >
              Explore More
            </button>
            <button
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:text-white transition-colors"
              onClick={() => setMounted(!mounted)}
            >
              Details
            </button>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            Section {index + 1} of {length}
          </div>
        </div>
      </div>
    </div>
  );
}
