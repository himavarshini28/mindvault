import { useRef } from "react";
import { Button } from "../components/Button";
import api from "../lib/api";
import axios from "axios";
import { Logo } from "../icons/Logo.tsx";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null); 
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }

        if (username.length < 3 || username.length > 11) {
            alert("Username must be between 3 and 11 characters");
            return;
        }

        if (password.length < 3 || password.length > 11) {
            alert("Password must be between 3 and 11 characters");
            return;
        }

        try {
            await api.post(`/api/v1/signup`, {
                username,
                password
            });

            alert("You have signed up successfully!");
            navigate("/signin");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    alert("User already exists with this username");
                } else if (error.response?.status === 411) {
                    alert("Invalid username or password format");
                } else {
                    alert("An error occurred during signup. Please try again.");
                }
            } else {
                alert("An unexpected error occurred");
            }
            console.error("Signup error:", error);
        }
    }

    return (
        <div className="h-screen w-screen flex bg-[#071029] text-white">
            <div className="w-1/2 flex items-center justify-center p-12 bg-[#0f1724]">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <button onClick={() => navigate('/')} className="flex items-center gap-2 focus:outline-none">
                                <Logo/>
                                <span className="text-2xl font-bold text-indigo-600">DigiBrain</span>
                            </button>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-400">Start building your second brain</p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <input ref={usernameRef} placeholder="Enter your username" className=" border border-gray-700 bg-[#071029] text-white w-[450px] py-2 px-2 rounded-md"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                             <input ref={passwordRef} placeholder="Enter your password" className=" border border-gray-700 bg-[#071029] text-white w-[450px] py-2 px-2 rounded-md mb-3"/>
                        </div>
                        <Button 
                            onClick={signup} 
                            loading={false} 
                            variant="primary" 
                            text="Create Account" 
                            fullWidth={true} 
                        />

                        <div className="text-center pt-2">
                            <p className="text-sm text-gray-400">
                                Already have an account?{" "}
                                <button
                                    onClick={() => navigate("/signin")}
                                    className="text-indigo-400 font-medium hover:text-indigo-300"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>

                   
                </div>
            </div>

           <div className="w-1/2 bg-[#071029] flex items-center justify-center p-12 relative">
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-sm font-medium">Back to Home</span>
                </button>

                <img src="\src\assets\user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures.png"/>
            </div>
        </div>
    );
}