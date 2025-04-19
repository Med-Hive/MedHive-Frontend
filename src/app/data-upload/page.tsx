'use client';
import { useCopilotReadable } from "@copilotkit/react-core"; 
import { useState, useRef } from 'react';
import { CopilotChat } from "@copilotkit/react-ui";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';

export default function DataUploadPage() {
  const [context, setContext] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file type is valid
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (!['json', 'csv', 'txt'].includes(fileType || '')) {
      alert('Please upload only JSON, CSV, or TXT files.');
      return;
    }

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      setContext(fileContent);
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  useCopilotReadable({
    description: "The uploaded data",
    value: context,
  });

  return (
    <div className="relative h-screen w-full">
      <div className="absolute left-4 bottom-24 z-10 flex items-center gap-2">
        <Button onClick={handleButtonClick} variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
        {fileName && (
          <span className="bg-muted px-3 py-1 rounded-md text-sm">
            {fileName}
          </span>
        )}
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".json,.csv,.txt"
        />
      </div>
      
      <CopilotChat
        className="h-screen "
        instructions={`You are assisting the user as best as you can. Answer in the best way possible given the data you have. ${context ? 'You have been provided with the following data: ' + context : ''}`}
        labels={{
          title: "Data Assistant",
          initial: "Hi! 👋 Upload a file (JSON, CSV, or TXT) and I'll help you analyze it.",
        }}
      />
    </div>
  );
}