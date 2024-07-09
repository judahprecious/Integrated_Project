import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/header.scss";

const IMAGE_URL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TS7OqvXkcUCEVPBn9_wnNYraTEvcFx2NbA&s";

const Header = () => {
    const navigate = useNavigate();
    const goToHome = () => navigate("/");

    return (
        <header>
            <img src={IMAGE_URL} alt="header logo" onClick={goToHome} />
            <nav>
                <Link to={"/listAccount"}>List Accounts</Link>
                <Link to={"/createAccount"}>Create Accounts</Link>
                <Link to={"/linkAccount"}>Link Account</Link>
                <Link to={"/linkAccountWithOTP"}>Link Account With OTP</Link>
                <Link to={"/fundTransfer"}>Fund Transfer</Link>
                <Link to={"/accountStatement"}>Account Statement</Link>
                <Link to={"/checkBalance"}>Check Balance</Link>
            </nav>
        </header>
    );
};

export default Header;
