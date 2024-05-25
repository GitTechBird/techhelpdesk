import { FrappeProvider } from 'frappe-react-sdk'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ProtectedRoute } from './utils/auth/ProtectedRoute.tsx'
import { UserProvider } from './utils/auth/UserProvider.tsx'
import { ChannelRedirect } from './utils/channel/ChannelRedirect.tsx'
import { FullPageLoader } from './components/layout/Loaders'
import { MainPage } from './pages/MainPage.tsx'
import { LandingPage } from './pages/LandingPage.tsx'
import { createBrowserHistory } from 'history';
import { AppContextProvider } from "./context/AppContext.tsx";

const getApiUrl = () => {
	const hostname = window.location.hostname;
	let apiUrl;

	if (hostname === "dev.techbirdit.in" && window.location.protocol == "http:") {
		apiUrl = "http://dev.techbirdit.in";
	} else if (hostname === "dev.techbirdit.in" && window.location.protocol == "https:") {
		apiUrl = "https://dev.techbirdit.in";
	} else {
		apiUrl = "http://3.110.128.51";
	}

	return apiUrl;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<>

			<Route path='/login' element={<h1>login</h1>} />
			<Route path='/login-with-email' element={<h1>login-with-email</h1>} />
			<Route path="/" element={<ProtectedRoute />}>
				<Route index element={<LandingPage />} />
				{/* <Route path="issue" element={<h1>issue Main Land page</h1>} /> */}
				{/* <Route path="issueDesc" element={<h1>issueDesc Main Land page</h1>} /> */}
				{/* <Route path="/" element={<ChannelRedirect />}> */}
				<Route path="/IM" element={<MainPage />} >
					<Route index element={<ChannelRedirect />} />
					{/* <Route path="saved-messages" lazy={() => import('./components/feature/saved-messages/SavedMessages')} /> */}
					{/* <Route path=":channelID" lazy={() => import('@/pages/ChatSpace')} /> */}
				</Route>
				{/* </Route> */}
			</Route>


		</>
	), {
	// basename: `/${import.meta.env.VITE_BASE_NAME}` ?? '',
	basename: '/helpdesk'
}
)
function App() {
	// For code integration
	const history = createBrowserHistory({ basename: "helpdesk" });
	// const history = createBrowserHistory({ basename: `${import.meta.env.VITE_BASE_NAME}` });
	// console.log("APP comp", import.meta.env.VITE_BASE_NAME)
	const apiUrl: string = getApiUrl();
	// We need to pass sitename only if the Frappe version is v15 or above.
	const getSiteName = () => {
		// @ts-ignore
		if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
			// @ts-ignore
			return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
		}
		return import.meta.env.VITE_SITE_NAME
	}

	return (
		<FrappeProvider
			url={import.meta.env.VITE_FRAPPE_PATH ?? ''}
			enableSocket={true}
			socketPort={import.meta.env.VITE_SOCKET_PORT ? import.meta.env.VITE_SOCKET_PORT : undefined}
		//@ts-ignore
		// siteName={getSiteName()}
		>
			<UserProvider>
				<AppContextProvider>
					<RouterProvider router={router} history={history} fallbackElement={<FullPageLoader className='w-screen' />} />
				</AppContextProvider>
			</UserProvider>
		</FrappeProvider>
	)
}

export default App