import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Star } from "lucide-react";
import { Movie } from "@/data/movies";

interface TrendingCarouselProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const TrendingCarousel = ({ movies, onMovieClick }: TrendingCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-accent" />
        <h2 className="font-display font-bold text-xl gradient-text">Trending Now</h2>
      </div>

      <div className="relative group">
        {/* Nav arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-1 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onMovieClick(movie)}
              className="flex-shrink-0 w-[280px] cursor-pointer group/card"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
                <img
                  src={movie.backdrop}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/500x280/1a1a2e/7c3aed?text=${encodeURIComponent(movie.title)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-semibold text-foreground text-sm truncate">{movie.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 star-filled fill-current" />
                    <span className="text-xs text-foreground">{movie.rating}</span>
                    <span className="text-xs text-muted-foreground">• {movie.year}</span>
                  </div>
                </div>
                {/* Rank badge */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
                  <span className="font-display text-xs font-bold text-primary-foreground">{i + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCarousel;
