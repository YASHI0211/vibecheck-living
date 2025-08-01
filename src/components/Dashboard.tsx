import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Heart,
  MessageCircle,
  Phone,
  Star,
  Users,
  Home,
  Shield,
  Calendar,
  DollarSign,
  Camera,
  Mic,
  Settings,
  Bell,
  Award,
  Coffee,
  Dumbbell,
  Moon,
  Sun,
  Volume2,
  Palette,
  ChevronRight,
  Clock,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoommateMatch {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  matchScore: number;
  avatar: string;
  traits: {
    earlyBird: number;
    cleanliness: number;
    social: number;
    noiseTolerance: number;
    fitness: number;
  };
  interests: string[];
  roomPreference: string;
  budget: string;
  moveInDate: string;
  verified: boolean;
}

interface Room {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  amenities: string[];
  available: boolean;
  images: string[];
  distance: number;
}

const Dashboard = () => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for roommate matches
  const matches: RoommateMatch[] = [
    {
      id: "1",
      name: "Priya Sharma",
      age: 24,
      profession: "Software Engineer",
      location: "Koramangala, Bangalore",
      matchScore: 95,
      avatar: "/placeholder-avatar-1.jpg",
      traits: {
        earlyBird: 0.8,
        cleanliness: 0.9,
        social: 0.7,
        noiseTolerance: 0.6,
        fitness: 0.8
      },
      interests: ["Reading", "Yoga", "Cooking", "Tech"],
      roomPreference: "Twin sharing with window",
      budget: "₹15,000 - ₹20,000",
      moveInDate: "March 15, 2024",
      verified: true
    },
    {
      id: "2",
      name: "Ananya Gupta",
      age: 26,
      profession: "Marketing Manager",
      location: "HSR Layout, Bangalore",
      matchScore: 87,
      avatar: "/placeholder-avatar-2.jpg",
      traits: {
        earlyBird: 0.6,
        cleanliness: 0.8,
        social: 0.9,
        noiseTolerance: 0.7,
        fitness: 0.6
      },
      interests: ["Movies", "Fitness", "Travel", "Food"],
      roomPreference: "Twin sharing near metro",
      budget: "₹18,000 - ₹25,000",
      moveInDate: "April 1, 2024",
      verified: true
    },
    {
      id: "3",
      name: "Kavya Reddy",
      age: 23,
      profession: "Data Analyst",
      location: "Whitefield, Bangalore",
      matchScore: 82,
      avatar: "/placeholder-avatar-3.jpg",
      traits: {
        earlyBird: 0.9,
        cleanliness: 0.7,
        social: 0.5,
        noiseTolerance: 0.4,
        fitness: 0.9
      },
      interests: ["Gym", "Books", "Music", "Art"],
      roomPreference: "Single room preferred",
      budget: "₹20,000 - ₹30,000",
      moveInDate: "March 25, 2024",
      verified: true
    }
  ];

  // Mock data for room suggestions
  const rooms: Room[] = [
    {
      id: "1",
      title: "Modern Co-living Space",
      location: "Koramangala, Bangalore",
      price: 18000,
      type: "Twin Sharing",
      amenities: ["WiFi", "AC", "Laundry", "Kitchen", "Security"],
      available: true,
      images: ["/placeholder-room-1.jpg"],
      distance: 1.2
    },
    {
      id: "2",
      title: "Premium Women's PG",
      location: "HSR Layout, Bangalore",
      price: 22000,
      type: "Single Room",
      amenities: ["WiFi", "AC", "Meals", "Gym", "Housekeeping"],
      available: true,
      images: ["/placeholder-room-2.jpg"],
      distance: 2.1
    }
  ];

  const handleStartChat = (matchId: string, matchName: string) => {
    toast({
      title: "Chat Started! 💬",
      description: `You can now chat with ${matchName}`,
    });
  };

  const handleVoiceCall = (matchId: string, matchName: string) => {
    toast({
      title: "Voice Call Starting 📞",
      description: `Calling ${matchName}...`,
    });
  };

  const handleViewRoom = (roomId: string) => {
    toast({
      title: "Room Details",
      description: "Opening detailed room view with 3D tour",
    });
  };

  const getTraitIcon = (trait: string) => {
    switch (trait) {
      case 'earlyBird': return <Sun className="w-4 h-4" />;
      case 'cleanliness': return <Star className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'noiseTolerance': return <Volume2 className="w-4 h-4" />;
      case 'fitness': return <Dumbbell className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getTraitLabel = (trait: string) => {
    switch (trait) {
      case 'earlyBird': return 'Early Bird';
      case 'cleanliness': return 'Cleanliness';
      case 'social': return 'Social';
      case 'noiseTolerance': return 'Noise Tolerance';
      case 'fitness': return 'Fitness';
      default: return trait;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <header className="bg-gradient-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold">Welcome back, Sarah! 👋</h1>
                <p className="text-muted-foreground">You have 3 new matches waiting</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="voice" size="icon">
                <Mic className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-10 h-10 shadow-medium">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-primary text-white">S</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 h-12">
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Matches</span>
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Rooms</span>
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Chats</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Your Perfect Matches</span>
                  </CardTitle>
                  <CardDescription>AI-powered roommate recommendations based on your preferences</CardDescription>
                </CardHeader>
              </Card>

              {matches.map((match) => (
                <Card key={match.id} className="bg-gradient-card shadow-medium hover:shadow-strong transition-smooth border-0">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Profile Info */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16 shadow-medium">
                            <AvatarImage src={match.avatar} />
                            <AvatarFallback className="bg-gradient-primary text-white text-lg">
                              {match.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-heading font-semibold text-lg">{match.name}</h3>
                              {match.verified && (
                                <Badge variant="default" className="bg-success">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{match.age} • {match.profession}</p>
                            <div className="flex items-center space-x-1 mt-1 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{match.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Match Score</span>
                            <Badge variant="secondary" className="bg-gradient-primary text-white">
                              {match.matchScore}% Match
                            </Badge>
                          </div>
                          <Progress value={match.matchScore} className="h-2" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {match.interests.slice(0, 3).map((interest) => (
                            <Badge key={interest} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {match.interests.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{match.interests.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Compatibility Chart */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground">Compatibility Traits</h4>
                        <div className="space-y-3">
                          {Object.entries(match.traits).map(([trait, value]) => (
                            <div key={trait} className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
                                {getTraitIcon(trait)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium">{getTraitLabel(trait)}</span>
                                  <span className="text-xs text-muted-foreground">{Math.round(value * 100)}%</span>
                                </div>
                                <Progress value={value * 100} className="h-1" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions & Details */}
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="text-xs space-y-2">
                            <div className="flex items-center space-x-2">
                              <Home className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Room: {match.roomPreference}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Budget: {match.budget}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Move-in: {match.moveInDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            variant="hero" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleStartChat(match.id, match.name)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Start Chat
                          </Button>
                          <Button 
                            variant="voice" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleVoiceCall(match.id, match.name)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Voice Call
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            View Profile
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="w-5 h-5 text-primary" />
                  <span>Recommended Rooms</span>
                </CardTitle>
                <CardDescription>Perfect rooms based on your matches and preferences</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <Card key={room.id} className="bg-gradient-card shadow-medium hover:shadow-strong transition-smooth border-0 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-gradient-primary mb-2">{room.type}</Badge>
                      <h3 className="font-heading font-semibold text-xl">{room.title}</h3>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute top-4 right-4 bg-white/20 border-white/30"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                            <MapPin className="w-3 h-3" />
                            <span>{room.location}</span>
                            <span>• {room.distance}km away</span>
                          </div>
                          <p className="text-2xl font-bold text-primary">₹{room.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                        {room.available && (
                          <Badge variant="default" className="bg-success">Available</Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {room.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{room.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="hero" 
                          size="sm"
                          onClick={() => handleViewRoom(room.id)}
                        >
                          3D Tour
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Chats Tab */}
          <TabsContent value="chats">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2">Start Your First Chat</h3>
                <p className="text-muted-foreground mb-6">Connect with your matches to get to know them better</p>
                <Button variant="hero">
                  Browse Matches
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2">Your Profile</h3>
                <p className="text-muted-foreground mb-6">Manage your preferences and view your profile</p>
                <Button variant="premium">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          variant="voice" 
          size="lg" 
          className="rounded-full shadow-glow animate-pulse-glow"
        >
          <Mic className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;