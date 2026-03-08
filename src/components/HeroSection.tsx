import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6" style={{ background: "var(--gradient-bg)" }}>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Glass card */}
        <div className="glass-card glow-border rounded-2xl p-10 md:p-14 animate-float">
          {/* Tag */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-sm font-mono-code text-accent">Frontend Developer Student</span>
          </div>

          {/* Name */}
          <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl font-bold tracking-tight text-foreground glow-text leading-tight">
            Oulymata<br />
            <span className="text-accent">Ndiaye</span>
          </h1>

          {/* Description */}
          <p className="animate-fade-up-delay-2 mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Passionate about building beautiful and interactive web experiences. Currently learning{" "}
            <span className="text-accent font-medium">HTML</span>,{" "}
            <span className="text-accent font-medium">CSS</span> and{" "}
            <span className="text-accent font-medium">JavaScript</span>{" "}
            to create modern user interfaces.
          </p>

          {/* Button */}
          <div className="animate-fade-up-delay-3 mt-10">
            <a
              href="#projets"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(265_90%_65%/0.4)] active:scale-95"
            >
              Voir mes projets
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-fade-up-delay-4 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground font-mono-code tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 text-accent animate-bounce-arrow" />
      </div>
    </section>
  );
};

export default HeroSection;
