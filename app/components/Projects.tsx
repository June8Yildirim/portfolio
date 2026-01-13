import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useScrollAnimation } from "~/useScrollAnimation";

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
  useEffect(() => {
    if (!sectionRef.current || mounted) return;

    const section = sectionRef.current;

    gsap.to(section, {
      x: "80vw",
      y: "-40vh",
      scale: 1.05,
      rotateZ: 1,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    // gsap.fromTo(
    //   section,
    //   {
    //     x: "-40vw",
    //     y: "-50vh",
    //     opacity: 0.3,
    //     scale: 0.6,
    //   },
    //   {
    //     x: "60vw",
    //     // y: "50vh",
    //     opacity: 1,
    //     scale: 1.05,
    //     ease: "power1.inOut",
    //     duration: 2,
    //     rotateZ: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: "top left",
    //       end: "bottom right",
    //       scrub: 1,
    //       invalidateOnRefresh: true,
    //     },
    //   },
    // );
  }, []);

  return (
    <div
      key={index}
      ref={sectionRef}
      className="h-screen w-screen flex items-center justify-start p-2 relative"
    >
      <div className={` rounded-3xl p-1 shadow-2xl max-w-3xl w-full mr-12`}>
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
