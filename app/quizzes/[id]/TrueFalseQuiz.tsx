"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Home,
  Trophy,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const TrueFalseQuiz = () => {
  const router = useRouter();
  const [startQuiz, setStartQuiz] = useState(false);

  // Dummy quiz data
  const quiz = {
    title: "JavaScript Fundamentals",
    description:
      "Test your knowledge of JavaScript core concepts including variables, functions, objects, and modern ES6+ features.",
    timeEstimate: "5 minutes",
    questions: [
      {
        id: 1,
        question: "JavaScript is a statically typed language.",
        correctAnswer: false,
        explanation:
          "JavaScript is a dynamically typed language, which means variable types are determined at runtime rather than compile time.",
      },
      {
        id: 2,
        question: "The === operator checks both value and type in JavaScript.",
        correctAnswer: true,
        explanation:
          "The strict equality operator (===) checks both value and data type without performing type conversion.",
      },
      {
        id: 3,
        question: "Arrays in JavaScript can store different types of data.",
        correctAnswer: true,
        explanation:
          "JavaScript arrays can store mixed data types including strings, numbers, objects, and even other arrays.",
      },
      {
        id: 4,
        question: "JavaScript has block-scoped variables.",
        correctAnswer: true,
        explanation:
          "With the introduction of let and const in ES6, JavaScript now has block-scoped variables.",
      },
      {
        id: 5,
        question:
          "All JavaScript objects inherit directly from Object.prototype.",
        correctAnswer: false,
        explanation:
          "JavaScript objects inherit from their constructor's prototype. While many objects do inherit from Object.prototype, this isn't always the case, especially with objects created with Object.create(null).",
      },
    ],
  };

  // Common badge styles
  const badgeClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-fit";

  // ---- Quiz Questions Component Logic ----
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quiz.questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quiz.questions.length).fill(null));
    setShowResults(false);
    setStartQuiz(false);
  };

  const exitQuiz = () => {
    // Navigate to the homepage or desired exit destination
    router.push("/online-learning/1");
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {/* Quiz Header Section - Only visible before quiz starts */}
      {!startQuiz && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1 space-y-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900">
              {quiz.title}
            </h1>
            <p className="leading-7 text-xl text-gray-700 [&:not(:first-child)]:mt-6">
              {quiz.description}
            </p>
            <div className="pt-4 flex flex-col gap-5">
              <span className={`${badgeClasses} bg-green-100 text-green-800`}>
                <BookOpen className="mr-1 h-4 w-4" />
                {quiz.questions.length} Questions
              </span>
              <span className={`${badgeClasses} bg-red-100 text-red-800`}>
                <Clock className="h-4 w-4 mr-1" />
                Estimated Time: {quiz.timeEstimate}
              </span>

              <button
                onClick={() => setStartQuiz(true)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 text-sm w-1/2 text-center"
              >
                Start Quiz
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="/double1.jpeg"
              width={600}
              height={600}
              alt="Quiz featured image"
              className="rounded-2xl shadow-2xl w-full h-100 object-cover"
            />
          </div>
        </div>
      )}

      {/* Quiz Questions Section */}
      {startQuiz && (
        <div id="quiz-questions" className="mt-8 scroll-mt-8">
          {showResults ? (
            <Card className="max-w-6xl mx-auto border-none shadow-none bg-transparent">
              <CardHeader>
                <CardTitle className="scroll-m-20 text-4xl font-semibold tracking-tight text-red-900 flex items-center">
                  <Trophy className="mr-2 h-10 w-10 text-red-600" />
                  Quiz Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <p className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
                    Your Score: {calculateScore()}/{quiz.questions.length}
                  </p>
                  <p className="text-xl text-gray-700 mb-4">
                    {Math.round(
                      (calculateScore() / quiz.questions.length) * 100
                    )}
                    %
                  </p>

                  <div className="w-3/4 bg-gray-200 rounded-full h-4 mb-6">
                    <div
                      className={`h-4 rounded-full ${
                        calculateScore() / quiz.questions.length >= 0.7
                          ? "bg-green-500"
                          : calculateScore() / quiz.questions.length >= 0.4
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${
                          (calculateScore() / quiz.questions.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>

                  {calculateScore() / quiz.questions.length >= 0.7 ? (
                    <p className="text-green-600 font-medium flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
                      Great job! You passed the quiz!
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium leading-6 mt-2">
                      You might need to study more before retaking this quiz.
                    </p>
                  )}
                </div>

                <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                  Question Review:
                </h3>
                {quiz.questions.map((question, index) => (
                  <Card
                    key={question.id}
                    className="mb-4 hover:border-red-200 transition-colors duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {userAnswers[index] === question.correctAnswer ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{question.question}</p>
                          <p className="text-sm mt-1">
                            Your answer:{" "}
                            {userAnswers[index] === true
                              ? "True"
                              : userAnswers[index] === false
                              ? "False"
                              : "Not answered"}
                          </p>
                          <p className="text-sm text-green-700 mt-1">
                            Correct answer:{" "}
                            {question.correctAnswer ? "True" : "False"}
                          </p>
                          <p className="text-sm text-gray-600 leading-6 mt-2">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
              <CardFooter className="flex flex-row gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="border-2 border-red-600 text-red-600 py-1 px-3 rounded-md text-lg font-medium leading-6 hover:bg-red-50 transition-colors"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={exitQuiz}
                  className="border-2 border-gray-600 text-gray-600 py-1 px-3 rounded-md text-lg font-medium leading-6 flex items-center hover:bg-gray-50 transition-colors"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Exit Quiz
                </button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mx-auto">
              <div className="order-2 lg:order-1 space-y-8">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / quiz.questions.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-red-900 mb-4">
                  Question {currentQuestionIndex + 1}
                </h3>

                <div className="pt-4 flex flex-col gap-5">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAnswer(true)}
                      className={`px-6 py-1 text-sm font-medium rounded-md transition duration-300 ${
                        userAnswers[currentQuestionIndex] === true
                          ? "bg-green-500 text-white"
                          : "bg-white border-2 border-green-500 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      True
                    </button>

                    <button
                      onClick={() => handleAnswer(false)}
                      className={`px-6 py-1 text-sm font-medium rounded-md transition duration-300 ${
                        userAnswers[currentQuestionIndex] === false
                          ? "bg-red-500 text-white"
                          : "bg-white border-2 border-red-500 text-red-600 hover:bg-red-50"
                      }`}
                    >
                      False
                    </button>
                  </div>

                  <div className="flex  items-center pt-6">
                    <button
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center px-3 py-1 rounded-md text-m  text-red-600"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </button>

                    <button
                      onClick={goToNextQuestion}
                      disabled={userAnswers[currentQuestionIndex] === null}
                      className="flex items-center px-3 py-1 rounded-md text-m text-red-600"
                    >
                      {currentQuestionIndex === quiz.questions.length - 1
                        ? "Finish Quiz"
                        : "Next"}
                      {currentQuestionIndex < quiz.questions.length - 1 && (
                        <ArrowRight className="h-4 w-4 ml-1" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={exitQuiz}
                    className="flex items-center px-3 py-1 rounded-md text-sm text-red-600"
                  >
                    <Home className="h-4 w-4 mr-1" />
                    Exit Quiz
                  </button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl shadow-2xl w-full h-80 bg-gray-100 flex items-center justify-center hover:shadow-red-200 duration-300 transform hover:scale-105 transition-all">
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold text-red-900 mb-4">
                      Question {currentQuestionIndex + 1}
                    </h3>
                    <p className="text-lg text-gray-700">
                      {currentQuestion.question}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrueFalseQuiz;
