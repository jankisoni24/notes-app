import { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Sidebar from "./components/Sidebar";
import NoteCard from "./components/NoteCard";

import { Note } from "./types/note";
import { getNotes, createNote, updateNote, deleteNote } from "./services/api";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const fetchNotes = async () => {
    try {
      const data = await getNotes();

      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD NOTE
  const addNote = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const newNote = {
      title,
      content,
    };

    await createNote(newNote);

    fetchNotes();

    clearForm();
  };

  // SELECT NOTE
  const selectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // UPDATE NOTE
  const editNote = async () => {
    if (selectedNoteId === null) return;

    const editedNote = {
      title,
      content,
    };

    await updateNote(selectedNoteId, editedNote);

    fetchNotes();

    clearForm();
  };

  // DELETE NOTE
  const removeNote = async (id: number) => {
    await deleteNote(id);

    fetchNotes();

    if (selectedNoteId === id) {
      clearForm();
    }
  };

  const cancelEdit = () => {
    clearForm();
  };

  // CLEAR FORM
  const clearForm = () => {
    setTitle("");
    setContent("");
    setSelectedNoteId(null);
  };

  const toggleTheme = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Sidebar
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          addNote={addNote}
          updateNote={editNote}
          cancelEdit={cancelEdit}
          isEditing={selectedNoteId !== null}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <Box
          sx={{
            flex: 1,
            p: 3,
          }}
        >
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid
                key={note.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <NoteCard
                  note={note}
                  darkMode={darkMode}
                  onDelete={removeNote}
                  onSelect={selectNote}
                  isSelected={selectedNoteId === note.id}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
