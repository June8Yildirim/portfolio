import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 1,
    index: "01",
    label: "BACHELOR'S DEGREE",
    title: "Computer Science",
    institution: "Concordia University",
    period: "Jan 2024 — Jun 2029",
    location: "Montreal, QC",
    description:
      "Bachelor's degree in Computer Science building advanced knowledge across algorithms, software architecture, artificial intelligence, and computer systems design. Developing the theoretical depth behind production-grade engineering.",
    tags: [
      "C/C++",
      "Data Structures",
      "Algorithms",
      "Software Engineering",
      "AI & ML",
      "Computer Systems",
      "Concurrency",
    ],
    accent: "#4488ff",
  },
  {
    id: 2,
    index: "02",
    label: "APPLE PLATFORM",
    title: "iOS & SwiftUI Engineering",
    institution: "Apple Developer Program · Self-Directed",
    period: "2024 — Present",
    location: "Montreal, QC",
    description:
      "Deep expertise in Apple's native ecosystem — SwiftUI, CoreData, CloudKit, WidgetKit, and the App Store submission pipeline. Shipped multiple apps to the App Store with 5-star UX standards.",
    tags: [
      "SwiftUI",
      "CoreData",
      "CloudKit",
      "WidgetKit",
      "Gemini AI",
      "LaTeX",
    ],
    accent: "#6655ff",
  },
  {
    id: 3,
    index: "03",
    label: "WEB & FULLSTACK",
    title: "Full Stack Engineering",
    institution: "Industry Experience · Self-Directed",
    period: "2023 — Present",
    location: "Remote",
    description:
      "End-to-end web application development across the JavaScript and JVM stacks. From Next.js SSR to Spring Boot microservices, MongoDB schemas to Docker Compose orchestration.",
    tags: [
      "React",
      "Next.js",
      "Spring Boot",
      "CI/CD",
      "Node.js",
      "Docker",
      ".Net",
      "SQL/NoSQL",
    ],
    accent: "#0099ff",
  },
  {
    id: 4,
    index: "04",
    label: "CROSS-PLATFORM MOBILE",
    title: "React Native & Expo",
    institution: "Industry Experience",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Production-grade cross-platform mobile development shipped to both the App Store and Google Play. Real-time Firebase, TanStack Query, Redux Sagas, and FCM push notifications.",
    tags: [
      "React Native",
      "Expo",
      "Firebase",
      "Redux",
      "Zustand",
      "TanStack Query",
    ],
    accent: "#00bbff",
  },
  {
    id: 5,
    index: "05",
    label: "DIPLOMA OF COLLEGE STUDIES",
    title: "Computer Science",
    institution: "Dawson College",
    period: "Aug 2020 — Jun 2024",
    location: "Montreal, QC",
    description:
      "Diploma of College Studies (DCS) in Computer Science covering full-stack web development, mobile engineering, databases, and modern DevOps practices. The foundation for shipping production apps across iOS, Android, and Web.",
    tags: [
      "Git",
      "CI/CD",
      "React",
      "Node.js",
      "Docker",
      "SQL",
      "Linux",
      "Java",
      "REST APIs",
      "Agile",
    ],
    accent: "#6655ff",
  },
  {
    id: 6,
    index: "06",
    label: "DIPLOMA OF VOCATIONAL STUDIES",
    title: "Computer & Information Sciences",
    institution: "Pearson Electrotechnology Centre (PEC)",
    period: "Aug 2018 — Apr 2020",
    location: "Montreal, QC",
    description:
      "Diploma of Vocational Studies (DVS) in Computer and Information Sciences and Support Services. Hands-on training in networking infrastructure, hardware maintenance, and enterprise IT system support.",
    tags: ["Networking", "Computer Maintenance", "IT Support"],
    accent: "#0099ff",
  },
];

export default function Education() {
  const pinRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const listItems = gsap.utils.toArray<HTMLElement>(".edu-list-item");
      const slides = gsap.utils.toArray<HTMLElement>(".edu-slide");
      const fill = fillRef.current;
      if (!fill || listItems.length === 0) return;

      // Initial states
      gsap.set(fill, {
        scaleY: 1 / listItems.length,
        transformOrigin: "top left",
      });
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(listItems, { color: "rgba(0,70,160,0.35)" });

      // First item + slide active by default
      gsap.set(listItems[0], { color: "#4488ff" });
      gsap.set(slides[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=" + listItems.length * 50 + "%",
          pin: true,
          scrub: true,
        },
      });

      listItems.forEach((item, i) => {
        const prevItem = listItems[i - 1];
        if (prevItem) {
          tl.set(item, { color: "#4488ff" }, 0.5 * i)
            .to(slides[i], { autoAlpha: 1, duration: 0.2 }, "<")
            .set(prevItem, { color: "rgba(0,70,160,0.35)" }, "<")
            .to(slides[i - 1], { autoAlpha: 0, duration: 0.2 }, "<");
        }
      });

      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration(),
        },
        0,
      ).to({}, {}); // small pause before un-pin
    },
    { scope: pinRef },
  );

  return (
    <section id="education">
      {/* Pinned container */}
      <div
        ref={pinRef}
        className="relative overflow-hidden"
        style={{ height: "100vh", background: "#050510" }}
      >
        {/* PCB dot-grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,80,200,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Header */}
        <div className="absolute top-10 inset-x-0 text-center pointer-events-none">
          <p
            className="text-xs font-mono tracking-[0.25em] uppercase mb-2"
            style={{ color: "#4488ff" }}
          >
            Background
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Education
          </h2>
        </div>

        {/* Main content */}
        <div className="flex h-full items-center justify-center px-6 md:px-16 gap-10 md:gap-20 max-w-6xl mx-auto pt-24">
          {/* ── Left: fill bar + list ── */}
          <div className="flex gap-5 md:gap-8 items-start shrink-0">
            {/* Fill bar track + fill */}
            <div
              className="relative rounded-full overflow-hidden"
              style={{
                width: 2,
                height: CARDS.length * 72,
                background: "rgba(0,50,130,0.18)",
              }}
            >
              <div
                ref={fillRef}
                className="absolute top-0 inset-x-0 rounded-full"
                style={{
                  height: "100%",
                  background: "linear-gradient(to bottom, #4488ff, #0066ff)",
                  boxShadow: "0 0 8px rgba(0,120,255,0.5)",
                  transformOrigin: "top",
                }}
              />
            </div>

            {/* List */}
            <ul className="space-y-6">
              {CARDS.map((card) => (
                <li
                  key={card.id}
                  className="edu-list-item"
                  style={{
                    color: "rgba(0,70,160,0.35)",
                    transition: "color 0.15s",
                  }}
                >
                  <span
                    className="block text-xs font-mono mb-0.5"
                    style={{ opacity: 0.6, letterSpacing: "0.1em" }}
                  >
                    {card.index}
                  </span>
                  <span className="block font-semibold text-sm md:text-base leading-tight max-w-[180px]">
                    {card.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: slides ── */}
          <div
            className="relative flex-1"
            style={{ height: "58vh", maxHeight: 520 }}
          >
            {CARDS.map((card) => (
              <div
                key={card.id}
                className="edu-slide absolute inset-0"
                style={{ visibility: "hidden" }}
              >
                <div
                  className="h-full rounded-2xl p-7 md:p-10 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: "rgba(4, 10, 26, 0.9)",
                    border: `1px solid ${card.accent}44`,
                    backdropFilter: "blur(16px)",
                    boxShadow: `0 0 48px ${card.accent}12, inset 0 1px 0 ${card.accent}14`,
                  }}
                >
                  {/* Top shimmer */}
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${card.accent}88, transparent)`,
                    }}
                  />

                  {/* Corner accents */}
                  <div
                    className="absolute top-4 right-4 w-5 h-5"
                    style={{
                      borderTop: `1px solid ${card.accent}44`,
                      borderRight: `1px solid ${card.accent}44`,
                    }}
                  />
                  <div
                    className="absolute bottom-4 left-4 w-5 h-5"
                    style={{
                      borderBottom: `1px solid ${card.accent}28`,
                      borderLeft: `1px solid ${card.accent}28`,
                    }}
                  />

                  {/* Large background index */}
                  <span
                    className="absolute bottom-6 right-8 font-mono font-bold select-none pointer-events-none"
                    style={{
                      fontSize: 96,
                      lineHeight: 1,
                      color: `${card.accent}0d`,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {card.index}
                  </span>

                  {/* Top section */}
                  <div>
                    <span
                      className="inline-block text-xs font-mono tracking-[0.18em] px-2 py-1 rounded mb-5"
                      style={{
                        background: `${card.accent}14`,
                        border: `1px solid ${card.accent}30`,
                        color: card.accent,
                      }}
                    >
                      {card.label}
                    </span>

                    <h3
                      className="font-bold text-white mb-1"
                      style={{ fontSize: "clamp(18px, 2.4vw, 26px)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-sm mb-0.5"
                      style={{ color: card.accent }}
                    >
                      {card.institution}
                    </p>
                    <p
                      className="text-xs font-mono mb-5"
                      style={{ color: "rgba(0,80,160,0.5)" }}
                    >
                      {card.period} · {card.location}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#3a5270" }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded font-mono"
                        style={{
                          background: `${card.accent}10`,
                          border: `1px solid ${card.accent}28`,
                          color: `${card.accent}bb`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
