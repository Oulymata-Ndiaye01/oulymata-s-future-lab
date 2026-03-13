import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Calendar, SmilePlus, BookHeart, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Suivi du Cycle",
    description: "Calculez vos prochaines règles, votre ovulation et votre période de fertilité.",
    link: "/cycle",
  },
  {
    icon: SmilePlus,
    title: "Journal d'Humeur",
    description: "Exprimez comment vous vous sentez et partagez avec la communauté.",
    link: "/mood",
  },
  {
    icon: BookHeart,
    title: "Conseils Santé",
    description: "Des conseils experts sur la nutrition, le bien-être et la santé féminine.",
    link: "/tips",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative hero-gradient overflow-hidden py-20 sm:py-32">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full bg-accent/10 blur-[80px] animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-widest uppercase">
                Votre bien-être au quotidien
              </span>
            </div>

            <h1
              className="font-display font-bold text-foreground leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Comprenez votre cycle,{" "}
              <span className="gradient-text">prenez soin de vous</span>
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed mb-10">
              FlowCare vous aide à suivre votre cycle menstruel, comprendre votre corps 
              et exprimer votre humeur au quotidien. Simple, élégant et bienveillant.
            </p>

            <Link
              to="/cycle"
              className="btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full text-base"
            >
              <Heart className="w-5 h-5" />
              Suivre mon cycle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
            Tout ce dont vous avez <span className="gradient-text">besoin</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Des outils pensés pour vous accompagner au quotidien.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={f.link} className="block glass-card p-8 text-center group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4">
            Prête à mieux vous <span className="gradient-text">connaître</span> ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Rejoignez des milliers de femmes qui utilisent FlowCare pour mieux comprendre leur corps.
          </p>
          <Link
            to="/cycle"
            className="btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full"
          >
            Commencer maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold gradient-text">FlowCare</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 FlowCare. Fait avec ❤️ pour les femmes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
