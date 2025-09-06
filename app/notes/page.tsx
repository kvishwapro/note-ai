"use client";

import React, { useState } from "react";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Paper,
    InputBase,
    IconButton,
} from "@mui/material";
import {
    CheckBox,
    Brush,
    Image as ImageIcon,
    Archive,
    MoreVert,
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../src/redux/hooks";
import { addNote, updateNote } from "../../src/redux/slices/notesSlice";
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
        content: string;
    } | null>(null);

    const notes = useAppSelector((state) => state.notes.notes);
    const dispatch = useAppDispatch();

    const handleInputFocus = () => {
        setIsExpanded(true);
    };

    const handleNoteClick = (note: {
        id: number;
        title: string;
        content: string;
    }) => {
        setSelectedNote({ ...note, id: String(note.id) });
        setIsModalOpen(true);
    };

    const handleUpdateNote = (updatedNote: {
        id: string;
        title: string;
        content: string;
    }) => {
        dispatch(updateNote({ ...updatedNote, id: Number(updatedNote.id) }));
    };

    const handleClose = () => {
        if (noteTitle.trim() || noteInput.trim()) {
            dispatch(addNote({ title: noteTitle, content: noteInput }));
        }
        setIsExpanded(false);
        setIsModalOpen(false);
        setNoteTitle("");
        setNoteInput("");
    };

    return (
        <PageLayout>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
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
                                            Close
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                    </Box>

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
                                    overflow: "visible",
                                }}
                            >
                                <CardContent
                                    sx={{ p: 2, "&:last-child": { pb: 2 } }}
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
                                            }}
                                        >
                                            {note.title}
                                        </Typography>
                                    )}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#5f6368",
                                            fontSize: "14px",
                                            lineHeight: 1.4,
                                            whiteSpace: "pre-wrap",
                                        }}
                                    >
                                        {note.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
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
