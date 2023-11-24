import './PaymentSuccessful.pages.css';
import Check from '../../Assets/Images/Check.svg';

const PaymentSuccessfulPage = () => {
	return (
		<div className="payment-success-container">
			<div className="payment-success-header">
				<img src={Check} alt="Check" className="payment-success-check-icon" />
				<p className="payment-success-title">Payment Successful</p>
			</div>
			<p className="payment-success-text">
				Your review is being generated. We'll email you the link when it's
				ready. Sometimes, it takes up to 5 minutes to generate a review. Make sure
				to check Spam/Promotions folder of your email.
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
