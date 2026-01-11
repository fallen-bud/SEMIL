import React from "react";
import { ShieldCheck, Users, Zap, Globe } from "lucide-react";
import { LucideIcon } from "lucide-react";

/* ======================
   Interface (Contract)
====================== */

interface WhyPlatformFeature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

/* ======================
   Typed Data
====================== */

const features: WhyPlatformFeature[] = [
  {
    id: 1,
    title: "Centralized & Reliable",
    description:
      "All missing and found reports are stored in one secure, organized platform instead of scattered posts.",
    icon: Globe,
  },
  {
    id: 2,
    title: "Community-Powered",
    description:
      "Anyone can help by reporting sightings, making the search faster and more effective.",
    icon: Users,
  },
  {
    id: 3,
    title: "Technology-Assisted",
    description:
      "Face comparison and smart matching help identify possible connections quickly.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Privacy & Safety First",
    description:
      "Sensitive data is handled carefully with authentication and secure access.",
    icon: ShieldCheck,
  },
];

/* ======================
   Component
====================== */

const WhyPlatformSection: React.FC = () => {
  return (
    <section className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Why This Platform?
          </h2>
          <p className="mt-4 text-gray-400">
            Designed to be simple, powerful, and impactful for real-world use.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-indigo-500/40 hover:bg-white/10"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
                  <Icon size={28} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPlatformSection;
