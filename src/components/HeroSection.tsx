const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-[var(--spacing-section)]">
      <div className="w-full max-w-4xl mx-auto items-center">

        {/* Left — Text content */}
        <div className="space-y-[var(--spacing-element)]">
          {/* Tag */}
          <p className="animate-fade-in-up text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Étudiante Développeuse Frontend
          </p>

          {/* Name — large editorial type */}
          <h1 className="animate-fade-in-up-d1 font-display font-black text-foreground leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}>
            Oulymata<br />Ndiaye
          </h1>

          {/* Description */}
          <p className="animate-fade-in-up-d2 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed" style={{ marginTop: "var(--spacing-text)" }}>
            Passionnée par la création d'expériences web belles et interactives.
            J'apprends actuellement{" "}
            <span className="font-semibold text-foreground">HTML</span>,{" "}
            <span className="font-semibold text-foreground">CSS</span> et{" "}
            <span className="font-semibold text-foreground">JavaScript</span>{" "}
            pour concevoir des interfaces modernes.
          </p>

          {/* Button */}
          <div className="animate-fade-in-up-d3">
            <a
              href="#projets"
              className="inline-block mt-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_hsl(var(--accent)/0.35)] cursor-pointer"
            >
              Voir mes projets
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
