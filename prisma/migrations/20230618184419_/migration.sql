-- CreateTable
CREATE TABLE "Note" (
    "identifier" TEXT NOT NULL PRIMARY KEY,
    "body" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_identifier_key" ON "Note"("identifier");
