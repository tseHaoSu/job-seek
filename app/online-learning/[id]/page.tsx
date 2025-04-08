import { prisma } from "@/prisma/client";
import { Award, BookOpen, Star, Trophy } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ModuleCard from "./_components/ModuleCard";
import QuizCard from "./_components/QuizCard";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      quizzes: {
        include: {
          questions: true,
        },
      },
      modules: true,
    },
  });

  // Get counts directly with chained operations
  const {
    moduleStats: { completed: completedModules, total: totalModules },
    quizStats: { completed: completedQuizzes, total: totalQuizzes },
  } = category
    ? {
        moduleStats: {
          completed: category.modules.filter((module) => module.attempt).length,
          total: category.modules.length,
        },
        quizStats: {
          completed: category.quizzes.filter((quiz) => quiz.attempt).length,
          total: category.quizzes.length,
        },
      }
    : {
        moduleStats: { completed: 0, total: 0 },
        quizStats: { completed: 0, total: 0 },
      };

  const progressPercentage =
    totalModules + totalQuizzes > 0
      ? Math.round(
          ((completedModules + completedQuizzes) /
            (totalModules + totalQuizzes)) *
            100
        )
      : 0;

  if (!category) {
    notFound();
  }
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 lg:order-1">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
              {category.name}
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              {category.description}
            </p>
            <div className="pt-4 flex flex-col gap-5">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 w-fit">
                <BookOpen className="mr-1 h-4 w-4" />
                {completedQuizzes} out of {totalQuizzes} Quizzes Attempted
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800 w-fit">
                <BookOpen className="h-4 w-4 mr-1" />
                {completedModules} out of {totalModules} Modules Complete
              </span>
              <span className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                  <span className="flex items-center">Category Progress</span>
                  <span className="text-green-600 font-medium">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="relative h-3 w-full bg-gray-200 rounded-full mb-4 mt-5">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  ></div>
                  <span
                    className="absolute top-1/2 transform -translate-y-1/2"
                    style={{
                      left: `${Math.min(progressPercentage, 100)}%`,
                      marginLeft: `-10px`, // Half of the  star width to center at the end
                    }}
                  >
                    <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="/man.jpeg"
            width={600}
            height={600}
            alt="Category featured image"
            className="rounded-2xl shadow-2xl w-full h-80 object-cover hover:shadow-red-200 duration-300 transform hover:scale-105 transition-all"
          />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Trophy className="mr-2 h-7 w-7 text-red-600" />
        Learning Modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {category.modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
        {category.modules.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No learning modules available in this category yet.
            </p>
          </div>
        )}
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Award className="mr-2 h-7 w-7 text-red-600" />
        Available Quizzes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
        {category.quizzes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No quizzes available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
