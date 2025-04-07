/*
  Warnings:

  - You are about to alter the column `correctAnswer` on the `questions` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to drop the column `score` on the `quiz_attempts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "correctAnswer" BOOLEAN NOT NULL,
    "explanation" TEXT NOT NULL DEFAULT 'No explanation provided',
    CONSTRAINT "questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questions" ("correctAnswer", "id", "questionText", "quizId") SELECT "correctAnswer", "id", "questionText", "quizId" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
CREATE TABLE "new_quiz_attempts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "quiz_attempts_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_quiz_attempts" ("id", "quizId", "timestamp") SELECT "id", "quizId", "timestamp" FROM "quiz_attempts";
DROP TABLE "quiz_attempts";
ALTER TABLE "new_quiz_attempts" RENAME TO "quiz_attempts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
