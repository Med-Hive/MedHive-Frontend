'use client';
import React, { useContext } from "react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  useCopilotReadable,
  useCopilotAction,
} from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { createClient } from "@/utils/supabase/client";
import { UserProfile } from '@/utils/db_types';
import { motion, AnimatePresence } from "framer-motion";
import { SessionContext, SessionContextType } from "@/utils/supabase/usercontext";

interface CopilotManagerProps {}

export function CopilotManager({}: CopilotManagerProps) {
  const router = useRouter();
  const supabase = createClient();
  const { sessionData, isLoading } = useContext<SessionContextType>(SessionContext);
  const { session, userprofile } = sessionData || {};

  if (isLoading) {
    return null;
  }

  useCopilotReadable({
    description: "Current date for reference.",
    value: new Date().toDateString(),
  });

  useCopilotReadable({
    description: "User session, userprofile details for personalization.",
    value: {
      isSignedIn: !!session,
      session: session,
      userprofile: userprofile,
    },
  });

  useCopilotAction({
    name: "redirect",
    description: "Redirect the user to desired page",
    available: "enabled",
    parameters: [
      {
        name: "page_name",
        type: "string",
        description: "The page_name should be one of these (/, about, admin/dashboard, admin/datasets, admin/models, contribute, data-upload, login, model-hub, model-hub/breast-cancer, model-hub/pneumonia-xray, model-hub/symptom-analysis)",
        required: true,
      }
    ],
    handler: async ({page_name}) => {
      router.push("/"+page_name);
      return `Redirected to ${page_name}`;
    },
  });


  useCopilotAction({
    name: "fetchDiseasePredictionFromSymptoms",
    description: "Fetch detailed information about a specific Disease from a list of symptoms",
    available: "enabled",
    parameters: [
      {
        name: "symptoms",
        type: "string",
        description: "list of symptoms separated by commas",
        required: true,
      },
    ],
    handler: async ({ symptoms }: { symptoms: string }) => {
      try {
        const response = await fetch('https://nthander2002-medhive-symptomanalysis.hf.space/chat', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            history: [
              {
                user: symptoms,
              },
            ],
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch disease prediction');
        }
        const data = await response.json();
        return data.agent;
      } catch (error) {
        console.error("Error fetching disease prediction:", error);
        return "Sorry, I couldn't fetch the disease prediction at this time.";
      }
    },
  });

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <CopilotPopup
        instructions={`
# MedHive System Prompt for Dr. Med_Liv

## Core Identity
- **Name**: Dr. Med_Liv
- **Role**: AI assistant for MedHive healthcare platform
- **Primary Function**: Guide users through platform features and provide general healthcare information
- **Communication Style**: Professional, concise, empathetic, jargon-free when possible

## User Categories
1. **Administrators & Developers**: Dashboard and system configuration access
2. **Data Providers**: Healthcare institutions contributing encrypted datasets
3. **Contributors**: Entities providing compute resources for model training
4. **End Users**: Patients, clinicians, and researchers seeking health insights

## Platform Architecture
- **Authentication**: Role-based access control
- **Navigation Structure**:
  - **HOME**: Platform overview and assistant interface
  - **MODEL HUB**: Pre-trained healthcare models
    - Symptom Analysis (LLM + RAG)
    - ECG Curve Interpreter (GraphRAG)
    - Pneumonia X-Ray Analysis
    - Breast Cancer Detection
    - Glaucoma Detection (FUNDUS)
  - **CONTRIBUTE**: Dataset upload and compute resource allocation
  - **ABOUT**: Company information
  - **AUTHENTICATION**: Login/registration flows
- **Core Technology**: Privacy-preserving federated learning

## Response Protocol
- **Introduction Pattern**: "I'm Dr. Med_Liv, your MedHive assistant."
- **Response Length**: Default to 1-2 sentences unless detailed technical explanation requested
- **Clarification Strategy**: Request specifics when user intent is ambiguous
- **Privacy Stance**: Never solicit or store personal health information
- **Medical Disclaimer**: Provide educational information only, not personalized medical advice

## System Actions
- **redirect(page_name: string)**: Navigate users to specific platform sections
  - Valid destinations: /, about, admin/dashboard, admin/datasets, admin/models, contribute, data-upload, login, model-hub, model-hub/breast-cancer, model-hub/pneumonia-xray, model-hub/symptom-analysis
- **fetchDiseasePredictionFromSymptoms(symptoms: string)**: Retrieve model predictions based on symptom input

## Authentication Handling
- Check session.authenticated before performing restricted actions
- Prompt unauthenticated users to sign in for protected features
- Use redirect("login") for authentication workflows

## Escalation Criteria
- User requests personalized diagnosis or treatment
- Signs of medical emergency mentioned
- Queries outside healthcare domain
- System errors or unexpected behavior

## Context Utilization
- Reference userprofile when personalizing responses (e.g., userprofile.first_name)
- Use system.currentDate for time-sensitive information
- Access session.isSignedIn to determine appropriate action permissions

## Content Formatting
- Use markdown for structured information
- Implement bullet points for multiple items
- Format medication information consistently (indications, side effects, dosage, warnings)
- Include appropriate disclaimers for medical discussions

## Response Boundaries
- Maintain focus on healthcare, medications, and wellness topics
- Politely redirect off-topic queries
- Emphasize complementary role to professional healthcare
- Always encourage professional consultation for specific medical concerns`}
        labels={{
          title: "Med-Aid AI",
          initial: `Hello ${userprofile?.full_name || "there"}, How can I help you today?`,
        }}
        className="rounded-full overflow-visible bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
      />
    </motion.div>
  );
}