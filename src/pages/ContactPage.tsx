import { useState } from "react";
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a suggestion or feedback? We'd love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 sm:p-10 space-y-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="w-4 h-4 text-primary" />
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Email */}
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
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Message */}
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
              placeholder="Your message…"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="neon-glow-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-7 py-3.5 rounded-xl"
          >
            {submitted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
