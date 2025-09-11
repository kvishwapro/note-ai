import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    InputBase,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import { Close, Share, ArrowBack } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../src/redux/hooks";
import { openShareModal } from "../src/redux/slices/sharingSlice";
import {
    fetchAiSummary,
    fetchAiTasks,
    setCurrentAction,
    resetAiState,
} from "../src/redux/slices/aiSlice";
import ReactMarkdown from "react-markdown";
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

type AiAction = "summarize" | "convertToTasks";

const NoteEditor: React.FC<NoteEditorProps> = ({
    note,
    open,
    onClose,
    onUpdate,
}) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [expandUI, setExpandUI] = useState(false);
    const [activeAction, setActiveAction] = useState<AiAction | null>(null);

    // Get AI state from Redux
    const { summary, tasks, isLoading, error, currentAction } = useAppSelector(
        (state) => state.ai,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
    }, [note]);

    // Remove duplicate dispatch declaration

    const handleUpdate = () => {
        onUpdate({ id: note.id, title, content });
        onClose();
    };

    const handleShare = () => {
        dispatch(openShareModal(Number(note.id)));
    };

    const aiAction = async (action: AiAction) => {
        dispatch(setCurrentAction(action));
        setActiveAction(action);
        setExpandUI(true);

        if (action === "summarize") {
            // Fetch AI summary with note ID
            dispatch(fetchAiSummary(note.id));
        } else if (action === "convertToTasks") {
            // Fetch AI tasks with note ID
            dispatch(fetchAiTasks(note.id));
        }
    };

    const closeExpandedView = () => {
        setExpandUI(false);
        setActiveAction(null);
        dispatch(resetAiState());
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                sx={{
                    display: "flex",
                    alignItems: expandUI ? "stretch" : "center",
                    justifyContent: expandUI ? "stretch" : "center",
                }}
            >
                <Box
                    sx={{
                        width: expandUI ? "100vw" : "90%",
                        height: expandUI ? "100vh" : "auto",
                        maxWidth: expandUI ? "none" : 800,
                        maxHeight: expandUI ? "none" : "85vh",
                        bgcolor: "background.paper",
                        border: "1px solid #e0e0e0",
                        borderRadius: expandUI ? 0 : 2,
                        boxShadow: 5,
                        p: expandUI ? 3 : 5,
                        position: "relative",
                        display: "flex",
                        flexDirection: expandUI ? "row" : "column",
                        transition: "all 0.3s ease",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        {expandUI && (
                            <IconButton
                                aria-label="back"
                                onClick={closeExpandedView}
                                sx={{
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        )}
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
                    {expandUI ? (
                        <>
                            <Box
                                sx={{
                                    flex: 7,
                                    display: "flex",
                                    flexDirection: "column",
                                    p: 3,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ mb: 2 }}
                                >
                                    Edit Note
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        mb: 2,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Button
                                        variant={
                                            activeAction === "summarize"
                                                ? "contained"
                                                : "outlined"
                                        }
                                        size="small"
                                        sx={{
                                            textTransform: "none",
                                            boxShadow: "none",
                                            ...(activeAction ===
                                                "summarize" && {
                                                background:
                                                    "linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(25, 118, 210, 0.1))",
                                                backdropFilter: "blur(10px)",
                                                border: "1px solid rgba(25, 118, 210, 0.5)",
                                                color: "primary.main",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(135deg, rgba(25, 118, 210, 0.4), rgba(25, 118, 210, 0.2))",
                                                },
                                            }),
                                            transform:
                                                activeAction === "summarize"
                                                    ? "scale(1.3)"
                                                    : "scale(1)",
                                            margin:
                                                activeAction === "summarize"
                                                    ? "0 20px"
                                                    : "0",
                                            transition: "all 0.2s ease",
                                            borderRadius: 2,
                                        }}
                                        onClick={() => aiAction("summarize")}
                                        disabled={isLoading}
                                    >
                                        Summarize with AI
                                    </Button>
                                    <Button
                                        variant={
                                            activeAction === "convertToTasks"
                                                ? "contained"
                                                : "outlined"
                                        }
                                        size="small"
                                        sx={{
                                            textTransform: "none",
                                            boxShadow: "none",
                                            ...(activeAction ===
                                                "convertToTasks" && {
                                                background:
                                                    "linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(25, 118, 210, 0.1))",
                                                backdropFilter: "blur(10px)",
                                                border: "1px solid rgba(25, 118, 210, 0.5)",
                                                color: "primary.main",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(135deg, rgba(25, 118, 210, 0.4), rgba(25, 118, 210, 0.2))",
                                                },
                                            }),
                                            transform:
                                                activeAction ===
                                                "convertToTasks"
                                                    ? "scale(1.3)"
                                                    : "scale(1)",
                                            margin:
                                                activeAction ===
                                                "convertToTasks"
                                                    ? "0 20px"
                                                    : "0",
                                            transition: "all 0.2s ease",
                                            borderRadius: 2,
                                        }}
                                        onClick={() =>
                                            aiAction("convertToTasks")
                                        }
                                        disabled={isLoading}
                                    >
                                        Convert to Tasks
                                    </Button>
                                </Box>
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
                                <Box
                                    sx={{
                                        flex: 1,
                                        overflow: "auto",
                                        mb: 2,
                                        position: "relative",
                                    }}
                                >
                                    <InputBase
                                        sx={{
                                            width: "100%",
                                            fontSize: "1rem",
                                            lineHeight: 1.5,
                                            minHeight: 120,
                                            position: "sticky",
                                            bottom: 0,
                                            backgroundColor: "background.paper",
                                            zIndex: 1,
                                            borderTop: "1px solid #e0e0e0",
                                            pt: 1,
                                        }}
                                        placeholder="Take a note..."
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        multiline
                                        fullWidth
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        mt: 3,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
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
                            <Box
                                sx={{
                                    flex: 3,
                                    borderLeft: "1px solid #e0e0e0",
                                    p: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    AI Results
                                </Typography>
                                <Box sx={{ flex: 1, overflow: "auto" }}>
                                    {isLoading && (
                                        <Typography>
                                            {currentAction === "summarize" ? "Loading summary..." : "Loading tasks..."}
                                        </Typography>
                                    )}
                                    {error && (
                                        <Typography color="error">
                                            {error}
                                        </Typography>
                                    )}
                                    {summary && currentAction === "summarize" && (
                                        <ReactMarkdown>{summary}</ReactMarkdown>
                                    )}
                                    {tasks.length > 0 && currentAction === "convertToTasks" && (
                                        <Box>
                                            {tasks.map((task, index) => (
                                                <Typography key={index} sx={{ mb: 1 }}>
                                                    • {task}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                    {!isLoading && !error && !summary && tasks.length === 0 && (
                                        <Typography>
                                            {currentAction === "summarize" &&
                                                "AI Summary will appear here."}
                                            {currentAction ===
                                                "convertToTasks" &&
                                                "Converted Tasks will appear here."}
                                            {!currentAction &&
                                                "Select an AI action to see results."}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ mb: 2 }}
                            >
                                Edit Note
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    mb: 2,
                                    flexWrap: "wrap",
                                }}
                            >
                                <Button
                                    variant={
                                        activeAction === "summarize"
                                            ? "contained"
                                            : "outlined"
                                    }
                                    size="small"
                                    sx={{
                                        textTransform: "none",
                                        boxShadow: "none",
                                        ...(activeAction === "summarize" && {
                                            background:
                                                "linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(25, 118, 210, 0.1))",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(25, 118, 210, 0.5)",
                                            color: "primary.main",
                                            "&:hover": {
                                                background:
                                                    "linear-gradient(135deg, rgba(25, 118, 210, 0.4), rgba(25, 118, 210, 0.2))",
                                            },
                                        }),
                                        transform:
                                            activeAction === "summarize"
                                                ? "scale(1.3)"
                                                : "scale(1)",
                                        margin:
                                            activeAction === "summarize"
                                                ? "0 20px"
                                                : "0",
                                        transition: "all 0.2s ease",
                                        borderRadius: 2,
                                    }}
                                    onClick={() => aiAction("summarize")}
                                    disabled={isLoading}
                                >
                                    Summarize with AI
                                </Button>
                                <Button
                                    variant={
                                        activeAction === "convertToTasks"
                                            ? "contained"
                                            : "outlined"
                                    }
                                    size="small"
                                    sx={{
                                        textTransform: "none",
                                        boxShadow: "none",
                                        ...(activeAction ===
                                            "convertToTasks" && {
                                            background:
                                                "linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(25, 118, 210, 0.1))",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(25, 118, 210, 0.5)",
                                            color: "primary.main",
                                            "&:hover": {
                                                background:
                                                    "linear-gradient(135deg, rgba(25, 118, 210, 0.4), rgba(25, 118, 210, 0.2))",
                                            },
                                        }),
                                        transform:
                                            activeAction === "convertToTasks"
                                                ? "scale(1.3)"
                                                : "scale(1)",
                                        margin:
                                            activeAction === "convertToTasks"
                                                ? "0 20px"
                                                : "0",
                                        transition: "all 0.2s ease",
                                        borderRadius: 2,
                                    }}
                                    onClick={() => aiAction("convertToTasks")}
                                    disabled={isLoading}
                                >
                                    Convert to Tasks
                                </Button>
                            </Box>
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
                            <Box
                                sx={{
                                    flex: 1,
                                    overflow: "auto",
                                    mb: 2,
                                }}
                            >
                                <InputBase
                                    sx={{
                                        width: "100%",
                                        fontSize: "1rem",
                                        lineHeight: 1.5,
                                        minHeight: 120,
                                    }}
                                    placeholder="Take a note..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    multiline
                                    fullWidth
                                />
                            </Box>
                            <Box
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
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
                        </>
                    )}
                </Box>
            </Modal>
            <ShareModal noteId={Number(note.id)} noteTitle={title} />
        </>
    );
};

export default NoteEditor;
