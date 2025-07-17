"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RotateCcw, Trophy } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

interface QuizResult {
  name: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  date: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("quizResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  const gradientBg =
    "bg-gradient-to-br from-[#43DCBD] via-[#4BBDC6] to-[#5C96DA]";
  const gradientText =
    "bg-gradient-to-r from-[#43DCBD] to-[#5C96DA] bg-clip-text text-transparent";

  return (
    <div className={`min-h-screen bg-transparent p-4`}>
        <div className="-z-1">
                  <ParticlesBackground />
                </div>
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-3">
            <div className="w-16 h-16 bg-[#4BBDC6] rounded-full mx-auto flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className={`text-2xl font-bold ${gradientText}`}>
              Results
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {results.length === 0 ? (
              <p className="text-center text-gray-600">No results found.</p>
            ) : (
              <ul className="space-y-3">
                {results
                  .slice()
                  .sort((a, b) => {
                    if (b.score !== a.score) {
                      return b.score - a.score; // Higher score first
                    }
                    return a.timeSpent - b.timeSpent; // Lower time first
                  })
                  .map((res, i) => (
                    <li
                      key={i}
                      className="bg-white p-4 rounded-xl shadow border border-gray-200"
                    >
                      <div className="flex justify-between text-sm text-gray-800">
                        <span className="font-semibold">{res.name}</span>
                        <span>{new Date(res.date).toLocaleString()}</span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm text-gray-600">
                        <span>
                          Score:{" "}
                          <span className="font-semibold text-[#5C96DA]">
                            {res.score}/{res.totalQuestions}
                          </span>
                        </span>
                        <span>Time: {res.timeSpent}s</span>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
