import { useState, useEffect } from 'react';
import { captureException } from '@sentry/react';
import Loader from '../../Assets/Images/Loader.svg';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import './ReviewPage.pages.css';
import { toast } from 'react-toastify';

const ReviewPage = () => {
	const [review, setReview] = useState('');
	const [images, setImages] = useState([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedImages, setLoadedImages] = useState(0);

	const navigate = useNavigate();

	const parseJsonToHtml = (text) => {
		text = text.replace(/\n/g, '<br>');
		text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

		return text;
	};

	useEffect(() => {
		// get the review public id from the url
		const url = window.location.href;
		const reviewPublicId = url.substring(url.lastIndexOf('/') + 1)?.trim();

		if (!reviewPublicId) {
			return navigate('/404');
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
					if (responseData.responseStatusCode === 404) {
						return navigate('/404');
					}

					throw new Error(JSON.stringify(responseData));
				}

				setReview(parseJsonToHtml(JSON.parse(responseData.data.reviewDetails)));
				setImages((prevImages) => {
					return [...prevImages, ...responseData.data.imageUrls];
				});
				setIsLoading(false);
			} catch (err) {
				captureException(err, {
					extra: {
						reviewPublicId,
						errorId: 'ReviewFetchingError',
					},
				});

				toast.error(
					"Some error occured while getting the review's details. Please reach to us if you think this is a mistake."
				);

				setIsLoading(false);
				setIsError(true);
			}
		}

		fetchReview();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isLoading || isError ? (
		<div className="center-container">
			{isLoading ? (
				<img src={Loader} alt="Loading..." className="loader-icon" />
			) : (
				<a
					href="https://x.com/AdityaKG_"
					target="_blank"
					rel="noreferrer"
					className="support-link"
				>
					Reach out on twitter
				</a>
			)}
		</div>
	) : (
		<div className="review-page">
			<p className="section-title">Images Reviewed</p>
			<div className="images-container">
				{images.map((image, index) => {
					return loadedImages === images.length ? (
						<img
							src={image}
							alt={'Image' + index + 1}
							className="image"
							key={index}
							onClick={() => {
								window.open(image, '_blank');
							}}
						/>
					) : (
						<img
							src={image}
							key={index}
							alt={'Image' + index + 1}
							style={{ display: 'none' }}
							onLoad={() => {
								setLoadedImages((prevLoadedImages) => prevLoadedImages + 1);
							}}
						/>
					);
				})}
				{loadedImages !== images.length && (
					<img src={Loader} alt="Loading..." className="loader-icon-small" />
				)}
			</div>
			<p className="section-title">Review</p>
			<div className="review-section-text-container">{parse(review)}</div>
		</div>
	);
};

export default ReviewPage;
