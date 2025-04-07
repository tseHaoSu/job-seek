import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Award } from "lucide-react";

const page = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(categoryId),
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
            <div className="pt-4 flex flex-col gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 w-fit">
                <BookOpen className="mr-1 h-4 w-4" />
                {category.quizzes.length} Quizzes Available
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800 w-fit">
                <BookOpen className="h-4 w-4 mr-1" />
                {category.quizzes.reduce(
                  (acc, quiz) => acc + quiz.questions.length,
                  0
                )}{" "}
                Questions Available
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
        <Award className="mr-2 h-7 w-7 text-red-600" />
        Learning Modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {category.modules.map((module) => (
          <Link href={`/modules/${module.id}`} key={module.id}>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div
                className={`h-3 w-1/3 ${
                  module.attempt ? "bg-green-500" : "bg-red-500"
                } rounded-full mb-4`}
              ></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {module.name}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Learn the fundamentals in this module
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">
                  Start Learning
                </span>
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Link>
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
          <Link href={`/quizzes/${quiz.id}`} key={quiz.id}>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div
                className={`h-3 w-1/3 ${
                  quiz.attempt ? "bg-green-500" : "bg-red-500"
                } rounded-full mb-4`}
              ></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {quiz.title}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Take this quiz to test your knowledge
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-sm font-medium text-red-600">
                  Start Quiz
                </span>
                <ArrowRight className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </Link>
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
