"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Avatar,
    Stack,
    Alert,
    CircularProgress,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { signup, verifyOTP, resendOTP } from "../../../src/api/authApi";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const setCookie = (name: string, value: string, days: number) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signup({ full_name: fullName, email, password });
            setStep(2);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Signup failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const otpString = otp.join("");
            const response = await verifyOTP({ email, otp: otpString });
            setCookie("token", response.access_token, 7);
            setCookie("user", JSON.stringify(response.user), 7);
            router.push("/");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "OTP verification failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await resendOTP(email);
            setMessage(response.message);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Failed to resend OTP. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < otp.length - 1) {
                const nextInput = document.getElementById(
                    `otp-input-${index + 1}`,
                );
                if (nextInput) (nextInput as HTMLInputElement).focus();
            }
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 420,
                    width: "100%",
                    borderRadius: 4,
                    textAlign: "center",
                }}
            >
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {message && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {message}
                    </Alert>
                )}
                {step === 1 ? (
                    <>
                        {/* Icon */}
                        <Avatar
                            sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}
                        >
                            <PersonAddAltIcon />
                        </Avatar>

                        {/* Title */}
                        <Typography variant="h5" gutterBottom>
                            Create Account
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={3}
                        >
                            Please fill in your details to register
                        </Typography>

                        {/* Form */}
                        <Box component="form" onSubmit={handleSignup}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        {/* Icon */}
                        <Avatar
                            sx={{ bgcolor: "success.main", mx: "auto", mb: 2 }}
                        >
                            <VerifiedUserIcon />
                        </Avatar>

                        {/* Title */}
                        <Typography variant="h5" gutterBottom>
                            Verify OTP
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={3}
                        >
                            We've sent a verification code to your email
                        </Typography>

                        {/* OTP Fields */}
                        <Box component="form" onSubmit={handleVerifyOTP}>
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                                mb={3}
                            >
                                {otp.map((value, index) => (
                                    <TextField
                                        key={index}
                                        id={`otp-input-${index}`}
                                        variant="outlined"
                                        value={value}
                                        onChange={(e) =>
                                            handleOtpChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                textAlign: "center",
                                                fontSize: "1.25rem",
                                            },
                                        }}
                                        sx={{ width: 56 }}
                                    />
                                ))}
                            </Stack>

                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                disabled={loading}
                                sx={{ py: 1.2, borderRadius: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Verify"
                                )}
                            </Button>
                        </Box>

                        <Button
                            variant="text"
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={handleResendOTP}
                            disabled={loading}
                        >
                            Resend OTP
                        </Button>
                    </>
                )}

                {/* Already have an account? */}
                <Typography variant="body2" sx={{ mt: 3 }}>
                    Already have an account?{" "}
                    <Button href="/auth/login" variant="text" size="small">
                        Sign In
                    </Button>
                </Typography>
            </Paper>
        </Box>
    );
}
