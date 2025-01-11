export type PolygonPoint = {
    lat: number;
    lng: number;
  };

export type SpeedZone = {
    id: string;
    speedLimit: number;
};

export type Zone = {
    id: string;
    polygon: PolygonPoint[];
    type: 'parking' | 'charging' | 'speed';
    speedZone?: SpeedZone | null;
};