import { useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { movies, Movie } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import MovieDetailModal from "@/components/MovieDetailModal";
import { useFavorites } from "@/hooks/useFavorites";

const FavoritesPage = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favMovies = movies.filter((m) => favorites.includes(m.id));
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-10">
          <Heart className="w-7 h-7 text-pink-500" />
          <h1 className="font-display font-bold text-3xl sm:text-4xl gradient-text-pink">
            Mes Favoris
          </h1>
        </div>

        {favMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {favMovies.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                isFavorite={isFavorite(m.id)}
                onToggleFavorite={toggleFavorite}
                onClick={() => handleMovieClick(m)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">Pas encore de favoris.</p>
            <p className="text-muted-foreground text-sm mt-2">
              Clique sur le cœur d'un film pour le sauvegarder ici.
            </p>
          </div>
        )}
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

export default FavoritesPage;
