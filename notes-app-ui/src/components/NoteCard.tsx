import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { Note } from "../types/note";
import { LIGHT_NOTE_COLORS, DARK_NOTE_COLORS } from "../consts/noteColors";

interface NoteCardProps {
  note: Note;
  darkMode: boolean;
  onDelete: (id: number) => void;
  onSelect: (note: Note) => void;
  isSelected: boolean;
}

const NoteCard = ({
  note,
  darkMode,
  onDelete,
  onSelect,
  isSelected,
}: NoteCardProps) => {
  const noteColor = darkMode
    ? DARK_NOTE_COLORS[note.colorIndex]
    : LIGHT_NOTE_COLORS[note.colorIndex];

  return (
    <Card
      onClick={() => onSelect(note)}
      sx={{
        backgroundColor: noteColor,
        position: "relative",
        height: 250,
        borderRadius: 3,
        cursor: "pointer",
        border: isSelected ? "3px solid #1976d2" : "none",
        boxShadow: isSelected ? 8 : 3,
        transition: "0.2s ease",

        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          {note.title}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {note.content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
