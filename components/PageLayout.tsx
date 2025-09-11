import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "97vh",
                backgroundColor: "#FEF7FF",
                overflow: "hidden",
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        pb: 3,
                        backgroundColor: "#FEF7FF",
                        overflow: "auto",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default PageLayout;
