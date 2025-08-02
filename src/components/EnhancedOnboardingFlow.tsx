import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Mic, 
  MicOff, 
  Smartphone, 
  Shield, 
  MessageCircle, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface PersonalityData {
  early_bird_score: number;
  cleanliness_score: number;
  extroversion_score: number;
  noise_tolerance_score: number;
  fitness_interest_score: number;
  routine_flexibility_score: number;
  conflict_style_score: number;
  privacy_preference_score: number;
  aesthetics_score: number;
  social_activities: string[];
  dietary_preferences: string[];
  smoker: boolean;
  pets_allowed: boolean;
}

const EnhancedOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState({
    phone: "",
    aadhar: "",
    otp: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const steps = [
    { title: "Phone Verification", description: "Verify your mobile number" },
    { title: "ID Verification", description: "Secure Aadhar verification" },
    { title: "OTP Verification", description: "Enter verification code" },
    { title: "Personality Survey", description: "Tell us about yourself" },
    { title: "Welcome!", description: "You're all set" }
  ];

  // Enhanced interactive personality questions
  const personalityQuestions = [
    {
      id: "emotional_response",
      title: "How does this make you feel?",
      subtitle: "Rate your reaction to this meme",
      type: "emoji_rating",
      memeUrl: "https://i.imgflip.com/2zo1ki.jpg",
      options: [
        { emoji: "😐", label: "Neutral", value: 1 },
        { emoji: "🙂", label: "Slightly Amused", value: 2 },
        { emoji: "😄", label: "Amused", value: 3 },
        { emoji: "😆", label: "Very Funny", value: 4 },
        { emoji: "😂", label: "Hilarious", value: 5 }
      ],
      traits: ["extroversion_score", "conflict_style_score"]
    },
    {
      id: "visual_preference",
      title: "Which feels more like you?",
      subtitle: "Choose your vibe",
      type: "video_choice",
      options: [
        { 
          id: "calm",
          title: "Calm Forest Scene",
          description: "Peaceful nature sounds",
          image: "/forest-scene.jpg",
          traits: ["privacy_preference_score", "early_bird_score"]
        },
        { 
          id: "energetic",
          title: "Bustling City Life",
          description: "Urban energy and excitement",
          image: "/city-scene.jpg",
          traits: ["extroversion_score", "noise_tolerance_score"]
        }
      ]
    },
    {
      id: "lifestyle_vibe",
      title: "Pick your vibe",
      subtitle: "Tap what resonates with you",
      type: "flashcard",
      options: [
        { emoji: "🧘", label: "Chill & Private", traits: ["privacy_preference_score"] },
        { emoji: "🎉", label: "Social & Easygoing", traits: ["extroversion_score"] },
        { emoji: "🧼", label: "Structured & Responsible", traits: ["cleanliness_score"] },
        { emoji: "🤷", label: "Go with the Flow", traits: ["routine_flexibility_score"] }
      ]
    },
    {
      id: "post_work_mood",
      title: "After work, you prefer...",
      subtitle: "Swipe through your ideal evening",
      type: "swipe_cards",
      options: [
        { emoji: "📚", label: "Book & tea", traits: ["privacy_preference_score"] },
        { emoji: "🎧", label: "Music + scrolling", traits: ["aesthetics_score"] },
        { emoji: "🍺", label: "Social outing", traits: ["extroversion_score"] },
        { emoji: "🏃", label: "Workout session", traits: ["fitness_interest_score"] }
      ]
    },
    {
      id: "home_habits",
      title: "Home priorities",
      subtitle: "Drag items to 'Must Have' or 'Don't Care'",
      type: "drag_drop",
      items: [
        { emoji: "🧽", label: "Cleaning schedule", traits: ["cleanliness_score"] },
        { emoji: "🔕", label: "Quiet hours", traits: ["noise_tolerance_score"] },
        { emoji: "🐶", label: "Pets allowed", traits: ["aesthetics_score"] },
        { emoji: "🍱", label: "Shared kitchen", traits: ["extroversion_score"] }
      ],
      categories: ["Must Have", "Don't Care"]
    }
  ];

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    toast({
      title: isVoiceActive ? "Voice input disabled" : "Voice input enabled",
      description: isVoiceActive ? "Switched to visual input" : "I'm listening for your answers"
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < personalityQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleNext();
      savePersonalityData();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleChoice = (questionId: string, choice: any) => {
    setSelectedChoices(prev => ({
      ...prev,
      [questionId]: choice
    }));
  };

  const savePersonalityData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Calculate personality scores based on answers
      const personalityData: PersonalityData = {
        early_bird_score: 0.5,
        cleanliness_score: 0.5,
        extroversion_score: 0.5,
        noise_tolerance_score: 0.5,
        fitness_interest_score: 0.5,
        routine_flexibility_score: 0.5,
        conflict_style_score: 0.5,
        privacy_preference_score: 0.5,
        aesthetics_score: 0.5,
        social_activities: [],
        dietary_preferences: [],
        smoker: false,
        pets_allowed: false
      };

      // Process answers and calculate scores
      Object.entries(selectedChoices).forEach(([questionId, choice]) => {
        const question = personalityQuestions.find(q => q.id === questionId);
        if (question) {
          if (question.type === 'emoji_rating' && typeof choice === 'object') {
            personalityData.extroversion_score = choice.value / 5;
          } else if (question.type === 'flashcard' && choice.traits) {
            choice.traits.forEach((trait: string) => {
              if (trait in personalityData) {
                (personalityData as any)[trait] = Math.min(1, (personalityData as any)[trait] + 0.3);
              }
            });
          }
        }
      });

      await supabase
        .from('personality_traits')
        .upsert({
          user_id: user.id,
          ...personalityData
        });

      toast({
        title: "Profile completed!",
        description: "Your personality profile has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving personality data:', error);
      toast({
        title: "Error",
        description: "Failed to save personality data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderQuestionContent = () => {
    const question = personalityQuestions[currentQuestionIndex];
    if (!question) return null;

    switch (question.type) {
      case 'emoji_rating':
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">{question.title}</CardTitle>
              <CardDescription>{question.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Meme Image */}
              <div className="relative bg-muted rounded-lg p-4 text-center">
                <div className="text-6xl mb-4">😂</div>
                <p className="text-lg">*Insert funny meme here*</p>
              </div>
              
              {/* Emoji Rating Scale */}
              <div className="flex justify-between items-center space-x-2">
                {question.options?.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedChoices[question.id]?.value === option.value ? "default" : "outline"}
                    className="flex-1 h-16 text-2xl flex-col gap-1"
                    onClick={() => handleChoice(question.id, option)}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-xs">{option.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'video_choice':
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">{question.title}</CardTitle>
              <CardDescription>{question.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options?.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedChoices[question.id]?.id === option.id ? "default" : "outline"}
                    className="h-32 p-4 flex flex-col justify-center items-center space-y-2"
                    onClick={() => handleChoice(question.id, option)}
                  >
                    <div className="w-full h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Play className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'flashcard':
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">{question.title}</CardTitle>
              <CardDescription>{question.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {question.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedChoices[question.id] === option ? "default" : "outline"}
                    className="h-24 flex flex-col justify-center items-center space-y-2"
                    onClick={() => handleChoice(question.id, option)}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span className="text-sm font-medium text-center">{option.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'swipe_cards':
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">{question.title}</CardTitle>
              <CardDescription>{question.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {question.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedChoices[question.id] === option ? "default" : "outline"}
                    className="h-20 flex flex-col justify-center items-center space-y-2"
                    onClick={() => handleChoice(question.id, option)}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'drag_drop':
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">{question.title}</CardTitle>
              <CardDescription>{question.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Items to drag */}
              <div className="space-y-2">
                <h4 className="font-medium">Home Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {question.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-muted rounded-lg cursor-grab"
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop zones */}
              <div className="grid grid-cols-2 gap-4">
                {question.categories?.map((category) => (
                  <div
                    key={category}
                    className="border-2 border-dashed border-muted rounded-lg p-4 min-h-24 flex items-center justify-center"
                  >
                    <span className="text-muted-foreground">{category}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="default"
                className="w-full"
                onClick={() => handleChoice(question.id, { category: "completed" })}
              >
                Done with this question
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-heading">Phone Verification</CardTitle>
              <CardDescription>Enter your mobile number for secure access</CardDescription>
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

      case 2:
        return (
          <Card className="bg-gradient-card shadow-strong border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Shield className="w-8 h-8 text-secondary-foreground" />
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

      case 3:
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

      case 4:
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-strong border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-heading">Personality Survey</CardTitle>
                <CardDescription>
                  Question {currentQuestionIndex + 1} of {personalityQuestions.length}
                </CardDescription>
                <Progress 
                  value={(currentQuestionIndex / personalityQuestions.length) * 100} 
                  className="mt-4"
                />
              </CardHeader>
            </Card>

            {renderQuestionContent()}

            <div className="flex justify-between space-x-4">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="default"
                onClick={handleNextQuestion}
                disabled={!selectedChoices[personalityQuestions[currentQuestionIndex]?.id]}
                className="flex-1"
              >
                {currentQuestionIndex === personalityQuestions.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <Card className="bg-gradient-card shadow-strong border-0 text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Welcome to RoomieAI! 🎉</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your profile is complete! Our AI is finding your perfect roommate matches.
              </p>
              <Button 
                variant="hero" 
                size="xl" 
                className="w-full mb-4"
                onClick={() => navigate("/dashboard")}
              >
                View My Matches
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/dashboard")}
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
          <h1 className="text-4xl font-heading font-bold mb-4">Get Started with RoomieAI</h1>
          <p className="text-lg text-muted-foreground">Let's find your perfect roommate match</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceToggle}
              className="flex items-center space-x-2"
            >
              {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>{isVoiceActive ? "Voice On" : "Voice Off"}</span>
            </Button>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs text-center flex-1 ${
                  index < currentStep ? "text-primary font-medium" : "text-muted-foreground"
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
            <Card className="bg-gradient-primary p-4 shadow-glow border-0 animate-pulse">
              <div className="flex items-center space-x-3 text-white">
                <Volume2 className="w-5 h-5" />
                <span className="font-medium">AI Assistant Listening...</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedOnboardingFlow;