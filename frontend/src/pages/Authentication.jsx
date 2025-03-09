"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ParticleBackground } from "../components/particle-background"
import { ThemeProvider } from "../components/theme-provider"
import { ThemeModeToggle } from "../components/theme-mode-toggle"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import {
  Video,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    agreeToTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically handle authentication
  }

  const toggleView = () => {
    setIsLogin(!isLogin)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="connectsphere-theme">
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
        <ParticleBackground />

        <div className="absolute top-4 right-4 z-50">
          <ThemeModeToggle />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-screen py-12">
          <Link href="/" className="absolute top-4 left-4 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="logo-container relative mb-6 flex justify-center">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-70"></div>
              <div className="relative flex items-center justify-center bg-background/50 backdrop-blur-sm p-4 rounded-full border border-primary/30 shadow-glow hover:shadow-glow-intense transition-all duration-500">
                <Video className="h-8 w-8 text-primary" />
                <span className="ml-2 text-2xl font-bold tracking-tighter">ConnectSphere</span>
              </div>
            </div>

            <motion.div
              className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 shadow-glow p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex justify-center mb-8">
                <div className="relative flex p-1 bg-muted rounded-lg">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`relative z-10 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isLogin ? "text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`relative z-10 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${!isLogin ? "text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    Sign Up
                  </button>
                  <motion.div
                    className="absolute inset-0 z-0 flex"
                    initial={false}
                    animate={{ x: isLogin ? 0 : "100%", width: "50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="w-full h-full bg-primary rounded-md shadow-sm" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? "login" : "signup"}
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? "Welcome Back" : "Create Your Account"}
                  </h2>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="pl-10 bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="pl-10 bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      {isLogin && (
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {isLogin ? (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked }))}
                      />
                      <Label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </Label>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked }))}
                        required
                      />
                      <Label
                        htmlFor="agreeToTerms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 transition-all duration-300 shadow-glow"
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button type="button" onClick={toggleView} className="text-primary hover:underline font-medium">
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </motion.form>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  )
}

