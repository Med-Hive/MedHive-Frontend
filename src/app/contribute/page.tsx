//src/app/contribute/page.tsx

"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurContainer } from "@/components/ui/BlurContainer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Database,
  LineChart,
  Lock,
  Server,
  ShieldCheck,
  UserPlus,
  Users,
  Sparkles,
  Brain,
  Network,
  Cpu,
} from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useRouter } from "next/navigation";

export default function Contribute() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const hospitalBenefits = [
    {
      icon: <LineChart className="h-6 w-6 text-medhive-500" />,
      title: "CUSTOMIZED MODELS",
      description:
        "Train models that are fine-tuned to your specific patient demographics and disease patterns.",
    },
    {
      icon: <Lock className="h-6 w-6 text-medhive-500" />,
      title: "COMPLETE DATA PRIVACY",
      description:
        "Your patient data never leaves your premises, ensuring full compliance with privacy regulations.",
    },
    {
      icon: <Database className="h-6 w-6 text-medhive-500" />,
      title: "INFRASTRUCTURE INCLUDED",
      description:
        "We provide all the hardware and software infrastructure needed for federated learning.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-medhive-500" />,
      title: "REGULATORY COMPLIANCE",
      description:
        "Built-in HIPAA, GDPR, and other regulatory compliance for worry-free implementation.",
    },
  ];

  const communityBenefits = [
    {
      icon: <Users className="h-6 w-6 text-medhive-500" />,
      title: "Diverse Model Training",
      description:
        "Access to models trained on diverse patient populations for better generalization.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-medhive-500" />,
      title: "PERFORMANCE INSIGHTS",
      description:
        "Track model improvements over time as the federated network grows.",
    },
    {
      icon: <Server className="h-6 w-6 text-medhive-500" />,
      title: "ROBUST ARCHITECTURE",
      description:
        "A distributed system that ensures reliability and fault tolerance.",
    },
    {
      icon: <UserPlus className="h-6 w-6 text-medhive-500" />,
      title: "GROWING NETWORK",
      description:
        "Join a community of researchers and clinicians dedicated to advancing medical AI.",
    },
  ];

  const performanceStats = [
    {
      metric: "Hospitals",
      value: "25+",
      description:
        "Healthcare institutions contributing to our federated network.",
      icon: <Building2 className="h-6 w-6 text-blue-300" />,
    },
    {
      metric: "Model Accuracy",
      value: "+18%",
      description:
        "Average improvement in model accuracy compared to single-institution training.",
      icon: <LineChart className="h-6 w-6 text-blue-300" />,
    },
    {
      metric: "Patient Records",
      value: "1.2M+",
      description:
        "Anonymized patient records used for training across the network.",
      icon: <Database className="h-6 w-6 text-blue-300" />,
    },
    {
      metric: "Security Level",
      value: "End-to-End",
      description: "Enterprise-grade encryption and security protocols.",
      icon: <ShieldCheck className="h-6 w-6 text-blue-300" />,
    },
  ];

  const stepsData = [
    {
      title: "Local Training",
      description:
        "Models are trained locally at each hospital using their own patient data, keeping sensitive information secure.",
      icon: <Cpu className="h-8 w-8 text-blue-400" />,
    },
    {
      title: "Secure Weight Sharing",
      description:
        "Only encrypted model weights are shared with the central server, never the raw patient data.",
      icon: <Network className="h-8 w-8 text-purple-400" />,
    },
    {
      title: "Global Aggregation",
      description:
        "The central server aggregates model improvements from all participants to create a better global model.",
      icon: <Brain className="h-8 w-8 text-cyan-400" />,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main
      className={`min-h-screen ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {/* Cyber background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-grid-pattern"></div>
        <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-3/4 -right-64 w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-cyan-900/20 to-transparent opacity-30"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center relative"
          >
            <motion.span
              className="inline-block px-6 py-2 bg-black/80 text-cyan-400 rounded-full 
              text-sm mb-6 font-['Poppins'] backdrop-blur-lg border border-cyan-400/30
              shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]"
            >
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              Join The Network
            </motion.span>

            <h1
              className="text-4xl md:text-6xl font-['Kagitingan'] mb-6 bg-gradient-to-r 
              from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent"
            >
              Contribute to Medical AI Innovation
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>

            <p className="text-xl text-gray-300 mb-10 font-['Poppins'] max-w-2xl mx-auto leading-relaxed">
              Become part of our federated learning network to help develop more
              accurate and diverse healthcare AI models while maintaining data
              privacy.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <InteractiveHoverButton className="text-lg hover:text-2xl"  onClick={()=>router.push("/login")}>
                <ArrowRight className="ml-2 h-5 w-5" />
              </InteractiveHoverButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-1 relative">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="hospitals" className="relative pb-5">
            <TabsList
              className="flex w-full max-w-2xl mx-auto mb-12 p-1 
              bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg
              shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)] items-stretch font-['Poppins']"
            >
              <TabsTrigger
                value="hospitals"
                className="flex-1 flex items-center justify-center py-3 text-sm font-medium rounded-md 
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 
                data-[state=active]:to-purple-500 data-[state=active]:text-black
                data-[state=active]:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]
                transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Building2 className="h-4 w-4" />
                  HOSPITALS
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="community"
                className="flex-1 py-3 text-sm font-medium rounded-md 
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 
                  data-[state=active]:to-pink-600 data-[state=active]:text-white
                  data-[state=active]:shadow-[0_0_20px_-5px_rgba(192,132,252,0.3)]
                  transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  COMMUNITY
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="admin"
                className="flex-1 py-3 text-sm font-medium rounded-md 
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 
                  data-[state=active]:to-cyan-600 data-[state=active]:text-white
                  data-[state=active]:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]
                  transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  ADMIN
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Hospitals Tab */}
            <TabsContent value="hospitals">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-4xl font-['Lilita_One'] mb-4 bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
                    JOIN OUR HOSPITAL NETWORK
                  </h2>
                  <p className="mb-8 text-gray-200 text-lg font-['Poppins']">
                    As a participating hospital, you can contribute to and
                    benefit from our federated learning platform while keeping
                    your patient data secure.
                  </p>
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {hospitalBenefits.map((benefit, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <BlurContainer
                          className="flex items-center gap-4 p-4 bg-gray-900 bg-opacity-100 border border-cyan-500/30 hover:bg-opacity-50 hover:cursor-pointer hover:shadow-[0_0_10px_rgba(0,255,231,0.6)] rounded-2xl transition-all duration-300 font-['Poppins']"
                          intensity="low"
                        >
                          <div className="flex-shrink-0 p-3 bg-gray-800 border border-cyan-500/50 rounded-xl shadow-[0_0_6px_rgba(0,255,231,0.4)]">
                            {benefit.icon}
                          </div>
                          <div>
                            <h3
                              className={`text-lg font-['Poppins'] mb-1 ${
                                index % 2 === 0
                                  ? "text-cyan-300"
                                  : "text-purple-300"
                              }`}
                            >
                              {benefit.title}
                            </h3>
                            <p className="text-gray-200 text-base font-['Poppins']">
                              {benefit.description}
                            </p>
                          </div>
                        </BlurContainer>
                      </motion.div>
                    ))}
                  </div>

                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-3 py-3 rounded-lg font-semibold shadow-glow-sm border border-cyan-500/30 text-base font-['Poppins'] transition-all duration-300"
                    onClick={()=>router.push("/data-upload")}>
                      Proceed to provide data
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <BlurContainer
                  className="overflow-hidden border border-cyan-500/20 rounded-2xl shadow-glow"
                  intensity="medium"
                >
                  <div className="relative">
                    <img
                      src="/feature3.jpg"
                      alt="Hospital Network"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 bg-cyan-900/80 text-cyan-300 rounded-full text-sm font-medium mb-2 backdrop-blur-sm border border-cyan-500/30">
                        Advanced Technology
                      </div>
                      <h3 className="text-xl font-['Poppins'] text-white">
                        Secure Federated Learning Infrastructure
                      </h3>
                    </div>
                  </div>
                </BlurContainer>
              </motion.div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image Card */}
                <BlurContainer
                  className="relative overflow-hidden bg-gray-900 bg-opacity-50 border border-purple-500/30 rounded-2xl hover:bg-opacity-70 hover:shadow-[0_0_10px_rgba(198,75,255,0.6)] transition-all duration-300 order-2 md:order-1"
                  intensity="medium"
                >
                  <img
                    src="/feature1.jpg"
                    alt="Medical Research Community"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-purple-700/80 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-purple-500/40 mb-2">
                      Global Collaboration
                    </span>
                    <h3 className="text-xl font-['Poppins'] text-white">
                      Medical AI Community Network
                    </h3>
                  </div>
                </BlurContainer>

                {/* Text & Benefits */}
                <motion.div
                  className="order-1 md:order-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-4xl font-['Lilita_One'] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    COMMUNITY DASHBOARD
                  </h2>
                  <p className="mb-8 text-gray-300 font-['Poppins'] text-base">
                    Our community portal provides visibility into model
                    performance and network growth for researchers, clinicians,
                    and healthcare professionals.
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {communityBenefits.map((benefit, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <BlurContainer
                          className="flex items-start gap-4 p-4 bg-gray-900 bg-opacity-50 border border-purple-500/30 rounded-2xl hover:bg-opacity-70 hover:shadow-[0_0_10px_rgba(198,75,255,0.6)] transition-all duration-300"
                          intensity="low"
                        >
                          <div className="flex-shrink-0 p-3 bg-gray-800 border border-purple-500/50 rounded-xl shadow-[0_0_6px_rgba(198,75,255,0.4)]">
                            {benefit.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-['Poppins'] text-purple-300 mb-1">
                              {benefit.title}
                            </h3>
                            <p className="text-gray-200 text-base font-['Poppins']">
                              {benefit.description}
                            </p>
                          </div>
                        </BlurContainer>
                      </motion.div>
                    ))}
                  </div>

                  <Button className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-600/80 hover:to-pink-600/80 text-black font-['Poppins'] rounded-xl text-base shadow-[0_0_6px_rgba(198,75,255,0.4)] border border-purple-500/30 transition-all duration-300">
                    View Community Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Admin Tab */}
            <TabsContent value="admin">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <div className="inline-block p-3 bg-gray-900 bg-opacity-50 border border-blue-500/30 rounded-full backdrop-blur-md mb-6 shadow-[0_0_6px_rgba(66,153,225,0.4)]">
                    <Lock className="h-6 w-6 text-blue-300" />
                  </div>
                  <h2 className="text-6xl font-['Kagitingan'] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    ADMINISTRATOR REPORTS
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded"></div>
                  <p className="text-gray-300 max-w-xl mx-auto font-['Poppins'] text-base">
                    Comprehensive analytics and reports for MedHive
                    administrators to monitor system performance, security, and
                    network growth.
                  </p>
                </div>

                {/* Stats Grid */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {performanceStats.map((stat, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <BlurContainer
                        className="p-5 text-center bg-gray-900 bg-opacity-50 border border-blue-500/30 rounded-2xl hover:bg-opacity-70 hover:shadow-[0_0_10px_rgba(66,153,225,0.6)] transition-all hover:cursor-pointer duration-300 flex flex-col items-center h-[300px]"
                        intensity="low"
                      >
                        {/* Icon */}
                        {stat.icon && (
                          <div className="w-16 h-16 mb-2 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-60 border border-blue-500/40 shadow-[0_0_6px_rgba(66,153,225,0.4)]">
                            {stat.icon}
                          </div>
                        )}

                        {/* Value + Metric */}
                        <div className="flex flex-col items-center justify-center mb-2">
                          <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-['Poppins'] leading-snug">
                            {stat.value}
                          </h3>
                          <p className="text-xl text-blue-300 font-['Poppins'] leading-snug">
                            {stat.metric}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-base text-gray-400 pt-7 font-['Poppins'] text-center leading-snug">
                          {stat.description}
                        </p>
                      </BlurContainer>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Admin Access Card */}
                <BlurContainer
                  className="p-8 bg-gray-900 bg-opacity-50 border border-purple-500/30 rounded-2xl hover:bg-opacity-70 hover:shadow-[0_0_10px_rgba(198,75,255,0.6)] transition-all duration-300"
                  intensity="medium"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-60 border border-purple-500/40 shadow-[0_0_6px_rgba(198,75,255,0.4)]">
                      <Lock className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-3xl font-['Kagitingan'] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      ADMINISTRATOR ACCESS REQUIRED
                    </h3>
                    <Button
                      variant="outline"
                      onClick={()=>router.push("/login")}
                      className="px-6 py-4 rounded-lg border-purple-400 text-purple-800 text-base font-['Lilita_One'] hover:bg-purple-400/10 hover:text-white transition-all duration-300"
                    >
                      <Lock className="mr-0.5 h-4 w-4" />
                      ADMIN LOGIN
                    </Button>
                  </div>
                </BlurContainer>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span
              className="inline-block px-6 py-2 bg-gray-900 bg-opacity-50 border border-blue-500/30 text-cyan-300 rounded-full text-sm font-bold mb-4 backdrop-blur-md shadow-[0_0_6px_rgba(0,255,231,0.4)]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <Network className="inline-block w-4 h-4 mr-2 text-base font-['Poppins']" />
              HOW IT WORKS
            </motion.span>
            <h2 className="text-5xl md:text-5xl font-['Kagitingan'] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 drop-shadow-text">
              THE FEDERATED LEARNING PROCESS
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stepsData.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <BlurContainer
                  className="relative min-h-[340px] px-6 py-8 bg-gray-900 bg-opacity-50 border border-cyan-500/30 rounded-2xl hover:bg-opacity-70 hover:shadow-[0_0_20px_rgba(0,255,231,0.6)] hover:cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center space-y-4"
                  intensity="medium"
                >
                  {/* Step Number Circle */}
                  <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-60 border border-cyan-500/40 shadow-[0_0_6px_rgba(0,255,231,0.4)]">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-2xl font-bold border border-cyan-300/20">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="text-cyan-300 text-4xl">{step.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-cyan-300 font-['Poppins']">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-snug px-2 font-['Poppins']">
                    {step.description}
                  </p>
                </BlurContainer>

                {/* Arrow Connector with Animation */}
                {index < stepsData.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 right-[-32px] transform -translate-y-1/2 z-10"
                    animate={{ x: [0, 8, 0] }} // Animation for the arrow
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00FFF7"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <polyline points="14 6 20 12 14 18" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <BlurContainer
            className="relative max-w-5xl mx-auto p-12 text-center bg-gray-900 bg-opacity-50 border border-cyan-500/30 rounded-2xl hover:bg-opacity-70 hover:shadow-[0_0_10px_rgba(0,255,231,0.6)] transition-all duration-300 overflow-hidden"
            intensity="high"
          >
            {/* Decorative borders */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>

            {/* Center glow */}
            <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-cyan-900/30 to-transparent blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <motion.div
                className="inline-block p-3 bg-gray-800 bg-opacity-60 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-md shadow-[0_0_6px_rgba(0,255,231,0.4)]"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="h-8 w-8 text-cyan-300" />
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-['Kagitingan'] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-100 to-blue-300 drop-shadow-text">
                Ready to Join the Medical AI Revolution?
              </h2>

              <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
                <Button
                  size="lg"
                  className="flex items-center justify-center px-8 py-6 text-lg font-['Poppins'] rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-400 hover:to-blue-400 text-black shadow-[0_0_6px_rgba(0,255,231,0.4)] border border-cyan-500/30 transition-all duration-300"
                >
                  Register as Hospital
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center justify-center px-8 py-6 text-lg font-bold rounded-xl border-2 border-cyan-500 text-black hover:bg-cyan-500/10 hover:text-white transition-all duration-300"
                >
                  Learn About Contribution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </BlurContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}
