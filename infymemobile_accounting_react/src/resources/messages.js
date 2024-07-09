export const accountValidationMessages = {
    BANK_NAME: "Bank name must be between 5 and 15 characters",
    BALANCE: "Balance cannot be negative",
    IFSC_CODE: "IFSC code must be between 1 to 15 characters",
    OPENING_DATE: "Opening date must be a past date",
    MOBILE_NUMBER: "Phone number should have 10 digits",
    ACCOUNT_NUMBER: "Enter valid account number",
    ACCOUNT_TYPE: "Select an account type",
    OTP_REQUIRED: "Cannot proceed without OTP",
    NO_ACCOUNT_IS_LINKED:
        "No Account is Linked. Please enter a registered mobile number.",
    NO_ACCOUNT_DETAILS_FOUND:
        "No account details found with the given mobile number",
    ACCOUNT_CREATED: "Details submitted successfully!",
    SUBMISSION_ERROR: "Something went wrong",
};

export const fundTransferValidationMessages = {
    RECEIVER_MOBILE_NUMBER:
        "Please enter the receiver's 10 digit mobile number",
    AMOUNT: "Please enter amount greater than 0 to be transferred",
    DATE_AND_TIME:
        "Please select todays or upcoming date and time of transaction",
    REMARKS: "Please enter the remarks",
    PAID_FROM: "Please enter the sender's 10 digit mobile number",
    N0_TRANSACTION_FOUND:
        "No Transaction Details Found. Please enter a valid and account linked mobile",
    ENTER_ALL_FIELDS: "Enter all the form fields",
};
