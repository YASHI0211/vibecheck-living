import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Home,
  TrendingUp,
  Shield,
  Search,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  profession: string;
  location: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'blocked';
  verified: boolean;
  matchesCount: number;
  currentRoom?: string;
}

interface MatchRecord {
  id: string;
  user1: string;
  user2: string;
  matchScore: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdDate: string;
  roomAssigned?: string;
}

interface RoomAssignment {
  id: string;
  roomNumber: string;
  building: string;
  location: string;
  occupants: string[];
  capacity: number;
  monthlyRent: number;
  status: 'occupied' | 'partial' | 'vacant';
  lastUpdated: string;
}

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();

  // Mock data
  const users: UserProfile[] = [
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      age: 24,
      profession: "Software Engineer",
      location: "Koramangala, Bangalore",
      joinedDate: "2024-01-15",
      status: "active",
      verified: true,
      matchesCount: 3,
      currentRoom: "Room 101A"
    },
    {
      id: "2",
      name: "Ananya Gupta",
      email: "ananya.gupta@email.com",
      phone: "+91 87654 32109",
      age: 26,
      profession: "Marketing Manager",
      location: "HSR Layout, Bangalore",
      joinedDate: "2024-02-01",
      status: "active",
      verified: true,
      matchesCount: 2,
      currentRoom: "Room 205B"
    },
    {
      id: "3",
      name: "Kavya Reddy",
      email: "kavya.reddy@email.com",
      phone: "+91 76543 21098",
      age: 23,
      profession: "Data Analyst",
      location: "Whitefield, Bangalore",
      joinedDate: "2024-02-10",
      status: "pending",
      verified: false,
      matchesCount: 0
    }
  ];

  const matches: MatchRecord[] = [
    {
      id: "1",
      user1: "Priya Sharma",
      user2: "Ananya Gupta",
      matchScore: 95,
      status: "accepted",
      createdDate: "2024-02-15",
      roomAssigned: "Room 301A"
    },
    {
      id: "2",
      user1: "Kavya Reddy",
      user2: "Priya Sharma",
      matchScore: 82,
      status: "pending",
      createdDate: "2024-02-20"
    }
  ];

  const roomAssignments: RoomAssignment[] = [
    {
      id: "1",
      roomNumber: "Room 101A",
      building: "Building A",
      location: "Koramangala, Bangalore",
      occupants: ["Priya Sharma"],
      capacity: 2,
      monthlyRent: 18000,
      status: "partial",
      lastUpdated: "2024-02-15"
    },
    {
      id: "2",
      roomNumber: "Room 205B",
      building: "Building B",
      location: "HSR Layout, Bangalore",
      occupants: ["Ananya Gupta", "Sarah Wilson"],
      capacity: 2,
      monthlyRent: 22000,
      status: "occupied",
      lastUpdated: "2024-02-18"
    }
  ];

  const stats = {
    totalUsers: 1247,
    activeMatches: 342,
    roomsOccupied: 89,
    successfulPlacements: 156,
    totalRevenue: 2840000,
    averageMatchScore: 87.5
  };

  const handleUserAction = (action: string, userId: string, userName: string) => {
    toast({
      title: `${action} User`,
      description: `${action} action performed for ${userName}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export",
      description: "Generating comprehensive report... Download will start shortly.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success">Active</Badge>;
      case 'pending':
        return <Badge className="bg-warning">Pending</Badge>;
      case 'blocked':
        return <Badge className="bg-destructive">Blocked</Badge>;
      case 'accepted':
        return <Badge className="bg-success">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive">Rejected</Badge>;
      case 'occupied':
        return <Badge className="bg-success">Occupied</Badge>;
      case 'partial':
        return <Badge className="bg-warning">Partial</Badge>;
      case 'vacant':
        return <Badge className="bg-muted">Vacant</Badge>;
      default:
        return <Badge>{status}</Badge>;
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">RoomieMatch Management Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="premium" onClick={handleExportData}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Avatar className="w-10 h-10 shadow-medium">
                <AvatarImage src="/admin-avatar.jpg" />
                <AvatarFallback className="bg-gradient-primary text-white">A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 h-12">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Matches</span>
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Rooms</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <PieChart className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Users</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.activeMatches}</div>
                  <div className="text-xs text-muted-foreground">Active Matches</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-4 text-center">
                  <Home className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.roomsOccupied}%</div>
                  <div className="text-xs text-muted-foreground">Occupancy Rate</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.successfulPlacements}</div>
                  <div className="text-xs text-muted-foreground">Successful Placements</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-muted-foreground">Total Revenue</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-warning mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.averageMatchScore}%</div>
                  <div className="text-xs text-muted-foreground">Avg Match Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-primary text-white text-xs">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.profession}</div>
                          </div>
                        </div>
                        {getStatusBadge(user.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-0">
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matches.slice(0, 3).map((match) => (
                      <div key={match.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{match.user1} ↔ {match.user2}</div>
                          <div className="text-xs text-muted-foreground">Score: {match.matchScore}%</div>
                        </div>
                        {getStatusBadge(match.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all registered users and their profiles</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Matches</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-primary text-white text-xs">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.profession}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Phone className="w-3 h-3" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-sm">{user.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {getStatusBadge(user.status)}
                            {user.verified && (
                              <Badge variant="outline" className="bg-success/10 text-success border-success">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.matchesCount}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-sm">{new Date(user.joinedDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleUserAction("View", user.id, user.name)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleUserAction("Edit", user.id, user.name)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleUserAction("Block", user.id, user.name)}
                            >
                              <XCircle className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardHeader>
                <CardTitle>Match Records</CardTitle>
                <CardDescription>Monitor all roommate matches and their statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match Pair</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Room Assigned</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div className="font-medium">{match.user1} ↔ {match.user2}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-warning" />
                            <span className="font-medium">{match.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(match.status)}</TableCell>
                        <TableCell>
                          {match.roomAssigned ? (
                            <Badge variant="outline">{match.roomAssigned}</Badge>
                          ) : (
                            <span className="text-muted-foreground">Not assigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span className="text-sm">{new Date(match.createdDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="icon">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardHeader>
                <CardTitle>Room Management</CardTitle>
                <CardDescription>Monitor room occupancy and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Occupants</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Rent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomAssignments.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <div className="font-medium">{room.roomNumber}</div>
                          <div className="text-sm text-muted-foreground">{room.building}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-sm">{room.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {room.occupants.map((occupant, index) => (
                              <Badge key={index} variant="outline" className="text-xs mr-1">
                                {occupant}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {room.occupants.length}/{room.capacity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">₹{room.monthlyRent.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>{getStatusBadge(room.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="icon">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardContent className="p-12 text-center">
                <PieChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground mb-6">Detailed charts and insights coming soon</p>
                <Button variant="premium">
                  Generate Reports
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;