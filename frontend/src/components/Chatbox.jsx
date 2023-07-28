import { Box } from "@chakra-ui/layout";
import "./styles.css";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const Chatbox = () => {
const {selectedChat, setSelectedChat} = useContext(ChatContext)
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat />
    </Box>
  );
};

export default Chatbox;
