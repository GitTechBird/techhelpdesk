import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme/theme.ts";
import { BaseUrlProvider } from "./context/BaseUrlContext.tsx";

const AppRootContainer = () => {
  return (
    <ChakraProvider theme={theme}>
      <BaseUrlProvider>
        <App />
      </BaseUrlProvider>
    </ChakraProvider>
  );
};
const renderApplication = () => {
  console.log("process.env.BASE_APP", process.env.BASE_APP)
  console.log("process.env.BASE_APP 1", import.meta.env.BASE_APP)
  ReactDOM.createRoot(document.getElementById("im-root")!).render(
    <React.StrictMode>
      <AppRootContainer />
    </React.StrictMode>
  );
};

// (function (ImWidget) {
//   ImWidget = ImWidget || {};
//   ImWidget.init = () => {
//     renderApplication();
//   };
//   window.ImWidget = ImWidget;
// })(window.ImWidget || {});


/**
 * IIFE function to trigger the IM widget
 */
(() => {
  renderApplication()
})();
