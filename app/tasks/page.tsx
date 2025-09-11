import React from "react";
import { Typography, Box } from "@mui/material";
import TaskList from "../../components/TaskList";
import PageLayout from "@/components/PageLayout";

const TasksPage = () => {
    return (
        <PageLayout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Tasks
                </Typography>
                <TaskList />
            </Box>
        </PageLayout>
    );
};

export default TasksPage;
