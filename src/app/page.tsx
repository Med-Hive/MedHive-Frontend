//src/app/page.tsx

"use client";
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Cpu } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimateOnView } from "@/components/AnimateOnView";
import { motion, useReducedMotion } from "framer-motion";

import {
  ArrowRight,
  Brain,
  Database,
  Lock,
  Server,
  Shield,
  UserPlus,
} from "lucide-react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { RiShieldCheckLine, RiLock2Line, RiGroupLine } from "@remixicon/react";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const heroSectionRef = useIntersectionObserver({ threshold: 0.2 });
  const featuresSectionRef = useIntersectionObserver({ threshold: 0.2 });
  const modelsSectionRef = useIntersectionObserver({ threshold: 0.2 });
  const joinSectionRef = useIntersectionObserver({ threshold: 0.2 });

  useEffect(() => {
    setIsLoaded(true);
    setHasMounted(true);
    // Optional badge animations
    const badges = document.querySelectorAll(".grid-cols-3.gap-3 > *");
    badges.forEach((badge, index) => {
      setTimeout(() => {
        badge.classList.add("revealed");
      }, index * 200);
    });
  }, []);

  const features = [
    {
      title: "Privacy-Preserving ML",
      description:
        "Our federated learning approach keeps patient data secure within hospital premises while enabling collaborative model training.",
      icon: <Shield className="h-8 w-8 text-medhive-400" />,
    },
    {
      title: "Advanced Encryption",
      description:
        "Hospital contributions are encrypted with state-of-the-art methods, ensuring complete privacy of sensitive medical data.",
      icon: <Lock className="h-8 w-8 text-medhive-400" />,
    },
    {
      title: "AI Disease Analysis",
      description:
        "Access cutting-edge ML models for symptom analysis, medical imaging diagnostics, and predictive healthcare insights.",
      icon: <Brain className="h-8 w-8 text-medhive-400" />,
    },
    {
      title: "Hospital Network",
      description:
        "Join our growing community of healthcare institutions collaborating to improve medical AI for everyone.",
      icon: <UserPlus className="h-8 w-8 text-medhive-400" />,
    },
    {
      title: "Distributed Infrastructure",
      description:
        "Our system architecture ensures resilience, reliability, and performance at scale for mission-critical healthcare applications.",
      icon: <Server className="h-8 w-8 text-medhive-400" />,
    },
    {
      title: "Comprehensive Analytics",
      description:
        "Gain insights into model performance, data contributions, and the impact of your participation in federated learning.",
      icon: <Database className="h-8 w-8 text-medhive-400" />,
    },
  ];

  const modelShowcase = [
    {
      title: "Symptom Analysis",
      description:
        "LLM-powered medical symptom analysis with RAG for accurate preliminary diagnostics.",
      image:
        "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      path: "/model-hub/symptom-analysis",
    },
    {
      title: "ECG Analysis",
      description:
        "Heart rhythm abnormality detection from ECG curves with advanced neural networks.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      path: "/model-hub/ecg-analysis",
    },
    {
      title: "Pneumonia Detection",
      description:
        "X-ray image analysis for pneumonia diagnosis with high sensitivity and specificity.",
      image:
        "https://images.unsplash.com/photo-1576089073624-b5f8bada6bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      path: "/model-hub/pneumonia-detection",
    },
  ];

  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 bg-black overflow-x-hidden`}
      >
        <div className="fixed inset-0 z-0">
          <HeroGeometric />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              duration: shouldReduceMotion ? 0 : 1,
              ease: "easeInOut",
              scale: { type: "spring", stiffness: 100, damping: 20 },
            },
          }}
          className="relative z-10"
          style={{ willChange: "opacity, transform, filter" }}
        ></motion.div>

        <div className="relative z-10">
          {/* Hero Section */}
          <AnimateOnView stagger={0.05} delay={0.1} distance={10}>
            <section
              ref={heroSectionRef}
              className="relative md:pt-16 md:pb-28 lg:pt-20 lg:pb-28 overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20" />
              </div>
              <motion.div
                className="container mx-auto px-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.2,
                    ease: "easeOut",
                  },
                }}
                style={{ willChange: "opacity, transform" }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 xl:gap-20 text-white">
                  <div className="lg:w-7/12 text-center lg:text-left">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
                      <StatusBadge
                        leftIcon={RiShieldCheckLine}
                        rightIcon={RiLock2Line}
                        leftLabel="Privacy"
                        rightLabel="On‑Premise"
                        status="success"
                      />
                      <StatusBadge
                        leftIcon={RiLock2Line}
                        rightIcon={RiGroupLine}
                        leftLabel="Secure"
                        rightLabel="Federated AI"
                        status="success"
                      />
                      <StatusBadge
                        leftIcon={RiShieldCheckLine}
                        rightIcon={RiLock2Line}
                        leftLabel="End‑to‑End"
                        rightLabel="Encryption"
                        status="success"
                      />
                    </div>
                    <h1 className="font-['Kagitingan'] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight max-w-3xl mx-auto lg:mx-0">
                      Building Medical AI That’s
                      <br />
                      <span className="text-white inline-block w-[240px] sm:w-[270px] mt-1">
                        <Typewriter
                          words={[
                            "Private",
                            "Secure",
                            "Collaborative",
                            "Ethical",
                          ]}
                          loop
                          cursor
                          cursorStyle="|"
                          typeSpeed={70}
                          deleteSpeed={40}
                          delaySpeed={1500}
                        />
                      </span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl pt-3 font-['Poppins'] mx-auto lg:mx-0">
                      MedHive enables hospitals to collaboratively train machine
                      learning models without sharing sensitive patient data.
                      Join the revolution in privacy-preserving federated
                      learning for healthcare.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-10 pt-2">
                      <Link href="/login?new=true">
                        <InteractiveHoverButton />
                      </Link>
                      <Button
                        variant="outline"
                        className="h-12 font-['Lilita_One'] text-lg border-gray-600 text-white bg-gradient-to-r from-medhive-500/20 to-medhive-500/10 backdrop-blur-lg hover:from-medhive-500/30 hover:to-medhive-500/20 transition-all duration-300"
                      >
                        Watch Demo
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-gray-300">
                      <span className="flex items-center">
                        <Shield className="h-4 w-4 mr-1 text-medhive-400" />
                        HIPAA Certified
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center">
                        <Lock className="h-4 w-4 mr-1 text-medhive-400" />
                        Fully Encrypted
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center">
                        <Database className="h-4 w-4 mr-1 text-medhive-400" />
                        25+ Hospital Networks
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-5/12">
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                      <Spotlight
                        className="absolute top-0 left-0 z-0"
                        size={300}
                      />
                      <div className="relative z-10 w-full h-full">
                        <SplineScene
                          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </AnimateOnView>

          {/* Features Section */}
          <AnimateOnView stagger={0.03} delay={0.02}>
            <section
              ref={featuresSectionRef}
              className="relative min-h-screen flex flex-col justify-center items-center px-4 py-12 sm:py-16"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" />
                <div className="absolute inset-0" />
                <div className="absolute inset-0 opacity-5 mix-blend-overlay" />
              </div>
              <motion.div className="relative z-10 max-w-4xl w-full text-center mb-8 sm:mb-12">
                <span className="inline-block px-4 py-2 bg-medhive-400/10 text-medhive-400 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                  Why Choose MedHive
                </span>
                <h2 className="text-4xl md:text-5xl font-['Kagitingan'] mb-4 bg-gradient-to-r from-medhive-200 to-medhive-400 bg-clip-text text-transparent">
                  Built for Trust.
                  <br className="hidden md:block" /> Powered by Collaboration.
                </h2>
                <p className="text-lg font-['Poppins'] text-medhive-300 mx-auto max-w-2xl">
                  MedHive unites healthcare networks using secure, decentralized
                  AI to train models—without compromising data privacy.
                </p>
              </motion.div>
              <div className="relative z-10 flex-grow font-['Poppins'] flex items-center justify-center w-full max-w-7xl">
                <AnimatedTabs className="px-4" />
              </div>
            </section>
          </AnimateOnView>

          {/* Models Section */}
          <AnimateOnView stagger={0.03} delay={0.02}>
            <section ref={modelsSectionRef} className="relative z-20 py-20">
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="w-full h-full" />
                <div className="w-full h-full animate-[move-streams_15s_linear_infinite]" />
                <div className="absolute inset-0" />
                <div className="absolute top-0 left-1/2 w-[100dvw] max-w-full h-full" />
              </div>
              <div className="container relative z-30 mx-auto px-4 max-w-[90rem]">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                  <div>
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#6d28d9] via-[#9333ea] to-[#ec4899] text-white rounded-full text-xs font-bold tracking-wider mb-4 drop-shadow-lg">
                      Our AI Models
                    </span>
                    <h2 className="text-5xl md:text-6xl font-['Lilita_One'] bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-300 to-blue-500 animate-text-glow">
                      MED-AI IN ACTION
                    </h2>
                  </div>
                  <Link
                    href="/model-hub"
                    className="inline-flex items-center mt-6 md:mt-0 text-cyan-400 hover:text-white transition-colors duration-300 font-semibold"
                  >
                    Explore All Models
                    <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 overflow-x-hidden">
                  {modelShowcase.map((model, idx) => {
                    const imageSrc =
                      idx === 0
                        ? "/feature1.jpg"
                        : idx === 2
                        ? "/feature2.jpg"
                        : model.image;
                    const paths = [
                      "/model-hub/symptom-analysis",
                      "/model-hub/ecg-analysis",
                      "/model-hub/pneumonia-xray",
                    ];
                    const modelPath = paths[idx] || model.path;
                    return (
                      <Link
                        key={idx}
                        href={modelPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-3xl border border-transparent bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_10px_30px_rgba(0,255,255,0.2)] hover:shadow-[0_20px_40px_rgba(0,255,255,0.4)] transition-shadow duration-300 cursor-pointer"
                      >
                        <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent group-hover:border-cyan-400 transition-colors duration-300 animate-[flicker_3s_linear_infinite]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-screen" />
                        <div className="h-56 overflow-hidden rounded-t-3xl">
                          <img
                            src={imageSrc}
                            alt={model.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6 flex flex-col justify-between min-h-[200px]">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2 transition-colors group-hover:text-cyan-300">
                              {model.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                              {model.description}
                            </p>
                          </div>
                          <div className="mt-4">
                            <span className="inline-flex items-center justify-center gap-2 text-sm font-medium text-cyan-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-colors duration-300">
                              Learn more
                              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 group-hover:bg-cyan-400/20 transition-colors duration-300">
                                <ArrowRight className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-300" />
                              </span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <style jsx>{`
                @keyframes move-streams {
                  from {
                    background-position: 0 0;
                  }
                  to {
                    background-position: 0 100%;
                  }
                }
                @keyframes flicker {
                  0%,
                  100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.85;
                  }
                }
              `}</style>
            </section>
          </AnimateOnView>

          {/* Join Section */}
          <section
            ref={joinSectionRef}
            className="relative py-28 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[url('/patterns/hexagon-grid.svg')] opacity-15 animate-pulse-slow" />
              <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.svg')] opacity-10 mix-blend-overlay animate-pan" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-purple-500/15" />
            </div>

            {hasMounted && (
              <div className="absolute inset-0">
                {[...Array(45)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full blur-[1px] animate-float"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
                      boxShadow: "0 0 15px rgba(34,211,238,0.7)",
                    }}
                  />
                ))}
              </div>
            )}

            <div className="container mx-auto px-4 relative">
              <div className="max-w-3xl mx-auto text-center">
                <AnimateOnView stagger={0.03} delay={0.02}>
                  <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 animate-text-glow font-kagitingan">
                    <span>Join the Neural Nexus</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300/90 mb-12 leading-relaxed font-lilita-one">
                    <span className="border-b-2 border-cyan-400/40 pb-1 text-white/95 font-kagitingan">
                      Hospital • Research Institution • Healthcare Provider
                    </span>
                    <br className="mt-4" />
                    <span className="inline-block mt-4 text-gray-300/80 font-['Lilita_One']">
                      MedHive's quantum-secure infrastructure enables
                      collaborative AI evolution
                    </span>
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-8">
                    <Link
                      href="/login?new=true"
                      className="relative group transform hover:scale-105 transition-transform duration-300"
                    >
                      <div className="absolute -inset-1 bg-cyan-500/20 blur-2xl group-hover:bg-cyan-500/30 transition-all duration-300 rounded-2xl" />
                      <Button
                        size="lg"
                        className="relative bg-black/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white px-10 py-7 rounded-xl text-lg font-['Poppins'] transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                      >
                        <span className="mr-3">⚡</span>
                        Register as Hospital
                        <ArrowUpRight className="ml-3 h-6 w-6 stroke-current transform group-hover:rotate-45 transition-transform" />
                      </Button>
                    </Link>
                    <div className="relative group transform hover:scale-105 transition-transform duration-300">
                      <div className="absolute -inset-1 bg-purple-500/20 blur-2xl group-hover:bg-purple-500/30 transition-all duration-300 rounded-2xl" />
                      <Button
                        variant="outline"
                        className="relative bg-black/80 backdrop-blur-xl border-2 border-purple-400/40 hover:border-purple-300 text-purple-300 hover:text-black px-10 py-7 rounded-xl text-lg font-['Poppins'] transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                      >
                        <Cpu className="mr-3 h-6 w-6 stroke-current transform group-hover:scale-110 transition-transform" />
                        Learn About Contribution
                      </Button>
                    </div>
                  </div>
                </AnimateOnView>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-scanline-fast" />
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
