import { motion } from "framer-motion";
import { Mood, moodConfig } from "@/data/movies";

interface MoodFilterProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood | null) => void;
}

const MoodFilter = ({ selectedMood, onSelect }: MoodFilterProps) => {
  const moods = Object.entries(moodConfig) as [Mood, typeof moodConfig[Mood]][];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* All button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
          selectedMood === null
            ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(270,100%,65%,0.4)]"
            : "glass text-muted-foreground hover:text-foreground"
        }`}
      >
        ✨ Tous
      </motion.button>

      {moods.map(([key, { emoji, label, color }]) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(selectedMood === key ? null : key)}
          className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
            selectedMood === key
              ? `bg-gradient-to-r ${color} text-primary-foreground shadow-lg`
              : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          {emoji} {label}
        </motion.button>
      ))}
    </div>
  );
};

export default MoodFilter;
