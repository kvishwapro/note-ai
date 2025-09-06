import React from "react";
import {
    Paper,
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    Typography,
} from "@mui/material";

const TaskList = () => {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Task List
            </Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox edge="start" />
                    </ListItemIcon>
                    <ListItemText primary="Task 1" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox edge="start" />
                    </ListItemIcon>
                    <ListItemText primary="Task 2" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Checkbox edge="start" />
                    </ListItemIcon>
                    <ListItemText primary="Task 3" />
                </ListItem>
            </List>
        </Paper>
    );
};

export default TaskList;
