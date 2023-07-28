import React, { createContext, useContext, useEffect, useState } from "react";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [allUserInfo, setAllUserInfo] = useState();
  const [chatId, setChatId] = useState();
  const [chats, setChats] = useState([]);

  const getLoggedInUserInfo = async () => {
    const response = await fetch("http://localhost:4000/user", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setLoggedInUser(data[0]);
  };

  const getAllUserInfo = async () => {
    const response = await fetch("http://localhost:4000/user/allUserInfo", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setAllUserInfo(data);
  };

  const handleGetAllMessages = async () => {
    const response = await fetch("http://localhost:4000/message/getAlldata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId?._id,
      }),
      credentials: "include",
    });
    const data = await response.json();
    setChats(data);
  };

  useEffect(() => {
    getLoggedInUserInfo();
    getAllUserInfo();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        loggedInUser,
        setLoggedInUser,
        chats,
        setChats,
        getLoggedInUserInfo,
        allUserInfo,
        setAllUserInfo,
        getAllUserInfo,
        chatId,
        setChatId,
        handleGetAllMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
