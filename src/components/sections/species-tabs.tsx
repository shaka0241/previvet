"use client";

import { useState } from "react";
import { speciesTabs } from "@/content/data";

export default function SpeciesTabs() {
  const [active, setActive] = useState(speciesTabs[0].id);
  const current = speciesTabs.find((t) => t.id === active) ?? speciesTabs[0];

  return (
    <div>
      <div className="mb-8 flex justify-center gap-2" role="tablist">
        {speciesTabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full px-4 py-2 transition-colors ${
              active === tab.id
                ? "bg-primary text-white"
                : "text-primary border-primary hover:bg-primary/10 border bg-white"
            }`}
          >
            {tab.label} — <span className="text-sm">{tab.subtitle}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        {current.benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="border-primary flex flex-col gap-2 rounded-xl border-l-4 bg-white p-6 shadow-md"
          >
            <h3 className="font-heading text-secondary text-lg font-bold">
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
