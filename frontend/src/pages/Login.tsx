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
    const [isloading, setIsloading] = useState(false);

    const handleLogin = async () => {
        setIsloading(true);
      try {
        const res = await API.post("/auth/login", { email, password });
        login(res.data);
        navigate("/dashboard");
      }  finally {
      setIsloading(false);
    }
    };

    return (
      // 1. Better Background: Added 'selection' styling to make text highlighting match your theme
      <div className="h-screen flex items-center justify-center bg-black selection:bg-indigo-500/30">
        
        {/* 2. Background Decor: These "blobs" create depth behind your card */}
      {/* Animated Background Blobs */}
  <div className="absolute top-0 -z-10 h-full w-full overflow-hidden bg-black">
    {/* Purple Blob */}
    <motion.div
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-[120px]"
    />

    {/* Blue Blob */}
    <motion.div
      animate={{
        x: [0, -100, 0],
        y: [0, -50, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px]"
    />
  </div>


        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} // Start slightly smaller
          animate={{ opacity: 1, scale: 1 }}    // Pop into place
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* 3. The Glass Card: Using 'bg-white/5' makes it semi-transparent */}
          <Card className="w-[400px] border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
            <CardContent className="p-8 space-y-6">
              
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  RouteX
                </h2>
                <p className="text-sm text-gray-100">
                  Enter your credentials to access your account
                </p>
              </div>

              <div className="space-y-4">
                {/* 4. Input Styling: Made them dark to match the theme */}
                <Input
                  placeholder="Email"
                  type="email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 focus:ring-indigo-500"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 focus:ring-indigo-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* 5. Animated Primary Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20" 
                  onClick={handleLogin}
                  disabled={isloading}
                >
                  {isloading ? "Signing in..." : "Login"}
                </Button>
              </motion.div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                <div className="relative flex justify-center text-xs uppercase text-gray-500">
                  <span className="bg-transparent px-2">Or continue with</span>
                </div>
              </div>

              {/* 6. Google Button Upgrade */}
              <Button
                variant="outline"
                className="w-full h-12 border-white/10 bg-transparent text-white hover:bg-white/5 transition-all"
                onClick={() => (window.location.href = "http://localhost:5000/api/auth/google")}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>

              <p className="text-sm text-center text-gray-400">
                New here?{" "}
                <button
                  className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-semibold underline-offset-4 hover:underline transition-all"
                  onClick={() => navigate("/signup")}
                >
                  Create an account
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  ;
  }