import { Link } from "react-router-dom";
import { Play, Sparkles, TrendingUp } from "lucide-react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import { useFavorites } from "@/hooks/useFavorites";

const HomePage = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const featured = movies.slice(0, 3);
  const trending = movies.slice(3, 9);

  /* Pick a random movie for the hero */
  const hero = movies[0];

  return (
    <div className="min-h-screen pt-16">
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${hero.backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            <div className="animate-fade-in-up flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-widest uppercase font-display">
                Featured
              </span>
            </div>

            <h1
              className="animate-fade-in-up-d1 font-display font-black text-foreground leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              <span className="gradient-text">NEON</span>FLIX
            </h1>

            <p className="animate-fade-in-up-d2 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Dive into a futuristic cinema experience. Explore blockbusters, hidden gems, and
              timeless classics — all in one stunning platform.
            </p>

            <div className="animate-fade-in-up-d3 flex flex-wrap gap-4">
              <Link
                to="/movies"
                className="neon-glow-btn inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-7 py-3.5 rounded-xl"
              >
                <Play className="w-4 h-4" />
                Browse Movies
              </Link>
              <Link
                to={`/movie/${hero.id}`}
                className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-sm px-7 py-3.5 rounded-xl transition-all hover:bg-secondary"
              >
                Watch {hero.title}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-accent/10 blur-[80px] animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* ── Featured Movies ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="font-display font-bold text-2xl gradient-text">Featured</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              isFavorite={isFavorite(m.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* ── Trending ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp className="w-6 h-6 text-accent" />
          <h2 className="font-display font-bold text-2xl neon-text-cyan" style={{ WebkitTextFillColor: "unset", color: "hsl(var(--accent))" }}>
            Trending Now
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trending.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              isFavorite={isFavorite(m.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
