import React, {FC} from "react";

const Header: FC = function Header() {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">conduit</a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/* TODO Add "active" class on the current link */}
                        <a className="nav-link active" href="">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">
                            <i className="ion-compose"></i> New Post
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">
                            <i className="ion-gear-a"></i> Settings
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Sign up</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;