import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Table } from "antd";
import axios from "axios";
import { ACCOUNT_STATEMENT } from "../../endpoints/accountsAPI";
import { fundTransferValidationMessages } from "../../resources/messages";
import json_statement from "../../DUMMY_JSON_DATA/transactionStatement.json";
import { formInputValidations } from "../../generalFunctions/validations";

const columns = [
    {
        title: "Transaction date and time",
        dataIndex: "transactionDateTime",
        showSorterTooltip: {
            target: "full-header",
        },
        sorter: (a, b) => a.transactionDateTime - b.transactionDateTime,
        sortDirections: ["descend"],
    },
    {
        title: "Amount",
        dataIndex: "amount",
        showSorterTooltip: {
            target: "full-header",
        },
        defaultSortOrder: "descend",
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: "Sender Account",
        dataIndex: "senderAccountNumber",
    },
    {
        title: "Paid To",
        dataIndex: "paidTo",
    },
    {
        title: "Receiver Account",
        dataIndex: "receiverAccountNumber",
    },
    {
        title: "Remarks",
        dataIndex: "remarks",
    },
];

const AccountStatement = () => {
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
                await axios.get(
                    `${ACCOUNT_STATEMENT}/${formState.mobileNumber.data}`
                );
                setApiResponseStatus({
                    isSuccess: true,
                    message: "",
                });
            } catch (error) {
                setApiResponseStatus({
                    isSuccess: false,
                    message:
                        fundTransferValidationMessages.N0_TRANSACTION_FOUND,
                });
            }
        }
    };

    return (
        <main>
            <div>
                <h2 className="pageHeading">Account Statement</h2>
                <section className="formContainer">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="caption">
                            Please enter the mobile number to get the account
                            statement.
                        </div>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
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
                            Get Statement
                        </Button>
                    </Form>
                    {!apiResponseStatus.isSuccess && (
                        <div className="errorMessage">
                            {apiResponseStatus.message}
                        </div>
                    )}
                </section>
                {apiResponseStatus.isSuccess && (
                    <section style={{ marginTop: "2rem" }}>
                        <Table
                            columns={columns}
                            dataSource={json_statement}
                            showSorterTooltip={{
                                target: "sorter-icon",
                            }}
                        />
                    </section>
                )}
            </div>
        </main>
    );
};

export default AccountStatement;
