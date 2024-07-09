import React, { useState } from "react";
import { accountValidationMessages } from "../../resources/messages";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { formInputValidations } from "../../generalFunctions/validations";
import axios from "axios";
import { CHECK_BALANCE, LIST_ACCOUNTS } from "../../endpoints/accountsAPI";

const CheckBalance = () => {
    const [validated, setValidated] = useState(false);
    const [accountsList, setAccountsList] = useState([]);
    const [accountBalance, setAccountBalance] = useState(0);
    const [apiResponseStatus, setApiResponseStatus] = useState({
        isSuccess: false,
        message: "",
    });
    const [formState, setFormState] = useState({
        mobileNumber: {
            data: "",
            error: "",
            isValid: false,
        },
        accountNumber: {
            data: "",
            error: "",
            isValid: false,
        },
        isFormValid: false,
    });

    function handleChange(event) {
        const newFormState = { ...formState };
        const name = event.target.name;
        const value = event.target.value;
        const errorMessage = formInputValidations[name](value);

        newFormState[name] = {
            data: value,
            error: errorMessage,
            isValid: Boolean(!errorMessage),
        };

        newFormState.isFormValid =
            formInputValidations.isAllFieldsValid(newFormState);

        setFormState(newFormState);
        setValidated(true);
    }

    async function checkIsMobileNumberValid(event) {
        const mobileNumber = event.target.value;
        try {
            const response = await axios.get(
                `${LIST_ACCOUNTS}/${mobileNumber}`
            );
            if (response.data.length === 0)
                throw new Error(accountValidationMessages.NO_ACCOUNT_IS_LINKED);

            setAccountsList(response.data);
            setApiResponseStatus({
                isSuccess: true,
                message: "",
            });
        } catch (error) {
            setApiResponseStatus({
                isSuccess: false,
                message: accountValidationMessages.NO_ACCOUNT_IS_LINKED,
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formState.isFormValid) {
            try {
                const response = await axios.get(
                    `${CHECK_BALANCE}/${formState.mobileNumber.data}?accountNo=${formState.accountNumber.data}`
                );
                setAccountBalance(response.data);
                setApiResponseStatus({ isSuccess: true, message: "" });
            } catch (error) {
                setApiResponseStatus({
                    isSuccess: false,
                    message: accountValidationMessages.NO_ACCOUNT_IS_LINKED,
                });
            }
        }
    };

    return (
        <main>
            <div>
                <h2 className="pageHeading">Check Balance</h2>
                <section className="formContainer">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="caption">
                            Enter your mobile number to check your balance
                        </div>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="5">
                                <Form.Label>Mobile Number</Form.Label>
                                <Row>
                                    <Form.Group as={Col} md="4">
                                        <Form.Select
                                            defaultValue="+91"
                                            required
                                        >
                                            <option value="+91">+91</option>
                                            <option value="+211">+211</option>
                                            <option value="+312">+312</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md="8">
                                        <Form.Control
                                            required
                                            type="number"
                                            placeholder="Eg: 9090909090"
                                            name="mobileNumber"
                                            onChange={handleChange}
                                            onBlur={checkIsMobileNumberValid}
                                            value={formState.mobileNumber.data}
                                        />
                                    </Form.Group>
                                </Row>
                            </Form.Group>
                        </Row>
                        <div className="errorMessage">
                            {formState.mobileNumber.error}
                        </div>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Account Number</Form.Label>
                                <Form.Select
                                    defaultValue=""
                                    required
                                    disabled={!apiResponseStatus.isSuccess}
                                >
                                    <option value="" disabled>
                                        Select Account
                                    </option>
                                    {accountsList?.map((account) => (
                                        <option value={account.accountNumber}>
                                            {account.accountNumber}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Button type="submit">Check Balance</Button>
                    </Form>

                    {apiResponseStatus.isSuccess ? (
                        <Card
                            border="success"
                            style={{
                                width: "50%",
                                textAlign: "center",
                                marginTop: "2rem",
                            }}
                        >
                            <Card.Body>
                                <Card.Title>Balance</Card.Title>
                                <Card.Text>
                                    You have Rs. {accountBalance} in your
                                    account
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>Happy Transaction ☺️</Card.Footer>
                        </Card>
                    ) : (
                        <div
                            className="errorMessageInBox"
                            style={{ width: "50%" }}
                        >
                            {apiResponseStatus.message}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default CheckBalance;
