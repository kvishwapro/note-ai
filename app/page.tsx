import React from "react";
import { Typography, Box, Paper, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PageLayout from "@/components/PageLayout";

export default function Home() {
    return (
        <PageLayout>
            <Box sx={{ flexGrow: 1, p: 3, position: "relative" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 3,
                    }}
                >
                    {/* Current Tasks */}
                    <Box sx={{ flex: 1 }}>
                        <Paper sx={{ p: 2, height: "100%" }}>
                            <Typography variant="h6" gutterBottom>
                                Current Tasks
                            </Typography>
                            {/* Placeholder for tasks */}
                            <Typography variant="body2" color="text.secondary">
                                No tasks for today.
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Recent Notes */}
                    <Box sx={{ flex: 1 }}>
                        <Paper sx={{ p: 2, height: "100%" }}>
                            <Typography variant="h6" gutterBottom>
                                Recent Notes
                            </Typography>
                            {/* Placeholder for notes */}
                            <Typography variant="body2" color="text.secondary">
                                No recent notes.
                            </Typography>
                        </Paper>
                    </Box>
                </Box>
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: "absolute", bottom: 32, right: 32 }}
                >
                    <AddIcon />
                </Fab>
            </Box>
        </PageLayout>
    );
}
