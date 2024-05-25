import React, { useEffect, useState } from "react";
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
import { Formik, Field } from "formik";

const MessangerTextEditor = ({ sendImMessage }) => {
  return (
    <Flex w={"100%"} justifyContent={"center"}>
      <Formik
        initialValues={{
          im_message: "",
        }}
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2));
          sendImMessage(values.im_message);
          actions.resetForm({
            values: {
              im_message: ''
            }
          });
        }}
      >
        {({ handleSubmit,handleReset, errors, touched }) => (
          <form onSubmit={handleSubmit} style={{ width: "98%" }}>
            <HStack>
              <FormControl>
                <Field
                  as={Textarea}
                  resize={"none"}
                  id="im_message"
                  name="im_message"
                  placeholder="Please enter your message details"
                  validate={(value) => {
                    let error;
                    if (value.length < 1) {
                      error = "Message Can be left blank";
                    }
                    return error;
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13 && e.shiftKey == false) {
                      e.preventDefault();
                      // this.myFormRef.submit();
                      // alert("Enter key pressed");
                      handleSubmit();
                    }
                  }}
                  bg={"#fff"}
                  fontSize="sm" 
                  fontWeight="normal"
                />
                <FormHelperText align={"right"} fontSize="xs" fontWeight="normal" mb={1}>
                  Shift + Enter to add a new line
                </FormHelperText>
              </FormControl>
            </HStack>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

export default MessangerTextEditor;
