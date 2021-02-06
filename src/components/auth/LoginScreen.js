import React from 'react';
// import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
// import { removeErrorAction, setErrorAction } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    // const isFormValid = () => {
    //     if( !validator.isEmail( email ) ) {
    //         dispatch( setErrorAction( 'The email is invalid' ));
    //         return false;
    //     }

    //     dispatch( removeErrorAction() );
        
    //     return true;
    // }

    return (
        <>
            <form className="auth__form animate__animated animate__fadeIn" onSubmit={ handleLogin }>
                <h3 className="auth__title">Login</h3>

                {/* {
                   error &&
                       ( 
                            <div className="auth__alert-error">
                                { error }
                            </div>
                        )
                }
                 */}
                <input
                    className="auth__input"
                    type="text"
                    placeholder="E-mail"
                    name="email"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    className="btn btn-primary btn-block mb-1" 
                    type="submit"
                    disabled={ loading }
                >
                    Login
                </button>
                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div onClick={ handleGoogleLogin }  className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                </div>

                <Link 
                    className="link"
                    to="/auth/register"
                >
                    Creat new account
                </Link>

            </form>
        </>
    );
}