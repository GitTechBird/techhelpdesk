import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Flex, Box, Stack, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Table, Thead, Tr, Td, Th, Tbody, Grid, GridItem, VStack, Text, Spacer, ButtonGroup, Heading
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons'
import { getConversationList } from '../services/flowXoServices.ts';
import IframeComp from './IframeComp.tsx';

interface IframeProps {
    src: string;
    width?: string;
    height?: string;
    title?: string;
    frameBorder?: string;
}
const flowXoSrc: string     = 'https://flowxo.com/app/livechat?c_am&_hideLogo=true&&_hideNav=true&_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmZjNiNGQ4MjM5ODAwN2M2NDk3MzkiLCJyb2xlIjoiQWdlbnQiLCJzZXNzaW9uX3NlY3JldCI6IiQyYiQxMCR3ZVRpTWlKencxSDBSRTFROWNaSjJlUWtrVEpwdWc3czY2ZW9nNmFMVGVqNzYuVDVzRllnYSIsImZlYXR1cmVzIjpbXSwidGVhbU1lbWJlcklkIjoiNjVhNTMxNWRkZjQ5NjMwMDVmMDBkNTFhIiwiaWF0IjoxNzA1MzI1MzAxfQ.5C_Lqo0qlbZuJcudEVd9e9ytnbOJ4_HPc-LnaA0jQuc';
const emailSrc: string      = 'http://3.110.128.51/app/comment/view/report';

const IFRAME_RESOURCES = {
    FLOWXO : flowXoSrc,
    FRAPPE_EMAIL : emailSrc
}
export const LandingPage: React.FC<IframeProps> = ({ }) => {
    const navigate = useNavigate()
    const [content, setContent] = useState<number>(-1);
    const [iframeSrc, setIframeSrc] = useState<string>('');

    useEffect(()=>{
        if(content > -1){
            switch (content) {
                case 0:
                    setIframeSrc(IFRAME_RESOURCES.FLOWXO)
                    break;

                case 1:
                    setIframeSrc(IFRAME_RESOURCES.FRAPPE_EMAIL)
                    break;

                default:
                    break;
            }
        }
    },[content])
    return (
        <Grid
            templateColumns={{ base: "1fr", md: "auto 1fr" }}
            // gap={4}
            h={'full'}
            minH="100vh"
        >
            {/* Sidebar */}
            <Box bg="brand.50" p={4} display={{ base: "none", md: "block" }}>
                <VStack spacing={4} align="stretch">
                    <Button leftIcon={<EmailIcon />} bg={"navy.200"} size='sm'
                        onClick={() => setContent(0)}>
                        IMs
                    </Button>
                    <Button leftIcon={<EmailIcon />} bg={"navy.200"} size='sm'
                        onClick={() => setContent(1)}>
                        Emails
                    </Button>
                    <Button leftIcon={<EmailIcon />} bg={"navy.200"} size='sm'
                        onClick={() => navigate("/login")}>
                        Login
                    </Button>
                    <Spacer />
                </VStack>
            </Box>

            {/* Main Content */}
            <Flex direction="column">
                {/* Mobile Navbar */}
                {/* <Box bg="blue.400" p={4} display={{ base: "block", md: "none" }}>
                    <Text fontSize="xl">Mobile Navbar</Text>
                </Box> */}

                {/* Content Area */}
                <Box p={0}>
                    <Flex direction="column" alignItems="center" justifyContent="center">
                        {/* First Row */}
                        <Box p={3} style={{boxShadow:"0 0 13px -5px rgba(0,0,0,0.5)"}} textAlign="right"
                        display="flex" justifyContent="space-between" width={'100%'}>
                            <ButtonGroup variant='outline' spacing='6' flexGrow={1}>
                                <Button colorScheme='teal' variant='solid' size='sm'
                                        onClick={() => fetchActiceConversationList()}>
                                        Customer List
                                </Button>
                                <Button colorScheme='teal' variant='solid' size='sm'
                                        onClick={() => fetchActiceConversationList()}>
                                        Contact List
                                </Button>
                                <Spacer />
                                <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid' size='sm'
                                    onClick={() => fetchActiceConversationList()}>
                                    Create Issue
                                </Button>
                                <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid' size='sm'
                                    onClick={() => fetchActiceConversationList()}>
                                    Create Task
                                </Button>
                            </ButtonGroup>
                        </Box>
                        
                        <Spacer />
                        {/* Second Row */}
                        
                        <Grid
                            templateColumns={{ base: "1fr", md: "1fr" }}
                            gap={4}
                            width="100%"
                            minH={"90vh"}
                            p={4}
                        >
                            {content > -1 ? 
                                <IframeComp src={iframeSrc} width={'100%'} height={'100%'} /> :
                                    <Heading> Please Select options to load the Frame</Heading>
                                }
                        </Grid>
                    </Flex>
                </Box>
            </Flex>
        </Grid>
    );
}
