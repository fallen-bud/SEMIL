import React from "react";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { motion, Variants } from "framer-motion";

/* ======================
   Interface (Contract)
====================== */

interface CTAConfig {
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    to: string;
  };
  secondaryCta: {
    label: string;
    to: string;
  };
}

/* ======================
   Typed Data
====================== */

const ctaConfig: CTAConfig = {
  title: "Take Action. Help Bring Someone Home.",
  subtitle:
    "Reporting a missing person or a sighting takes only a minute — and it could change a life forever.",
  primaryCta: {
    label: "Report Missing Person",
    to: "/report-missing",
  },
  secondaryCta: {
    label: "I Found Someone",
    to: "/found-person",
  },
};

/* ======================
   Animations
====================== */


const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ✅ FIX
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // ✅ FIX
    },
  },
};


/* ======================
   Component
====================== */

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600 blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-gray-300 backdrop-blur"
        >
          <ShieldCheck size={16} className="text-green-400" />
          Secure • Responsible • Community-Driven
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
        >
          {ctaConfig.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-gray-400"
        >
          {ctaConfig.subtitle}
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => navigate(ctaConfig.primaryCta.to)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-indigo-700"
          >
            {ctaConfig.primaryCta.label}
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate(ctaConfig.secondaryCta.to)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white backdrop-blur transition hover:scale-105 hover:bg-white/10"
          >
            {ctaConfig.secondaryCta.label}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
