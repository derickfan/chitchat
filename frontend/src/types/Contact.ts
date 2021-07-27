import { Message } from "./Message";

export interface Contact {
  name: string;
  profilePhotoUrl: string;
  history: Message[];
}