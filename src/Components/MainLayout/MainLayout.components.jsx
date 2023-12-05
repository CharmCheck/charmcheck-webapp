import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './MainLayout.components.css';

const MainLayout = ({ children }) => {
	return (
		<div className="main">
			<div className="main-white-background">
				<div className="padding">
					<div className="main-content">{children}</div>
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
};

export default MainLayout;
