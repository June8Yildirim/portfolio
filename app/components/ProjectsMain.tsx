import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

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
  const sectionRef = useRef<HTMLDivElement>(null); // useScrollAnimation({ index, length, mounted });
  const boxRef = useRef<HTMLDivElement>(null); // useScrollAnimation({ index, length, mounted });

  useGSAP(
    () => {
      if (!boxRef.current || !sectionRef.current) return;

      gsap.from(boxRef.current, {
        x: "80vh", // Start off-screen to the right
        y: "40vh",
        opacity: 0,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current, // Element that starts the animation
          start: "top 50%", // When the top of the container hits 80% of the viewport
          end: "top 2%", // When the top of the container hits 30% of the viewport
          scrub: true, // Smoothly links animation progress to scroll distance
          markers: false, // Set to true to debug start/end points
          invalidateOnRefresh: true, // Recalculate on refresh
        },
      });
    },
    { scope: sectionRef, dependencies: [mounted] },
  );

  return (
    <div
      key={index}
      ref={sectionRef}
      className="h-screen w-screen flex items-center justify-start p-2 relative"
    >
      <div
        ref={boxRef}
        className={` rounded-3xl p-1 shadow-2xl max-w-3xl w-full mr-12`}
      >
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
            {/* <button */}
            {/*   className={`text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg`} */}
            {/* > */}
            {/*   Explore More */}
            {/* </button> */}
            <button
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:text-white transition-colors"
              onClick={() => setMounted(!mounted)}
            >
              Explore More
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
