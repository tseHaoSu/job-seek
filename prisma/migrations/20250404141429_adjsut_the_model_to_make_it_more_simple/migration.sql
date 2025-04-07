/*
  Warnings:

  - You are about to drop the column `correct_answer` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `explanation` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `question_text` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_id` on the `quiz_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `quiz_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `quizzes` table. All the data in the column will be lost.
  - Added the required column `correctAnswer` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizId` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizId` to the `quiz_attempts` table without a default value. This is not possible if the table is not empty.
  - Made the column `score` on table `quiz_attempts` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    CONSTRAINT "questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questions" ("id") SELECT "id" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
CREATE TABLE "new_quiz_attempts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "quiz_attempts_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_quiz_attempts" ("id", "score", "timestamp") SELECT "id", "score", "timestamp" FROM "quiz_attempts";
DROP TABLE "quiz_attempts";
ALTER TABLE "new_quiz_attempts" RENAME TO "quiz_attempts";
CREATE TABLE "new_quizzes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "quizzes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_quizzes" ("categoryId", "id", "title") SELECT "categoryId", "id", "title" FROM "quizzes";
DROP TABLE "quizzes";
ALTER TABLE "new_quizzes" RENAME TO "quizzes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
