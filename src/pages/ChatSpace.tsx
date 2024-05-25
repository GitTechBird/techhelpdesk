// import { ChannelSpace } from "@/components/feature/chat/chat-space/ChannelSpace"
// import { DirectMessageSpace } from "@/components/feature/chat/chat-space/DirectMessageSpace"
// import { ErrorBanner } from "@/components/layout/AlertBanner"
// import { FullPageLoader } from "@/components/layout/Loaders"
// import { useCurrentChannelData } from "@/hooks/useCurrentChannelData"
// import { ChannelMembersProvider } from "@/utils/channel/ChannelMembersProvider"
import {
    Flex, Box, Stack, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Table, Thead, Tr, Td, Th, Tbody, Input, VStack, Text, Avatar, HStack, Divider
} from '@chakra-ui/react';
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useSWRConfig } from "frappe-react-sdk"
// import { UnreadChannelCountItem, UnreadCountData } from "@/utils/channel/ChannelListProvider"

const ChatSpace = () => {

    // only if channelID is present render ChatSpaceArea component'
    const { channelID } = useParams<{ channelID: string }>()
    // const className = 'bg-white dark:from-accent-1 dark:to-95% dark:to-accent-2 dark:bg-gradient-to-b'
   
    return <div>
        {/* {channelID && <ChatSpaceArea channelID={channelID} />} */}
        {channelID && <p>{channelID}</p> }
    </div>

}

export const Component = ChatSpace

const ChatSpaceArea = ({ channelID }: { channelID: string }) => {

    const { channel, error, isLoading } = useCurrentChannelData(channelID)
    const { mutate, cache } = useSWRConfig()

    const { state } = useLocation()

    useEffect(() => {

        // setting last visited channel in local storage
        localStorage.setItem("ravenLastChannel", channelID)

        const unread_count = cache.get('unread_channel_count')

        // If unread count is present
        if (unread_count?.data) {
            // If the user entered the channel without a base message
            if (!state?.baseMessage) {
                // Mutate the unread channel count to set the unread count of the current channel to 0
                //@ts-ignore
                mutate('unread_channel_count', (d: { message: UnreadCountData } | undefined) => {
                    if (d) {
                        const newChannels: UnreadChannelCountItem[] = d.message.channels.map(c => {
                            if (c.name === channelID)
                                return {
                                    ...c,
                                    unread_count: 0
                                }
                            return c
                        })

                        const total_unread_count_in_channels = newChannels.reduce((acc: number, c) => {
                            if (!c.user_id) {
                                return acc + c.unread_count
                            } else {
                                return acc
                            }
                        }, 0)

                        const total_unread_count_in_dms = newChannels.reduce((acc: number, c) => {
                            if (c.user_id) {
                                return acc + c.unread_count
                            } else {
                                return acc
                            }
                        }, 0)


                        return {
                            message: {
                                ...d.message,
                                channels: newChannels,
                                total_unread_count_in_channels,
                                total_unread_count_in_dms
                            }
                        }
                    }
                    else {
                        return d
                    }


                }, {
                    revalidate: false
                })
            }
        }

    }, [channelID, state?.baseMessage])

    return <Box>
        {isLoading && <FullPageLoader />}
        <ErrorBanner error={error} />
        {channel && <ChannelMembersProvider channelID={channelID}>
            {channel.type === "dm" ?
                <DirectMessageSpace channelData={channel.channelData} />
                : <ChannelSpace channelData={channel.channelData} />
            }
        </ChannelMembersProvider>}
    </Box>
}