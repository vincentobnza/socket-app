export type MessageSender = 'me' | 'them' | 'system';

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
}
