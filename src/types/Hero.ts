export interface HeroType {
  id: string;
  name: string;
}

export default interface Hero {
  avatar_url: string;
  description: string;
  full_name: string;
  id: string;
  type: HeroType;
}
