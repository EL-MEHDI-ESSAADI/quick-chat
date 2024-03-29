export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
  collectionId: string;
  collectionName: string;
  emailVisibility: boolean;
  created: string;
  updated: string;
  verified: boolean;
  bio?: string;
} | null;

export type Room = {
  id: string;
  title: string;
};

export type Message = {
  body: string;
  collectionId: string;
  collectionName: string;
  created: string;
  expand: {
    user: NonNullable<User>;
  };
  id: string;
  likes: number;
  room: string;
  updated: string;
  user: string;
};
