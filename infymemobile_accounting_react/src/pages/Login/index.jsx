import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { accountValidationMessages as messages } from "../../resources/messages";

const Login = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setValidated(true);
    };

    return (
        <main>
            <div>
                <h2 className="pageHeading">Login</h2>
                <section className="formContainer">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Bank Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Eg:bbmbank"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {messages.BANK_NAME}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Eg: 1000"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {messages.BALANCE}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Button type="submit" className="buttonCenter">
                            Create Account
                        </Button>
                    </Form>
                    <div className="successMessage"></div>
                </section>
            </div>
        </main>
    );
};

export default Login;
