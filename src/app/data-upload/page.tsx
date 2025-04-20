// src/app/data-upload/page.tsx
"use client";

import { useCopilotReadable } from "@copilotkit/react-core";
import { useState, useRef, useCallback } from "react";
import { CopilotChat } from "@copilotkit/react-ui";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function DataUploadPage() {
const [context, setContext] = useState<string>("");
const [fileName, setFileName] = useState<string | null>(null);
const [dropActive, setDropActive] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);

const processFile = (file: File) => {
setFileName(file.name);
const reader = new FileReader();
reader.onload = (e) => {
setContext(e.target?.result as string);
};
reader.readAsText(file);
};

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (file) processFile(file);
};

const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
e.preventDefault();
setDropActive(false);
const file = e.dataTransfer.files[0];
if (file) processFile(file);
}, []);

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
e.preventDefault();
setDropActive(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
e.preventDefault();
setDropActive(false);
};

const handleButtonClick = () => {
fileInputRef.current?.click();
};

useCopilotReadable({ description: "The uploaded data", value: context });

return (
<div className="min-h-screen bg-gradient-to-br from-cyan-900 to-purple-900 p-4">
<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-32px)]"
>
{/* Upload Panel */}
<motion.div
initial={{ x: -50, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ duration: 0.6, delay: 0.3 }}
className="h-full bg-black/40 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center border border-white/20 shadow-lg"
>
<h2 className="text-3xl font-['Lilita_One'] text-white mb-4">
Upload Data
</h2>
<div
onDrop={handleDrop}
onDragOver={handleDragOver}
onDragLeave={handleDragLeave}
className={`w-full h-64 flex flex-col justify-center items-center border-2 border-dashed rounded-xl p-4 text-white transition-colors ${
dropActive
? "border-cyan-300 bg-white/10"
: "border-white/50 bg-transparent"
}`}
>
<Upload className="h-12 w-12 mb-2 animate-bounce text-cyan-300" />
<p className="text-sm">Drag & drop your file here</p>
<p className="text-sm mb-4">or</p>
<Button
onClick={handleButtonClick}
variant="ghost"
className="bg-cyan-600/20 hover:bg-cyan-600/30 text-white"
>
Browse Files
</Button>
<input
type="file"
ref={fileInputRef}
onChange={handleFileUpload}
className="hidden"
accept=".json,.csv,.txt"
/>
</div>
{fileName && (
<div className="w-full mt-4 p-3 bg-white/10 rounded-lg text-white text-sm break-all text-center">
<strong className="font-['Poppins']">Selected:</strong> {fileName}
</div>
)}
</motion.div>

<motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="
        h-full
        bg-black/50
        bg-opacity-50
        backdrop-blur-xl
        rounded-2xl
        overflow-hidden
        border border-white/20
        shadow-lg
        filter
        invert
      "
    >
      <CopilotChat
        className="h-full font-['Poppins']"
        instructions={`You are assisting the user as best as you can. Answer in the best way possible given the data you have. ${
          context
            ? "You have been provided with the following data: " + context
            : ""
        }`}
        labels={{
          title: "Data Assistant",
          initial:
            "Hi! 👋 Upload a file (JSON, CSV, or TXT) and I'll help you analyze it.",
        }}
      />
    </motion.div>
</motion.div>
</div>
);
}