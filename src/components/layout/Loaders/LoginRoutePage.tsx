import React, { useRef, useEffect } from 'react';
import { Loader } from '@/components/common/Loader'
import { Flex, Text } from '@radix-ui/themes'
import { FlexProps } from '@radix-ui/themes/dist/cjs/components/flex'
import { clsx } from 'clsx'

interface Props extends FlexProps {
    text?: string
}

export const LoginRoutePage = ({ text = "Ravens are finding their way to you...", ...props }: Props) => {
    useEffect(()=>{
        window.location.href = 'http://3.110.128.51/login?redirect-to=%2Ftechhelpdesk#login';
    },[])
    return (
        <div>
        {text}
        </div>
        )
}