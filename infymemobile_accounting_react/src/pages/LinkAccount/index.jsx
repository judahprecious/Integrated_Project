import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { accountValidationMessages } from "../../resources/messages";
import { formInputValidations } from "../../generalFunctions/validations";
import axios from "axios";
import { LINK_ACCOUNT } from "../../endpoints/accountsAPI";

const LinkAccount = ({ isOTPRequired }) => {
    const [validated, setValidated] = useState(false);
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
        otp: {
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

        if (isOTPRequired) {
            newFormState.isFormValid =
                formInputValidations.isAllFieldsValid(newFormState);
        } else {
            const stateWithoutOTP = { ...newFormState };
            delete stateWithoutOTP.otp;
            newFormState.isFormValid =
                formInputValidations.isAllFieldsValid(stateWithoutOTP);
        }

        setFormState(newFormState);
        setValidated(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formState.isFormValid) {
            try {
                await axios.get(
                    `${LINK_ACCOUNT}/${formState.mobileNumber.data}`,
                    {
                        accountNumber: formState.accountNumber.data,
                    }
                );
                setApiResponseStatus({
                    isSuccess: true,
                    message: `The account number ${formState.accountNumber.data} is linked with the mobile number ${formState.mobileNumber.data}`,
                });
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
                            Enter your mobile number and account number to check
                            if they are linked
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

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Account number</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Eg: 1000"
                                    name="accountNumber"
                                    onChange={handleChange}
                                    value={formState.accountNumber.data}
                                />
                            </Form.Group>
                        </Row>
                        <div className="errorMessage">
                            {formState.accountNumber.error}
                        </div>

                        {isOTPRequired && (
                            <>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>OTP</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            placeholder="Enter OTP"
                                            name="otp"
                                            onChange={handleChange}
                                            value={formState.otp.data}
                                        />
                                    </Form.Group>
                                </Row>
                                <div className="errorMessage">
                                    {formState.otp.error}
                                </div>
                            </>
                        )}

                        <Button type="submit" disabled={!formState.isFormValid}>
                            Check Link
                        </Button>
                    </Form>

                    <div
                        className={
                            apiResponseStatus.isSuccess
                                ? "successMessage"
                                : "errorMessage"
                        }
                    >
                        {apiResponseStatus.message}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default LinkAccount;
