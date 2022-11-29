import {useReducer} from "react";

const initialInputState = {
    value: '',
    isTouched: false
}

//state.value --> using the existing value since we don't care the update
//state.isTouched --> using the existing value(copying the existing state)
const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched};
    }
    if (action.type === 'BLUR') {
        return {value: state.value, isTouched: true};
    }
    if (action.type === 'RESET') {
        return {value: '', isTouched: false};
    }
    return initialInputState;
}

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    //the funct called in useInput in SimpleInput comp is exe. in the next line
    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueInputChangeHandler = e => {
        dispatch({
            type: 'INPUT',
            value: e.target.value
        });
    }

    const valueInputBlurHandler = () => {
        dispatch({type: 'BLUR'});
    }

    const reset = () => {
        dispatch({type: 'RESET'});
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueInputBlurHandler,
        valueInputChangeHandler,
        reset
    };
}

export default useInput;