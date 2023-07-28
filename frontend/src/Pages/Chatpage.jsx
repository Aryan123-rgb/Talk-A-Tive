import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

const Chatpage = () => {
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats />
        <Chatbox />
      </Box>
    </div>
  );
};

export default Chatpage;
