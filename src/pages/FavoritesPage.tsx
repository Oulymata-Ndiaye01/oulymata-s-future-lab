import { Heart } from "lucide-react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import { useFavorites } from "@/hooks/useFavorites";

const FavoritesPage = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favMovies = movies.filter((m) => favorites.includes(m.id));

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-10">
          <Heart className="w-7 h-7 text-pink-500" />
          <h1 className="font-display font-bold text-3xl sm:text-4xl gradient-text-pink">
            My Favorites
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">No favorites yet.</p>
            <p className="text-muted-foreground text-sm mt-2">
              Click the heart icon on any movie to save it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
