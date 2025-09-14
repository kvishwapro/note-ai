"use client";

import React, { useState, useEffect } from "react";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Paper,
    InputBase,
    IconButton,
    CircularProgress,
    Alert,
} from "@mui/material";
import {
    CheckBox,
    Brush,
    Image as ImageIcon,
    Archive,
    MoreVert,
} from "@mui/icons-material";
import { useNotesApi } from "../../src/hooks/useNotesApi";
import NoteEditor from "@/components/NoteEditor";
import PageLayout from "@/components/PageLayout";

const NotesPage = () => {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteInput, setNoteInput] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<{
        id: string;
        title: string;
        notes: string;
    } | null>(null);

    const {
        notes,
        loading,
        error,
        createNote,
        updateNote,
        getNotesWithCache,
        clearApiError,
    } = useNotesApi();

    useEffect(() => {
        getNotesWithCache();
    }, [getNotesWithCache]);

    const handleInputFocus = () => {
        setIsExpanded(true);
    };

    const handleNoteClick = (note: {
        id: number;
        title: string;
        notes: string;
    }) => {
        setSelectedNote({
            id: String(note.id),
            title: note.title,
            notes: note.notes,
        });
        setIsModalOpen(true);
    };

    const handleUpdateNote = async (updatedNote: {
        id: string;
        title: string;
        notes: string;
    }) => {
        try {
            await updateNote(Number(updatedNote.id), {
                title: updatedNote.title,
                notes: updatedNote.notes,
            });
        } catch (err) {
            console.error("Failed to update note:", err);
        }
    };

    const handleClose = async () => {
        if (noteTitle.trim() || noteInput.trim()) {
            try {
                await createNote({
                    title: noteTitle || "Untitled",
                    notes: noteInput,
                });
            } catch (err) {
                console.error("Failed to create note:", err);
            }
        }
        setIsExpanded(false);
        setIsModalOpen(false);
        setNoteTitle("");
        setNoteInput("");
    };

    const handleCloseError = () => {
        clearApiError();
    };

    return (
        <PageLayout>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                {error && (
                    <Alert
                        severity="error"
                        onClose={handleCloseError}
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                {isModalOpen && (
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    />
                )}
                <Box
                    sx={{
                        flexGrow: 1,
                        maxWidth: 1200,
                        margin: "0 auto",
                        p: { xs: 2, sm: 3 },
                    }}
                >
                    <Box
                        sx={{
                            mb: 4,
                            display: "flex",
                            justifyContent: "center",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            backgroundColor: "#FEF7FF",
                            py: 2,
                            mx: -2,
                            px: 2,
                        }}
                    >
                        <Paper
                            component="form"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: 600,
                                borderRadius: 3,
                                border: "1px solid #e0e0e0",
                                boxShadow: isExpanded ? 3 : 1,
                                transition: "all 0.2s ease-in-out",
                                flexDirection: isExpanded ? "column" : "row",
                                minHeight: isExpanded ? 120 : 48,
                                px: 2,
                                py: 0,
                                backgroundColor: "#FEF7FF",
                            }}
                        >
                            {isExpanded && (
                                <InputBase
                                    sx={{
                                        flex: 1,
                                        fontSize: "16px",
                                        width: "100%",
                                        "& .MuiInputBase-input": {
                                            padding: "12px 0",
                                            lineHeight: "24px",
                                            fontWeight: 500,
                                        },
                                    }}
                                    placeholder="Title"
                                    value={noteTitle}
                                    onChange={(e) =>
                                        setNoteTitle(e.target.value)
                                    }
                                    multiline
                                    rows={1}
                                />
                            )}
                            <InputBase
                                sx={{
                                    flex: 1,
                                    fontSize: "16px",
                                    width: "100%",
                                    "& .MuiInputBase-input": {
                                        padding: "12px 0",
                                        lineHeight: "24px",
                                    },
                                }}
                                placeholder={
                                    isExpanded
                                        ? "Take a note..."
                                        : "Take a note..."
                                }
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                                onFocus={handleInputFocus}
                                multiline={isExpanded}
                                rows={isExpanded ? 3 : 1}
                            />

                            {!isExpanded && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        pr: 2,
                                        height: 48,
                                        gap: 0.5,
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        sx={{ p: "6px", color: "#5f6368" }}
                                    >
                                        <CheckBox fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ p: "6px", color: "#5f6368" }}
                                    >
                                        <Brush fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ p: "6px", color: "#5f6368" }}
                                    >
                                        <ImageIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}

                            {isExpanded && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                        p: 1,
                                        pt: 0,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{ p: "6px", color: "#5f6368" }}
                                        >
                                            <CheckBox fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{ p: "6px", color: "#5f6368" }}
                                        >
                                            <Brush fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{ p: "6px", color: "#5f6368" }}
                                        >
                                            <ImageIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{ p: "6px", color: "#5f6368" }}
                                        >
                                            <Archive fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{ p: "6px", color: "#5f6368" }}
                                        >
                                            <MoreVert fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            onClick={handleClose}
                                            disabled={loading}
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
                                            {loading ? (
                                                <CircularProgress size={16} />
                                            ) : (
                                                "Close"
                                            )}
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                    </Box>

                    {loading && notes.length === 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 4,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                columns: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
                                columnGap: 2,
                                "& > *": {
                                    breakInside: "avoid",
                                    marginBottom: 2,
                                    display: "inline-block",
                                    width: "100%",
                                },
                            }}
                        >
                            {notes.map((note) => (
                                <Card
                                    key={note.id}
                                    onClick={() => handleNoteClick(note)}
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 2,
                                        boxShadow: "none",
                                        transition: "all 0.2s ease-in-out",
                                        cursor: "pointer",
                                        "&:hover": {
                                            boxShadow: 2,
                                        },
                                        backgroundColor: "#fff",
                                        overflow: "hidden",
                                        maxHeight: 300,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: 2,
                                            "&:last-child": { pb: 2 },
                                            flex: 1,
                                            overflow: "hidden",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {note.title && (
                                            <Typography
                                                variant="subtitle1"
                                                component="div"
                                                sx={{
                                                    fontWeight: 500,
                                                    mb: 1,
                                                    color: "#202124",
                                                    fontSize: "16px",
                                                    lineHeight: 1.4,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {note.title}
                                            </Typography>
                                        )}
                                        <Box
                                            sx={{ flex: 1, overflow: "hidden" }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#5f6368",
                                                    fontSize: "14px",
                                                    lineHeight: 1.4,
                                                    whiteSpace: "pre-wrap",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 8,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {note.notes}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Box>
                {selectedNote && (
                    <NoteEditor
                        note={selectedNote}
                        open={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedNote(null);
                        }}
                        onUpdate={handleUpdateNote}
                    />
                )}
            </Box>
        </PageLayout>
    );
};

export default NotesPage;
