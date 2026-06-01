export interface Note {
  id: number;
  title: string;
  content: string;
  colorIndex: number;
  createdAt?: Date;
}

export interface CreateNotePayload {
  title: string;
  content: string;
}
