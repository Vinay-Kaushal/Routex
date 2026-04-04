import { useState } from "react";
import { motion } from "framer-motion";
import API from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] p-6 shadow-xl">
          <CardContent className="space-y-4">
            
            <h2 className="text-2xl font-bold text-center">
              Welcome Back 👋
            </h2>

            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                (window.location.href =
                  "http://localhost:5000/api/auth/google")
              }
            >
              Continue with Google
            </Button>

            <p className="text-sm text-center text-gray-500">
              Don’t have an account?{" "}
              <span
                className="cursor-pointer text-black font-semibold"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}