"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tech Background (SVG grid + circuit lines) */}
      <TechBackground />

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 animate-bounce">
        <Zap className="h-8 w-8 text-emerald-400 opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-300">
        <Users className="h-8 w-8 text-teal-400 opacity-60" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce delay-700">
        <Sparkles className="h-6 w-6 text-green-400 opacity-60" />
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Features */}
        <div className="text-center lg:text-left space-y-8 relative z-10">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-emerald-600 font-medium">
                  Smart Task Management
                </p>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Streamline Your <span className="text-emerald-600">Workflow</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Lightning Fast
                  </h3>
                  <p className="text-sm text-gray-600">
                    Instant task updates and real-time collaboration
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Team Collaboration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Work together seamlessly with your team
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Smart Insights
                  </h3>
                  <p className="text-sm text-gray-600">
                    AI-powered analytics and recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">10K+</div>
              <div className="text-xs text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">50K+</div>
              <div className="text-xs text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">99%</div>
              <div className="text-xs text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="relative z-10">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-4 transform hover:scale-105 transition-transform duration-300">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-lg">
                Sign in to continue your productivity journey
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl flex items-center space-x-3 animate-shake">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 pr-12"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 rounded-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                {/* Animated background effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 transition-transform duration-500 ${
                    isHovered ? "translate-y-0" : "translate-y-full"
                  }`}
                ></div>

                {loading ? (
                  <div className="relative z-10 flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="relative z-10 flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 group">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                  Google
                </span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 group">
                <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                  GitHub
                </span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-green-600/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50">
            <h3 className="text-sm font-semibold text-emerald-900 mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Demo Credentials
            </h3>
            <div className="text-xs text-emerald-800 space-y-2">
              <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                <span className="font-medium">Admin Account:</span>
                <span>admin@taskapp.com / admin123</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                <span className="font-medium">User Account:</span>
                <span>user@taskapp.com / user123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1024 1024"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(37 99 235)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(6 182 212)", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(6 182 212)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(37 99 235)", stopOpacity: 1 }}
            />
          </linearGradient>
          <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
          </filter>
        </defs>
        <g>
          <rect width="100%" height="100%" fill="url(#gradient1)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#gradient2)"
            opacity="0.7"
          />
          <g filter="url(#f1)">
            <circle cx="50%" cy="50%" r="400" fill="url(#gradient1)" />
            <circle
              cx="50%"
              cy="50%"
              r="400"
              fill="url(#gradient2)"
              opacity="0.7"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
