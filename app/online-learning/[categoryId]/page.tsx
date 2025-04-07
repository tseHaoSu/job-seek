import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const category = await prisma.category.findUnique({
    where: { id: parseInt(categoryId) },
    include: {
      quizzes: true,
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <h1>{category.description}</h1>
      <div>
        {category.quizzes.map((quiz) => (
          <div key={quiz.id}>
            <h2>{quiz.title}</h2>
            {/* Add more quiz details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
