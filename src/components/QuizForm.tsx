import { useState } from "react";

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

const PUBLIC_PATH_URL = import.meta.env.PUBLIC_PATH_URL;

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
      // Does not apply
      newScores[currentQuestion.category]++;
    }
    if (answer === 2) {
      // Yes
      newScores[currentQuestion.category] += 2;
    }
    setScores(newScores);

    // Only show email form when all questions are answered
    if (currentQuestionIndex === questions.length - 1) {
      setShowEmailForm(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitResults(scores, answers);
  };

  const submitResults = async (
    finalScores: typeof scores,
    finalAnswers: typeof answers
  ) => {
    try {
      // const response = await fetch("/api/quiz-results", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     scores: finalScores,
      //     answers: finalAnswers,
      //   }),
      // });

      const response = { ok: true };

      if (response.ok) {
        alert(`(Esto no seria visible para el user)
          Email recolectado con éxito`);
        // print final scores and answers
        console.log("Scores", finalScores);
        console.log("Answers", finalAnswers);

        setShowEmailForm(false);
        setShowResult(true);
      }
    } catch (error) {
      console.error("Error submitting results:", error);
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

      // Update scores based on the previous answer
      if (prevAnswer && prevAnswer.answer) {
        const newScores = { ...scores };
        if (prevAnswer.answer === 1) {
          // If previous answer was "Does not apply"
          newScores[prevAnswer.category]--;
        } else if (prevAnswer.answer === 2) {
          // If previous answer was "Yes"
          newScores[prevAnswer.category] -= 2;
        }
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
          <div className="mb-6 object-cover h-[40svh] md:h-full overflow-hidden md:w-1/2">
            <img
              src={`/mobile.jpg`}
              alt="Womb illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-12">
            <h1 className="text-4xl text-golden-600 font-HVFlorentino">
              UNLOCK <p className="italic inline">the</p> SECRETS{" "}
              <p className="italic inline">of your</p> WOMB
            </h1>
            <p className="text-xl font-FiguraSans leading-normal">
              Take the holistic quiz & discover your unique womb type to receive
              bespoke self care practices.
            </p>
            <button
              onClick={startQuiz}
              className="w-full bg-clay-600 py-3 px-6 rounded-lg text-lg hover:bg-clay-500 transition-colors duration-300 font-FiguraSans"
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
        className="min-w-48 md:min-w-80 md:w-[450px] p-6 bg-power-700 rounded-lg shadow-md shadow-rich_black-100/60"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-FiguraSans">
            Enter your name
          </label>
          <input
            type="text"
            id="text"
            required
            className="w-full px-3 py-2 border rounded bg-transparent focus:outline-none focus"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <label htmlFor="email" className="block mb-2 font-FiguraSans">
            Enter your email to see the result
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-3 py-2 border bg-transparent rounded focus:outline-none focus"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-clay-600 py-2 px-4 rounded hover:bg-clay-500 transition-colors duration-300 ease-out font-FiguraSans"
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
      <div className="max-w-xs md:max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-x-14">
          <div className="mb-6 md:w-1/2">
            <img
              src={`/${category}.jpg`}
              alt="Womb illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl mb-1 font-HVFlorentino text-golden-600">
              SISTER, <p className="italic inline">here is your result!</p>
            </h2>
            <h1
              className={`text-xl mb-6 font-HVFlorentino ${categoryColorClass}`}
            >
              {category} Womb
            </h1>
            <p className="mb-4 font-FiguraSans">
              Get your Womb Mini Masterclass & Self Care Practices for your womb
              {/* <br />
              <br />
              Once homeless on the streets of Paris, entrepreneur Ramdane
              Touhami now presides over some of the city’s finest addresses with
              his beauty empire. A visit to the small, sophisticated Milanese
              studio of Patrizio Gola & Guglielmo Giagnotti. */}
            </p>
            <a
              href={`${PUBLIC_PATH_URL}/${category}.pdf`}
              className="inline-block bg-clay-600 px-4 py-2 rounded hover:bg-power-500 transition-colors duration-300 ease-out font-FiguraSans"
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
    <div className="min-w-48 md:min-w-80 md:w-[450px] p-6 rounded-lg shadow-md shadow-rich_black-100/60">
      <div className="relative mb-6">
        {/* <div className="absolute -left-96 bg-red-500 rounded-xl p-2">
          <p>Esto no seria visible para el user</p>
          <br />
          <p>Scores: {JSON.stringify(scores)}</p>
        </div> */}
        <div className="absolute right-0 font-FiguraSans">
          {currentQuestionIndex + 1}
        </div>
        <h2 className="text-xl w-11/12 mb-4 min-h-36 text-cloud-100 font-FiguraSans">
          {currentQuestion.question}
        </h2>
      </div>
      <div className="space-y-4">
        <button
          onClick={() => handleAnswer(2)}
          className="w-full py-2 px-4 bg-clay-600 rounded hover:bg-clay-500 transition-colors duration-300 ease-out font-FiguraSans"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(0)}
          className="w-full py-2 px-4 rounded hover:bg-power-600 bg-power-500 transition-colors duration-300 ease-out font-FiguraSans"
        >
          No
        </button>
        <button
          onClick={() => handleAnswer(1)}
          className="w-full py-2 px-4 rounded hover:bg-power-600 bg-power-500 transition-colors duration-300 ease-out font-FiguraSans"
        >
          Does not apply
        </button>
        {currentQuestionIndex > 0 && (
          <button
            onClick={handleBack}
            className="w-full py-2 px-4 bg-power-500 rounded hover:bg-power-600 transition-colors duration-300 ease-out  font-FiguraSans"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
