import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
	routeProps
} from "react-router-dom";
import routes from './config/routes';
import Admin from './pages/Admin';
import Singin from './pages/Admin/SignIn/Singin';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Error404 from './pages/Error404';
import LayoutAdmin from './layouts/LayoutAdmin';

import './App.scss';
// const params = useParams();

function App() {

	console.log(process.env.REACT_APP_BACKEND_URL);
	
	return (
		<Router>
			<Routes>
				<Route exac="false" path='/admin/*' element={ <LayoutAdmin /> } />
				<Route exac path='/admin/login' element={<Singin />} />
				<Route exac path='/*' element={<Home />} />
				<Route exac path='/contact' element={<Contact />} />

				{/* {routes.map((route, index) => (
					// <RouteWithSubRoutes  key={index} {...route}/>
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						element={<route.component routes={route.routes} {...route}/>}							
					/>
				))} */}
			</Routes>
		</Router>
	)
}

function RouteWithSubRoutes(route) {
	return (	
	  <Route
	  	// key={index}
		path={route.path}
		exact={route.exact}
		render={(props) => <route.component routes={route.routes} {...props}/>}

	  />
	)
  }


export default App;

