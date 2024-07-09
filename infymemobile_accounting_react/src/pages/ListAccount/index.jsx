import React, { useState } from "react";
import "./styles/listAccount.scss";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
// import accountsJSON from "../../DUMMY_JSON_DATA/listAccounts.json";
import { formInputValidations } from "../../generalFunctions/validations";
import axios from "axios";
import { LIST_ACCOUNTS } from "../../endpoints/accountsAPI";
import { accountValidationMessages } from "../../resources/messages";

const ListAccount = () => {
    const [validated, setValidated] = useState(false);
    const [accountsList, setAccountsList] = useState([]);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formState.isFormValid) {
            try {
                const response = await axios.get(
                    `${LIST_ACCOUNTS}/${formState.mobileNumber.data}`
                );
                setAccountsList(response.data);
                setApiResponseStatus({ isSuccess: true, message: "" });
            } catch (error) {
                setApiResponseStatus({
                    isSuccess: false,
                    message: accountValidationMessages.NO_ACCOUNT_DETAILS_FOUND,
                });
            }
        }
    };

    return (
        <main>
            <div>
                <h2 className="pageHeading">List Account</h2>
                <section className="formContainer">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="caption">
                            Enter your mobile number to view your linked account
                            details
                        </div>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
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
                                            value={formState.mobileNumber.data}
                                        />
                                    </Form.Group>
                                </Row>
                            </Form.Group>
                        </Row>
                        <div className="errorMessage">
                            {formState.mobileNumber.error}
                        </div>

                        <Button type="submit" disabled={!formState.isFormValid}>
                            View Details
                        </Button>
                    </Form>
                    {!apiResponseStatus.isSuccess && (
                        <div className="errorMessage">
                            {apiResponseStatus.message}
                        </div>
                    )}
                </section>
                <section className="accountsContainer">
                    {apiResponseStatus.isSuccess &&
                        accountsList?.map((account) => (
                            <Card
                                key={account.accountNumber}
                                border="info"
                                style={{ width: "18rem" }}
                            >
                                <Card.Header>Account Details</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <span>
                                            Account Number:{" "}
                                            {account.accountNumber}
                                        </span>
                                        <span>
                                            Bank Name: {account.bankName}
                                        </span>
                                        <span>Balance: {account.balance}</span>
                                        <span>
                                            Account Type: {account.accountType}
                                        </span>
                                        <span>
                                            IFSC Code: {account.ifscCode}
                                        </span>
                                        <span>
                                            Opening Date: {account.openingDate}
                                        </span>
                                        <span>
                                            Mobile Number:{" "}
                                            {account.mobileNumber}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                </section>
            </div>
        </main>
    );
};

export default ListAccount;
