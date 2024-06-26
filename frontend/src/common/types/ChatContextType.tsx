import { Socket } from "socket.io-client";
import { ChatListType } from "../../pages/ChatPage/types/ChatListType";
import {
  chatGroupMessages,
  groupMembers,
  OnlineUser,
  userInfo,
} from "../context/ChatContext";

export type ChatContextType = {
  selectedChat: string;
  chatColor: string;
  chatLists: ChatListType[];
  currentId: string;
  groupMembers: groupMembers[];
  chatGroupMessages: chatGroupMessages[];
  newMessage: chatGroupMessages | undefined;
  chatSocket: Socket | null;
  onlineUsers: userInfo[] | undefined;
  updateSelectedChat: (chatId: string) => void;
  sendMessage: (
    message: string,
    senderId: string,
    chatId: string
  ) => Promise<void>;
  setChatColor: (color: string) => void;
};
