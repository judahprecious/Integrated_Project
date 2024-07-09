import React from "react";
import { Link } from "react-router-dom";
import "./styles/footer.scss";

const Footer = () => {
    return (
        <footer>
            <div>&#169; 2024, All rights reserved.</div>
            <div>
                <Link to="#">Services</Link>
                <Link to="#">Privacy Policy</Link>
            </div>
        </footer>
    );
};

export default Footer;
