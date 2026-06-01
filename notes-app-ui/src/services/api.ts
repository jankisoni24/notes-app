import { CreateNotePayload, Note } from "../types/note";

const BASE_URL = "http://localhost:8000/api/notes";

// GET ALL NOTES
export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
};

// CREATE NOTE
export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return response.json();
};

// UPDATE NOTE
export const updateNote = async (
  id: number,
  note: CreateNotePayload,
): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return response.json();
};

// DELETE NOTE
export const deleteNote = async (id: number): Promise<any> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }

  return response.json();
};
