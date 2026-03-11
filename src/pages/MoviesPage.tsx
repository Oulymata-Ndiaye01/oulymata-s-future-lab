import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shuffle, SlidersHorizontal } from "lucide-react";
import { movies, genres, Mood, Movie } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import MoodFilter from "@/components/MoodFilter";
import MovieDetailModal from "@/components/MovieDetailModal";
import { useFavorites } from "@/hooks/useFavorites";

const MoviesPage = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [randomKey, setRandomKey] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filtered = useMemo(() => {
    let result = movies;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q) ||
          m.actors.some((a) => a.toLowerCase().includes(q))
      );
    }
    if (selectedGenre !== "All") {
      result = result.filter((m) => m.genre === selectedGenre);
    }
    if (selectedMood) {
      result = result.filter((m) => m.moods.includes(selectedMood));
    }
    return result;
  }, [search, selectedGenre, selectedMood]);

  const shuffled = useMemo(() => {
    void randomKey;
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [filtered, randomKey]);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-8">
          Explorer
        </h1>

        {/* Mood filter */}
        <div className="mb-8">
          <MoodFilter selectedMood={selectedMood} onSelect={setSelectedMood} />
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher films, genres, acteurs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="pl-11 pr-8 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="All">Tous les genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setRandomKey((k) => k + 1)}
            className="neon-glow-btn inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-xl"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {shuffled.length} film{shuffled.length !== 1 ? "s" : ""} trouvé{shuffled.length !== 1 ? "s" : ""}
        </p>

        <AnimatePresence mode="popLayout">
          {shuffled.length > 0 ? (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {shuffled.map((m) => (
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-muted-foreground text-lg">Aucun film trouvé.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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

export default MoviesPage;
