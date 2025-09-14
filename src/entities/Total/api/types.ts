
export interface User {
    id: string;
    firstName: string;
    lastName: string;
  }

  export interface Feed {
    id: string;
    title: string;
    subtitle?:string;
    description: string;
    bannerUrl: string;
    createdAt: string;
    updatedAt: string; 
    userId: string;
    createdBy: User;
  }
  
  export interface CreateFeedData {
    title: string;
    subtitle?:string;
    description: string;
    bannerUrl?: string;
    createdAt?:string;
  }
