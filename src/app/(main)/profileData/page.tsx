"use client";
import React, { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";



// --- TYPE DEFINITIONS (No changes) ---
interface UserInput {
  name: string;
  email: string;
  kindeId: string;
  gender: string;
  age: number;
  maritalStatus: string;
  adventurous: number;
  coreValues: string[];
  birdOrOwl: boolean;
  stressHandling: string;
  communicationStyle: string;
  closeFriendDescribe: string;
  freeTimeSpend: string;
}

interface Question {
  key: keyof UserInput;
  inputTitle: string;
  inputType: boolean;
  option: string[];
}

// --- QUESTIONS DATA (No changes) ---
const questions: Question[] = [
    { key: "gender", inputTitle: "Are You?", inputType: false, option: ["Male", "Female"] },
    { key: "maritalStatus", inputTitle: "Are You Married?", inputType: false, option: ["Yes", "No"] },
    { key: "age", inputTitle: "How Old Are You?", inputType: true, option: [] },
    { key: "adventurous", inputTitle: "On a scale of 1 to 10, how adventurous are you?", inputType: true, option: [] },
    { key: "coreValues", inputTitle: "What do you value the most? (Select all that apply)", inputType: false, option: ["Trust", "Respect", "Loyalty", "Growth", "Compassion", "Honesty"] },
    { key: "birdOrOwl", inputTitle: "Are You a Night Owl Or an Early Bird?", inputType: false, option: ["Night Owl", "Early Bird"] },
    { key: "stressHandling", inputTitle: "How Do You Handle Your Stress?", inputType: true, option: [] },
    { key: "communicationStyle", inputTitle: "How do you prefer communication?", inputType: false, option: ["Direct", "Subtle", "Passive"] },
    { key: "closeFriendDescribe", inputTitle: "What type of behavior do you expect from your friend?", inputType: true, option: [] },
    { key: "freeTimeSpend", inputTitle: "How Do You Spend Your Free Time?", inputType: true, option: [] },
];

// --- GENERIC INPUT COMPONENT (No changes) ---
interface InputProps<K extends keyof UserInput> {
  data: Question;
  value: UserInput[K];
  onChange: (value: UserInput[K]) => void;
}

function Input<K extends keyof UserInput>({ data, value, onChange }: InputProps<K>) {
    const handleCheckboxChange = (option: string) => {
        const currentValue = (value as string[]) || [];
        const newValues = currentValue.includes(option) ? currentValue.filter((item) => item !== option) : [...currentValue, option];
        onChange(newValues as UserInput[K]);
    };
    const renderInput = () => {
        switch (data.key) {
            case "age":
            case "adventurous":
                return <input type="number" placeholder="Enter a number" className="w-full border p-2 rounded bg-gray-50 text-gray-800" value={value as number || ''} onChange={(e) => onChange((e.target.value === '' ? 0 : parseInt(e.target.value, 10)) as UserInput[K])}/>;
            case "coreValues":
                return <div className="flex flex-col gap-2">{data.option.map((opt, i) => (<label key={i} className="flex items-center text-gray-800 gap-2 cursor-pointer"><input type="checkbox" name={data.inputTitle} value={opt} checked={(value as string[]).includes(opt)} onChange={() => handleCheckboxChange(opt)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>{opt}</label>))}</div>;
            case "birdOrOwl":
                 return <div className="flex flex-col gap-2">{data.option.map((opt, i) => (<label key={i} className="flex items-center  cursor-pointer"><input type="radio" name={data.inputTitle} value={opt} checked={(value as boolean) === (opt === 'Night Owl')} onChange={() => onChange((opt === 'Night Owl') as UserInput[K])}/>{opt}</label>))}</div>;
            default:
                if (data.inputType) { return <input type="text" placeholder="Enter your answer" className="w-full border p-2 rounded bg-gray-50 text-gray-800" value={value as string} onChange={(e) => onChange(e.target.value as UserInput[K])}/>; }
                return <div className="flex flex-col gap-2">{data.option.map((opt, i) => (<label key={i} className="flex  text-gray-800 items-center gap-2 cursor-pointer"><input type="radio" name={data.inputTitle} value={opt} checked={value === opt} onChange={() => onChange(opt as UserInput[K])}/>{opt}</label>))}</div>;
        }
    }
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{data.inputTitle}</h2>
      {renderInput()}
    </div>
  );
}


// --- MAIN PAGE COMPONENT ---

export default function Page() {
  const [index, setIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Use the mock Kinde hook
  const { user, isLoading } = useKindeBrowserClient();

  const [formData, setFormData] = useState<UserInput>({
    name: "",
    email: "",
    kindeId: "",
    gender: "",
    age: 0,
    maritalStatus: "",
    adventurous: 0,
    coreValues: [],
    birdOrOwl: false,
    stressHandling: "",
    communicationStyle: "",
    closeFriendDescribe: "",
    freeTimeSpend: "",
  });

  // Use useEffect to populate form with Kinde data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.given_name || "",
        email: user.email || "",
        kindeId: user.id || "",
      }));
    }
  }, [user]); // This effect runs when the user object is loaded

  const handleChange = <K extends keyof UserInput>(key: K, value: UserInput[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleSubmit = async () => {
      setIsSubmitting(true);
      setError(null);
      try {
          const response = await fetch('./../../api/profileData', { // This should point to your POST route
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
          });
          const result = await response.json();
          if (!response.ok) {
              throw new Error(result.error || 'Something went wrong');
          }
          console.log('Form submitted successfully:', result.data);
          setIsSubmitted(true);
      } catch (err: unknown) {
          console.error('Submission failed:', err);
          if (err instanceof Error) {
              setError(err.message);
          } else {
              setError('An unexpected error occurred');
          }
      } finally {
          setIsSubmitting(false);
      }
  };


  const nextQuestion = () => {
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
  }
  
  if (isLoading) {
      return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <p>Loading user data...</p>
          </div>
      )
  }
  
  const currentQuestion = questions[index];

  if (isSubmitted) {
      return (
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
                  <p className="text-gray-700">Your information has been saved successfully.</p>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="mb-4">
                 <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((index + 1) / questions.length) * 100}%` }}></div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">Question {index + 1} of {questions.length}</p>
            </div>
          
            <Input
                key={currentQuestion.key} 
                data={currentQuestion}
                value={formData[currentQuestion.key]}
                onChange={(value) => handleChange(currentQuestion.key, value)}
            />

            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

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
                  {isSubmitting ? 'Submitting...' : (index === questions.length - 1 ? "Submit" : "Next")}
                </button>
            </div>
        </div>
    </div>
  );
}

