import React from "react";
import "./styles/home.scss";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const navigateToRegisterPage = () => navigate("/createAccount");

    return (
        <main className="homeParentContainer">
            <div className="homeContainer">
                <div className="bannerMessage">
                    Trust us and save your money with us.
                </div>
                <div>
                    <h5 className="cardTitle">InfMe Mobile</h5>
                    <Card className="contactUsCard">
                        <Card.Header>How can we help you?</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Banking is the best way to save your money and
                                get loan for your future. Now a days it is very
                                easy to get loan from bank. InfyMeMobile is one
                                of the leading digital banking solutions in
                                India.
                            </Card.Text>
                            <Card.Title>Connect Us</Card.Title>
                            <hr />
                            <Button variant="light">Login here</Button>{" "}
                            <Button
                                variant="link"
                                className="newUserLink"
                                onClick={navigateToRegisterPage}
                            >
                                New User ?
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default Home;
