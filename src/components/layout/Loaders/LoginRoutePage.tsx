import React, { useRef, useEffect } from "react";
import { Loader } from "@/components/common/Loader";
import { Flex, Text } from "@radix-ui/themes";
import { FlexProps } from "@radix-ui/themes/dist/cjs/components/flex";
import { clsx } from "clsx";
import { useBaseUrl } from "../../../context/BaseUrlContext.tsx";

interface Props extends FlexProps {
  text?: string;
}

export const LoginRoutePage = ({
  text = "Helpdesk IM is loading for you...",
  ...props
}: Props) => {
  const { baseUrl } = useBaseUrl();
  useEffect(() => {
    window.location.href = `${baseUrl}/login`;
  }, []);
  return <div>{text}</div>;
};
