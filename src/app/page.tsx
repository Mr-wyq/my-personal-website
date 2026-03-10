import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Others from "@/components/Others";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      
      {/* Background radial gradient for depth */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--color-card-border),_transparent_40%)] pointer-events-none opacity-40"></div>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-card-border),_transparent_40%)] pointer-events-none opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-8 pb-32">
        <Hero />
        <Philosophy />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Others />
      </div>

      <footer className="text-center py-12 text-gray-500 font-mono text-xs border-t border-white/5 bg-[#030303] relative z-20">
        <p className="tracking-widest uppercase mb-2">Architecting Intelligence // Empowering Impact</p>
        <p className="text-[var(--accent-cyan)]/50 tracking-tighter">© {new Date().getFullYear()} RICH. EXECUTED WITH PRECISION.</p>
      </footer>
    </main>
  );
}
