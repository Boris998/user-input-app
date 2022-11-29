import useInput from "../hooks/use-input";
import {useEffect, useState} from "react";

const BasicForm = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueInputChangeHandler: nameInputChangeHandler,
        valueInputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredSurname,
        isValid: enteredSurnameIsValid,
        hasError: surnameInputHasError,
        valueInputChangeHandler: surnameInputChangeHandler,
        valueInputBlurHandler: surnameInputBlurHandler,
        reset: resetSurnameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueInputChangeHandler: emailInputChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.trim().includes('@'));

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        if (enteredNameIsValid && enteredEmailIsValid && enteredSurnameIsValid)
            setFormIsValid(true);
    }, [enteredNameIsValid, enteredSurnameIsValid, enteredSurnameIsValid]);

    const formSubmitHandler = e => {
        e.preventDefault();

        if (!formIsValid) return;

        resetNameInput();
        resetSurnameInput();
        resetEmailInput();
    }

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
    const surnameInputClasses = surnameInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className='control-group'>
                <div className={nameInputClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input
                        type='text'
                        id='name'
                        value={enteredName}
                        onChange={nameInputChangeHandler}
                        onBlur={nameInputBlurHandler}
                    />
                    {nameInputHasError && <p className='error-text'>Enter a valid name</p>}
                </div>
                <div className={surnameInputClasses}>
                    <label htmlFor='name'>Last Name</label>
                    <input
                        type='text'
                        id='surname'
                        value={enteredSurname}
                        onChange={surnameInputChangeHandler}
                        onBlur={surnameInputBlurHandler}
                    />
                    {surnameInputHasError && <p className='error-text'>Enter a valid e-mail</p>}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='name'>E-Mail Address</label>
                <input
                    type='email'
                    id='name'
                    value={enteredEmail}
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                />
                {emailInputHasError && <p className='error-text'>Enter a valid e-mail</p>}
            </div>
            <div className='form-actions'>
                <button>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
