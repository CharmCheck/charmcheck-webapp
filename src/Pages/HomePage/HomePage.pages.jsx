import { useNavigate } from 'react-router-dom';

import Arrow from '../../Assets/Images/Arrow.svg';
import Heart from '../../Assets/Images/Heart.svg';
import Star from '../../Assets/Images/Star.svg';
import Carousel from '../../Components/HomePageCarousel/HomePageCarousel.components';

import './HomePage.pages.css';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className="homepage-page">
			<main className="hero-section">
				<h1 className="homepage-heading">
					Not getting enough matches on your dating profile?
				</h1>
				<p className="homepage-subheading">
					Worry not! For just $2, you can 10x your matches in seconds.
					CharmCheck reviews your Tinder/Bumble/Hinge profile, photos, convos
					and gives you tips to make them better.
				</p>
				<div className="hero-cta-container">
					<button className="hero-cta" onClick={() => navigate('/new')}>
						<spam className="hero-cta-text">Review my profile</spam>
						<img src={Arrow} alt="arrow" className="hero-cta-arrow" />
					</button>
					<div className="hero-cta-assurance-container">
						<img src={Heart} alt="heart" className="hero-cta-assurance-heart" />
						<spam className="hero-cta-assurance-text">
							100% Satisfaction Guarantee
						</spam>
					</div>
				</div>
			</main>
			<section className="feedback-section">
				{[0, 1, 2, 3, 4].map((index) => (
					<img src={Star} alt="Star" className="feedback-star" key={index} />
				))}
				<p className="feedback-title">Loved by 100+ customers</p>
				<Carousel />
			</section>
		</div>
	);
};

export default HomePage;
