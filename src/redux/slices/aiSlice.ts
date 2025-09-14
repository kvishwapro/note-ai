import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AiState {
  summary: string;
  tasks: string[];
  isLoading: boolean;
  error: string | null;
  currentAction: "summarize" | "convertToTasks" | null;
}

const initialState: AiState = {
  summary: "",
  tasks: [],
  isLoading: false,
  error: null,
  currentAction: null,
};

// Async thunk for AI summary
export const fetchAiSummary = createAsyncThunk(
    "ai/fetchSummary",
    async (noteId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/stream-summary/${noteId}`,
            );
            return response.data.summary || response.data;
        } catch (error : any) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch summary",
            );
        }
    },
);

// Async thunk for converting to tasks
export const fetchAiTasks = createAsyncThunk(
    "ai/fetchTasks",
    async (noteId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/convert-task/${noteId}`,
            );
            return response.data.tasks || [];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch tasks",
            );
        }
    },
);

export const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        clearAiSummary: (state) => {
            state.summary = "";
            state.tasks = [];
            state.error = null;
        },
        setCurrentAction: (
            state,
            action: PayloadAction<"summarize" | "convertToTasks" | null>,
        ) => {
            state.currentAction = action.payload;
        },
        resetAiState: (state) => {
            state.summary = "";
            state.tasks = [];
            state.isLoading = false;
            state.error = null;
            state.currentAction = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAiSummary.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.summary = "";
            })
            .addCase(fetchAiSummary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.summary = action.payload;
            })
            .addCase(fetchAiSummary.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAiTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.tasks = [];
            })
            .addCase(fetchAiTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchAiTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearAiSummary, setCurrentAction, resetAiState } =
    aiSlice.actions;
export default aiSlice.reducer;
