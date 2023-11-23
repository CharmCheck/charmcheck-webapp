import SG from '../../Assets/Images/SG.png';
import AU from '../../Assets/Images/AU.png';
import KJ from '../../Assets/Images/KJ.png';

import './HomePageCarousel.components.css';

const Carousel = () => {
	const data = [
		{
			text: 'I’m not great at this stuff, but it made my profile look cooler. Got me talking to more interesting folks!',
			name: 'SG',
			image: <img src={SG} alt="SG" className="user-testimonial-image" />,
		},
		{
			text: 'Didn’t expect much, but it did the trick. More matches and better convos. Highly recommended. Thumbs up!',
			name: 'AU',
			image: <img src={AU} alt="AU" className="user-testimonial-image" />,
		},
		{
			text: 'I gave it a shot, and my profile got way more appealing. Getting many more matches since then.',
			name: 'KJ',
			image: <img src={KJ} alt="KJ" className="user-testimonial-image" />,
		},
	];

	return (
		<div className="carousel-container">
			{data.map((i, index) => {
				return (
					<div className="carousel" key={index}>
						<div className="carousel-header">
							{i.image}
							<spam className="user-testimonial-name">{i.name}</spam>
						</div>
						<p className="user-testimonial-text">{i.text}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Carousel;
