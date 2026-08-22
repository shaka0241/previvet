"use client";

import { useState } from "react";
import { speciesTabs } from "@/content/data";

export default function SpeciesTabs() {
  const [active, setActive] = useState(speciesTabs[0].id);
  const current = speciesTabs.find((t) => t.id === active) ?? speciesTabs[0];

  return (
    <div>
      <div className="flex justify-center gap-2 mb-8" role="tablist">
        {speciesTabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              active === tab.id
                ? "bg-primary text-white"
                : "bg-white text-primary border border-primary hover:bg-primary/10"
            }`}
          >
            {tab.label} — <span className="text-sm">{tab.subtitle}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {current.benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border-l-4 border-primary"
          >
            <h3 className="font-heading font-bold text-lg text-secondary">
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
