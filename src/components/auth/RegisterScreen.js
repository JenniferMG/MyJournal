import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { startRegisterWithEmailPasswName } from '../../actions/auth';

export const RegisterScreen = () => {

    // const [error, setError] = useState('');
    const dispatch = useDispatch();
    // const { ui } = useSelector( state => state );
    // const { msgError: error } = ui;
    const { msgError: error } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const  { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
    
        if( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswName(name, email, password) );
        }
    }

    const isFormValid = () => {

        if( name.trim().length === 0 ) {
            // setError('The name is required');
            dispatch( setErrorAction( 'The name is required' ));
            
            return false;
        }else if( !validator.isEmail( email ) ) {
            // setError('The email is invalid');
            dispatch( setErrorAction( 'The email is invalid' ));
            return false;
        } else if( password.length < 5 ) {
            // setError('The password is requires');
            dispatch( setErrorAction( 'The password should be at least 6 characters' ));
            return false;
        } else if( password !== password2 ) {
            // setError('The password is not matched');
            dispatch( setErrorAction( 'The password confirmation does not match' ));
            return false;
        }

        dispatch( removeErrorAction() );

        return true;
    }
 
    return (
        <>
            <form className="auth__form animate__animated animate__fadeIn" onSubmit={ handleRegister }>
                <h3 className="auth__title inline">Register</h3>

                {
                   error &&
                       ( 
                            <div className="auth__alert-error">
                                { error }
                            </div>
                        )
                }

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
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

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    className="btn btn-secondary btn-block mb-1" 
                    type="submit"
                    // disabled={true}
                >
                    Register
                </button>
                
                
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    );
}