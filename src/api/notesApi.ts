import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export interface Note {
    id: number;
    title: string;
    notes: string;
}

export interface NoteCreate {
    title: string;
    notes: string;
}

export interface NoteUpdate {
    title: string;
    notes: string;
}

const createApiClient = (
    getToken: () => Promise<string | null>,
): AxiosInstance => {
    const client = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Add request interceptor to include Bearer token
    client.interceptors.request.use(async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return client;
};

export const createNote = async (
    noteData: NoteCreate,
    getToken: () => Promise<string | null>,
): Promise<Note> => {
    const client = createApiClient(getToken);
    const response = await client.post<Note>("/notes/", noteData);
    return response.data;
};

export const getNoteById = async (
    noteId: number,
    getToken: () => Promise<string | null>,
): Promise<Note> => {
    const client = createApiClient(getToken);
    const response = await client.get<Note>(`/notes/${noteId}`);
    return response.data;
};

export const updateNote = async (
    noteId: number,
    noteData: NoteUpdate,
    getToken: () => Promise<string | null>,
): Promise<Note> => {
    const client = createApiClient(getToken);
    const response = await client.put<Note>(`/notes/${noteId}`, noteData);
    return response.data;
};

export const deleteNote = async (
    noteId: number,
    getToken: () => Promise<string | null>,
): Promise<Note> => {
    const client = createApiClient(getToken);
    const response = await client.delete<Note>(`/notes/${noteId}`);
    return response.data;
};

export const getAllNotes = async (
    getToken: () => Promise<string | null>,
): Promise<Note[]> => {
    const client = createApiClient(getToken);
    const response = await client.get<Note[]>("/notes/");
    return response.data;
};
