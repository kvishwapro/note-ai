"use client";

import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "./theme";

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
