import { useState } from "react";

const socials = [
  {
    label: "GitHub",
    handle: "June8Yildirim",
    href: "https://github.com/June8Yildirim",
    icon: "⌥",
  },
  {
    label: "Email",
    handle: "yildirim.cuneyt.it@gmail.com",
    href: "mailto:yildirim.cuneyt.it@gmail.com",
    icon: "✉",
  },
  {
    label: "LinkedIn",
    handle: "https://www.linkedin.com/in/conrad-yildirim-42318ab3/",
    href: "https://www.linkedin.com/in/conrad-yildirim-42318ab3/",
    icon: "✉",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-mono tracking-[0.25em] uppercase mb-3"
            style={{ color: "#4488ff" }}
          >
            Get in touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact
          </h2>
          <p className="text-sm" style={{ color: "#445566" }}>
            Open to opportunities, collaborations, and interesting projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Socials */}
          <div className="space-y-4">
            <p
              className="text-xs font-mono tracking-widest uppercase mb-6"
              style={{ color: "#4488ff" }}
            >
              Find me at
            </p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                style={{
                  background: "rgba(5, 10, 28, 0.6)",
                  border: "1px solid rgba(0, 80, 200, 0.18)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(0,100,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(0,80,200,0.18)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: "rgba(0,50,150,0.25)",
                    border: "1px solid rgba(0,100,255,0.2)",
                  }}
                >
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono" style={{ color: "#4488ff" }}>
                    {s.label}
                  </p>
                  <p className="text-sm text-white truncate">{s.handle}</p>
                </div>
                <span
                  className="ml-auto text-xs transition-transform group-hover:translate-x-1"
                  style={{ color: "#334466" }}
                >
                  →
                </span>
              </a>
            ))}
          </div>

          {/* Form */}
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label
                    className="block text-xs font-mono mb-1.5 uppercase tracking-widest"
                    style={{ color: "#334466" }}
                  >
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    required
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{
                      background: "rgba(5, 10, 28, 0.6)",
                      border: "1px solid rgba(0, 80, 200, 0.22)",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "rgba(0,100,255,0.5)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "rgba(0,80,200,0.22)";
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  className="block text-xs font-mono mb-1.5 uppercase tracking-widest"
                  style={{ color: "#334466" }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all resize-none"
                  style={{
                    background: "rgba(5, 10, 28, 0.6)",
                    border: "1px solid rgba(0, 80, 200, 0.22)",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor =
                      "rgba(0,100,255,0.5)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor =
                      "rgba(0,80,200,0.22)";
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #0055dd, #0088ff)",
                  boxShadow: "0 0 24px rgba(0,100,255,0.3)",
                }}
              >
                Send Message →
              </button>
            </form>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-full rounded-xl py-16"
              style={{ border: "1px solid rgba(0,100,255,0.2)" }}
            >
              <div className="text-4xl mb-4">✓</div>
              <p className="font-semibold text-white mb-1">Message sent!</p>
              <p className="text-xs font-mono" style={{ color: "#334466" }}>
                I'll get back to you soon.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(0,80,200,0.1)" }}
        >
          <p className="text-xs font-mono" style={{ color: "#223355" }}>
            © 2025 Cuneyt Yildirim
          </p>
          <p className="text-xs font-mono" style={{ color: "#223355" }}>
            Built with React · Three.js · Tailwind
          </p>
        </div>
      </div>
    </section>
  );
}
