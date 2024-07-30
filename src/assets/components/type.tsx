export interface Transaction {
    id: number;
    createdAt: string;
    objectId: number;
    type: 'up' | 'down';
    amount: number;
    path: string;
    object: {
      id: number;
      name: string;
      type: string;
      attrs: Record<string, any>;
    };
  }
  
  export interface ChartData {
    amount: number;
    createdAt: string;
    projectName: string;
  }
  