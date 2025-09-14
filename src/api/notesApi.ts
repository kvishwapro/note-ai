import { api } from "../libs/axios";

// Define types for notes
export interface Note {
  id: number;
  title: string;
  notes: string;
  created_at: string;
  updated_at: string;
  // Add other properties as needed
}

export interface NoteCreate {
  title: string;
  notes: string;
}

export interface NoteUpdate {
  title?: string;
  notes?: string;
}

export const createNote = async (
    noteData: NoteCreate,
): Promise<Note> => {
    const response = await api.post<Note>("/notes/", noteData);
    return response.data;
};

export const getNoteById = async (
    noteId: number,
): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${noteId}`);
    return response.data;
};

export const updateNote = async (
    noteId: number,
    noteData: NoteUpdate,
): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${noteId}`, noteData);
    return response.data;
};

export const deleteNote = async (
    noteId: number,
): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${noteId}`);
    return response.data;
};

export const getAllNotes = async (): Promise<Note[]> => {
    const response = await api.get<Note[]>("/notes/");
    return response.data;
};
