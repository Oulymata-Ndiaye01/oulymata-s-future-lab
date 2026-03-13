import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Droplets, Egg, Heart, Calculator } from "lucide-react";

interface CycleResult {
  nextPeriod: Date;
  ovulation: Date;
  fertileStart: Date;
  fertileEnd: Date;
}

const CycleCalculatorPage = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<CycleResult | null>(null);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lastPeriod) return;

    const start = new Date(lastPeriod);
    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycleLength);

    const ovulation = new Date(start);
    ovulation.setDate(start.getDate() + cycleLength - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(ovulation.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(ovulation.getDate() + 1);

    setResult({ nextPeriod, ovulation, fertileStart, fertileEnd });
  };

  const resultCards = result
    ? [
        {
          icon: Droplets,
          label: "Prochaines règles",
          value: formatDate(result.nextPeriod),
          color: "text-primary",
          bg: "bg-primary/10",
        },
        {
          icon: Egg,
          label: "Jour d'ovulation",
          value: formatDate(result.ovulation),
          color: "text-accent",
          bg: "bg-accent/10",
        },
        {
          icon: Heart,
          label: "Période de fertilité",
          value: `${formatDate(result.fertileStart)} — ${formatDate(result.fertileEnd)}`,
          color: "text-primary",
          bg: "bg-secondary",
        },
      ]
    : [];

  return (
    <div className="min-h-screen pt-16 hero-gradient">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Calculateur de <span className="gradient-text">Cycle</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Entrez vos informations pour connaître vos prochaines dates importantes.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleCalculate}
          className="glass-card p-8 sm:p-10 space-y-6 mb-10"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              Premier jour des dernières règles
            </label>
            <input
              type="date"
              required
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Droplets className="w-4 h-4 text-primary" />
              Durée moyenne du cycle (jours)
            </label>
            <input
              type="number"
              min={20}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <button
            type="submit"
            className="btn-glow w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Calculer
          </button>
        </motion.form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <h2 className="font-display font-bold text-xl text-foreground text-center mb-6">
                Vos <span className="gradient-text">résultats</span>
              </h2>
              {resultCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex items-start gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
                    <p className="text-foreground font-semibold mt-1 capitalize">{card.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CycleCalculatorPage;
