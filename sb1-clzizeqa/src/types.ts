export type ViolationType = 
  | 'LITTERING'
  | 'WATER_WASTE'
  | 'POWER_WASTE'
  | 'PLANT_DAMAGE'
  | 'OTHER';

export interface Location {
  address: string;
}

export interface Report {
  id: string; // New: unique identifier for each report
  violationType: ViolationType;
  otherDescription?: string;
  location: Location;
  description: string;
  images: string[];
  severity: number;
  detectedAt: string;
  contact?: {
    name: string;
    phone: string;
    email: string;
  };
  isAnonymous: boolean;
  folder?: string; // New: optional folder assignment
  isMarked?: boolean; // New: for marking important reports
  createdAt: string; // New: timestamp when report was created
}

export interface Folder {
  id: string;
  name: string;
  color: string;
}