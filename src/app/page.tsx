"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy, User, RotateCcw, Play } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correct: number;
  difficulty: "easy" | "hard";
}

interface QuizResult {
  name: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  date: string;
}

const questions: Question[] = [
  // --- Python Easy ---
  {
    id: 1,
    question: "What is the output of the following code?",
    code: "x = [1, 2, 3]\nprint(x[1] * 3)",
    options: ["3", "6", "Error", "1"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 2,
    question:
      'Fill in the blank: def greet(name): print("Hello, " + ___ + "!")',
    options: ['"name"', "name", "'name'", "None"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 3,
    question: 'What is the output of print("2" + "3")?',
    options: ["5", "23", '"23"', "Error"],
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 4,
    question:
      "What is the output of this code?\n\na = 10\nb = a\na = 5\nprint(b)",
    options: ["5", "10", "a", "Error"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 5,
    question:
      "Find the error in this code:\n\nfor i in range(1, 5)\n    print(i)",
    options: [
      "SyntaxError: missing parentheses",
      "Missing colon after for loop",
      "Indentation Error",
      "No Error",
    ],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 6,
    question: "What is the output of print(len([1, 2, 3]))?",
    options: ["1", "2", "3", "Error"],
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 7,
    question: "What is the output of print(bool(0))?",
    options: ["True", "False", "None", "0"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 8,
    question:
      "Fill in the blank to complete the function:\n\ndef square(n): return n ___ n",
    options: ["*", "**", "+", "^"],
    correct: 0,
    difficulty: "easy",
  },
  {
    id: 9,
    question: 'What is the output of print("a" * 4)?',
    options: ["aaaa", "a4", "Error", "None"],
    correct: 0,
    difficulty: "easy",
  },
  {
    id: 10,
    question:
      "What will this code print?\n\nx = [1, 2, 3]\nx.append(4)\nprint(x)",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"],
    correct: 1,
    difficulty: "easy",
  },

  // --- JavaScript Easy ---
  {
    id: 11,
    question: 'What is the output of console.log("5" + 2)?',
    options: ["7", "52", '"52"', "Error"],
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 12,
    question:
      'Fill in the blank: function greet(name) { console.log("Hello, " + ___ + "!") }',
    options: ['"name"', "name", "'name'", "None"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 13,
    question:
      "What is the output of this code?\n\nlet a = 10; let b = a; a = 5; console.log(b);",
    options: ["5", "10", "a", "Error"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 14,
    question: "What is the output of console.log([1, 2, 3].length)?",
    options: ["1", "2", "3", "Error"],
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 15,
    question: 'Find the error: if (true) console.log("Hi") console.log("Bye")',
    options: [
      "Missing semicolon",
      "Add {} to group block",
      "Wrong condition",
      "No Error",
    ],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 16,
    question: "What is the output of console.log(typeof null)?",
    options: ["null", "object", "undefined", "boolean"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 17,
    question: "What is the result of console.log(3 > 2 > 1)?",
    options: ["true", "false", "1", "undefined"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 18,
    question: "Fill in the blank: let x = 10; x ___ 5;",
    options: ["+", "=+", "+=", "++"],
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 19,
    question: "What is the output of console.log(2 ** 3)?",
    options: ["6", "8", "9", "Error"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 20,
    question:
      "What will this print?\n\nlet x = [1, 2]; x.push(3); console.log(x);",
    options: ["[1, 2]", "[3]", "[1, 2, 3]", "Error"],
    correct: 2,
    difficulty: "easy",
  },

  // --- Python Hard ---
  {
    id: 21,
    question:
      "What is the output of this code?\n\ndef func(a, b=[]): b.append(a); return b\nprint(func(1))\nprint(func(2))",
    options: ["[1], [2]", "[1], [1, 2]", "[1, 2], [1, 2]", "Error"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 22,
    question:
      "Fill in the blank to complete the list comprehension:\n\nsquares = [x ___ 2 for x in range(5)]",
    options: ["*", "**", "^", "%"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 23,
    question:
      "What does this function return?\n\ndef foo(x): if x == 0: return 0; return x + foo(x - 1)\nprint(foo(3))",
    options: ["3", "6", "0", "1"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 24,
    question: "Find the error in this function:\n\ndef f(x): return x * 2",
    options: ["No error", "Missing return", "IndentationError", "TypeError"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 25,
    question:
      "What will be printed?\n\nx = [1, 2, 3]; y = x; y.append(4); print(x)",
    options: ["[1, 2, 3]", "[4]", "[1, 2, 3, 4]", "Error"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 26,
    question:
      "What is the output of this list comprehension?\n\n[i for i in range(5) if i % 2]",
    options: ["[0, 2, 4]", "[1, 3]", "[0, 1, 2, 3, 4]", "[]"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 27,
    question: "Fill in the blank: def is_even(n): return n % 2 ___ 0",
    options: ["=", "!=", "==", "<="],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 28,
    question: "What happens when you run this code?\n\nx = (1, 2); x[0] = 5",
    options: ["(5, 2)", "[5, 2]", "Error: Tuples are immutable", "None"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 29,
    question:
      "What will be printed?\n\ndef f(): global x; x = 5\nf(); print(x)",
    options: ["Error", "None", "5", "x"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 30,
    question: 'Find the error in this code:\n\nprint("Hello" + 5)',
    options: [
      "No error",
      "Cannot add string and int",
      "SyntaxError",
      "Missing semicolon",
    ],
    correct: 1,
    difficulty: "hard",
  },

  // --- JavaScript Hard ---
  {
    id: 31,
    question:
      "What is the output?\n\nlet x = [1]; let y = x; y.push(2); console.log(x);",
    options: ["[1]", "[2]", "[1, 2]", "Error"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 32,
    question:
      "What is the output?\n\nlet a = [1, 2, 3]; let b = [...a]; b.push(4); console.log(a);",
    options: ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "Error"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 33,
    question: "Guess the output: console.log(1 + '2' + 3);",
    options: ["6", "123", '"123"', "NaN"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 34,
    question: "What is the result of 0.1 + 0.2 == 0.3?",
    options: ["true", "false", "Error", "NaN"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 35,
    question: "Fill in the blank: function add(a, b) { return a ___ b; }",
    options: ["+", "*", "-", "/"],
    correct: 0,
    difficulty: "hard",
  },
  {
    id: 36,
    question:
      "Guess the output: const obj = { a: 1 }; Object.freeze(obj); obj.a = 5; console.log(obj.a);",
    options: ["5", "1", "undefined", "Error"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 37,
    question: "Find the error: const x; x = 5;",
    options: [
      "No error",
      "Missing initializer",
      "x is not defined",
      "SyntaxError: Unexpected token",
    ],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 38,
    question:
      "What is printed?\n\nlet a = 10; (function() { let a = 5; console.log(a); })();",
    options: ["10", "5", "undefined", "Error"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 39,
    question: "Guess the output: console.log([1, 2] == [1, 2]);",
    options: ["true", "false", "Error", "undefined"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 40,
    question:
      "What is logged?\n\nconsole.log(typeof undefined == typeof null);",
    options: ["true", "false", "undefined", "object"],
    correct: 0,
    difficulty: "hard",
  },
];

type QuizState = "welcome" | "quiz" | "results";

export default function QuizApp() {
  const [state, setState] = useState<QuizState>("welcome");
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [userName, setUserName] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    const shuffledQuestions = shuffleArray(questions).slice(0, 10);
    setCurrentQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setTotalTimeSpent(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setState("quiz");
  };

  const selectAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    if (answerIndex === currentQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = useCallback(() => {
    setTotalTimeSpent((prev) => prev + (30 - timeLeft));
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setState("results");
    }
  }, [currentQuestionIndex, currentQuestions.length, timeLeft]);

  useEffect(() => {
    if (state === "quiz" && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    }
  }, [timeLeft, state, isAnswered, nextQuestion]);

  const submitResults = () => {
    const result: QuizResult = {
      name: userName,
      score,
      totalQuestions: currentQuestions.length,
      timeSpent: totalTimeSpent,
      date: new Date().toISOString(),
    };
    const existingResults = JSON.parse(
      localStorage.getItem("quizResults") || "[]"
    );
    existingResults.push(result);
    localStorage.setItem("quizResults", JSON.stringify(existingResults));
    setShowResults(true);
  };

  const resetQuiz = () => {
    setState("welcome");
    setShowResults(false);
    setUserName("");
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

  const gradientBg =
    "bg-gradient-to-br from-[#43DCBD] via-[#4BBDC6] to-[#5C96DA]";
  const gradientText =
    "bg-gradient-to-r from-[#43DCBD] to-[#5C96DA] bg-clip-text text-transparent";

  if (state === "welcome") {
    return (
      <div
        className={`min-h-screen bg-transparent flex items-center justify-center p-4`}
      >
        <div className="-z-1">
          <ParticlesBackground />
        </div>
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-16 h-16 bg-[#43DCBD] overflow-hidden rounded-full mx-auto flex items-center justify-center">
              <img src="nscc.png" className="w-40" alt="nscc-logo" />
            </div>
            <CardTitle className={`text-2xl font-bold ${gradientText}`}>
              Newton School Coding Club Quiz
            </CardTitle>
            <p className="text-gray-600">
              Test your coding knowledge with 10 challenging questions!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>30 seconds per question</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>10 questions total</span>
              </div>
            </div>
            <Button
              onClick={startQuiz}
              className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{
                background: "linear-gradient(to right, #43DCBD, #5C96DA)",
              }}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === "quiz" && currentQuestion) {
    return (
      <div className={`min-h-screen bg-transparent p-4`}>
        <div className="-z-1">
          <ParticlesBackground />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-4 h-4 text-[#5C96DA]" />
                <span
                  className={`${
                    timeLeft <= 10 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {currentQuestion.question}
              </CardTitle>
              {currentQuestion.code && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                    {currentQuestion.code}
                  </pre>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass =
                  "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ";

                if (isAnswered) {
                  if (index === currentQuestion.correct) {
                    buttonClass +=
                      "bg-green-100 border-green-500 text-green-800";
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                  }
                } else {
                  buttonClass +=
                    "bg-white border-gray-200 hover:border-[#43DCBD] hover:bg-[#43DCBD]/20 hover:scale-[1.02] hover:shadow-md";
                }

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <span className="font-semibold mr-3 text-[#5C96DA]">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (state === "results") {
    return (
      <div
        className={`min-h-screen bg-transparent flex items-center justify-center p-4`}
      >
        <div className="-z-1">
          <ParticlesBackground />
        </div>
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 bg-[#4BBDC6] rounded-full mx-auto flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Quiz Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!showResults ? (
              <>
                <div className="text-center space-y-4">
                  <div className={`text-4xl font-bold ${gradientText}`}>
                    {score}/{currentQuestions.length}
                  </div>
                  <p className="text-gray-600">
                    Time spent: {Math.round(totalTimeSpent)}s
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter your name to save results:
                  </label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="rounded-xl border-2 focus:border-[#43DCBD]"
                  />
                </div>

                <Button
                  onClick={submitResults}
                  disabled={!userName.trim()}
                  className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{
                    background: "linear-gradient(to right, #4BBDC6, #5C96DA)",
                  }}
                >
                  <User className="w-5 h-5 mr-2" />
                  Submit Results
                </Button>
              </>
            ) : (
              <>
                <div className="text-center space-y-4">
                  <p className="text-lg font-semibold text-gray-800">
                    Thanks, {userName}!
                  </p>
                  <p className="text-gray-600">
                    Your results have been saved successfully.
                  </p>
                  <div className={`text-2xl font-bold ${gradientText}`}>
                    Final Score: {score}/{currentQuestions.length}
                  </div>
                </div>

                <Button
                  onClick={resetQuiz}
                  className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{
                    background: "linear-gradient(to right, #5C96DA, #43DCBD)",
                  }}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
