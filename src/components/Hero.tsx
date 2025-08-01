import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Users, Home, Shield, Sparkles, Heart, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    toast({
      title: isVoiceActive ? "Voice Assistant Deactivated" : "Voice Assistant Activated",
      description: isVoiceActive 
        ? "You can now type your responses" 
        : "Hi! I'm here to help you find your perfect roommate. Tell me about yourself!",
    });
  };

  const handleGetStarted = () => {
    navigate("/onboarding");
  };

  const handleSignIn = () => {
    navigate("/dashboard");
  };

  const handleWatchDemo = () => {
    toast({
      title: "Demo Coming Soon! 🎬",
      description: "Interactive demo with voice AI will be available shortly.",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/10 rounded-full animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-3/4 h-3/4 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-white">RoomieMatch</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button 
              variant="voice" 
              size="icon"
              onClick={handleVoiceToggle}
              className="relative"
            >
              {isVoiceActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              {isVoiceActive && (
                <div className="absolute -inset-1 bg-accent/30 rounded-full animate-ping" />
              )}
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Content */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                Find Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                  Perfect Roomie
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                AI-powered matching for women's co-living spaces. 
                <span className="block mt-2 font-medium">Safe, smart, and voice-guided.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={handleGetStarted}
                  className="group"
                >
                  Get Started
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={handleWatchDemo}
                >
                  Watch Demo
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1000+</div>
                  <div className="text-white/70">Happy Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-white/70">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-white/70">Safety Score</div>
                </div>
              </div>
            </div>

            {/* Right Column - Feature Cards */}
            <div className="space-y-6">
              <Card className="bg-gradient-card backdrop-blur-sm border-white/20 p-6 shadow-strong hover:shadow-glow transition-smooth">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Smart AI Matching</h3>
                    <p className="text-muted-foreground">Our AI analyzes your lifestyle, habits, and preferences to find your perfect roommate match.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-white/20 p-6 shadow-strong hover:shadow-glow transition-smooth">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-medium">
                    <Mic className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Voice-First Experience</h3>
                    <p className="text-muted-foreground">Talk naturally with our AI assistant. No typing needed - just speak your preferences.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-white/20 p-6 shadow-strong hover:shadow-glow transition-smooth">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-medium">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Location-Based</h3>
                    <p className="text-muted-foreground">Find roommates and rooms in your preferred neighborhoods and cities.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-white/20 p-6 shadow-strong hover:shadow-glow transition-smooth">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-success/80 rounded-xl flex items-center justify-center shadow-medium">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Safety First</h3>
                    <p className="text-muted-foreground">Verified profiles, secure matching, and comprehensive safety features for women.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Voice Assistant Floating Widget */}
        {isVoiceActive && (
          <div className="fixed bottom-6 right-6 z-50">
            <Card className="bg-gradient-primary p-4 shadow-glow border-0 animate-float">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <span className="font-medium">Listening...</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;