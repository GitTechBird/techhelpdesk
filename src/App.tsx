import { FrappeProvider } from "frappe-react-sdk";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "./utils/auth/ProtectedRoute.tsx";
import { UserProvider } from "./utils/auth/UserProvider.tsx";
import { ChannelRedirect } from "./utils/channel/ChannelRedirect.tsx";
import { FullPageLoader } from "./components/layout/Loaders";
import { MainPage } from "./pages/MainPage.tsx";
import { LandingPage } from "./pages/LandingPage.tsx";
import { createBrowserHistory } from "history";
import { AppContextProvider } from "./context/AppContext.tsx";
import { useBaseUrl } from "./context/BaseUrlContext.tsx";
import { baseName } from "./utils/urlUtil.ts";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedRoute />}>
        {/* <Route index element={<LandingPage />} /> */}
        <Route path="/IM" element={<MainPage />}>
          <Route index element={<ChannelRedirect />} />
        </Route>
      </Route>
    </>
  ),
  {
    // basename: `/${import.meta.env.VITE_BASE_NAME}` ?? '',
    basename: `/${baseName}`,
  }
);
function App() {
  const {baseUrl}  = useBaseUrl();
  // For code integration
  const history = createBrowserHistory({ basename:  baseName});
  // const history = createBrowserHistory({ basename: `${import.meta.env.VITE_BASE_NAME}` });
  // console.log("APP comp", import.meta.env.VITE_BASE_NAME)
  // We need to pass sitename only if the Frappe version is v15 or above.
  const getSiteName = () => {
    // @ts-ignore
    if (
      window.frappe?.boot?.versions?.frappe &&
      (window.frappe.boot.versions.frappe.startsWith("15") ||
        window.frappe.boot.versions.frappe.startsWith("16"))
    ) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME;
    }
    return import.meta.env.VITE_SITE_NAME;
  };

  return (
    <FrappeProvider
      url={baseUrl}
      enableSocket={true}
      socketPort={
        import.meta.env.VITE_SOCKET_PORT
          ? import.meta.env.VITE_SOCKET_PORT
          : undefined
      }
      //@ts-ignore
      // siteName={getSiteName()}
    >
      <UserProvider>
        <AppContextProvider>
          <RouterProvider
            router={router}
            history={history}
            fallbackElement={<FullPageLoader className="w-screen" />}
          />
        </AppContextProvider>
      </UserProvider>
    </FrappeProvider>
  );
}

export default App;
