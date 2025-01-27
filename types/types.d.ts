export interface RegisterRequestBody {
    email: string;
    password: string;
    username: string;
}
  
export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface LoginRequestBody {
    username: string;
    password: string;
  
}

export interface Story {
    id: number;
    title: string;
    content: string;
    author_id: number;
    created_at: string;
    updated_at: string;
  }
  
