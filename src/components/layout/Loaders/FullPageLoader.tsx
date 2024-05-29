import { Loader } from '@/components/common/Loader'
import { Flex, Text } from '@radix-ui/themes'
import { FlexProps } from '@radix-ui/themes/dist/cjs/components/flex'
import { clsx } from 'clsx'

interface Props extends FlexProps {
    text?: string
}

export const FullPageLoader = ({ text = "Helpdesk IM is loading for you...", ...props }: Props) => {
    return (
        <div>
        {text}
        </div>
        )
}