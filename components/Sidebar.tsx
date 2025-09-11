"use client";

import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Divider,
    Badge,
} from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import TaskIcon from "@mui/icons-material/Task";
import LabelIcon from "@mui/icons-material/Label";
import { useRouter, usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const Sidebar: React.FC = () => {
    const drawerWidth = 280; // M3 recommended width
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#F7F2FA", // M3 surface color
                    borderRight: "1px solid #CAC4D0", // M3 outline color
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "#1C1B1F", ml: 2 }}
                >
                    Note AI
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={pathname === "/notes"}
                            sx={{
                                borderRadius: 8,
                                mb: 1,
                                "&.Mui-selected": {
                                    backgroundColor: "#D0BCFF",
                                },
                            }}
                            onClick={() => router.push("/notes")}
                        >
                            <ListItemIcon>
                                <NotesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Notes" />
                            <Badge
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "badge.main",
                                        color: "badge.contrastText",
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={pathname === "/tasks"}
                            sx={{
                                borderRadius: 8,
                                mb: 1,
                                "&.Mui-selected": {
                                    backgroundColor: "#D0BCFF",
                                },
                            }}
                            onClick={() => router.push("/tasks")}
                        >
                            <ListItemIcon>
                                <TaskIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tasks" />
                            <Badge
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "badge.main",
                                        color: "badge.contrastText",
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "#1C1B1F", ml: 2 }}
                >
                    Tags
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ borderRadius: 8, mb: 1 }}>
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Personal" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ borderRadius: 8, mb: 1 }}>
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Work" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ mt: "auto", p: 2 }}>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: {
                                width: 32,
                                height: 32,
                            },
                        },
                    }}
                />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
