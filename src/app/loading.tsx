"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm dark:bg-gray-950/50">
      <div className="relative flex flex-col items-center gap-2">
        <motion.div
          className="h-16 w-16 rounded-lg border-4 border-primary dark:border-cyan-500"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="h-8 w-2 bg-primary dark:bg-cyan-500" />
            <div className="absolute h-2 w-8 bg-primary dark:bg-cyan-500" />
          </motion.div>
        </motion.div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}