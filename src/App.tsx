import { FrappeProvider } from 'frappe-react-sdk'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ProtectedRoute } from './utils/auth/ProtectedRoute.tsx'
import { UserProvider } from './utils/auth/UserProvider.tsx'
import { ChannelRedirect } from './utils/channel/ChannelRedirect.tsx'
import { FullPageLoader } from './components/layout/Loaders'
import { MainPage } from './pages/MainPage.tsx'

const getApiUrl = () => {
	const hostname = window.location.hostname;
	let apiUrl;
  
	if(hostname === "dev.techbirdit.in" && window.location.protocol == "http:") {
	  apiUrl = "http://dev.techbirdit.in";
	} else if (hostname === "dev.techbirdit.in" && window.location.protocol == "https:"){
	  apiUrl = "https://dev.techbirdit.in";
	} else {
	  apiUrl = "http://13.233.216.191";
	}
  
	return apiUrl;
  };

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<ProtectedRoute />}>
				{/* <Route index element={<ChannelRedirect />} /> */}
				<Route index element={<MainPage />} />
				{/* <Route path="/issue" element={<h1>Issuen Main Land page</h1>} /> */}
				{/* <Route path="channel" element={<h1>Main page</h1>} >
					<Route index element={<ChannelRedirect />} />
				</Route> */}
			</Route>
		</>
	), {
	basename: `/${import.meta.env.VITE_BASE_NAME}` ?? '',
}
)
function App() {
	console.log("APP comp", import.meta.env.VITE_BASE_NAME)
	const apiUrl = getApiUrl();
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
			enableSocket={false}
			socketPort={import.meta.env.VITE_SOCKET_PORT ? import.meta.env.VITE_SOCKET_PORT : undefined}
			//@ts-ignore
			siteName={getSiteName()}
		>
			<UserProvider>
				<RouterProvider router={router} fallbackElement={<FullPageLoader className='w-screen' />} />
			</UserProvider>
		</FrappeProvider>
	)
}

export default App