import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useContext, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { ChatContext } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";

const MyChats = () => {
  const toast = useToast();
  const {
    selectedChat,
    setSelectedChat,
    allUserInfo,
    setAllUserInfo,
    getAllUserInfo,
    loggedInUser,
    setLoggedInUser,
    chatId,
    setChatId,
    chats,
    setChats,
  } = useContext(ChatContext);

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const handleClick = async (chat) => {
    const response = await fetch("http://localhost:4000/chat/createChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUser?._id,
        otherId: chat?._id,
      }),
      credentials: "include",
    });
    const data = await response.json();
    setChatId(data);

    const messageResponse = await fetch(
      "http://localhost:4000/message/getAlldata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: data?._id,
        }),
        credentials: "include",
      }
    );
    const messageData = await messageResponse.json();
    setChats(messageData);
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {allUserInfo ? (
          <Stack overflowY="scroll">
            {allUserInfo.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                  handleClick(chat);
                }}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text fontSize="xl">{chat.name}</Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
