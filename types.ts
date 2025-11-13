
export interface Activity {
  id: number;
  name: string;
  category: string;
  communityCenter: string;
  ageGroup: string;
  minAge: number;
  maxAge: number;
  price: number | null;
  notes: string;
  frequency: string;
  schedule: string;
}
