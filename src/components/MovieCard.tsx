import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
  return (
    <div className="glass-card group relative overflow-hidden">
      {/* Poster */}
      <div className="poster-zoom relative aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/500x750/1a1a2e/7c3aed?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
          <Link
            to={`/movie/${movie.id}`}
            className="neon-glow-btn bg-primary text-primary-foreground text-sm font-semibold py-2.5 px-5 rounded-lg text-center"
          >
            View Details
          </Link>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(movie.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full glass transition-all duration-300 hover:scale-110 z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "fill-pink-500 text-pink-500" : "text-foreground"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">
            {movie.genre}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 star-filled fill-current" />
            <span className="text-xs font-medium text-foreground">{movie.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
