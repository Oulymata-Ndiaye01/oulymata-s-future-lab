import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";

interface MoodPost {
  id: number;
  mood: string;
  emoji: string;
  message: string;
  time: string;
}

const moods = [
  { emoji: "😊", label: "Heureuse" },
  { emoji: "😔", label: "Triste" },
  { emoji: "😡", label: "En colère" },
  { emoji: "😴", label: "Fatiguée" },
  { emoji: "😰", label: "Stressée" },
  { emoji: "🥰", label: "Amoureuse" },
];

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<MoodPost[]>([
    { id: 0, mood: "Heureuse", emoji: "😊", message: "Belle journée aujourd'hui, je me sens pleine d'énergie ! 🌸", time: "Il y a 2h" },
    { id: 1, mood: "Fatiguée", emoji: "😴", message: "Journée difficile, vivement le week-end...", time: "Il y a 5h" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood || !message.trim()) return;

    const newPost: MoodPost = {
      id: Date.now(),
      mood: selectedMood.label,
      emoji: selectedMood.emoji,
      message: message.trim(),
      time: "À l'instant",
    };

    setPosts([newPost, ...posts]);
    setMessage("");
    setSelectedMood(null);
  };

  return (
    <div className="min-h-screen pt-16 hero-gradient">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Comment vous <span className="gradient-text">sentez-vous</span> ?
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Partagez votre humeur et lisez ce que ressentent les autres.
          </p>
        </motion.div>

        {/* Mood selector */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 mb-10 space-y-6"
        >
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Choisissez votre humeur :</p>
            <div className="flex flex-wrap gap-3">
              {moods.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSelectedMood(m)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${
                    selectedMood?.label === m.label
                      ? "bg-primary/15 border-primary text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Comment vous sentez-vous aujourd'hui ?"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />

          <button
            type="submit"
            disabled={!selectedMood || !message.trim()}
            className="btn-glow w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Partager
          </button>
        </motion.form>

        {/* Posts feed */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-lg text-foreground">
            Publications récentes
          </h2>
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{post.emoji}</span>
                  <div>
                    <span className="text-sm font-semibold text-foreground">{post.mood}</span>
                    <span className="text-xs text-muted-foreground ml-2">· {post.time}</span>
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{post.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MoodPage;
