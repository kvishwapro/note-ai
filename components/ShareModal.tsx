import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    Alert,
    Snackbar,
    CircularProgress,
} from "@mui/material";
import {
    Close,
    ContentCopy,
    Share,
    AccessTime,
    Security,
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../src/redux/hooks";
import {
    closeShareModal,
    setSelectedPermission,
    generateTokenStart,
    generateTokenSuccess,
    generateTokenFailure,
} from "../src/redux/slices/sharingSlice";

interface ShareModalProps {
    noteId: number;
    noteTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ noteId, noteTitle }) => {
    const dispatch = useAppDispatch();
    const {
        isShareModalOpen,
        shareLink,
        selectedPermission,
        isGeneratingToken,
    } = useAppSelector((state) => state.sharing);

    const [copySuccess, setCopySuccess] = useState(false);
    const [expiryDays, setExpiryDays] = useState("7");

    const handleClose = () => {
        dispatch(closeShareModal());
    };

    const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedPermission(event.target.value as 'view' | 'edit'));
    };

    const handleGenerateToken = async () => {
        dispatch(generateTokenStart());
        
        try {
            // Simulate API call - replace with actual API integration later
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const token = `note_${noteId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + parseInt(expiryDays));
            
            const shareToken = {
                token,
                expiresAt: expiresAt.toISOString(),
                permission: selectedPermission,
                noteId,
            };
            
            dispatch(generateTokenSuccess(shareToken));
        } catch (error) {
            dispatch(generateTokenFailure());
        }
    };

    const handleCopyLink = async () => {
        if (shareLink) {
            try {
                await navigator.clipboard.writeText(shareLink);
                setCopySuccess(true);
            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        }
    };

    const handleCloseCopySuccess = () => {
        setCopySuccess(false);
    };

    return (
        <>
            <Modal
                open={isShareModalOpen}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "90%",
                        maxWidth: 500,
                        bgcolor: "background.paper",
                        border: "1px solid #e0e0e0",
                        borderRadius: 3,
                        boxShadow: 5,
                        p: 4,
                        position: "relative",
                        maxHeight: "80vh",
                        overflowY: "auto",
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Share sx={{ mr: 1, color: "#1976d2" }} />
                        <Typography variant="h6" component="div">
                            Share Note
                        </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 3, color: "#5f6368" }}>
                        Share &ldquo;{noteTitle}&rdquo; with others by generating a secure link
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Permission Selection */}
                    <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
                        <FormLabel component="legend" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Security sx={{ mr: 1, fontSize: 20 }} />
                            Permission Level
                        </FormLabel>
                        <RadioGroup
                            value={selectedPermission}
                            onChange={handlePermissionChange}
                            sx={{ ml: 3 }}
                        >
                            <FormControlLabel
                                value="view"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="body2" fontWeight={500}>
                                            View Only
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Recipients can only read the note
                                        </Typography>
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="body2" fontWeight={500}>
                                            Can Edit
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Recipients can view and edit the note
                                        </Typography>
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* Expiry Selection */}
                    <Box sx={{ mb: 3 }}>
                        <FormLabel sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                            Link Expiry
                        </FormLabel>
                        <TextField
                            select
                            value={expiryDays}
                            onChange={(e) => setExpiryDays(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                            size="small"
                            sx={{ ml: 3, minWidth: 120 }}
                        >
                            <option value="1">1 day</option>
                            <option value="7">7 days</option>
                            <option value="30">30 days</option>
                            <option value="90">90 days</option>
                            <option value="365">1 year</option>
                        </TextField>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Generate Token Button */}
                    {!shareLink && (
                        <Button
                            variant="contained"
                            onClick={handleGenerateToken}
                            disabled={isGeneratingToken}
                            startIcon={isGeneratingToken ? <CircularProgress size={20} /> : <Share />}
                            sx={{
                                mb: 2,
                                width: "100%",
                                py: 1.5,
                                textTransform: "none",
                                fontSize: "16px",
                            }}
                        >
                            {isGeneratingToken ? "Generating Link..." : "Generate Share Link"}
                        </Button>
                    )}

                    {/* Share Link Display */}
                    {shareLink && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Share Link Generated:
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 1,
                                    p: 1,
                                    bgcolor: "#f8f9fa",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        flex: 1,
                                        wordBreak: "break-all",
                                        fontSize: "12px",
                                        color: "#5f6368",
                                    }}
                                >
                                    {shareLink}
                                </Typography>
                                <IconButton
                                    onClick={handleCopyLink}
                                    size="small"
                                    sx={{ ml: 1 }}
                                >
                                    <ContentCopy fontSize="small" />
                                </IconButton>
                            </Box>
                            <Alert severity="info" sx={{ mt: 2, fontSize: "12px" }}>
                                This link will expire in {expiryDays} day{expiryDays !== "1" ? "s" : ""} and grants {selectedPermission} access.
                            </Alert>
                        </Box>
                    )}

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                textTransform: "none",
                                color: "#5f6368",
                            }}
                        >
                            Close
                        </Button>
                        {shareLink && (
                            <Button
                                variant="contained"
                                onClick={handleCopyLink}
                                startIcon={<ContentCopy />}
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                Copy Link
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>

            {/* Copy Success Snackbar */}
            <Snackbar
                open={copySuccess}
                autoHideDuration={3000}
                onClose={handleCloseCopySuccess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseCopySuccess} severity="success" sx={{ width: '100%' }}>
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareModal;