import { useState } from "react";
import { supabase } from "../lib/supabase";
import { getSegment } from "../lib/segments";

export interface Question {
  question: string;
  category: "DAMP" | "STUCK" | "HOT" | "COLD";
}

const questions: Question[] = [
  { category: "COLD", question: "I prefer warm weather, I hate the cold!" },
  { category: "COLD", question: "My lower back feels cold." },
  { category: "COLD", question: "I prefer hot drinks." },
  { category: "COLD", question: "I am prone to low back or knee pain." },
  { category: "COLD", question: "I am prone to low energy and fatigue." },
  { category: "COLD", question: "My menstrual blood has small clots." },
  { category: "COLD", question: "I experience low sex drive." },
  { category: "COLD", question: "I feel overworked and exhausted." },
  { category: "COLD", question: "I feel depressed with no motivation." },
  { category: "COLD", question: "My cycles tend to be longer than 28 days." },

  { category: "HOT", question: "I like cold weather, I hate the heat!" },
  { category: "HOT", question: "I've been told to be hot tempered." },
  { category: "HOT", question: "My cycles tend to be shorter than 28 days." },
  { category: "HOT", question: "I tend to spot before my period." },
  { category: "HOT", question: "I have difficulty sleeping." },
  { category: "HOT", question: "I sometimes suffer from heart palpitations." },
  { category: "HOT", question: "I feel stressed, overwhelmed and/or anxious." },
  { category: "HOT", question: "I suffer from nightsweats." },
  { category: "HOT", question: "I have strong menstrual cramps." },
  { category: "HOT", question: "I am a go go go personality type." },

  { category: "DAMP", question: "I like to eat rich sweet foods." },
  { category: "DAMP", question: "I have a history of PCOS." },
  { category: "DAMP", question: "My legs feel very heavy during my period." },
  { category: "DAMP", question: "I tend to retain liquids." },
  { category: "DAMP", question: "My menstrual flow has mucus." },
  { category: "DAMP", question: "I have phlegm in my throat & sinuses." },
  { category: "DAMP", question: "I have a greasy coating on my tongue." },
  { category: "DAMP", question: "It is hard for me to make decisions." },
  { category: "DAMP", question: "I tend to worry a lot and overthink things." },
  { category: "DAMP", question: "I don't have much muscle tone, I feel weak." },

  { category: "STUCK", question: "I have spotting after my period." },
  { category: "STUCK", question: "I suffer from midcycle ovulation pain." },
  { category: "STUCK", question: "I sometimes have mid ovulation spotting." },
  { category: "STUCK", question: "I have heavy bleeding." },
  { category: "STUCK", question: "I have rib pain and sigh a lot." },
  { category: "STUCK", question: "I grind my teeth at night." },
  { category: "STUCK", question: "I have poor circulation." },
  { category: "STUCK", question: "I feel stressed out." },
  {
    category: "STUCK",
    question: "I have been diagnosed with endometriosis and/or fibroids.",
  },
  {
    category: "STUCK",
    question: "My menstrual cycles start then stop then start again.",
  },
];

const categoryColorMap: { [key: string]: string } = {
  HOT: "text-clay-600",
  DUMP: "text-blush-600",
  COLD: "text-sky-600",
  STUCK: "text-cloud-100",
  HEALTHY: "text-sage-600",
};

export default function QuizForm() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(undefined);
  const [scores, setScores] = useState({
    DAMP: 0,
    STUCK: 0,
    HOT: 0,
    COLD: 0,
  });
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentQuestionIndex(0);
  };

  // Update handleAnswer function
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = {
      ...answers,
      [currentQuestionIndex]: {
        category: currentQuestion.category,
        question: currentQuestion.question,
        answer: answer,
      },
    };
    setAnswers(newAnswers);

    const newScores = { ...scores };
    if (answer === 1) {
      newScores[currentQuestion.category]++;
    }
    if (answer === 2) {
      newScores[currentQuestion.category] += 2;
    }
    setScores(newScores);

    // Mostrar formulario de email solo cuando se completen todas las preguntas
    if (currentQuestionIndex === questions.length - 1) {
      setShowEmailForm(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting email...");
    console.log("E", e);
    console.log("Email", email);
    console.log("Name", name);

    submitResults(name, email, scores, answers);
  };

  const submitResults = async (
    name: string,
    email: string,
    finalScores: typeof scores,
    finalAnswers: typeof answers
  ) => {
    try {
      const category = getWinningCategory();
      const segment = getSegment(category);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("scores", JSON.stringify(finalScores));
      formData.append("answers", JSON.stringify(finalAnswers));
      formData.append("category", category);
      formData.append("segment_id", segment.id);

      const response = await fetch("/quiz", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      setShowEmailForm(false);
      setShowResult(true);
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your results.");
    }
  };

  const getWinningCategory = () => {
    const allZero = Object.values(scores).every((score) => score === 0);
    if (allZero) {
      return "HEALTHY";
    }
    return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  };

  const startQuiz = () => {
    setShowWelcome(false);
    setCurrentQuestionIndex(0);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Remove current answer
      const newAnswers = { ...answers };
      const prevAnswer = newAnswers[currentQuestionIndex - 1];

      // Update scores if previous answer was "yes"
      if (prevAnswer.answer) {
        const newScores = { ...scores };
        newScores[prevAnswer.category]--;
        setScores(newScores);
      }

      // Remove current answer from answers object
      delete newAnswers[currentQuestionIndex];
      setAnswers(newAnswers);

      // Go back to previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (showWelcome) {
    return (
      <div className="max-w-xs md:max-w-3xl mx-auto mt-10">
        <div className="flex flex-col object-cover md:flex-row items-center gap-x-14">
          <div className="mb-6 object-cover h-[40svh] md:h-full overflow-hidden md:w-1/2 flex items-center justify-center">
            <img
              src="/mobile.jpg"
              alt="Womb illustration"
              className="w-full rounded-lg shadow-lg object-cover object-center"
            />
          </div>
          <div className="md:w-1/2 space-y-12">
            <h1 className="text-4xl text-golden-600 font-custom font-bold">
              UNLOCK the SECRETS of your WOMB
            </h1>
            <p className="text-xl font-custom font-bold">
              Take the holistic quiz & discover your unique womb type to receive
              bespoke self care practices.
            </p>
            <button
              onClick={startQuiz}
              className="w-full bg-clay-600 py-3 px-6 rounded-lg text-lg hover:bg-clay-700 transition-colors duration-300 font-custom font-bold"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showEmailForm) {
    return (
      <form
        onSubmit={handleEmailSubmit}
        className="w-full md:max-w-md mx-auto mt-10 p-6 bg-power-700 rounded-lg shadow-none md:shadow-md shadow-rich_black-100/60"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-custom">
            Enter your name
          </label>
          <input
            type="text"
            id="text"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus border-power-950/50 bg-rich_black-100/10 hover:bg-rich_black-100/20 hover:border-power-950/80 transition-colors duration-300 ease-in-out"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <label htmlFor="email" className="block mb-2 font-custom">
            Enter your email to see the result
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus border-power-950/50 bg-rich_black-100/10 hover:bg-rich_black-100/20 hover:border-power-950/80 transition-colors duration-300 ease-in-out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-clay-600 py-2 px-4 rounded hover:bg-clay-700 transition-colors duration-300 ease-out font-custom font-bold"
        >
          Submit
        </button>
      </form>
    );
  }

  if (showResult) {
    const category = getWinningCategory();
    const categoryColorClass = categoryColorMap[category] || "text-cloud-100";
    return (
      <div className="max-w-xs md:max-w-3xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row items-center gap-x-14">
          <div className="mb-6 md:w-1/2">
            <img
              src={`/${category}.jpg`}
              alt="Womb illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl mb-1 font-custom">
              Sister, here is your result!
            </h2>
            <h1
              className={`text-xl mb-6 font-custom font-bold ${categoryColorClass}`}
            >
              {category} Womb
            </h1>
            <p className="mb-4 font-custom">
              Get your Womb Mini Masterclass & Self Care Practices for your womb
            </p>
            <a
              href={`/${category.toLowerCase()}_freebie.pdf`}
              className="inline-block bg-clay-600 px-4 py-2 rounded hover:bg-power-500 transition-colors duration-300 ease-out"
              download
            >
              Download
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-xs md:max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md shadow-rich_black-100/60">
      <div className="relative mb-6">
        {/* ESTO NO ES VISIBLE PARA EL USER */}
        {/* <div className="absolute -left-96 bg-red-500 rounded-xl p-2">
          <p>Esto no seria visible para el user</p>
          <br />
          <p>Scores: {JSON.stringify(scores)}</p>
        </div> */}
        <div className="absolute right-0 font-custom font-bold">
          {currentQuestionIndex + 1}
        </div>
        <h2 className="text-xl w-11/12 mb-4 min-h-36 text-cloud-100 font-custom font-bold">
          {currentQuestion.question}
        </h2>
      </div>
      <div className="space-y-4">
        <button
          onClick={() => handleAnswer(2)}
          className="w-full py-2 px-4 rounded bg-clay-600 hover:bg-clay-700 transition-colors duration-300 ease-in-out font-custom font-bold"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(0)}
          className="w-full py-2 px-4 rounded hover:bg-rich_black-100/50 bg-rich_black-100/30 transition-colors duration-300 ease-in-out font-custom font-bold"
        >
          No
        </button>
        <button
          onClick={() => handleAnswer(1)}
          className="w-full py-2 px-4 rounded hover:bg-rich_black-100/50 bg-rich_black-100/30 transition-colors duration-300 ease-in-out font-custom font-bold"
        >
          Does not apply
        </button>
        {currentQuestionIndex > 0 && (
          <button
            onClick={handleBack}
            className="w-full py-2 px-4 rounded hover:bg-rich_black-100/50 bg-rich_black-100/30 transition-colors duration-300 ease-in-out font-custom font-bold"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
