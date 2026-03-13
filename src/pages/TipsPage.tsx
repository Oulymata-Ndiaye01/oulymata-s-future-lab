import { motion } from "framer-motion";
import { Heart, Droplets, Apple, Brain, Moon, Dumbbell, Flower2, Sparkles } from "lucide-react";

const tips = [
  {
    icon: Droplets,
    title: "Comprendre votre cycle",
    content: "Le cycle menstruel dure en moyenne 28 jours. Il comporte 4 phases : menstruelle, folliculaire, ovulatoire et lutéale. Connaître ces phases vous aide à mieux anticiper vos besoins.",
  },
  {
    icon: Heart,
    title: "Réduire les douleurs menstruelles",
    content: "Appliquez une bouillotte chaude sur le bas-ventre, pratiquez des étirements doux, et restez hydratée. Les infusions de camomille et de gingembre sont aussi très efficaces.",
  },
  {
    icon: Apple,
    title: "Nutrition pendant le cycle",
    content: "Privilégiez les aliments riches en fer (épinards, lentilles), en magnésium (chocolat noir, amandes) et en oméga-3 (poisson, noix). Évitez le sel excessif et la caféine.",
  },
  {
    icon: Brain,
    title: "Bien-être mental",
    content: "Les fluctuations hormonales peuvent affecter votre humeur. Pratiquez la méditation, tenez un journal, et n'hésitez pas à en parler. Prendre soin de soi n'est pas un luxe.",
  },
  {
    icon: Moon,
    title: "Sommeil et récupération",
    content: "Pendant vos règles, votre corps a besoin de plus de repos. Couchez-vous tôt, évitez les écrans avant de dormir, et créez un rituel apaisant le soir.",
  },
  {
    icon: Dumbbell,
    title: "Sport et cycle",
    content: "Adaptez votre activité physique à votre cycle : yoga et marche pendant les règles, intensité plus élevée en phase folliculaire, modération en phase lutéale.",
  },
  {
    icon: Flower2,
    title: "Produits naturels",
    content: "Explorez les alternatives naturelles : cups menstruelles, serviettes lavables, culottes menstruelles. Plus écologiques et souvent plus confortables.",
  },
  {
    icon: Sparkles,
    title: "Self-care rituel",
    content: "Créez votre rituel bien-être : bain chaud, masque visage, lecture, musique douce. Accordez-vous du temps sans culpabilité, surtout pendant les jours difficiles.",
  },
];

const TipsPage = () => {
  return (
    <div className="min-h-screen pt-16 hero-gradient">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Conseils <span className="gradient-text">Bien-être</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Des conseils pratiques pour prendre soin de vous tout au long de votre cycle.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-7"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <tip.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tip.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipsPage;
