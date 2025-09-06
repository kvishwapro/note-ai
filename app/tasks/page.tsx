import React from "react";
import { Typography, Box } from "@mui/material";
import TaskList from "../../components/TaskList";

const TasksPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Tasks
            </Typography>
            <TaskList />
        </Box>
    );
};

export default TasksPage;
