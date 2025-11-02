// Inspired by 'the_coding_wizard.js' GSAP animation (Login Lamp) for this project

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(Draggable);

const CORD_DURATION = 0.6;
const PULL_THRESHOLD = 50;

export default function Login() {
  const [isLampOn, setIsLampOn] = useState(false);
  const cordRef = useRef<SVGLineElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const pullHandleRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!pullHandleRef.current) return;

    const draggable = Draggable.create(pullHandleRef.current, {
      type: "y",
      bounds: { minY: 0, maxY: 150 },
      onDragStart: function() {
        startPosRef.current = { x: this.x, y: this.y };
      },
      onDragEnd: function() {
        const distance = Math.abs(this.y - startPosRef.current.y);
        
        if (distance > PULL_THRESHOLD && !isLampOn) {
          // Trigger lamp-on animation
          turnOnLamp();
        }
        
        // Reset cord position
        gsap.to(pullHandleRef.current, {
          y: 0,
          duration: CORD_DURATION,
          ease: "elastic.out(1, 0.3)"
        });
      },
      onDrag: function() {
        updateCord();
      }
    });

    return () => {
      draggable[0].kill();
    };
  }, [isLampOn]);

  const updateCord = () => {
    if (!cordRef.current || !pullHandleRef.current) return;
    const handle = pullHandleRef.current;
    const handleY = gsap.getProperty(handle, "y") as number;
    cordRef.current.setAttribute("y2", String(200 + handleY));
  };

  const turnOnLamp = () => {
    setIsLampOn(true);

    // Lamp glow animation
    gsap.to(lampRef.current, {
      filter: "drop-shadow(0 0 40px hsl(var(--teal))) brightness(1.2)",
      duration: 0.8,
      ease: "power2.out"
    });

    // Background glow
    gsap.to(glowRef.current, {
      opacity: 0.3,
      scale: 1.5,
      duration: 1,
      ease: "power2.out"
    });

    // Login form fade in
    gsap.fromTo(formRef.current, 
      { opacity: 0, scale: 0.9, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 0.8, 
        delay: 0.3,
        ease: "back.out(1.7)" 
      }
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background glow effect */}
      <div 
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-0"
        style={{ 
          background: "radial-gradient(circle, hsl(var(--teal) / 0.4), transparent 70%)",
          filter: "blur(60px)"
        }}
      />

      {/* Title */}
      <h1 className="text-5xl font-bold mb-16 text-foreground tracking-tight">
        Login Lamp
      </h1>

      <div className="flex items-center justify-center gap-16 flex-wrap z-10">
        {/* Lamp Container */}
        <div className="relative" ref={lampRef}>
          {/* Lamp SVG */}
          <svg width="200" height="300" viewBox="0 0 200 300" className="drop-shadow-lg">
            {/* Cord */}
            <line
              ref={cordRef}
              x1="100"
              y1="50"
              x2="100"
              y2="200"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground"
            />
            
            {/* Lamp base at top */}
            <rect x="85" y="30" width="30" height="20" fill="currentColor" className="text-muted" />
            
            {/* Lamp shade */}
            <path
              d="M 70 50 L 50 120 L 150 120 L 130 50 Z"
              fill={isLampOn ? "hsl(var(--teal))" : "hsl(var(--muted))"}
              className="transition-colors duration-500"
              style={{
                filter: isLampOn ? "drop-shadow(0 0 20px hsl(var(--teal)))" : "none"
              }}
            />

            {/* Light bulb */}
            <ellipse
              cx="100"
              cy="130"
              rx="20"
              ry="30"
              fill={isLampOn ? "hsl(var(--lemon))" : "hsl(var(--muted-foreground))"}
              className="transition-colors duration-500"
              style={{
                filter: isLampOn ? "drop-shadow(0 0 15px hsl(var(--lemon)))" : "none"
              }}
            />

            {/* Face - Eyes */}
            {isLampOn ? (
              <>
                {/* Happy open eyes */}
                <ellipse cx="90" cy="125" rx="3" ry="5" fill="hsl(var(--navy))" />
                <ellipse cx="110" cy="125" rx="3" ry="5" fill="hsl(var(--navy))" />
                {/* Smile */}
                <path
                  d="M 85 135 Q 100 142 115 135"
                  stroke="hsl(var(--navy))"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                {/* Sleepy closed eyes */}
                <line x1="85" y1="125" x2="95" y2="125" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" />
                <line x1="105" y1="125" x2="115" y2="125" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>

          {/* Pull handle - invisible draggable element */}
          <div
            ref={pullHandleRef}
            className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full cursor-grab active:cursor-grabbing"
            style={{ 
              top: "200px",
              background: "hsl(var(--muted))",
              border: "2px solid hsl(var(--border))"
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground font-medium">
              Pull
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div ref={formRef} className="opacity-0">
          <Card 
            className="w-96 shadow-2xl"
            style={{
              boxShadow: isLampOn ? "0 0 40px hsl(var(--teal) / 0.3)" : undefined
            }}
          >
            <CardHeader>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter your username"
                  className="transition-all duration-300"
                  style={{
                    boxShadow: isLampOn ? "0 0 10px hsl(var(--teal) / 0.1)" : undefined
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="transition-all duration-300"
                  style={{
                    boxShadow: isLampOn ? "0 0 10px hsl(var(--teal) / 0.1)" : undefined
                  }}
                />
              </div>
              <Button 
                className="w-full mt-6"
                style={{
                  background: isLampOn ? "hsl(var(--teal))" : undefined,
                  boxShadow: isLampOn ? "0 4px 20px hsl(var(--teal) / 0.4)" : undefined
                }}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hint text */}
      {!isLampOn && (
        <p className="absolute bottom-8 text-muted-foreground text-sm animate-pulse">
          Pull the cord to turn on the lamp 💡
        </p>
      )}
    </div>
  );
}
