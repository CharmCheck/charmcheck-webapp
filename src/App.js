import { Routes, Route } from 'react-router-dom';

import MainLayout from './Components/MainLayout/MainLayout.components';
import Navbar from './Components/Navbar/Navbar.components';
import SubmitDetailsForReviewPage from './Pages/SubmitDetailsForReview/SubmitDetailsForReview.pages';
import PaymentSuccessfulPage from './Pages/PaymentSuccessful/PaymentSuccessful.pages';
import ReviewPage from './Pages/ReviewPage/ReviewPage.pages';
import ErrorPage from './Pages/ErrorPage/ErrorPage.pages';
import HomePage from './Pages/HomePage/HomePage.pages';

function App() {
	return (
		<>
			<MainLayout>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/new" element={<SubmitDetailsForReviewPage />} />
					<Route path="/success" element={<PaymentSuccessfulPage />} />
					<Route path="/review/:reviewid" element={<ReviewPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</MainLayout>
		</>
	);
}

export default App;
