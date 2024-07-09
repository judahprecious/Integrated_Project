import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
    accountValidationMessages,
    fundTransferValidationMessages,
} from "../../resources/messages";
import { formInputValidations } from "../../generalFunctions/validations";
import { getInputDataFromState } from "../../generalFunctions/dataConversion";
import axios from "axios";
import { FUND_TRANSFER, LIST_ACCOUNTS } from "../../endpoints/accountsAPI";

const FundTransfer = () => {
    const [validated, setValidated] = useState(false);
    const [accountsList, setAccountsList] = useState({
        paidTo: [],
        paidFrom: [],
    });
    const [apiResponseStatus, setApiResponseStatus] = useState({
        isSuccess: false,
        message: "",
    });

    const [formState, setFormState] = useState({
        modeOfTransaction: {
            data: "Fund Transfer",
            error: "",
            isValid: true,
        },
        paidTo: {
            data: "",
            error: "",
            isValid: false,
        },
        receiverAccountNumber: {
            data: "",
            error: "",
            isValid: false,
        },
        amount: {
            data: "",
            error: "",
            isValid: false,
        },
        transactionDateTime: {
            data: "",
            error: "",
            isValid: false,
        },
        remarks: {
            data: "",
            error: "",
            isValid: false,
        },
        paidFrom: {
            data: "",
            error: "",
            isValid: false,
        },
        senderAccountNumber: {
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
        let errorMessage = "";
        if (name === "paidTo" || name === "paidFrom")
            errorMessage = formInputValidations.mobileNumber(value);
        else if (
            name === "receiverAccountNumber" ||
            name === "senderAccountNumber"
        )
            errorMessage = formInputValidations.accountNumber(value);
        else errorMessage = formInputValidations[name](value);

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
        const name = event.target.name;
        const mobileNumber = event.target.value;
        try {
            const response = await axios.get(
                `${LIST_ACCOUNTS}/${mobileNumber}`
            );
            if (response.data.length === 0)
                throw new Error(accountValidationMessages.NO_ACCOUNT_IS_LINKED);

            setAccountsList({ ...accountsList, [name]: response.data });
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
        if (formState.isFormValid) {
            try {
                const formInputData = getInputDataFromState(formState);
                console.log(formInputData);
                await axios.patch(`${FUND_TRANSFER}/${formInputData}`);
                setApiResponseStatus({
                    isSuccess: true,
                    message: `Transaction completed. ${formInputData.amount.toFixed(
                        1
                    )} INR Transfered from Account Number ${
                        formInputData.senderAccountNumber
                    } to ${formInputData.receiverAccountNumber} Successfully.`,
                });
            } catch (error) {
                setApiResponseStatus({
                    isSuccess: false,
                    message: fundTransferValidationMessages.ENTER_ALL_FIELDS,
                });
            }
        }
    };

    return (
        <main>
            <div>
                <h2 className="pageHeading">Fund Transfer</h2>
                <section className="formContainer">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12">
                                <Form.Label>Mode Of Transaction</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={formState.modeOfTransaction.data}
                                    disabled
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Paid To</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Receiver mobile number"
                                    name="paidTo"
                                    onChange={handleChange}
                                    onBlur={checkIsMobileNumberValid}
                                    value={formState.paidTo.data}
                                />
                                <div className="errorMessage">
                                    {formState.paidTo.error}
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>Receiver Account</Form.Label>
                                <Form.Select
                                    required
                                    name="receiverAccountNumber"
                                    onChange={handleChange}
                                    value={formState.receiverAccountNumber.data}
                                    disabled={
                                        accountsList.paidTo.length > 0
                                            ? false
                                            : true
                                    }
                                >
                                    {/* need to implement dynamically after receiving API calls */}
                                    <option value={""} disabled>
                                        Select Account
                                    </option>
                                    {accountsList.paidTo?.map((account) => (
                                        <option value={account.accountNumber}>
                                            {account.accountNumber}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="errorMessage">
                                    {formState.receiverAccountNumber.error}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="12">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Eg: 2000"
                                    name="amount"
                                    onChange={handleChange}
                                    value={formState.amount.data}
                                />
                                <div className="errorMessage">
                                    {formState.amount.error}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Date and Time</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                    name="transactionDateTime"
                                    onChange={handleChange}
                                    value={formState.transactionDateTime.data}
                                />
                                <div className="errorMessage">
                                    {formState.transactionDateTime.error}
                                </div>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Eg: Payment for Party"
                                    name="remarks"
                                    onChange={handleChange}
                                    value={formState.remarks.data}
                                />
                                <div className="errorMessage">
                                    {formState.remarks.error}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Paid From</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Sender mobile number"
                                    name="paidFrom"
                                    onChange={handleChange}
                                    onBlur={checkIsMobileNumberValid}
                                    value={formState.paidFrom.data}
                                />
                                <div className="errorMessage">
                                    {formState.paidFrom.error}
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>Sender Account</Form.Label>
                                <Form.Select
                                    required
                                    name="senderAccountNumber"
                                    onChange={handleChange}
                                    value={formState.senderAccountNumber.data}
                                    disabled={
                                        accountsList.paidFrom.length > 0
                                            ? false
                                            : true
                                    }
                                >
                                    <option value={""} disabled>
                                        Select Account
                                    </option>
                                    {accountsList.paidFrom?.map((account) => (
                                        <option value={account.accountNumber}>
                                            {account.accountNumber}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="errorMessage">
                                    {formState.senderAccountNumber.error}
                                </div>
                            </Form.Group>
                        </Row>

                        <Button
                            type="submit"
                            className="buttonCenter"
                            disabled={!formState.isFormValid}
                        >
                            Fund Transfer
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

export default FundTransfer;
