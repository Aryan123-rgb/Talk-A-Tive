import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import ProfileModal from "./ProfileModal";
import { ChatContext } from "../../Context/ChatProvider";

function SideDrawer() {

  const {loggedInUser, setLoggedInUser,getLoggedInUserInfo} = useContext(ChatContext)
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('/');
  };

  const image = `http://localhost:4000/${loggedInUser?.pic}`;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Text fontSize="2xl" fontFamily="Work sans">
          Welcome!
        </Text>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <BellIcon fontSize="2xl" m={1} />
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={loggedInUser?.name}
                src={image}
              />
            </MenuButton>
            <MenuList>
            <ProfileModal user={loggedInUser}>
                <MenuItem> {loggedInUser?.name} </MenuItem>{" "}
              </ProfileModal>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
