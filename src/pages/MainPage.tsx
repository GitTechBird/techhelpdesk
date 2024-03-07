import React, { useRef, useEffect, useState } from 'react';
import {
    Flex, Box, Stack, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Table , Thead , Tr, Td, Th, Tbody 
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons'
import { getConversationList } from '../services/flowXoServices.ts';

interface IframeProps {
    src: string;
    width?: string;
    height?: string;
    title?: string;
    frameBorder?: string;
}
const iFrameSrc: String = 'https://flowxo.com/app/livechat?c_am&_hideLogo=true&&_hideNav=true&_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmZjNiNGQ4MjM5ODAwN2M2NDk3MzkiLCJyb2xlIjoiQWdlbnQiLCJzZXNzaW9uX3NlY3JldCI6IiQyYiQxMCR3ZVRpTWlKencxSDBSRTFROWNaSjJlUWtrVEpwdWc3czY2ZW9nNmFMVGVqNzYuVDVzRllnYSIsImZlYXR1cmVzIjpbXSwidGVhbU1lbWJlcklkIjoiNjVhNTMxNWRkZjQ5NjMwMDVmMDBkNTFhIiwiaWF0IjoxNzA1MzI1MzAxfQ.5C_Lqo0qlbZuJcudEVd9e9ytnbOJ4_HPc-LnaA0jQuc';

export const MainPage: React.FC<IframeProps> = ({
    src = iFrameSrc,
    width = '100%',
    height = '500px',
    title = "Techbird Help desk",
    frameBorder = '0',
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [chatList, setChatList] = useState([]);


    const fetchActiceConversationList = async () => {
        try {
            console.log("layout-header-title", document.getElementsByClassName("layout-header-title"))
            const result = await getConversationList();
            console.log("Chat List", result);
            setChatList(result.message.conversations);
            onOpen();
        } catch (error) {
            console.error("AppContextProvider:getUserDetails", error)
        } finally {

        }
    }

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDocument) {
                const titleElement = iframeDocument.createElement('title');
                titleElement.textContent = title || '';
                iframeDocument.head.appendChild(titleElement);
                
            }
        }
    }, [src, title]);


    return (
        <>

            <Flex>
                {/* First column */}
                <Box flex="1" p="4" width="20%">
                    <Stack spacing={4} direction='column' align='center'>
                        <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid'
                            onClick={() => fetchActiceConversationList()}>
                            Create Ticket
                        </Button>
                    </Stack>
                </Box>

                {/* Second column */}
                <Box borderWidth="1px" borderRadius="md" overflow="hidden" width="80%">
                    <iframe
                        ref={iframeRef}
                        src={src}
                        title={title}
                        width={width}
                        height={height}
                        frameBorder={frameBorder}
                        id="flow-xo-chat"
                    />
                </Box>
            </Flex>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box overflowX="auto">
                            <Table variant="striped" colorScheme="teal">
                                <Thead>
                                    <Tr>
                                        <Th>Customer</Th>
                                        <Th>Raised By</Th>
                                        <Th>Status</Th>
                                        <Th>Priority</Th>
                                        <Th>Issue Type</Th>
                                        <Th>Issue Split From</Th>
                                        <Th>Description</Th>
                                    </Tr>
                                </Thead>
                                {/* <Tbody>
                                    <Tr>
                                        <Td>{ticket.customer}</Td>
                                        <Td>{ticket.raised_by}</Td>
                                        <Td>{ticket.status}</Td>
                                        <Td>{ticket.priority}</Td>
                                        <Td>{ticket.issue_type}</Td>
                                        <Td>{ticket.issue_split_from}</Td>
                                        <Td>{ticket.description}</Td>
                                    </Tr>
                                </Tbody> */}
                            </Table>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}