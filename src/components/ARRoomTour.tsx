import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Text, Environment, Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Move3D, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Home, 
  Bed, 
  Bath, 
  Utensils,
  Wifi,
  Car,
  Shield,
  X,
  Info
} from 'lucide-react';

interface RoomData {
  id: string;
  name: string;
  type: 'single' | 'twin';
  floor: number;
  hasWindow: boolean;
  hasAttachedBathroom: boolean;
  monthlyRent: number;
  amenities: string[];
  images: string[];
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

interface ARRoomTourProps {
  room: RoomData;
  isOpen: boolean;
  onClose: () => void;
}

// 3D Room Component
const Room3D = ({ room }: { room: RoomData }) => {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const roomColor = room.type === 'single' ? '#e3f2fd' : '#f3e5f5';
  const wallColor = '#f5f5f5';

  return (
    <group ref={meshRef}>
      {/* Room Walls */}
      <Box args={[room.dimensions.length, room.dimensions.height, 0.1]} position={[0, 0, -room.dimensions.width/2]}>
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box args={[room.dimensions.length, room.dimensions.height, 0.1]} position={[0, 0, room.dimensions.width/2]}>
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box args={[0.1, room.dimensions.height, room.dimensions.width]} position={[-room.dimensions.length/2, 0, 0]}>
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box args={[0.1, room.dimensions.height, room.dimensions.width]} position={[room.dimensions.length/2, 0, 0]}>
        <meshStandardMaterial color={wallColor} />
      </Box>

      {/* Floor */}
      <Box args={[room.dimensions.length, 0.1, room.dimensions.width]} position={[0, -room.dimensions.height/2, 0]}>
        <meshStandardMaterial color={roomColor} />
      </Box>

      {/* Ceiling */}
      <Box args={[room.dimensions.length, 0.1, room.dimensions.width]} position={[0, room.dimensions.height/2, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Bed */}
      <Box 
        args={[1.5, 0.3, 2]} 
        position={[-1, -1, -1]}
        onPointerOver={() => setHovered('bed')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={hovered === 'bed' ? '#4fc3f7' : '#8d6e63'} />
      </Box>

      {/* Desk */}
      <Box 
        args={[1.2, 0.8, 0.6]} 
        position={[1.5, -0.8, 1]}
        onPointerOver={() => setHovered('desk')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={hovered === 'desk' ? '#4fc3f7' : '#6d4c41'} />
      </Box>

      {/* Wardrobe */}
      <Box 
        args={[0.6, 2, 1.5]} 
        position={[2, 0, -1.5]}
        onPointerOver={() => setHovered('wardrobe')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={hovered === 'wardrobe' ? '#4fc3f7' : '#5d4037'} />
      </Box>

      {/* Window (if available) */}
      {room.hasWindow && (
        <Box 
          args={[1.5, 1.5, 0.05]} 
          position={[0, 0.5, room.dimensions.width/2 - 0.05]}
          onPointerOver={() => setHovered('window')}
          onPointerOut={() => setHovered(null)}
        >
          <meshStandardMaterial color={hovered === 'window' ? '#81c784' : '#87ceeb'} transparent opacity={0.7} />
        </Box>
      )}

      {/* Door */}
      <Box 
        args={[0.8, 2, 0.05]} 
        position={[-room.dimensions.length/2 + 0.05, 0, 1]}
        onPointerOver={() => setHovered('door')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={hovered === 'door' ? '#4fc3f7' : '#8d6e63'} />
      </Box>

      {/* Interactive Labels */}
      {hovered && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-sm pointer-events-none">
            {hovered.charAt(0).toUpperCase() + hovered.slice(1)}
          </div>
        </Html>
      )}

      {/* Room Info */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {room.name}
      </Text>
    </group>
  );
};

// Camera Controller
const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const ARRoomTour: React.FC<ARRoomTourProps> = ({ room, isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'3d' | 'ar'>('3d');
  const [showInfo, setShowInfo] = useState(true);

  if (!isOpen) return null;

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="w-4 h-4" />,
    'AC': <Home className="w-4 h-4" />,
    'Parking': <Car className="w-4 h-4" />,
    'Security': <Shield className="w-4 h-4" />,
    'Laundry': <Home className="w-4 h-4" />,
    'Kitchen': <Utensils className="w-4 h-4" />
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] bg-white">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div>
            <CardTitle className="text-2xl font-bold">{room.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">{room.type} room</Badge>
              <Badge variant="outline">Floor {room.floor}</Badge>
              <Badge variant="outline">₹{room.monthlyRent.toLocaleString()}/month</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
            {/* 3D View */}
            <div className="lg:col-span-3 relative">
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <Button
                  variant={viewMode === '3d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('3d')}
                >
                  <Move3D className="w-4 h-4 mr-2" />
                  3D View
                </Button>
                <Button
                  variant={viewMode === 'ar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('ar')}
                >
                  AR Tour
                </Button>
              </div>

              <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {viewMode === '3d' ? (
                <Canvas className="h-full w-full">
                  <CameraController />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  
                  <Suspense fallback={null}>
                    <Room3D room={room} />
                    <Environment preset="apartment" />
                  </Suspense>
                  
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={15}
                  />
                </Canvas>
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Move3D className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AR Room Tour</h3>
                    <p className="text-muted-foreground mb-4">Point your camera to start the AR experience</p>
                    <Button>Start AR Tour</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Room Information Panel */}
            {showInfo && (
              <div className="bg-muted/30 p-4 overflow-y-auto">
                <div className="space-y-6">
                  {/* Room Details */}
                  <div>
                    <h3 className="font-semibold mb-3">Room Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <Badge variant="outline">{room.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Floor:</span>
                        <span>{room.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Window:</span>
                        <span>{room.hasWindow ? '✓' : '✗'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attached Bathroom:</span>
                        <span>{room.hasAttachedBathroom ? '✓' : '✗'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span>{room.dimensions.length}×{room.dimensions.width}×{room.dimensions.height}m</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2 text-sm">
                          {amenityIcons[amenity] || <Home className="w-4 h-4" />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Furniture */}
                  <div>
                    <h3 className="font-semibold mb-3">Furniture Included</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Bed className="w-4 h-4" />
                        <span>Single/Double Bed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Study Desk & Chair</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Wardrobe</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Side Table</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Instructions */}
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">How to Navigate:</h4>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <p>• Click and drag to rotate view</p>
                      <p>• Scroll to zoom in/out</p>
                      <p>• Hover over furniture for info</p>
                      <p>• Use controls to reset view</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      Book This Room
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Schedule Visit
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Share Room
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARRoomTour;