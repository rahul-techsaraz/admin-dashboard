import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
	return (
		<>
			<nav className="navbar navbar-expand-lg fixed-top navbar-transparent ">
				<div className="container">
					<div className="navbar-translate n_logo">
						<Link className="navbar-brand" to={'/'} title target="_blank">
							Admission Kart
						</Link>
						<button className="navbar-toggler" type="button">
							<span className="navbar-toggler-bar bar1" />
							<span className="navbar-toggler-bar bar2" />
							<span className="navbar-toggler-bar bar3" />
						</button>
					</div>
					<div className="navbar-collapse justify-content-end">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to={'/'}>
									login
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to={'/'}>
									Search Result
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									title="Follow us on Twitter"
									to={'/'}
									target="_blank"
								>
									<i className="zmdi zmdi-twitter" />
									<p className="d-lg-none d-xl-none">Twitter</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									title="Like us on Facebook"
									to={'/'}
									target="_blank"
								>
									<i className="zmdi zmdi-facebook" />
									<p className="d-lg-none d-xl-none">Facebook</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									title="Follow us on Instagram"
									to={'/'}
									target="_blank"
								>
									<i className="zmdi zmdi-instagram" />
									<p className="d-lg-none d-xl-none">Instagram</p>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link btn btn-white btn-round"
									to={'/sign-up'}
								>
									SIGN UP
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
