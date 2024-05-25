import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import theme from './theme/theme.ts'

const AppRootContainer = () => {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  )
}
const renderApplication = () => {
  ReactDOM.createRoot(document.getElementById('im-root')!).render(
    <React.StrictMode>
      <AppRootContainer />
    </React.StrictMode>,
  )
}


(function (ImWidget) {
  ImWidget = ImWidget || {};
  ImWidget.init = () => {
      renderApplication();
      // if (document.getElementsByClassName("mso-chat-exist-check").length === 0) {
      //     let chatElementNode = document.createElement('div');
      //     chatElementNode.setAttribute("id", containerId);
      //     chatElementNode.setAttribute("class", "mso-chat-exist-check");
      //     document.body.appendChild(chatElementNode);
      //     ReactDOM.render(<App {...props} containerId={containerId} ImWidget={ImWidget} />, document.getElementById(containerId));
      // } else {
      //     console.log("Chat has been already initialized on browser", ImWidget)
      //     return `Chat has been already initialized on browser`;
      // }
  }
  window.ImWidget = ImWidget;
})(window.ImWidget || {})