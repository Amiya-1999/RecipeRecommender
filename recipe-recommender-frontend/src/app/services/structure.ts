export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  ingredients: string;
  steps: string;
  image_url: string;
  cooking_time: number;
  cuisine: string;
  dietary_preferences: string;
  ratings?: number
}
