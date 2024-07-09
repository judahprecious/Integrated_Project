export const getInputDataFromState = (state) => {
    let formData = {};
    delete state.isFormValid;

    for (let key in state) {
        formData[key] = state[key].data;
    }
    console.log(formData);
    return formData;
};
