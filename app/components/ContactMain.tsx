import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ContactMain({
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
  const email = "yildirim.cuneyt.it@gmail.com";
  const subject = "Inguiry about the your app";
  const body = "Hi Cuneyt,";

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
      className="min-h-screen w-full flex items-center justify-center md:justify-start p-2 md:p-4 relative"
    >
      <div
        ref={boxRef}
        className={`rounded-3xl p-1 shadow-2xl max-w-2xl w-full md:mr-12 mx-2`}
      >
        <div className="bg-transparent rounded-3xl p-4 md:p-8 lg:p-12 h-full border-2 shadow-2xl shadow-amber-100">
          <div className="text-5xl md:text-6xl lg:text-8xl mb-4 md:mb-6">📧</div>
          <h2 className={`text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4  bg-clip-text`}>
            Contact
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 md:mb-6 lg:mb-8 font-light">
            Let's Connect
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 lg:mb-10">
            Ready to bring your ideas to life. Get in touch and let's create
            something amazing together.
          </p>
          <div className="flex gap-2 md:gap-4">
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
              className={`text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full text-sm md:text-base font-semibold hover:scale-105 transition-transform shadow-lg`}
            >
              Send Email
            </a>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            Section {index + 1} of {length}
          </div>
        </div>
      </div>
    </div>
  );
}
