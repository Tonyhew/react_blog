import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Routes from '../config/useRouter';
import 'antd/dist/reset.css';

const App = () => {
  const Views = () => useRoutes(Routes);
  return <Views />;
};

const Main = () => {

	return (
		<Router>
			<App />
		</Router>
	)
}



export default Main;


