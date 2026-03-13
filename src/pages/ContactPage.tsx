import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, User, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
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
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Nous <span className="gradient-text">contacter</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Une question ou une suggestion ? Écrivez-nous, nous serons ravies de vous répondre.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 sm:p-10 space-y-6"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="w-4 h-4 text-primary" />
              Nom
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Votre nom"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="w-4 h-4 text-primary" />
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MessageSquare className="w-4 h-4 text-primary" />
              Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Votre message…"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn-glow w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            {submitted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Message envoyé !
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;
