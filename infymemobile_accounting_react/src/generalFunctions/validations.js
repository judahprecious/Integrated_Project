import {
    accountValidationMessages as messages,
    fundTransferValidationMessages as fundMessages,
} from "../resources/messages";

export const formInputValidations = {};

// check if mobileNumber is invalid
formInputValidations.mobileNumber = (mobileNumber) =>
    !/^\d{10}$/.test(mobileNumber) ? messages.MOBILE_NUMBER : "";

formInputValidations.accountNumber = (accountNumber) =>
    String(accountNumber) ? "" : messages.ACCOUNT_NUMBER;

formInputValidations.otp = (otp) => (String(otp) ? "" : messages.OTP_REQUIRED);

formInputValidations.bankName = (bankName) =>
    bankName.length >= 5 && bankName.length <= 15 ? "" : messages.BANK_NAME;

formInputValidations.balance = (balance) =>
    balance >= 0 ? "" : messages.BALANCE;

formInputValidations.accountType = (accountType) =>
    accountType ? "" : messages.ACCOUNT_TYPE;

formInputValidations.ifscCode = (ifscCode) =>
    ifscCode.length >= 1 && ifscCode.length <= 15 ? "" : messages.IFSC_CODE;

formInputValidations.openingDate = (openingDate) =>
    new Date(openingDate) < new Date() ? "" : messages.OPENING_DATE;

formInputValidations.amount = (amount) =>
    amount > 0 ? "" : fundMessages.AMOUNT;

formInputValidations.transactionDateTime = (transactionDateTime) =>
    new Date(transactionDateTime) >= new Date()
        ? ""
        : fundMessages.DATE_AND_TIME;

formInputValidations.remarks = (remarks) =>
    remarks.length > 0 ? "" : fundMessages.REMARKS;

formInputValidations.isAllFieldsValid = (state) => {
    for (let key in state) {
        if (state[key].isValid === false) return false;
    }
    return true;
};
