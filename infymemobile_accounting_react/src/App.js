import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./generalStyles/layoutStyles.scss";
import "./generalStyles/formStyles.scss";
import LoadingWrapper from "./components/LoadingWrapper";

const Home = lazy(() => import("./pages/Home"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const ListAccount = lazy(() => import("./pages/ListAccount"));
const LinkAccount = lazy(() => import("./pages/LinkAccount"));
const FundTransfer = lazy(() => import("./pages/FundTransfer"));
const AccountStatement = lazy(() => import("./pages/AccountStatement"));
const CheckBalance = lazy(() => import("./pages/CheckBalance"));
const Login = lazy(() => import("./pages/Login"));

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        index
                        element={<LoadingWrapper Component={Home} />}
                    />
                    <Route
                        path="/createAccount"
                        element={<LoadingWrapper Component={CreateAccount} />}
                    />
                    <Route
                        path="/login"
                        element={<LoadingWrapper Component={Login} />}
                    />
                    <Route
                        path="/listAccount"
                        element={<LoadingWrapper Component={ListAccount} />}
                    />
                    <Route
                        path="/linkAccount"
                        element={<LoadingWrapper Component={LinkAccount} />}
                    />
                    <Route
                        path="/linkAccountWithOTP"
                        element={
                            <LoadingWrapper
                                Component={LinkAccount}
                                isOTPRequired={true}
                            />
                        }
                    />
                    <Route
                        path="/fundTransfer"
                        element={<LoadingWrapper Component={FundTransfer} />}
                    />
                    <Route
                        path="/accountStatement"
                        element={
                            <LoadingWrapper Component={AccountStatement} />
                        }
                    />
                    <Route
                        path="/checkBalance"
                        element={<LoadingWrapper Component={CheckBalance} />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
