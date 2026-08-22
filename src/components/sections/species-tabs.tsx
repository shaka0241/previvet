"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { speciesTabs } from "@/content/data";

export default function SpeciesTabs() {
  const [active, setActive] = useState(speciesTabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = speciesTabs.length;
    let next = -1;
    switch (e.key) {
      case "ArrowRight":
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
        next = (index - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActive(speciesTabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist">
        {speciesTabs.map((tab, i) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`inline-flex min-h-[44px] items-center justify-center rounded-full border px-5 py-2 transition-colors ${
                isActive
                  ? "bg-primary border-transparent text-white"
                  : "border-primary text-primary hover:bg-primary/10 bg-white"
              }`}
            >
              <span className="flex flex-col items-baseline gap-0.5 sm:flex-row sm:gap-1.5">
                {tab.label}{" "}
                <span className="text-sm opacity-80">{tab.subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>

      {speciesTabs.map((tab) => {
        const isVisible = active === tab.id;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={!isVisible}
          >
            <div
              key={isVisible ? "visible" : "hidden"}
              className="animate-fade-up mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
            >
              {tab.benefits.map((benefit) => (
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
      })}
    </div>
  );
}
