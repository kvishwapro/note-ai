import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Header />
                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#FEF7FF" }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default PageLayout;
