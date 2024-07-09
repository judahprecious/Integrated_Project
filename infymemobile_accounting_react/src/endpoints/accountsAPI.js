const BASE_URL = "http://localhost:8080/accounts";

//GET mapping
export const LIST_ACCOUNTS = `${BASE_URL}`; // /{mobileNo} -> pathVariable
export const CHECK_BALANCE = `${BASE_URL}/balance`; // /{mobileNo} -> pathVariable + params -> accountNo
export const ACCOUNT_STATEMENT = `${BASE_URL}/statement`; // /{mobileNo} -> pathVariable

// POST mapping
export const CREATE_ACCOUNT = `${BASE_URL}`; // body -> bankAccountDTO
export const LINK_ACCOUNT = `${BASE_URL}`; // /{mobileNo} ->pathVariable + body -> accountNo
export const LINK_ACCOUNT_WITH_OTP = `${BASE_URL}`; // /{mobileNo} ->pathVariable + body -> (accountNo, otp)

// PATCH mapping
export const FUND_TRANSFER = `${BASE_URL}/fundtransfer`; // body -> transactionDTO
