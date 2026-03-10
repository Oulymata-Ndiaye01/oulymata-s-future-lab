import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, Clock, Users } from "lucide-react";
import { movies } from "@/data/movies";
import { useFavorites } from "@/hooks/useFavorites";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!movie) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl gradient-text mb-4">Movie Not Found</h1>
          <Link to="/movies" className="text-primary hover:underline">
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  const fav = isFavorite(movie.id);

  return (
    <div className="min-h-screen pt-16">
      {/* Backdrop */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

        {/* Back button */}
        <Link
          to="/movies"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="w-56 sm:w-64 rounded-2xl overflow-hidden neon-border animate-pulse-glow">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
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
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-2">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Actors */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Cast</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.actors.map((actor) => (
                  <span
                    key={actor}
                    className="glass px-4 py-2 rounded-lg text-sm text-foreground"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`neon-glow-btn inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-xl transition-all ${
                fav
                  ? "bg-pink-600 text-primary-foreground"
                  : "bg-secondary text-foreground border border-border"
              }`}
            >
              <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
              {fav ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>

        {/* Trailer */}
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl gradient-text mb-6">Trailer</h2>
          <div className="glass-card overflow-hidden rounded-2xl aspect-video">
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
    </div>
  );
};

export default MovieDetailsPage;
