// app/login/page.tsx (Next.js 13+ App Router)
// If you use pages router, put inside pages/login.tsx

"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { login } from "../../../src/api/authApi";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const setCookie = useCallback((name: string, value: string, days: number) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login({ email, password });
            setCookie("token", response.access_token, 7);
            setCookie("user", JSON.stringify(response.user), 7);
            router.push("/");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Login failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }, [email, password, setCookie, router]);

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    borderRadius: 4,
                    width: "100%",
                    backdropFilter: "blur(6px)",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                >
                    Welcome Back
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    mb={3}
                >
                    Please login to continue
                </Typography>

                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: 3,
                            fontSize: "1rem",
                            textTransform: "none",
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        mt={3}
                        sx={{ color: "text.secondary" }}
                    >
                        Don’t have an account?{" "}
                        <Link href="/auth/signup">
                            <Button
                                variant="text"
                                size="small"
                                sx={{ textTransform: "none" }}
                            >
                                Sign up
                            </Button>
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
