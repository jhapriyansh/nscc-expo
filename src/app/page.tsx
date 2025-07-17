"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, User, RotateCcw, Play } from "lucide-react"

interface Question {
  id: number
  question: string
  code?: string
  options: string[]
  correct: number
  difficulty: "easy" | "hard"
}

interface QuizResult {
  name: string
  score: number
  totalQuestions: number
  timeSpent: number
  date: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What will be the output of the following Python code?",
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Error", "None"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Which of the following is NOT a valid JavaScript data type?",
    options: ["undefined", "boolean", "float", "symbol"],
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 3,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 4,
    question: "In React, what hook is used to manage component state?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 5,
    question: "What will this C++ code output?",
    code: `#include <iostream>
using namespace std;
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    cout << *(arr + 3);
    return 0;
}`,
    options: ["1", "3", "4", "Error"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 6,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 7,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
    correct: 0,
    difficulty: "easy",
  },
  {
    id: 8,
    question: "In Python, which method is used to add an element to a set?",
    options: ["append()", "add()", "insert()", "push()"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 9,
    question: "What is the space complexity of the following recursive function?",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
    options: ["O(1)", "O(n)", "O(2^n)", "O(log n)"],
    correct: 1,
    difficulty: "hard",
  },
  {
    id: 10,
    question: "Which HTTP status code indicates 'Not Found'?",
    options: ["200", "404", "500", "403"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 11,
    question: "What is the output of this JavaScript code?",
    code: `console.log(typeof null);`,
    options: ["null", "undefined", "object", "boolean"],
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 12,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 13,
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 14,
    question: "In Git, which command is used to create a new branch?",
    options: ["git branch <name>", "git create <name>", "git new <name>", "git make <name>"],
    correct: 0,
    difficulty: "easy",
  },
  {
    id: 15,
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correct: 1,
    difficulty: "hard",
  },
]

type QuizState = "welcome" | "quiz" | "results"

export default function QuizApp() {
  const [state, setState] = useState<QuizState>("welcome")
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const [userName, setUserName] = useState("")
  const [isAnswered, setIsAnswered] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const startQuiz = () => {
    const shuffledQuestions = shuffleArray(questions).slice(0, 10)
    setCurrentQuestions(shuffledQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(30)
    setTotalTimeSpent(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setState("quiz")
  }

  const selectAnswer = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    if (answerIndex === currentQuestions[currentQuestionIndex].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      nextQuestion()
    }, 1000)
  }

  const nextQuestion = useCallback(() => {
    setTotalTimeSpent((prev) => prev + (30 - timeLeft))

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setTimeLeft(30)
    } else {
      setState("results")
    }
  }, [currentQuestionIndex, currentQuestions.length, timeLeft])

  useEffect(() => {
    if (state === "quiz" && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true)
      setTimeout(() => {
        nextQuestion()
      }, 1000)
    }
  }, [timeLeft, state, isAnswered, nextQuestion])

  const submitResults = () => {
    const result: QuizResult = {
      name: userName,
      score,
      totalQuestions: currentQuestions.length,
      timeSpent: totalTimeSpent,
      date: new Date().toISOString(),
    }

    const existingResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
    existingResults.push(result)
    localStorage.setItem("quizResults", JSON.stringify(existingResults))

    setShowResults(true)
  }

  const resetQuiz = () => {
    setState("welcome")
    setShowResults(false)
    setUserName("")
  }

  const currentQuestion = currentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100

  if (state === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-accent-light flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Newton School Coding Club Quiz
            </CardTitle>
            <p className="text-gray-600">Test your coding knowledge with 10 challenging questions!</p>
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
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (state === "quiz" && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-accent-light p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-4 h-4 text-primary" />
                <span className={`${timeLeft <= 10 ? "text-red-500" : "text-gray-600"}`}>{timeLeft}s</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">{currentQuestion.question}</CardTitle>
              {currentQuestion.code && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">{currentQuestion.code}</pre>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium "

                if (isAnswered) {
                  if (index === currentQuestion.correct) {
                    buttonClass += "bg-green-100 border-green-500 text-green-800"
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-red-100 border-red-500 text-red-800"
                  } else {
                    buttonClass += "bg-gray-100 border-gray-300 text-gray-600"
                  }
                } else {
                  buttonClass +=
                    "bg-white border-gray-200 hover:border-primary hover:bg-primary-light/20 hover:scale-[1.02] hover:shadow-md"
                }

                return (
                  <button key={index} onClick={() => selectAnswer(index)} disabled={isAnswered} className={buttonClass}>
                    <span className="font-semibold mr-3 text-primary">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (state === "results") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-accent-light flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!showResults ? (
              <>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {score}/{currentQuestions.length}
                  </div>
                  <p className="text-gray-600">Time spent: {Math.round(totalTimeSpent)}s</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Enter your name to save results:</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="rounded-xl border-2 focus:border-primary"
                  />
                </div>

                <Button
                  onClick={submitResults}
                  disabled={!userName.trim()}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <User className="w-5 h-5 mr-2" />
                  Submit Results
                </Button>
              </>
            ) : (
              <>
                <div className="text-center space-y-4">
                  <p className="text-lg font-semibold text-gray-800">Thanks, {userName}!</p>
                  <p className="text-gray-600">Your results have been saved successfully.</p>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Final Score: {score}/{currentQuestions.length}
                  </div>
                </div>

                <Button
                  onClick={resetQuiz}
                  className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent-dark hover:to-primary-dark text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
