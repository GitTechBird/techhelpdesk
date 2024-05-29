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
    return (
        <Grid
            templateColumns={{ base: "1fr", md: "auto 1fr" }}
            // gap={4}
            h={'full'}
            minH="100vh"
        >
            <Text>Help desk home page</Text>
        </Grid>
    );
}
