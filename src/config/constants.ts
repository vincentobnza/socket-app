export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
  ROOM_USER_COUNT: 'room_user_count',
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
} as const;
