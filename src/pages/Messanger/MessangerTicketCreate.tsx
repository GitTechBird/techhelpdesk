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
  FormHelperText, useToast 
} from "@chakra-ui/react";
import _ from "lodash"
import { Formik, Field } from "formik";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { SubmitBtn } from "../../components/ButtonComp/SubmitBtn.tsx";
import { useAppContext } from "../../context/AppContext.tsx";

import { CREATE_HD_TICKET_ENUM, UPDATE_IM_TICKET_DETAILS } from "../../utils/chatRequestEnum.ts";
// Service Import
import { createHdTicket, updateImTicketDetails, fecthImTicketDetails } from "../../services/messangerIMTicketService.ts";

function MessangerTicketCreate() {
  const toast = useToast()
  const { activeChannel, hdTicketType, hdTicketPriority, hdTicketStatus, hdTeam } =
    useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const subjectField = React.useRef();

  const [ticketData, setTicketData] = useState({
    tikcetSubject: "",
    ticketDescription: "",
    ticketType: "",
    ticketPriority: "",
    ticketStatus: "",
    hdTeamAgent: "",
  });

  useEffect(() => {
    if (hdTicketType && hdTicketType.length > 0) {
      setTicketData((prevFormData) => ({
        ...prevFormData,
        ticketType: hdTicketType[3].name,
      }));
    }
  }, [hdTicketType]);

  useEffect(() => {
    if (hdTicketPriority && hdTicketPriority.length > 0) {
      setTicketData((prevFormData) => ({
        ...prevFormData,
        ticketPriority: hdTicketPriority[1].name,
      }));
    }
  }, [hdTicketPriority]);

  useEffect(() => {
    if (hdTicketStatus && hdTicketStatus.length > 0) {
      setTicketData((prevFormData) => ({
        ...prevFormData,
        ticketStatus: hdTicketStatus[0].name,
      }));
    }
  }, [hdTicketStatus]);

  useEffect(() => {
    if (hdTeam && hdTeam.length > 0) {
      setTicketData((prevFormData) => ({
        ...prevFormData,
        hdTeamAgent: hdTeam[0].name,
      }));
    }
  }, [hdTeam]);

  /**
   * Method to create HD ticket.
   * Update HD ticket ID to IM ticket reference table
   * @param values 
   * @param param1 
   */
  const buildDataHdTicket = (values) => {
    let jsonObj = _.cloneDeep(CREATE_HD_TICKET_ENUM);
    jsonObj.doc.description = values.ticketDescription;
    jsonObj.doc.subject = values.tikcetSubject;
    jsonObj.doc.priority = values.ticketPriority;
    jsonObj.doc.ticket_type = values.ticketType;
    jsonObj.doc.status = values.ticketStatus;
    jsonObj.doc.agent_group = values.hdTeamAgent;
    return jsonObj;
  }

  const buildDataIMTicket = (ticketDetails) => {
    let jsonObj = _.cloneDeep(UPDATE_IM_TICKET_DETAILS);
    
    jsonObj.im_hd_ticket    = ticketDetails.name.toString();
    jsonObj.im_messanger_id = activeChannel.im_details.name;
    
    return jsonObj;
  }
  const handleSubmit = async(values, { setSubmitting }) => {
    try {
      let ticketDetails = await createHdTicket(buildDataHdTicket(values));
      let updateResult  = await updateImTicketDetails(buildDataIMTicket(ticketDetails));
      let ticketList    = await fecthImTicketDetails(activeChannel.im_details.name)
      toast({
        title: 'Ticket has been created successfully',
        description: `We've created your ticket for you. Reference no ${updateResult.im_hd_ticket}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

    } catch (error) {
      toast({
        title: 'Error While creating the ticket',
        description: `We've got error while creating the ticket`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    // Reset form fields and set submitting to false
    // setSubmitting(false);
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        variant={"brand"}
        onClick={onOpen}
        ref={btnRef}
        size={"sm"}
        fontWeight="medium"
        h={8}
      >
        Create Ticket
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={subjectField}
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
        fontWeight="medium"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />

        <Formik initialValues={ticketData} onSubmit={handleSubmit}>
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <DrawerContent>
                {/* <DrawerCloseButton /> */}
                <DrawerHeader borderBottomWidth="1px" py={1}>
                  Create a new ticket
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing={3}>
                    <Box>
                      <FormControl
                        isRequired
                        isInvalid={
                          !!errors.tikcetSubject && touched.tikcetSubject
                        }
                      >
                        <FormLabel htmlFor="Subject" fontSize="sm" fontWeight="normal">Subject</FormLabel>
                        <Field
                          ref={subjectField}
                          as={Input}
                          id="tikcetSubject"
                          name="tikcetSubject"
                          placeholder="Please enter ticket subject"
                          validate={(value) => {
                            let error;
                            if (value.length < 1) {
                              error = "Subject Can be left blank";
                            }
                            return error;
                          }}
                        />
                        <FormHelperText fontSize="xs" fontWeight="normal">
                          Subject Will help agent to identify the issue.
                        </FormHelperText>
                        <FormErrorMessage fontSize="xs" fontWeight="medium">
                          {errors.tikcetSubject}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>

                    {/* Ticket Description  */}
                    <Box>
                      <FormControl
                        isRequired
                        isInvalid={
                          !!errors.ticketDescription &&
                          touched.ticketDescription
                        }
                      >
                        <FormLabel htmlFor="ticketDescription" fontSize="sm" fontWeight="normal">
                          {" "}
                          Description{" "}
                        </FormLabel>
                        <Field
                          as={Textarea}
                          id="ticketDescription"
                          name="ticketDescription"
                          placeholder="Please enter ticket Description"
                          validate={(value) => {
                            let error;
                            if (value.length < 1) {
                              error = "Description Can be left blank";
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage fontSize="xs" fontWeight="medium">
                          {errors.ticketDescription}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>

                    {/* Ticket Type  */}
                    <Box>
                      <FormControl>
                        <FormLabel htmlFor="ticketType" fontSize="sm" fontWeight="normal">Ticket Type</FormLabel>
                        <Field
                          id="ticketType"
                          name="ticketType"
                          data={hdTicketType}
                          as={CustomSelectComponent}
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="ticketPriority" fontSize="sm" fontWeight="normal">
                        Ticket Priority
                      </FormLabel>
                      <Field
                        id="ticketPriority"
                        name="ticketPriority"
                        data={hdTicketPriority}
                        as={CustomSelectComponent}
                      />
                    </Box>

                    <Box>
                      <FormLabel htmlFor="ticketStatus" fontSize="sm" fontWeight="normal">
                        Ticket Status
                      </FormLabel>
                      <Field
                        id="ticketStatus"
                        name="ticketStatus"
                        data={hdTicketStatus}
                        as={CustomSelectComponent}
                      />
                    </Box>

                    <Box>
                      <FormLabel htmlFor="hdTeamAgent" fontSize="sm" fontWeight="normal">Agent Group</FormLabel>
                      <Field
                        id="hdTeamAgent"
                        name="hdTeamAgent"
                        data={hdTeam}
                        as={CustomSelectComponent}
                      />
                    </Box>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px" py={3}>
                  <Button
                    size={"sm"}
                    fontWeight="medium"
                    h={8}
                    variant="light"
                    mr={3}
                    onClick={onClose}
                    leftIcon={<CloseIcon h={3} w={3} />}
                  >
                    Cancel
                  </Button>
                  <SubmitBtn value="submit" isSubmitting={isSubmitting} />
                </DrawerFooter>
              </DrawerContent>
            </form>
          )}
        </Formik>
      </Drawer>
    </>
  );
}

export default MessangerTicketCreate;

const CustomSelectComponent = (props) => {
  return (
    <Select {...props}>
      {props.data &&
        props.data.length > 0 &&
        props.data.map((option: any) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
    </Select>
  );
};
