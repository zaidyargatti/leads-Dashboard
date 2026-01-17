import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/Axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.post("/authentication/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({ email })
            );


            navigate("/");
        } catch (err: any) {
            setError(
                err?.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        Lead Management Login
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        className="w-full"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
