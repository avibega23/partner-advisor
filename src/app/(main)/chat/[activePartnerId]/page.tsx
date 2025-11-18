"use client";
import PartnerSidebar from "@/app/components/PartnerSidebar";
import { useParams } from "next/navigation";
import ConversationView from "@/app/components/ConversationView";
import ChatInput from "@/app/components/ChatInput";
import { useEffect, useState } from "react";
import { IPartner } from "@/types/partner.types";
import { IMessage } from "@/types/message.types";

const onboardingSteps = {
  new: {
    question: "What is your relationship with this person?",
    field: "relationshipType",
    options: ["Partner", "Friend", "Crush", "Sibling", "Family"],
    nextStatus: "collecting_gender",
    optionBool: true,
  },
  collecting_gender: {
    question: "Please select gender of this person...",
    field: "gender",
    options: ["Male", "Female", "Others"],
    nextStatus: "collecting_age",
    optionBool: true,
  },
  collecting_age: {
    question: "What is the age of this person?",
    field: "age",
    type: "number",
    min: 1,
    max: 100,
    nextStatus: "collecting_maritalStatus",
    optionBool: false,
  },
  collecting_maritalStatus: {
    question: "What's the marital status of the person?",
    field: "maritalStatus",
    options: ["Married", "Unmarried", "Widowed"],
    nextStatus: "collecting_personality",
    optionBool: true,
  },
  collecting_personality: {
    question: "How would you describe their personality?",
    field: "perceivedPersonality",
    options: ["Reserved", "Outgoing", "Analytical", "Empathetic"],
    nextStatus: "collecting_communicationRating",
    optionBool: true,
  },
  collecting_communicationRating: {
    question: "How would you rate your communication with this person (1-10)?",
    field: "userPerception.communicationRating",
    type: "number",
    min: 1,
    max: 10,
    nextStatus: "collecting_biggestChallenge",
    optionBool: false,
  },
  collecting_biggestChallenge: {
    question:
      "What do you think is the biggest challenge in your relationship?",
    field: "userPerception.biggestChallenge",
    type: "text",
    nextStatus: "collecting_loveLanguage",
    optionBool: false,
  },
  collecting_loveLanguage: {
    question: "What’s their primary love language?",
    field: "userPerception.loveLanguage",
    options: [
      "Words of Affirmation",
      "Acts of Service",
      "Receiving Gifts",
      "Quality Time",
      "Physical Touch",
    ],
    nextStatus: "collecting_conflictStyle",
    optionBool: true,
  },
  collecting_conflictStyle: {
    question: "How does this person usually handle conflicts?",
    field: "conflictResolution.conflictStyle",
    options: [
      "Avoidant",
      "Confrontational",
      "Compromising",
      "Collaborative",
      "Accommodating",
    ],
    nextStatus: "collecting_commonDisagreements",
    optionBool: true,
  },
  collecting_commonDisagreements: {
    question: "What are some common disagreements between you two?",
    field: "conflictResolution.commonDisagreements",
    type: "text",
    nextStatus: "collecting_freeTimeSpend",
    optionBool: false,
  },
  collecting_freeTimeSpend: {
    question: "How does this person usually spend their free time?",
    field: "lifestyle.freeTimeSpend",
    type: "text",
    nextStatus: "collecting_socialLife",
    optionBool: false,
  },
  collecting_socialLife: {
    question: "How active is their social life?",
    field: "lifestyle.socialLife",
    options: ["Introverted", "Balanced", "Extroverted"],
    nextStatus: "active",
    optionBool: true,
  },
};

const Page = () => {
  const params = useParams();
  const activePartnerId = params.activePartnerId as string | undefined;
  const [activePartner, setActivePartner] = useState<IPartner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputOptions, setInputOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!activePartnerId) return;

    const fetchPartnerData = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/partners/${activePartnerId}`);
      const { data: partner } = await res.json();
      setActivePartner(partner);

      if (partner.status == "active") {
        // TODO: we have to fetch messages from api here
        const res = await fetch(`/api/chat/${activePartnerId}`);
        const { data: history } = await res.json();
        setMessages(history);
        setInputOptions([]);
      } else {
        const step = onboardingSteps[partner.status];

        if (step) {
          setMessages([
            {
              _id: `temp_model_${Date.now()}`,
              role: "model", 

              content: step.question,
            },
          ]);

          setInputOptions(step.options);
        }
      }
      setIsLoading(false);

    };

    fetchPartnerData();
  }, [activePartnerId]);

  const handleOptionSelect = async (option: string) => {
    if (!activePartner) return;

    const currentStatus = activePartner.status;
    const currentStep = onboardingSteps[currentStatus];
    if (!currentStatus) return;

    const userMessage = {
      _id: `temp_user_${Date.now()}`,
      role: "user",
      content: option,
    };
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInputOptions([]);
    setIsLoading(true);

    const res = await fetch(`/api/partners/${activePartnerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [currentStep.field]: option,
        status: currentStep.nextStatus,
      }),
    });
    const { data: updatedPartner } = await res.json();

    setActivePartner(updatedPartner);

    const nextStep = onboardingSteps[updatedPartner.status];

    if (nextStep) {
      const nextQuestion = {
        _id: `temp_model_${Date.now()}`,
        role: "model",
        content: nextStep.question,
      };
      setMessages((currentMessages) => [...currentMessages, nextQuestion]);
      setInputOptions(nextStep.options);
    } else {
      const finalMessage = {
        _id: `temp_model_${Date.now()}`,
        role: "model",
        content: "Great, Thanks!",
      };
      setMessages((currentMessages) => [...currentMessages, finalMessage]);
      setInputOptions([]);
    }

    setIsLoading(false);
  };
  const handleSendMessage = async (message: string) => {
    const tempId = `temp_user ${Date.now()}`;
    setMessages((current) => [
      ...current,
      { _id: tempId, role: "user", content: message },
    ]);

    setIsLoading(true);

    if (activePartner?.status == "active") {
      const res = await fetch(`/api/chat/${activePartnerId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });
      const { data: aiMessage } = await res.json();

      setMessages((current) => [...current, aiMessage]);
    } else {
      const currentStatus = activePartner.status;
      const currentStep = onboardingSteps[currentStatus];
      if (!currentStatus) {
        setIsLoading(false);
        setInputOptions([]);
        return;
      }
      const res = await fetch(`/api/partners/${activePartnerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [currentStep.field]: message,
          status: currentStep.nextStatus,
        }),
      });
      const { data: updatedPartner } = await res.json();

      setActivePartner(updatedPartner);

      const nextStep = onboardingSteps[updatedPartner.status];

      if (nextStep) {
        const nextQuestion = {
          _id: `temp_model_${Date.now()}`,
          role: "model",
          content: nextStep.question,
        };
        setMessages((currentMessages) => [...currentMessages, nextQuestion]);
        setInputOptions(nextStep.options);
      } else {
        const finalMessage = {
          _id: `temp_model_${Date.now()}`,
          role: "model",
          content: "Great, Thanks!",
        };
        const finalMessage2 = {
          _id: `temp_model_${Date.now()}`,
          role: "model",
          content: "I am happy to talk now! please type your issues..",
        };
        setMessages((currentMessages) => [...currentMessages, finalMessage,finalMessage2]);
        setInputOptions([]);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <div>
          <PartnerSidebar activePartnerId={activePartnerId}></PartnerSidebar>
        </div>
        <div className="w-full flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white text-center">
            <h1 className="text-2xl font-bold text-blue-600">Partner Name</h1>
          </div>
          <ConversationView messages={messages}></ConversationView>
          <div>
            <ChatInput
              options={inputOptions}
              onSendMessage={handleSendMessage}
              onSelectOption={handleOptionSelect}
              disabled={isLoading}
            ></ChatInput>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
