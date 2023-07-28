import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";
import { ChatContext } from "../Context/ChatProvider";

const SingleChat = () => {
  const socket = io("http://localhost:4000");
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    chatId,
    setChatId,
    loggedInUser,
    handleGetAllMessages
  } = useContext(ChatContext);

  socket.on("om namay shivay", async ({ newMessageRecieved, note }) => {
    chats.push(newMessageRecieved);
    console.log(note);
    handleGetAllMessages();
  });

  useEffect(()=>{
    handleGetAllMessages();
  },[chats])

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const response = await fetch("http://localhost:4000/message/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newMessage,
            chatId: chatId?._id,
            senderId: loggedInUser?._id,
          }),
          credentials: "include",
        });
        const data = await response.json();
        setNewMessage("");
        socket.emit("new message", {
          newMessageRecieved: data,
          note: "from frontend",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {selectedChat?.name}
            {<ProfileModal user={selectedChat} />}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            <div className="messages">
              <ScrollableFeed>
                {chats &&
                  chats.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                      <span
                        style={{
                          backgroundColor: `${
                            m.sender._id === loggedInUser._id
                              ? "#7bed9f"
                              : "#70a1ff"
                          }`,
                          marginLeft: `${
                            m.sender._id === loggedInUser._id ? "auto" : "0"
                          }`,
                          padding: "5px 15px",
                          maxWidth: "75%",
                          borderRadius: "20px",
                          marginTop: "5px",
                        }}
                      >
                        {m.content}
                      </span>
                    </div>
                  ))}
              </ScrollableFeed>
            </div>
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
