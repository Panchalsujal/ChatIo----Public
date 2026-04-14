import { initializeSocketConnection } from "../service/chat.socket";
import {
  sendMessage,
  getChats,
  getMessages,
} from "../service/chat.api.js";

import {
  setChats,
  setCurrentChatId,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
} from "../chat.slice.js";

import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  // SEND MESSAGE
  const sendMessageHandler = async ({ message, chatId }) => {
    try {
      dispatch(setLoading(true));

      const data = await sendMessage({ message, chatId });

      const { chat, Aimessage } = data;

      let activeChatId = chatId;

      // agar new chat create hua hai
      if (!chatId) {
        activeChatId = chat._id;

        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          })
        );

        dispatch(setCurrentChatId(chat._id));
      }

      // USER MESSAGE first add karo
      dispatch(
        addNewMessage({
          chatId: activeChatId,
          content: message,
          role: "user",
        })
      );

      // AI MESSAGE second add karo
      dispatch(
        addNewMessage({
          chatId: activeChatId,
          content: Aimessage.content,
          role: Aimessage.role,
        })
      );

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };


  // GET ALL CHATS
  const getChatsHandler = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getChats();

      const { chats } = data;

      dispatch(
        setChats(
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              messages: [],
              lastUpdated: chat.updatedAt,
            };
            return acc;
          }, {})
        )
      );

    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };


  // OPEN CHAT
  const handleOpenChat = async (chatId) => {
    try {
      dispatch(setLoading(true));

      const data = await getMessages(chatId);

      const { messages } = data;

      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
        role: msg.role,
      }));

      dispatch(addMessages({ chatId, messages: formattedMessages }));

      dispatch(setCurrentChatId(chatId));

    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    initializeSocketConnection,
    sendMessageHandler,
    getChatsHandler,
    handleOpenChat,
  };
};