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
			<div className="project-self-attribution-container">
				<p className="project-self-attribution-text">
					Made with ❤️ by{' '}
					<a
						href="
						https://x.com/AdityaKG_"
						target="_blank"
						rel="noreferrer"
						className="project-self-attribution-link"
					>
						Aditya Krishna
					</a>
				</p>
			</div>
		</div>
	);
};

export default MainLayout;
