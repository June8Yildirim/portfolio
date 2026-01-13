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
      className="h-screen w-full flex items-center justify-start p-2 relative"
    >
      <div className={` rounded-3xl p-1 shadow-2xl max-w-2xl w-full mr-12`}>
        <div className="bg-transparent rounded-3xl p-12 h-full border-2 shadow-2xl shadow-amber-100">
          <div className="text-8xl mb-6">👋</div>
          <h2 className={`text-6xl font-bold text-white mb-4  bg-clip-text`}>
            Welcome
          </h2>
          <h3 className="text-3xl text-gray-300 mb-8 font-light">
            Creative Developer
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            "Crafting beautiful digital experiences with modern web
            technologies.",
          </p>
          <div className="mt-8 text-sm text-gray-500">
            Section {index + 1} of {length}
          </div>
        </div>
      </div>
    </div>
  );
}
