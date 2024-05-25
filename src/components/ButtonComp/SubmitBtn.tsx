import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Box,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  activeChannel,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Input,
  VStack,
  Text,
  Avatar,
  AvatarBadge,
  HStack,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  closeOnOverlayClick,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";

export const SubmitBtn = (props) => {
    return(
        <Button 
            size={"sm"}
            fontWeight="medium"
            as='button'
            h={8}
            type="submit" 
            variant={"brand"}
            rightIcon={<ArrowRightIcon h={3} w={3}/>} 
            disabled={props.isSubmitting}
            >
            {props.value}
        </Button>
    )
}

