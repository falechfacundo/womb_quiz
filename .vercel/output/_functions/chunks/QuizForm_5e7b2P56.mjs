import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import './supabase_CAfStfkl.mjs';

const questions = [
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
    question: "I have been diagnosed with endometriosis and/or fibroids."
  },
  {
    category: "STUCK",
    question: "My menstrual cycles start then stop then start again."
  }
];
const categoryColorMap = {
  HOT: "text-clay-600",
  DUMP: "text-blush-600",
  COLD: "text-sky-600",
  STUCK: "text-cloud-100",
  HEALTHY: "text-sage-600"
};
const SEGMENT_IDS = {
  COLD: "67a8fd4bf7b74c74c1a3dbb8",
  // Free Cold Womb
  HOT: "67a8fd5f7d5932c418bc4a1d",
  // Free Hot womb
  DAMP: "67a8fd6bc699d3cc3a2e60a9",
  // Free Damp Womb
  STUCK: "67a8fdc73355bd0723c35cae",
  // Free Stuck Womb
  HEALTHY: "67a8fdddbd78f9c284e47bfc"
  // Free Healthy Womb
};
function QuizForm() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(void 0);
  const [scores, setScores] = useState({
    DAMP: 0,
    STUCK: 0,
    HOT: 0,
    COLD: 0
  });
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});
  const handleAnswer = (answer) => {
    const currentQuestion2 = questions[currentQuestionIndex];
    const newAnswers = {
      ...answers,
      [currentQuestionIndex]: {
        category: currentQuestion2.category,
        question: currentQuestion2.question,
        answer
      }
    };
    setAnswers(newAnswers);
    const newScores = { ...scores };
    console.log("New Scores", newScores);
    console.log("Current Question", currentQuestion2);
    if (answer == 1) {
      newScores[currentQuestion2.category]++;
    }
    if (answer == 2) {
      newScores[currentQuestion2.category]++;
      newScores[currentQuestion2.category]++;
    }
    setScores(newScores);
    const maxScore = Math.max(...Object.values(newScores));
    if (maxScore >= 18 || currentQuestionIndex === questions.length - 1) {
      setShowEmailForm(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting email...");
    console.log("E", e);
    console.log("Email", email);
    console.log("Name", name);
    submitResults(name, email, scores, answers);
  };
  const submitResults = async (name2, email2, finalScores, finalAnswers) => {
    try {
      const formData = new FormData();
      formData.append("email", email2);
      formData.append("name", name2);
      formData.append("scores", JSON.stringify(finalScores));
      formData.append("answers", JSON.stringify(finalAnswers));
      formData.append("category", getWinningCategory());
      formData.append("segment_id", SEGMENT_IDS[getWinningCategory()]);
      const response = await fetch("/quiz", {
        method: "POST",
        body: formData
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
    return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
  };
  const startQuiz = () => {
    setShowWelcome(false);
    setCurrentQuestionIndex(0);
  };
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const newAnswers = { ...answers };
      const prevAnswer = newAnswers[currentQuestionIndex - 1];
      if (prevAnswer.answer) {
        const newScores = { ...scores };
        newScores[prevAnswer.category]--;
        setScores(newScores);
      }
      delete newAnswers[currentQuestionIndex];
      setAnswers(newAnswers);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  if (showWelcome) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-xs md:max-w-3xl mx-auto mt-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col object-cover md:flex-row items-center gap-x-14", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 object-cover h-[40svh] md:h-full overflow-hidden md:w-1/2", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/public/mobile.jpg",
          alt: "Womb illustration",
          className: "w-full rounded-lg shadow-lg"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 space-y-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl text-golden-600 font-custom font-bold", children: "UNLOCK the SECRETS of your WOMB" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl font-custom font-bold", children: "Take the holistic quiz & discover your unique womb type to receive bespoke self care practices." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: startQuiz,
            className: "w-full bg-clay-600 py-3 px-6 rounded-lg text-lg hover:bg-clay-500 transition-colors duration-300 font-custom font-bold",
            children: "Start Quiz"
          }
        )
      ] })
    ] }) });
  }
  if (showEmailForm) {
    return /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleEmailSubmit,
        className: "max-w-xs md:max-w-md mx-auto mt-10 p-6 bg-power-700 rounded-lg shadow-md shadow-rich_black-100/60",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block mb-2 font-custom", children: "Enter your name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "text",
                required: true,
                className: "w-full px-3 py-2 border rounded bg-transparent focus:outline-none focus",
                value: name,
                onChange: (e) => setName(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block mb-2 font-custom", children: "Enter your email to see the result" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                id: "email",
                required: true,
                className: "w-full px-3 py-2 border bg-transparent rounded focus:outline-none focus",
                value: email,
                onChange: (e) => setEmail(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full bg-clay-600 py-2 px-4 rounded hover:bg-clay-500 transition-colors duration-300 ease-out font-custom font-bold",
              children: "Submit"
            }
          )
        ]
      }
    );
  }
  if (showResult) {
    const category = getWinningCategory();
    const categoryColorClass = categoryColorMap[category] || "text-cloud-100";
    return /* @__PURE__ */ jsx("div", { className: "max-w-xs md:max-w-3xl mx-auto mt-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-x-14", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 md:w-1/2", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `/public/${category}.jpg`,
          alt: "Womb illustration",
          className: "w-full rounded-lg shadow-lg"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 space-y-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-1 font-custom", children: "Sister, here is your result!" }),
        /* @__PURE__ */ jsxs(
          "h1",
          {
            className: `text-xl mb-6 font-custom font-bold ${categoryColorClass}`,
            children: [
              category,
              " Womb"
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mb-4 font-custom", children: "Get your Womb Mini Masterclass & Self Care Practices for your womb" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/public/${category.toLowerCase()}_freebie.pdf`,
            className: "inline-block bg-clay-600 px-4 py-2 rounded hover:bg-power-500 transition-colors duration-300 ease-out",
            download: true,
            children: "Download"
          }
        )
      ] })
    ] }) });
  }
  const currentQuestion = questions[currentQuestionIndex];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-xs md:max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md shadow-rich_black-100/60", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 font-custom font-bold", children: currentQuestionIndex + 1 }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl w-11/12 mb-4 min-h-36 text-cloud-100 font-custom font-bold", children: currentQuestion.question })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleAnswer(2),
          className: "w-full py-2 px-4 bg-clay-600 rounded hover:bg-clay-500 transition-colors duration-300 ease-out font-custom font-bold",
          children: "Yes"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleAnswer(0),
          className: "w-full py-2 px-4 rounded hover:bg-power-600 bg-power-500 transition-colors duration-300 ease-out font-custom font-bold",
          children: "No"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleAnswer(1),
          className: "w-full py-2 px-4 rounded hover:bg-power-600 bg-power-500 transition-colors duration-300 ease-out font-custom font-bold",
          children: "Does not apply"
        }
      ),
      currentQuestionIndex > 0 && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleBack,
          className: "w-full py-2 px-4 bg-power-500 rounded hover:bg-power-600 transition-colors duration-300 ease-out  font-custom font-bold",
          children: "Back"
        }
      )
    ] })
  ] });
}

export { QuizForm as Q };
