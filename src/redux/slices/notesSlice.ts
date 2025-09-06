import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
    id: number;
    title: string;
    content: string;
}

interface NotesState {
    notes: Note[];
    nextId: number;
}

const initialState: NotesState = {
    notes: [],
    nextId: 1,
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (
            state,
            action: PayloadAction<{ title: string; content: string }>,
        ) => {
            const newNote = {
                id: state.nextId,
                title: action.payload.title,
                content: action.payload.content,
            };
            state.notes.push(newNote);
            state.nextId += 1;
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex(
                (note) => note.id === action.payload.id,
            );
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
        deleteNote: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload,
            );
        },
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
            // Update nextId to be one more than the highest existing ID
            if (action.payload.length > 0) {
                const maxId = Math.max(
                    ...action.payload.map((note) => note.id),
                );
                state.nextId = maxId + 1;
            } else {
                state.nextId = 1;
            }
        },
    },
});

export const { addNote, updateNote, deleteNote, setNotes } = notesSlice.actions;

export default notesSlice.reducer;
