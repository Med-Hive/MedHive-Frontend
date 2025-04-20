// src/app/model-hub/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { ArrowRight, Brain, Heart, Image, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";

function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function ModelHub() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = useMemo(
    () => [
      { id: "all", name: "All Models" },
      { id: "diagnostic", name: "Diagnostic" },
      { id: "imaging", name: "Medical Imaging" },
      { id: "nlp", name: "NLP & Analysis" },
      { id: "predictive", name: "Predictive" },
    ],
    []
  );

  const models = useMemo(
    () => [
      {
        id: "symptom-analysis",
        title: "LLM Symptom Analysis",
        description:
          "An advanced language model that analyzes patient-reported symptoms using a Retrieval Augmented Generation (RAG) approach to provide preliminary diagnostics and recommendations.",
        image: "/feature1.jpg",
        category: "nlp",
        icon: <Brain className="h-6 w-6 text-cyan-400" />,
        accuracy: "89%",
        contributors: 32,
        lastUpdated: "2 days ago",
      },
      {
        id: "ecg-analysis",
        title: "ECG Curve Analysis",
        description:
          "Detects abnormalities in heart rhythm from ECG readouts, identifying patterns associated with arrhythmias, myocardial infarction, and other cardiac conditions.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "diagnostic",
        icon: <Heart className="h-6 w-6 text-pink-400" />,
        accuracy: "94%",
        contributors: 28,
        lastUpdated: "1 week ago",
      },
      {
        id: "pneumonia-xray",
        title: "Pneumonia X‑Ray Detection",
        description:
          "Analyzes chest X‑ray images to detect pneumonia with high sensitivity and specificity, differentiating between bacterial and viral causes.",
        image:
          "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "imaging",
        icon: <Image className="h-6 w-6 text-green-400" />,
        accuracy: "92%",
        contributors: 45,
        lastUpdated: "3 days ago",
      },
      {
        id: "breast-cancer",
        title: "Breast Cancer Detection",
        description:
          "Analyzes mammography images to detect early signs of breast cancer, identifying suspicious masses and calcifications.",
        image:
          "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "imaging",
        icon: <Microscope className="h-6 w-6 text-purple-400" />,
        accuracy: "91%",
        contributors: 37,
        lastUpdated: "5 days ago",
      },
      {
        id: "glaucoma-fundus",
        title: "Glaucoma FUNDUS Analysis",
        description:
          "Detects signs of glaucoma from retinal fundus images by analyzing optic disc changes and identifying neural damage patterns.",
        image:
          "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "imaging",
        icon: <Image className="h-6 w-6 text-green-400" />,
        accuracy: "88%",
        contributors: 23,
        lastUpdated: "1 week ago",
      },
      {
        id: "health-predictor",
        title: "Health Outcome Predictor",
        description:
          "Predicts potential health outcomes based on patient history, demographic data, and lifestyle factors using advanced machine learning algorithms.",
        image:
          "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "predictive",
        icon: <Brain className="h-6 w-6 text-cyan-400" />,
        accuracy: "85%",
        contributors: 19,
        lastUpdated: "2 weeks ago",
      },
    ],
    []
  );

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const q = debouncedSearch.toLowerCase();
      const matchesSearch =
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "all" || m.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [models, debouncedSearch, activeCategory]);

  const comingSoonModels = [
    "ecg-analysis",
    "glaucoma-fundus",
    "health-predictor",
  ];

  return (
    <main
      className={`min-h-screen ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <Navbar />
      <Toaster
        position="top-center"
        expand={false}
        theme="dark"
        toastOptions={{
          classNames: {
            toast:
              "!bg-[linear-gradient(152deg,#0F172A_45%,#1E293B)] !border-[0.5px] !border-cyan-300/20 !rounded-lg !shadow-[0_0_30px_rgba(34,211,238,0.3)] !font-['Poppins']",
            title: "!text-cyan-200 !font-semibold !text-lg",
            description: "!text-cyan-100 !text-sm",
          },
        }}
      />

      {/* Hero Section */}
      <section className="pt-10 pb-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-['Poppins'] mb-4 animate-fade-up">
            MedHive Model Hub
          </span>
          <h1
            className="text-4xl md:text-7xl font-['Kagitingan'] text-white mb-6 animate-fade-up leading-tight"
            style={{ animationDelay: "100ms" }}
          >
            Discover Our <br />
            <span className="text-cyan-400">Healthcare AI Models</span>
          </h1>
          <p
            className="text-lg text-gray-300 font-['Poppins'] mb-10 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Explore our collection of federated learning models trained across
            hospital networks while preserving patient privacy.
          </p>
          <div
            className="relative max-w-xl mx-auto animate-fade-up font-['Poppins']"
            style={{ animationDelay: "700ms" }}
          >
            <PlaceholdersAndVanishInput
              placeholders={[
                "Search our AI models…",
                "Try “ECG Curve Analysis”",
                "Or “Glaucoma FUNDUS”",
              ]}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={() => {
                if (searchQuery.trim()) {
                } else {
                  setSearchQuery("");
                  setActiveCategory("all");
                }
              }}
              className="mb-2"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-0">
        <div
          className="container mx-auto px-4 flex flex-wrap justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === cat.id
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                  : "border border-cyan-600 text-cyan-400 hover:bg-cyan-600/20"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModels.map((m, i) => {
                const isComingSoon = comingSoonModels.includes(m.id);

                return isComingSoon ? (
                  <div
                    key={m.id}
                    onClick={() =>
                      toast("Coming soon!", {
                        description: "This model is currently in development",
                        position: "top-center",
                      })
                    }
                    className="group relative block overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_10px_30px_rgba(0,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(0,255,255,0.5)] transition-shadow duration-500 animate-fade-up cursor-pointer"
                    style={{ animationDelay: `${i * 100}ms` }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-black/30 rounded-full backdrop-blur-sm">
                            {m.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {m.title}
                          </h3>
                        </div>
                        <span className="px-2 py-1 bg-green-700 text-green-300 rounded-full text-xs font-medium">
                          {m.accuracy}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                        {m.description}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{m.contributors} Contributors</span>
                        <span>Updated {m.lastUpdated}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                        <span className="text-xs text-cyan-400 uppercase">
                          {categories.find((c) => c.id === m.category)?.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/model-hub/${m.id}`}
                    key={m.id}
                    className="group relative block overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_10px_30px_rgba(0,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(0,255,255,0.5)] transition-shadow duration-500 animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-black/30 rounded-full backdrop-blur-sm">
                            {m.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {m.title}
                          </h3>
                        </div>
                        <span className="px-2 py-1 bg-green-700 text-green-300 rounded-full text-xs font-medium">
                          {m.accuracy}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                        {m.description}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{m.contributors} Contributors</span>
                        <span>Updated {m.lastUpdated}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                        <span className="text-xs text-cyan-400 uppercase">
                          {categories.find((c) => c.id === m.category)?.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-medium mb-2">No models found</h3>
              <p>
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Contribute to MedHive"
                className="rounded-2xl object-cover w-full h-full shadow-[0_0_30px_rgba(0,255,255,0.3)]"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center text-white">
              <h3 className="text-5xl font-['Kagitingan'] mb-4">
                Want to contribute your own models?
              </h3>
              <p className="text-gray-400 mb-6">
                Join our hospital network and contribute to the advancement of
                medical AI while maintaining full control over your data
                privacy.
              </p>
              <Button className="self-start font-['Poppins'] bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                Learn About Contributing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
