import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShareToken {
    token: string;
    expiresAt: string;
    permission: 'view' | 'edit';
    noteId: number;
}

export interface ShareState {
    isShareModalOpen: boolean;
    currentNoteId: number | null;
    shareTokens: ShareToken[];
    isGeneratingToken: boolean;
    shareLink: string | null;
    selectedPermission: 'view' | 'edit';
}

const initialState: ShareState = {
    isShareModalOpen: false,
    currentNoteId: null,
    shareTokens: [],
    isGeneratingToken: false,
    shareLink: null,
    selectedPermission: 'view',
};

export const sharingSlice = createSlice({
    name: "sharing",
    initialState,
    reducers: {
        openShareModal: (state, action: PayloadAction<number>) => {
            state.isShareModalOpen = true;
            state.currentNoteId = action.payload;
            state.shareLink = null;
        },
        closeShareModal: (state) => {
            state.isShareModalOpen = false;
            state.currentNoteId = null;
            state.shareLink = null;
            state.selectedPermission = 'view';
        },
        setSelectedPermission: (state, action: PayloadAction<'view' | 'edit'>) => {
            state.selectedPermission = action.payload;
        },
        generateTokenStart: (state) => {
            state.isGeneratingToken = true;
        },
        generateTokenSuccess: (state, action: PayloadAction<ShareToken>) => {
            state.isGeneratingToken = false;
            state.shareTokens.push(action.payload);
            // Generate share link (placeholder for now)
            state.shareLink = `${window.location.origin}/shared/${action.payload.token}`;
        },
        generateTokenFailure: (state) => {
            state.isGeneratingToken = false;
        },
        removeShareToken: (state, action: PayloadAction<string>) => {
            state.shareTokens = state.shareTokens.filter(
                token => token.token !== action.payload
            );
        },
        // Placeholder for API integration
        setShareTokens: (state, action: PayloadAction<ShareToken[]>) => {
            state.shareTokens = action.payload;
        },
    },
});

export const {
    openShareModal,
    closeShareModal,
    setSelectedPermission,
    generateTokenStart,
    generateTokenSuccess,
    generateTokenFailure,
    removeShareToken,
    setShareTokens,
} = sharingSlice.actions;

export default sharingSlice.reducer;