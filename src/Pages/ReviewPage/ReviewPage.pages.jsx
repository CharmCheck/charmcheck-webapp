import { useState, useEffect } from 'react';
import { captureException } from '@sentry/react';
import Loader from '../../Assets/Images/Loader.svg';

import './ReviewPage.pages.css';

const ReviewPage = () => {
	const [review, setReview] = useState('');
	const [images, setImages] = useState([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// get the review public id from the url
		const url = window.location.href;
		const reviewPublicId = url.substring(url.lastIndexOf('/') + 1)?.trim();

		if (!reviewPublicId) {
			window.location.href = '/404';
		}

		async function fetchReview() {
			try {
				const response = await fetch(
					process.env.REACT_APP_API_URL +
						'/review/public-review-details/' +
						reviewPublicId
				);
				const responseData = await response.json();

				if (responseData.isError) {
					// throw new Error(JSON.stringify(responseData));
				}

				setReview(JSON.parse(responseData.data.reviewDetails));
				setImages((prevImages) => {
					return [...prevImages, ...responseData.data.imageUrls];
				});
				// setIsLoading(false);
			} catch (err) {
				captureException(err, {
					extra: {
						reviewPublicId,
						errorId: 'ReviewFetchingError',
					},
				});

				setIsLoading(false);
				setIsError(true);
			}
		}

		fetchReview();
	}, []);

	return isLoading ? (
		<div className="loader-container">
			<img src={Loader} alt="Loading..." className="loader-icon" />
		</div>
	) : (
		<div className="review-page"></div>
	);
};

export default ReviewPage;
