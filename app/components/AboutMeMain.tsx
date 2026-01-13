import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function AboutMain({
  index,
  length,
  mounted,
}: {
  length: number;
  index: number;
  mounted: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null); // useScrollAnimation({ index, length, mounted });
  const boxRef = useRef<HTMLDivElement>(null); // useScrollAnimation({ index, length, mounted });
  const containerRef = useRef<HTMLDivElement>(null); // useScrollAnimation({ index, length, mounted });
  const listRef = useRef<HTMLUListElement>(null); // useScrollAnimation({ index, length, mounted });

  useGSAP(
    () => {
      const t2 = new SplitText(".t2", { type: "words" });
      const t3 = new SplitText(".t5", { type: "lines" });
      t2.chars.forEach((ch) => ch.classList.add("text-gradient"));
      t3.chars.forEach((ch) => ch.classList.add("text-gradient"));

      gsap.from(t2.chars, {
        opacity: 0,
        yPercent: 100,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.05,
        delay: 0.4,
      });
      gsap.from(t3.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.07,
        delay: 1,
      });
    },
    { scope: sectionRef },
  );
  return (
    <div
      key={index}
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-start p-2 relative"
    >
      <div
        ref={boxRef}
        className={"rounded-3xl p-1 shadow-2xl max-w-2xl w-full"}
      >
        <div className="bg-transparent rounded-3xl p-12 h-full border-2 shadow-2xl shadow-amber-100">
          <div className="text-8xl mb-6">📧</div>
          <h2 className={`text-6xl font-bold text-white mb-4  bg-clip-text`}>
            About Me
          </h2>
          <h3 className="text-3xl text-gray-300 mb-8 font-light">
            Cuneyt Yildirim
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Fullstack JavaScript/Java Developer skilled in building responsive
            web and mobile applications. Frontend expertise in React Native and
            SwiftUI for cross-platform development. Backend proficiency with
            Java Spring Boot, Node.js, and RESTful API design. Experience with
            database systems (SQL/NoSQL), cloud services (AWS/Azure), and DevOps
            tools (Docker, Git, CI/CD). Successfully delivered fullstack
            projects including QC election tracking systems and e-commerce
            platforms.
          </p>
          <div ref={containerRef} className="education-section">
            <ul ref={listRef} className="education-timeline">
              <li>
                <span className="t2 bullet">•</span>
                <span className="t2 institution">Concordia University</span>
                <span className="t3 details">
                  2024 - Bachelor Degree - Computer Science
                </span>
              </li>
              <li>
                <span className="t2 bullet">•</span>
                <span className="t2 institution">D.E.C Computer Science</span>
                <span className="t3 details">2020–2024 • Dawson College</span>
              </li>
              <li>
                <span className="t2 bullet">•</span>
                <span className="t2 institution">DEP • Computing Support</span>
                <span className="t3 details">
                  2018–2020 • Electrotechnology Centre L. B. Pearson
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            Section {index + 1} of {length}
          </div>
        </div>
      </div>
    </div>
  );
}
