export interface Visit {
  id: string;
  baby: {
    name: string;
    area: string;
    location: string;
  };
  visitTime: string;
  lesson?: {
    id: string;
  };
  status: string;
}
