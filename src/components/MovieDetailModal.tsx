import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Star, Clock, Users, Play } from "lucide-react";
import { Movie, moodConfig } from "@/data/movies";

interface MovieDetailModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const MovieDetailModal = ({ movie, isOpen, onClose, isFavorite, onToggleFavorite }: MovieDetailModalProps) => {
  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-border"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 glass p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Backdrop image */}
            <div className="relative h-[250px] sm:h-[300px] overflow-hidden rounded-t-3xl">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/1920x800/1a1a2e/7c3aed?text=${encodeURIComponent(movie.title)}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative -mt-20 px-6 sm:px-8 pb-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0 -mt-12 sm:-mt-24">
                  <div className="w-32 sm:w-44 rounded-2xl overflow-hidden neon-border shadow-2xl">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/500x750/1a1a2e/7c3aed?text=${encodeURIComponent(movie.title)}`;
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4 pt-2">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                    {movie.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                      {movie.genre}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 star-filled fill-current" />
                      <span className="text-sm font-semibold text-foreground">{movie.rating}/10</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{movie.year}</span>
                    </div>
                  </div>

                  {/* Mood badges */}
                  <div className="flex flex-wrap gap-2">
                    {movie.moods.map((mood) => (
                      <span
                        key={mood}
                        className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${moodConfig[mood].color} text-primary-foreground font-medium`}
                      >
                        {moodConfig[mood].emoji} {moodConfig[mood].label}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">{movie.synopsis}</p>

                  {/* Cast */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">Cast</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {movie.actors.map((actor) => (
                        <span key={actor} className="glass px-3 py-1.5 rounded-lg text-xs text-foreground">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => onToggleFavorite(movie.id)}
                      className={`inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all ${
                        isFavorite
                          ? "bg-pink-600 text-primary-foreground"
                          : "glass text-foreground hover:bg-secondary"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                      {isFavorite ? "Favori" : "Ajouter"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Trailer */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">Bande-annonce</h3>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video glass-card">
                  <iframe
                    src={movie.trailerUrl}
                    title={`${movie.title} trailer`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieDetailModal;
