export type City = {
    id: string;
    name: string;
    latitude: number | null;
    longitude: number | null;
    createdAt: string;
    updatedAt: string; 
};
  
export type BikeStatus = {
    batteryLevel: number;
    city?: City;
    createdAt: string;
    id: string;
    latitude: number;
    longitude: number;
    status: "Rented" | "Available" | "Service" | string; // Add other possible status values if needed
    updatedAt: string; // ISO timestamp as a string
};

export type Scooter = {
    id: string;
    batteryLevel: number;
    latitude: number;
    longitude: number;
    status: string;
    city?: string;
    createdAt?: string;
    updatedAt?: string;
  };

export type Rental = {
        
          id: number | string,
          startTime: string,
          latStart: number,
          longStart: number,
          startZoneType: string,
          endZoneType: string,
          cost: number
          stopTime?: string,
}