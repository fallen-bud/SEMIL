import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-28 text-center text-white">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Community-powered missing person platform
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
          Help Reunite Families
          <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Faster & Smarter
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
          A centralized platform where families and the public work together
          to report missing persons, share sightings, and find matches using
          modern technology.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            className="rounded-xl bg-white px-8 py-3 text-base font-semibold text-indigo-700 shadow-lg transition hover:scale-105 hover:bg-gray-100"
          >
            Report Missing Person
          </button>

          <button
            className="rounded-xl border border-white/40 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
          >
            I Found Someone
          </button>
        </div>

        {/* Trust text */}
        <p className="mt-8 text-sm text-white/70">
          Every small action can help bring someone back home.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
