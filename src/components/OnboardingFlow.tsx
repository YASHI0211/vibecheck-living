import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Shield, 
  Smartphone, 
  IdCard, 
  MessageCircle,
  CheckCircle,
  Star,
  Clock,
  Volume2,
  Coffee,
  Dumbbell,
  Moon,
  Sun,
  Palette,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PersonalityTrait {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: number;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    aadhar: "",
    otp: "",
    personality: {
      earlyBird: 0.5,
      cleanliness: 0.5,
      introvert: 0.5,
      noiseTolerance: 0.5,
      fitness: 0.5,
      routine: 0.5,
      aesthetics: 0.5,
      social: 0.5
    }
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const steps = [
    { title: "Phone Verification", description: "Secure your account" },
    { title: "ID Verification", description: "Aadhar verification" },
    { title: "OTP Verification", description: "Confirm your identity" },
    { title: "Personality Survey", description: "Find your perfect match" },
    { title: "Complete", description: "You're all set!" }
  ];

  const personalityQuestions = [
    {
      id: "earlyBird",
      title: "When do you prefer to be most active?",
      trait: "Early Bird vs Night Owl",
      icon: <Sun className="w-6 h-6" />,
      leftLabel: "Night Owl",
      rightLabel: "Early Bird",
      leftIcon: <Moon className="w-4 h-4" />,
      rightIcon: <Sun className="w-4 h-4" />
    },
    {
      id: "cleanliness",
      title: "How important is a clean living space?",
      trait: "Cleanliness Level",
      icon: <Star className="w-6 h-6" />,
      leftLabel: "Relaxed",
      rightLabel: "Spotless",
      leftIcon: <Coffee className="w-4 h-4" />,
      rightIcon: <Star className="w-4 h-4" />
    },
    {
      id: "social",
      title: "How social are you at home?",
      trait: "Social Energy",
      icon: <Users className="w-6 h-6" />,
      leftLabel: "Private",
      rightLabel: "Social",
      leftIcon: <MessageCircle className="w-4 h-4" />,
      rightIcon: <Users className="w-4 h-4" />
    },
    {
      id: "noiseTolerance",
      title: "What's your noise tolerance level?",
      trait: "Noise Sensitivity",
      icon: <Volume2 className="w-6 h-6" />,
      leftLabel: "Quiet",
      rightLabel: "Lively",
      leftIcon: <Volume2 className="w-4 h-4" />,
      rightIcon: <Volume2 className="w-4 h-4" />
    },
    {
      id: "fitness",
      title: "How important is fitness in your routine?",
      trait: "Fitness Interest",
      icon: <Dumbbell className="w-6 h-6" />,
      leftLabel: "Casual",
      rightLabel: "Active",
      leftIcon: <Coffee className="w-4 h-4" />,
      rightIcon: <Dumbbell className="w-4 h-4" />
    }
  ];

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    toast({
      title: isVoiceActive ? "Voice Mode Off" : "Voice Mode On",
      description: isVoiceActive 
        ? "Switched to manual input" 
        : "I'm listening! Tell me about your preferences.",
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Step Complete! ✨",
        description: "Moving to the next step",
      });
    }
  };

  const handleViewMatches = () => {
    navigate("/dashboard");
  };

  const handleExploreDashboard = () => {
    navigate("/dashboard");
  };

  const handlePersonalityChange = (trait: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [trait]: value
      }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-heading">Phone Verification</CardTitle>
              <CardDescription>Enter your mobile number for OTP verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Mobile Number</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="text-lg h-12"
                />
              </div>
              <Button variant="hero" className="w-full" onClick={handleNext}>
                Send OTP
              </Button>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <IdCard className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading">ID Verification</CardTitle>
              <CardDescription>Secure verification with your Aadhar number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Aadhar Number</label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012"
                  value={formData.aadhar}
                  onChange={(e) => setFormData(prev => ({ ...prev, aadhar: e.target.value }))}
                  className="text-lg h-12"
                />
              </div>
              <div className="flex items-center space-x-2 p-4 bg-accent/10 rounded-lg">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Your information is encrypted and secure</span>
              </div>
              <Button variant="premium" className="w-full" onClick={handleNext}>
                Verify Identity
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-heading">Enter OTP</CardTitle>
              <CardDescription>We've sent a 6-digit code to your phone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Verification Code</label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={formData.otp}
                  onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                  className="text-lg h-12 text-center tracking-widest"
                />
              </div>
              <Button variant="link" className="w-full">
                Resend OTP
              </Button>
              <Button variant="success" className="w-full" onClick={handleNext}>
                Verify & Continue
              </Button>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-strong border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-heading">Personality Survey</CardTitle>
                <CardDescription>Help us understand your lifestyle preferences</CardDescription>
              </CardHeader>
            </Card>

            {personalityQuestions.map((question, index) => (
              <Card key={question.id} className="bg-gradient-card shadow-medium border-0 hover:shadow-strong transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                      {question.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{question.title}</h3>
                      <Badge variant="secondary" className="mt-1">{question.trait}</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        {question.leftIcon}
                        <span>{question.leftLabel}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{question.rightLabel}</span>
                        {question.rightIcon}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={formData.personality[question.id as keyof typeof formData.personality]}
                        onChange={(e) => handlePersonalityChange(question.id, parseFloat(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="hero" className="w-full" onClick={handleNext}>
              Complete Survey & Find Matches
            </Button>
          </div>
        );

      case 4:
        return (
          <Card className="bg-gradient-card shadow-strong border-0 text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Welcome to RoomieMatch! 🎉</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your profile is complete! Our AI is finding your perfect roommate matches.
              </p>
              <Button 
                variant="hero" 
                size="xl" 
                className="w-full mb-4"
                onClick={handleViewMatches}
              >
                View My Matches
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleExploreDashboard}
              >
                Explore Dashboard
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">Get Started</h1>
          <p className="text-lg text-muted-foreground">Let's set up your profile in just a few steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
            <Button
              variant="voice"
              size="sm"
              onClick={handleVoiceToggle}
              className="flex items-center space-x-2"
            >
              {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>{isVoiceActive ? "Voice On" : "Voice Off"}</span>
            </Button>
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs text-center flex-1 ${
                  index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                <div className="truncate">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-in slide-in-from-right-5 duration-300">
          {renderStepContent()}
        </div>

        {/* Voice Assistant Indicator */}
        {isVoiceActive && (
          <div className="fixed bottom-6 right-6 z-50">
            <Card className="bg-gradient-primary p-4 shadow-glow border-0 animate-float">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <span className="font-medium">AI Assistant Active</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;