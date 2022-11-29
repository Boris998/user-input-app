import {useEffect, useState} from "react";
import "../index.css";
import useInput from "../hooks/use-input";

const SimpleInput = () => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueInputBlurHandler: nameInputBlurHandler,
        valueInputChangeHandler: nameInputChangeHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueInputBlurHandler: emailInputBlurHandler,
        valueInputChangeHandler: emailInputChangeHandler,
        reset: resetEmailInput
    } = useInput(value => value.trim().includes('@'));


    const [formIsValid, setFormIsValid] = useState(false);


    useEffect(() => {
        if (enteredNameIsValid && enteredEmailIsValid) setFormIsValid(true);
        else setFormIsValid(false);
    }, [enteredNameIsValid, enteredEmailIsValid]);

    const formSubmissionHandler = e => {
        e.preventDefault();

        if (!enteredNameIsValid) {
            return;
        }

        resetNameInput();
        resetEmailInput();
    }

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                {nameInputHasError &&
                    <p className='error-text'>Name field is required!!</p>
                }
                <label htmlFor='email'>Your email</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    value={enteredEmail}
                />
                {emailInputHasError &&
                    <p className='error-text'>e-mail field is required!!</p>
                }
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
