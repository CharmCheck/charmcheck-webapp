import './PaymentSuccessful.pages.css';
import Check from '../../Assets/Images/Check.svg';

const PaymentSuccessfulPage = () => {
	return (
		<div className="payment-success-container">
			<div className="payment-success-header">
				<img src={Check} alt="Check" className="payment-success-check-icon" />
				<p className="payment-success-title">Submission Successful</p>
			</div>
			<p className="payment-success-text">
				Your review is being generated. We'll email you the link when it's
				ready. Sometimes, it takes up to 2 minutes to generate a review.
				<br />
				Sometimes the email from an unknown sender could go to the
				Spam/Promotions box of your email. Make sure to check those as well.
			</p>
			<p className="support-text">
				If you need any support or have any queries, you can reach out to us at{' '}
				<a
					href="https://x.com/AdityaKG_"
					className="support-link"
					target="_blank"
					rel="noreferrer"
				>
					twitter
				</a>
			</p>
			<p className="thank-you-text">
				Thank you for using CharmCheck. You made our day :)
			</p>
		</div>
	);
};

export default PaymentSuccessfulPage;
