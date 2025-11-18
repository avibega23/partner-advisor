"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // 1. Import NextAuth's useSession

// 2. This interface now matches your User model's 'personality' object
interface PersonalityInput {
  communicationStyle: string;
  conflictStyle: string;
  loveLanguage: string;
  selfDescription: string;
}

interface Question {
  key: keyof PersonalityInput;
  inputTitle: string;
  inputType: 'text' | 'radio' | 'textarea'; // Use text for input type
  option?: string[];
}

// 3. The questions now match your User model
const questions: Question[] = [
  {
    key: "communicationStyle",
    inputTitle: "How do you prefer to communicate?",
    inputType: 'radio',
    option: ["Direct", "Empathetic", "Analytical", "Reserved"],
  },
  {
    key: "conflictStyle",
    inputTitle: "How do you typically handle conflicts?",
    inputType: 'radio',
    option: ["Avoidant", "Confrontational", "Compromising", "Collaborative", "Accommodating"],
  },
  {
    key: "loveLanguage",
    inputTitle: "What’s your primary love language?",
    inputType: 'radio',
    option: [
      "Words of Affirmation",
      "Acts of Service",
      "Receiving Gifts",
      "Quality Time",
      "Physical Touch",
    ],
  },
  {
    key: "selfDescription",
    inputTitle: "In a few words, how would you describe yourself?",
    inputType: 'textarea',
  },
];

// --- Your generic Input component is great, but let's simplify ---
// (We can use a simpler version for this form)

function Input<K extends keyof PersonalityInput>({
  data,
  value,
  onChange,
}: {
  data: Question;
  value: PersonalityInput[K];
  onChange: (value: PersonalityInput[K]) => void;
}) {
  
  const renderInput = () => {
    switch (data.inputType) {
      case 'textarea':
        return (
          <textarea
            placeholder="Enter your answer"
            className="w-full border p-2 rounded bg-gray-50 text-gray-800 min-h-[100px]"
            value={value as string || ""}
            onChange={(e) => onChange(e.target.value as PersonalityInput[K])}
          />
        );
      
      case 'radio':
        return (
          <div className="flex flex-col gap-2">
            {data.option?.map((opt, i) => (
              <label
                key={i}
                className="flex text-gray-800 items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={data.key}
                  value={opt}
                  checked={value === opt}
                  onChange={() => onChange(opt as PersonalityInput[K])}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      default: // 'text' or 'number' can be handled here
        return (
          <input
            type={data.inputType === 'text' ? 'text' : 'number'}
            placeholder="Enter your answer"
            className="w-full border p-2 rounded bg-gray-50 text-gray-800"
            value={value as string || ""}
            onChange={(e) => onChange(e.target.value as PersonalityInput[K])}
          />
        );
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {data.inputTitle}
      </h2>
      {renderInput()}
    </div>
  );
}


export default function Page() {
  const [index, setIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 4. Use NextAuth's session hook
  const { data: session, status } = useSession();

  // 5. Form data is *only* the personality object
  const [formData, setFormData] = useState<PersonalityInput>({
    communicationStyle: "",
    conflictStyle: "",
    loveLanguage: "",
    selfDescription: "",
  });

  // 6. Use useEffect to fetch existing profile data
  useEffect(() => {
    // This status handles the loading state
    if (status === "authenticated") {
      setIsSubmitting(true); // Use this as a loading state
      fetch('/api/user/profile') // Call our new GET route
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.personality) {
            setFormData(data.data.personality); // Pre-fill the form
          }
          setIsSubmitting(false);
        });
    } else if (status === "unauthenticated") {
      router.push("/api/auth/signin"); 
    }
  }, [status, router]);

  const handleChange = <K extends keyof PersonalityInput>(
    key: K,
    value: PersonalityInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 7. This is the updated handleSubmit function
  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/profile", { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personality: formData }), 
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      
      router.push("/chat");
      
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = () => {
    const currentKey = questions[index].key;
    const val = formData[currentKey];

    if (!val || (Array.isArray(val) && val.length === 0)) {
       setError("This field is required.");
       return;
    }

    setError(null);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      handleSubmit();
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  if (status === "loading" || isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  const currentQuestion = questions[index];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Question {index + 1} of {questions.length}
          </p>
        </div>

        <Input
          key={currentQuestion.key}
          data={currentQuestion}
          value={formData[currentQuestion.key]}
          onChange={(value) => handleChange(currentQuestion.key, value)}
        />

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={prevQuestion}
            disabled={index === 0 || isSubmitting}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-wait transition-colors"
          >
            {isSubmitting
              ? "Submitting..."
              : index === questions.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}