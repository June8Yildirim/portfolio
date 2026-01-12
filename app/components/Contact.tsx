import { useScrollAnimation } from "~/useScrollAnimation";

export default function ContactMain({
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
  const sectionRef = useScrollAnimation({ index, length, mounted });
  return (
    <div
      key={index}
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-start p-2 relative"
    >
      <div className={` rounded-3xl p-1 shadow-2xl max-w-2xl w-full mr-12`}>
        <div className="bg-transparent rounded-3xl p-12 h-full border-2 shadow-2xl shadow-amber-100">
          <div className="text-8xl mb-6">📧</div>
          <h2 className={`text-6xl font-bold text-white mb-4  bg-clip-text`}>
            Contact
          </h2>
          <h3 className="text-3xl text-gray-300 mb-8 font-light">
            Let's Connect
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Ready to bring your ideas to life. Get in touch and let's create
            something amazing together.
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
