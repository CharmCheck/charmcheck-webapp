import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { captureException } from '@sentry/react';

import Cross from '../../Assets/Images/Cross.svg';
import Upload from '../../Assets/Images/Upload.svg';
// import Arrow from '../../Assets/Images/Arrow.svg';

import './Form.components.css';

const Form = () => {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [imageBase64s, setImageBase64s] = useState(['', '', '', '', '']);
	const [imageFiles, setImageFiles] = useState(['', '', '', '', '']);

	const handleFilePick = (index, e) => {
		try {
			// make sure the selected file is less than 1 MB
			if (
				e.target.files[0].size >
				Number(process.env.REACT_APP_ALLOWED_INDIVIDUAL_IMAGE_SIZE_IN_MB) *
					1024 *
					1024
			) {
				imageFiles[index] = '';
				toast.error(
					`Image size should be less than ${Number(
						process.env.REACT_APP_ALLOWED_INDIVIDUAL_IMAGE_SIZE_IN_MB
					)} MB`
				);
				return;
			}

			// make sure the selected file is an image
			if (!e.target.files[0].type.startsWith('image')) {
				imageFiles[index] = '';
				toast.error('Please select an image file');
				return;
			}

			setImageFiles((prevImageFiles) => {
				const newImageFiles = [...prevImageFiles];
				newImageFiles[index] = e.target.files[0];
				return newImageFiles;
			});

			// convert the selected file to base64
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);

			reader.onloadend = () => {
				const base64String = reader.result;

				// check if this image has already been uploaded
				if (imageBase64s.includes(base64String)) {
					imageFiles[index] = '';
					toast.error('This image has already been uploaded');
					return;
				}

				setImageBase64s((prevImageBase64s) => {
					const newImageBase64s = [...prevImageBase64s];
					newImageBase64s[index] = base64String;
					return newImageBase64s;
				});
			};
		} catch (err) {
			captureException(err, {
				extra: {
					email,
					index,
					file: imageFiles[index],
					errorId: 'ImageUploadError',
				},
			});

			setImageFiles((prevImageFiles) => {
				const newImageFiles = [...prevImageFiles];
				newImageFiles[index] = '';
				return newImageFiles;
			});

			setImageBase64s((prevImageBase64s) => {
				const newImageBase64s = [...prevImageBase64s];
				newImageBase64s[index] = '';
				return newImageBase64s;
			});

			toast.error(
				'Some error while selecting the image. Please refresh the page and try again.'
			);
		}
	};

	const handleFormSubmit = async () => {
		try {
			setIsSubmitting(true);

			const emailToSubmit = email.trim();

			// check if email is valid
			if (!emailToSubmit) {
				toast.error('Please enter your email');
				setIsSubmitting(false);
				return;
			}

			// check if email is valid using regex
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(emailToSubmit)) {
				toast.error('Please enter a valid email');
				setIsSubmitting(false);
				return;
			}

			// check if user has selected atleast one image
			if (!imageBase64s.some((imageBase64) => imageBase64)) {
				toast.error('Please select atleast one image');
				setIsSubmitting(false);
				return;
			}

			const uploadedImageIdsAndIndex = [];
			const uploadPromises = imageBase64s.map(async (imageBase64, index) => {
				if (imageBase64) {
					const uploadImageResponse = await fetch(
						process.env.REACT_APP_API_URL + '/image/upload',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								base64EncodedImage: imageBase64,
							}),
						}
					);

					const uploadImageResponseJson = await uploadImageResponse.json();

					if (uploadImageResponseJson.isError) {
						throw new Error(JSON.stringify(uploadImageResponseJson));
					}

					uploadedImageIdsAndIndex.push({
						index,
						imageId: uploadImageResponseJson.data.imageId,
					});
				}
			});

			await Promise.all(uploadPromises);

			const uploadedImageIdsAndIndexSorted = uploadedImageIdsAndIndex.sort(
				(a, b) => a.index - b.index
			);

			const uploadedImageIds = uploadedImageIdsAndIndexSorted.map(
				(imageIdAndIndex) => imageIdAndIndex.imageId
			);

			const submitDetailsResponse = await fetch(
				process.env.REACT_APP_API_URL + '/review/initiate',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userEmail: emailToSubmit,
						imageIds: uploadedImageIds,
					}),
				}
			);

			const submitDetailsResponseJson = await submitDetailsResponse.json();

			if (submitDetailsResponseJson.isError) {
				throw new Error(JSON.stringify(submitDetailsResponseJson));
			}

			const reviewId = submitDetailsResponseJson.data.reviewId;

			window.location.href = `https://charmcheck.lemonsqueezy.com/checkout/buy/83869d12-3177-4fad-b391-cece580ffc91?checkout[custom][reviewId]=${reviewId}&checkout[email]=${emailToSubmit}`;
		} catch (err) {
			captureException(err, {
				extra: {
					email,
					imageFiles,
					errorId: 'FormSubmitError',
				},
			});

			toast.error(
				'Some error while submitting your details. Please refresh the page and try again.'
			);

			// reset the form
			setEmail('');
			setIsSubmitting(false);
			setImageBase64s(['', '', '', '', '']);
			setImageFiles(['', '', '', '', '']);
		}
	};

	return (
		<div
			className={
				isSubmitting
					? 'user-details-form user-details-form-disabled'
					: 'user-details-form'
			}
		>
			<p className="form-title">Submit Details</p>
			<div className="form-item form-item-email">
				<label htmlFor="email" className="label label-email">
					Email - Your profile review will be sent here
				</label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="name@gmail.com"
					className="input input-email"
				/>
			</div>
			<div className="form-item form-item-images">
				<label htmlFor="images" className="label label-images">
					Upload Profile Screenshots - Maintain the order in which they appear
					on your profile
				</label>
				<div className="images-container">
					{[0, 1, 2, 3, 4].map((index) => (
						<React.Fragment key={index}>
							{imageBase64s[index] ? (
								<div className="uploaded-image-container">
									<div
										className="cross-icon-container"
										onClick={() => {
											setImageBase64s((prevImageBase64s) => {
												const newImageBase64s = [...prevImageBase64s];
												newImageBase64s[index] = '';
												return newImageBase64s;
											});
											setImageFiles((prevImageFiles) => {
												const newImageFiles = [...prevImageFiles];
												newImageFiles[index] = '';
												return newImageFiles;
											});
										}}
									>
										<img src={Cross} alt="cross" className="cross-image" />
									</div>
									<img
										src={imageBase64s[index]}
										alt="uploaded"
										className="uploaded-image"
										onClick={() => {
											const image = new Image();
											image.src = imageBase64s[index];

											const w = window.open('');

											w.document.write(image.outerHTML);

											w.document.close();
										}}
									/>
								</div>
							) : (
								<label htmlFor="fileInput" className="custom-file-upload-input">
									<div className="upload-icon-and-text-container">
										<img
											src={Upload}
											alt="Upload Icon"
											className="upload-icon-image"
										/>
										<span className="upload-icon-text">Upload Image</span>
									</div>
									<input
										type="file"
										name="images"
										id={'fileInput'}
										className="input input-image-hidden"
										accept=".jpg,.jpeg,.png"
										onChange={(e) => handleFilePick(index, e)}
										value={''}
									/>
								</label>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
			<div className="form-item form-item-submit">
				{isSubmitting ? (
					<button className="button-submit button-submit-disabled">
						<span className="submit-button-text">Please Wait ...</span>
					</button>
				) : (
					<button
						className="button-submit button-submit-enabled"
						onClick={handleFormSubmit}
					>
						<span className="submit-button-text">Proceed to payment ($1)</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default Form;
