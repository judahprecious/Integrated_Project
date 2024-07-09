import React, { Suspense } from "react";
import "./styles/pageLoader.scss";

const PageLoader = () => {
    return (
        <div className="loaderContainer">
            <div className="loader"></div>
        </div>
    );
};

const LoadingWrapper = ({ Component, isOTPRequired }) => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Component isOTPRequired={isOTPRequired} />
        </Suspense>
    );
};

export default LoadingWrapper;
