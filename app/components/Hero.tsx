import React from "react";
import { useScrollAnimation } from "~/useScrollAnimation";
export default function HeroMain({
  index,
  length,
  mounted,
}: {
  length: number;
  index: number;
  mounted: boolean;
}) {
  const sectionRef = useScrollAnimation({ index, length, mounted });

  return (
    <div
      key={index}
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center md:justify-start p-2 md:p-4 relative"
    >
      <div className={` rounded-3xl p-1 shadow-2xl max-w-2xl w-full md:mr-12 mx-2`}>
        <div className="bg-transparent rounded-3xl p-4 md:p-8 lg:p-12 h-full border-2 shadow-2xl shadow-amber-100">
          <div className="text-5xl md:text-6xl lg:text-8xl mb-4 md:mb-6">👋</div>
          <h2 className={`text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4  bg-clip-text`}>
            Welcome
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 md:mb-6 lg:mb-8 font-light">
            Creative Developer
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 lg:mb-10">
            "Crafting beautiful digital experiences with modern web
            technologies."
          </p>
          <div className="mt-8 text-sm text-gray-500">
            Section {index + 1} of {length}
          </div>
        </div>
      </div>
    </div>
  );
}
