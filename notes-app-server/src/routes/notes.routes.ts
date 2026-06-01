import { Router } from "express";

import { db } from "../db/index.js";

import { notesTable } from "../db/schema.js";

import { eq } from "drizzle-orm";

import { getRandomColorIndex } from "../utils/getRandomColorIndex.js";

const router = Router();


// GET ALL NOTES
router.get("/", async (req, res) => {
  console.log('Inside API call')
  try {
    const notes =
      await db.select().from(notesTable);

    res.json(notes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch notes",
    });
  }
});


// CREATE NOTE
router.post("/", async (req, res) => {
  try {
    const { title, content } =
      req.body;

  // const colorIndex =
  //     getRandomColorIndex();

      const noteCount =
  await db
    .select()
    .from(notesTable);

const colorIndex =
  noteCount.length % 8;

    const newNote = await db
      .insert(notesTable)
      .values({
        title,
        content,
        colorIndex,
      })
      .returning();

    res.status(201).json(newNote[0]);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create note",
    });
  }
});


// UPDATE NOTE
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { title, content } =
      req.body;

    const updatedNote = await db
      .update(notesTable)
      .set({
        title,
        content,
      })
      .where(eq(notesTable.id, id))
      .returning();

    res.json(updatedNote[0]);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update note",
    });
  }
});


// DELETE NOTE
router.delete(
  "/:id",
  async (req, res) => {
    try {
      const id = Number(
        req.params.id
      );

      await db
        .delete(notesTable)
        .where(
          eq(notesTable.id, id)
        );

      res.json({
        message:
          "Note deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        error:
          "Failed to delete note",
      });
    }
  }
);

export default router;