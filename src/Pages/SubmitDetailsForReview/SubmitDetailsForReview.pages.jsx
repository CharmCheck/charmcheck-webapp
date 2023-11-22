import './SubmitDetailsForReview.pages.css';
import Form from '../../Components/Form/Form.components';

const SubmitDetailsForReviewPage = () => {
	return (
		<div className="submit-details-page">
			<Form />
			<div className="submit-details-footer">
				<p className="privacy-statement">
					Your data is stored safely and won't be used for any other purposes
					without your permission
				</p>
				<div className="policy-links">
					<a
						href="/privacy-policy"
						className="policy-link"
						target="_blank"
						rel="noreferrer"
					>
						Privacy Policy
					</a>{' '}
					|{' '}
					<a
						href="/terms-of-service"
						className="policy-link"
						target="_blank"
						rel="noreferrer"
					>
						Terms of Service
					</a>{' '}
					|{' '}
					<a
						href="/refund-policy"
						className="policy-link"
						target="_blank"
						rel="noreferrer"
					>
						Refund Policy
					</a>
				</div>
			</div>
		</div>
	);
};

export default SubmitDetailsForReviewPage;
