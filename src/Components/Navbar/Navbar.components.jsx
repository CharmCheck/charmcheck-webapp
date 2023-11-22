import './Navbar.components.css';
import Sparkle from '../../Assets/Images/Sparkle.svg';

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<span className="navbar-logo-text">CharmCheck</span>
				<img src={Sparkle} alt="Sparkle" className="navbar-logo-sparkle" />
			</div>
			<div className="navbar-links">
				<a
					href="https://x.com/AdityaKG_"
					className="navbar-links-text"
					target="_blank"
					rel="noreferrer"
				>
					Support
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
