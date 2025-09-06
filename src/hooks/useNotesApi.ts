import { useAuth } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    fetchAllNotes,
    fetchNoteById,
    createNewNote,
    updateExistingNote,
    deleteExistingNote,
    clearError,
} from "../redux/slices/notesSlice";
import { NoteCreate, NoteUpdate } from "../api/notesApi";

export const useNotesApi = () => {
    const dispatch = useAppDispatch();
    const { getToken } = useAuth();
    const { notes, loading, error, lastFetched } = useAppSelector((state) => state.notes);

    const getAllNotes = async () => {
        return dispatch(fetchAllNotes(getToken));
    };

    const getNoteById = async (noteId: number) => {
        return dispatch(fetchNoteById({ noteId, getToken }));
    };

    const createNote = async (noteData: NoteCreate) => {
        return dispatch(createNewNote({ noteData, getToken }));
    };

    const updateNote = async (noteId: number, noteData: NoteUpdate) => {
        return dispatch(updateExistingNote({ noteId, noteData, getToken }));
    };

    const deleteNote = async (noteId: number) => {
        return dispatch(deleteExistingNote({ noteId, getToken }));
    };

    const clearApiError = () => {
        dispatch(clearError());
    };

    // Cache management - refetch if data is older than 5 minutes
    const shouldRefetch = () => {
        if (!lastFetched) return true;
        const fiveMinutes = 5 * 60 * 1000;
        return Date.now() - lastFetched > fiveMinutes;
    };

    const getNotesWithCache = async () => {
        if (notes.length === 0 || shouldRefetch()) {
            return getAllNotes();
        }
        return Promise.resolve();
    };

    return {
        notes,
        loading,
        error,
        getAllNotes,
        getNoteById,
        createNote,
        updateNote,
        deleteNote,
        clearApiError,
        getNotesWithCache,
        shouldRefetch,
    };
};