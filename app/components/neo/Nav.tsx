import { useState, useEffect } from "react";

const links = ["Home", "Projects", "Experience", "Contact"];

export default function Nav() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = links.map((l) => document.getElementById(l.toLowerCase()));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActive(links[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5, 5, 18, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0, 100, 255, 0.12)" : "none",
      }}
    >
      {/* Logo */}
      <button onClick={() => scrollTo("home")} className="group flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: "rgba(0, 80, 255, 0.2)",
            border: "1px solid rgba(0, 120, 255, 0.4)",
            boxShadow: "0 0 12px rgba(0, 80, 255, 0.3)",
          }}
        >
          <span className="text-xs font-bold" style={{ color: "#4488ff" }}>CY</span>
        </div>
        <span className="font-semibold text-white text-sm hidden sm:block tracking-wide">
          Cuneyt Yildirim
        </span>
      </button>

      {/* Links */}
      <div className="flex items-center gap-1">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link.toLowerCase())}
            className="relative px-4 py-2 text-sm font-mono transition-colors"
            style={{ color: active === link ? "#88aaff" : "#445577" }}
          >
            {active === link && (
              <span
                className="absolute inset-0 rounded-lg"
                style={{ background: "rgba(0, 80, 255, 0.1)", border: "1px solid rgba(0, 100, 255, 0.2)" }}
              />
            )}
            <span className="relative">{link}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
