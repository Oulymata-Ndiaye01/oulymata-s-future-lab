import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { movies, Mood } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import MoodFilter from "@/components/MoodFilter";
import TrendingCarousel from "@/components/TrendingCarousel";
import MovieDetailModal from "@/components/MovieDetailModal";
import { useFavorites } from "@/hooks/useFavorites";
import { Movie } from "@/data/movies";

const HomePage = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const trending = useMemo(() => {
    return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, []);

  const filtered = useMemo(() => {
    let result = movies;
    if (selectedMood) {
      result = result.filter((m) => m.moods.includes(selectedMood));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q) ||
          m.actors.some((a) => a.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedMood, search]);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative hero-gradient overflow-hidden py-16 sm:py-24">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-accent/10 blur-[80px] animate-float" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-widest uppercase font-display">
                Quel est ton mood ?
              </span>
            </div>
            <h1
              className="font-display font-black text-foreground leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              <span className="gradient-text">CINE</span>MOOD
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Choisis ton humeur, découvre ton film. Une expérience cinéma personnalisée et immersive.
            </p>
          </motion.div>

          {/* Floating search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un film, genre, acteur…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-13 pr-5 py-4 rounded-2xl glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </motion.div>

          {/* Mood filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MoodFilter selectedMood={selectedMood} onSelect={setSelectedMood} />
          </motion.div>
        </div>
      </section>

      {/* Trending carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TrendingCarousel movies={trending} onMovieClick={handleMovieClick} />
      </section>

      {/* Movie grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-xl gradient-text">
            {selectedMood ? `Mood : ${selectedMood}` : "Tous les films"}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} film{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            >
              {filtered.map((m) => (
                <MovieCard
                  key={m.id}
                  movie={m}
                  isFavorite={isFavorite(m.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => handleMovieClick(m)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">Aucun film trouvé.</p>
              <p className="text-muted-foreground text-sm mt-2">Essaie un autre mood ou mot-clé.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Movie detail modal */}
      <MovieDetailModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isFavorite={selectedMovie ? isFavorite(selectedMovie.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default HomePage;
