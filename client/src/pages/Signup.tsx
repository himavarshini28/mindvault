import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";
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
            await axios.post(BACKEND_URL + "/api/v1/signup", {
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
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
                </div>
            </div>
        </div>
    );
}