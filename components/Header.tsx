"use client";
import React from "react";
import { AppBar, Toolbar, TextField, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#FEF7FF", // M3 surface color
                color: "#1C1B1F", // M3 on-surface color
                boxShadow: "none",
                borderBottom: "1px solid #CAC4D0", // M3 outline color
            }}
        >
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        placeholder="Search notes..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                            backgroundColor: "#F7F2FA", // M3 surface variant
                            borderRadius: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <IconButton sx={{ color: "#6750A4" }}>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
