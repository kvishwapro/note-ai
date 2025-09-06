import React, { useState, useEffect } from "react";
import { Modal, Box, InputBase, IconButton, Typography } from "@mui/material";
import { Close, Share } from "@mui/icons-material";
import { useAppDispatch } from "../src/redux/hooks";
import { openShareModal } from "../src/redux/slices/sharingSlice";
import ShareModal from "./ShareModal";

interface NoteEditorProps {
    note: {
        id: string;
        title: string;
        content: string;
    };
    open: boolean;
    onClose: () => void;
    onUpdate: (updatedNote: {
        id: string;
        title: string;
        content: string;
    }) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
    note,
    open,
    onClose,
    onUpdate,
}) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
    }, [note]);

    const dispatch = useAppDispatch();

    const handleUpdate = () => {
        onUpdate({ id: note.id, title, content });
        onClose();
    };

    const handleShare = () => {
        dispatch(openShareModal(Number(note.id)));
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: 600,
                        bgcolor: "background.paper",
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        boxShadow: 5,
                        p: 4,
                        position: "relative",
                    }}
                >
                    <Box sx={{ position: "absolute", right: 8, top: 8, display: "flex", gap: 1 }}>
                        <IconButton
                            aria-label="share"
                            onClick={handleShare}
                            sx={{
                                color: (theme) => theme.palette.grey[500],
                                "&:hover": {
                                    color: "#1976d2",
                                },
                            }}
                        >
                            <Share />
                        </IconButton>
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Edit Note
                    </Typography>
                    <InputBase
                        sx={{
                            width: "100%",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            mb: 2,
                        }}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <InputBase
                        sx={{
                            width: "100%",
                            fontSize: "1rem",
                            lineHeight: 1.5,
                        }}
                        placeholder="Take a note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        multiline
                        fullWidth
                    />
                    <Box
                        sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                    >
                        <IconButton
                            onClick={handleUpdate}
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#5f6368",
                                textTransform: "none",
                                px: 2,
                                py: 1,
                                "&:hover": {
                                    backgroundColor: "#f1f3f4",
                                },
                            }}
                        >
                            Update
                        </IconButton>
                    </Box>
                </Box>
            </Modal>
            <ShareModal noteId={Number(note.id)} noteTitle={title} />
        </>
    );
};

export default NoteEditor;
