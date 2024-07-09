import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { accountValidationMessages } from "../../resources/messages";
import { formInputValidations } from "../../generalFunctions/validations";
import axios from "axios";
import { CREATE_ACCOUNT } from "../../endpoints/accountsAPI";
import { getInputDataFromState } from "../../generalFunctions/dataConversion";

const CreateAccount = () => {
    const [validated, setValidated] = useState(false);
    const [apiResponseStatus, setApiResponseStatus] = useState({
        isSuccess: false,
        message: "",
    });
    const [formState, setFormState] = useState({
        bankName: {
            data: "",
            error: "",
            isValid: false,
        },
        balance: {
            data: "",
            error: "",
            isValid: false,
        },
        accountType: {
            data: "",
            error: "",
            isValid: false,
        },
        ifscCode: {
            data: "",
            error: "",
            isValid: false,
        },
        openingDate: {
            data: "",
            error: "",
            isValid: false,
        },
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
                const formInputData = getInputDataFromState(formState);
                await axios.post(`${CREATE_ACCOUNT}/${formInputData}`);
                setApiResponseStatus({
                    isSuccess: true,
                    message: accountValidationMessages.ACCOUNT_CREATED,
                });
            } catch (error) {
                setApiResponseStatus({
                    isSuccess: false,
                    message: accountValidationMessages.SUBMISSION_ERROR,
                });
            }
        }
    };

    return (
        <main>
            <div>
                <h2 className="pageHeading">Create Account</h2>
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
                                    name="bankName"
                                    onChange={handleChange}
                                    value={formState.bankName.data}
                                />
                                <div className="errorMessage">
                                    {formState.bankName.error}
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Eg: 1000"
                                    name="balance"
                                    onChange={handleChange}
                                    value={formState.balance.data}
                                />
                                <div className="errorMessage">
                                    {formState.balance.error}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Account Type</Form.Label>
                                <Form.Select
                                    required
                                    name="accountType"
                                    onChange={handleChange}
                                    value={formState.accountType.data}
                                >
                                    <option value="" disabled>
                                        Select Account Type
                                    </option>
                                    <option value="savings">Savings</option>
                                    <option value="current">Current</option>
                                    <option value="salary">Salary</option>
                                </Form.Select>
                                <div className="errorMessage">
                                    {formState.accountType.error}
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>IFSC Code</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Eg: IFSC1234"
                                    name="ifscCode"
                                    onChange={handleChange}
                                    value={formState.ifscCode.data}
                                />
                                <div className="errorMessage">
                                    {formState.ifscCode.error}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Opening Date</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    name="openingDate"
                                    onChange={handleChange}
                                    value={formState.openingDate.data}
                                />
                                <div className="errorMessage">
                                    {formState.openingDate.error}
                                </div>
                            </Form.Group>
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
                                <div className="errorMessage">
                                    {formState.mobileNumber.error}
                                </div>
                            </Form.Group>
                        </Row>

                        <Button
                            type="submit"
                            className="buttonCenter"
                            disabled={!formState.isFormValid}
                        >
                            Create Account
                        </Button>
                    </Form>
                    <div
                        className={
                            apiResponseStatus.isSuccess
                                ? "successMessageInBox"
                                : "errorMessageInBox"
                        }
                    >
                        {apiResponseStatus.message}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CreateAccount;
