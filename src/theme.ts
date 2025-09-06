import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance with M3 design principles
const theme = createTheme({
    palette: {
        primary: {
            main: "#6750A4", // M3 primary color
        },
        secondary: {
            main: "#625B71", // M3 secondary color
        },
        error: {
            main: red.A400,
        },
        badge: {
            main: "#CFD8DC", // light blue-gray
            contrastText: "#000",
        },
    },
    shape: {
        borderRadius: 12, // M3 border radius
    },
    typography: {
        fontFamily: "Roboto, sans-serif", // M3 typography
        fontSize: 16, // Increase base font size
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20, // M3 button shape
                },
            },
        },
    },
});

declare module "@mui/material/styles" {
    interface Palette {
        badge: Palette["primary"];
    }

    interface PaletteOptions {
        badge?: PaletteOptions["primary"];
    }
}

export default theme;
