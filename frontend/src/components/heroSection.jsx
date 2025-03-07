import React from 'react'
import { useState } from 'react'
import { Video, Users, LogIn, UserPlus, Play } from "lucide-react"
import { Button } from "./ui/button.jsx"
import { Input } from "./ui/input.jsx"


function HeroSection() {
    const [meetingCode , setMeetingCode]=useState("")
  return (
    <div>
        <section className="py-20 flex flex-col items-center justify-center min-h-[90vh] text-center">
      <div className="logo-container relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-70"></div>
        <div className="relative flex items-center justify-center bg-background/50 backdrop-blur-sm p-6 rounded-full border border-primary/30 shadow-glow hover:shadow-glow-intense transition-all duration-500">
          <Video className="h-12 w-12 text-primary" />
          <span className="ml-2 text-3xl font-bold tracking-tighter">ConnectSphere</span>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-300">
        Seamless Communication.
        <br />
        Limitless Collaboration.
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
        Connect with anyone, anywhere with crystal-clear video calls, secure screen sharing, and intelligent features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-md">
        <Button variant="outline" size="lg" className="group border-primary/30 hover:border-primary/60 transition-all">
          <Users className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
          Join as Guest
        </Button>

        <Button variant="outline" size="lg" className="group border-primary/30 hover:border-primary/60 transition-all">
          <UserPlus className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
          Sign Up     

          
        </Button>
      </div>

      <div className="flex flex-col items-center w-full max-w-md mb-8">
        <div className="flex w-full mb-4">
          <Input
            type="text"
            placeholder="Enter meeting code"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            className="rounded-r-none border-r-0 border-primary/30 focus-visible:ring-primary/30 bg-background/50 backdrop-blur-sm"
          />
          <Button className="rounded-l-none">
            <LogIn className="mr-2 h-4 w-4" />
            Join Meeting
          </Button>
        </div>

        <Button
          size="lg"
          className="w-full group bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 transition-all duration-300 shadow-glow"
        >
          <Play className="mr-2 h-5 w-5" />
          Start a New Meeting
        </Button>
      </div>
    </section>
      
    </div>
  )
}

export default HeroSection
