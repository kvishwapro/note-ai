import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    Note,
    NoteCreate,
    NoteUpdate,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
    getAllNotes,
} from "../../api/notesApi";

interface NotesState {
    notes: Note[];
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
}

const initialState: NotesState = {
    notes: [],
    loading: false,
    error: null,
    lastFetched: null,
};

// Async thunks for API calls
export const fetchAllNotes = createAsyncThunk(
    "notes/fetchAll",
    async (getToken: () => Promise<string | null>) => {
        return await getAllNotes(getToken);
    },
);

export const fetchNoteById = createAsyncThunk(
    "notes/fetchById",
    async ({
        noteId,
        getToken,
    }: {
        noteId: number;
        getToken: () => Promise<string | null>;
    }) => {
        return await getNoteById(noteId, getToken);
    },
);

export const createNewNote = createAsyncThunk(
    "notes/create",
    async ({
        noteData,
        getToken,
    }: {
        noteData: NoteCreate;
        getToken: () => Promise<string | null>;
    }) => {
        return await createNote(noteData, getToken);
    },
);

export const updateExistingNote = createAsyncThunk(
    "notes/update",
    async ({
        noteId,
        noteData,
        getToken,
    }: {
        noteId: number;
        noteData: NoteUpdate;
        getToken: () => Promise<string | null>;
    }) => {
        return await updateNote(noteId, noteData, getToken);
    },
);

export const deleteExistingNote = createAsyncThunk(
    "notes/delete",
    async ({
        noteId,
        getToken,
    }: {
        noteId: number;
        getToken: () => Promise<string | null>;
    }) => {
        await deleteNote(noteId, getToken);
        return noteId;
    },
);

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // Keep local actions for offline functionality
        addNoteLocal: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
        },
        updateNoteLocal: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex(
                (note) => note.id === action.payload.id,
            );
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
        deleteNoteLocal: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all notes
            .addCase(fetchAllNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchAllNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch notes";
            })
            // Fetch note by ID
            .addCase(fetchNoteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNoteById.fulfilled, (state, action) => {
                state.loading = false;
                const existingIndex = state.notes.findIndex(
                    (note) => note.id === action.payload.id,
                );
                if (existingIndex !== -1) {
                    state.notes[existingIndex] = action.payload;
                } else {
                    state.notes.push(action.payload);
                }
            })
            .addCase(fetchNoteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch note";
            })
            // Create note
            .addCase(createNewNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes.push(action.payload);
            })
            .addCase(createNewNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create note";
            })
            // Update note
            .addCase(updateExistingNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExistingNote.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.notes.findIndex(
                    (note) => note.id === action.payload.id,
                );
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })
            .addCase(updateExistingNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update note";
            })
            // Delete note
            .addCase(deleteExistingNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteExistingNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(
                    (note) => note.id !== action.payload,
                );
            })
            .addCase(deleteExistingNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete note";
            });
    },
});

export const { clearError, addNoteLocal, updateNoteLocal, deleteNoteLocal } =
    notesSlice.actions;

export default notesSlice.reducer;
