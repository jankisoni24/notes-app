import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface SidebarProps {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  addNote: () => void;
  updateNote: () => void;
  cancelEdit: () => void;
  isEditing: boolean;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Sidebar = ({
  title,
  content,
  setTitle,
  setContent,
  addNote,
  updateNote,
  cancelEdit,
  isEditing,
  darkMode,
  toggleTheme,
}: SidebarProps) => {
  return (
    <Box
      sx={{
        width: 300,
        minHeight: "100vh",
        boxShadow: 8,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Notes App
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        rows={10}
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 3 }}
      />

      {!isEditing ? (
        <Button
          fullWidth
          variant="contained"
          onClick={addNote}
          sx={{
            py: 1.5,
            fontSize: 16,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Add Note
        </Button>
      ) : (
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={updateNote}
            sx={{
              py: 1.5,
              fontSize: 16,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Save
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={cancelEdit}
            sx={{
              py: 1.5,
              fontSize: 16,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
        </Stack>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          mt: 2,
          pt: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleTheme} />}
          label={darkMode ? "Dark Mode" : "Light Mode"}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <LightModeIcon color={!darkMode ? "warning" : "disabled"} />

          <DarkModeIcon color={darkMode ? "primary" : "disabled"} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
