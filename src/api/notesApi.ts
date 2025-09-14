import { api, createApiClient } from "../libs/axios";

// Define types for notes
interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  // Add other properties as needed
}

interface NoteCreate {
  title: string;
  content: string;
  // Add other properties as needed
}

interface NoteUpdate {
  title?: string;
  content?: string;
  // Add other properties as needed
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
