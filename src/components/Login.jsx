import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import translations from '../lang/es'
import * as authService from '../services/auth.service'
import Navbar from './Navbar'
import Validator from 'validatorjs'

const signInValidationRules = {
    email: ['required', 'email'], password: ['required', 'string']
}
const signUpValidationRules = {
    name: ['required', 'string'], email: ['required', 'email'], password: ['required', 'string', 'min:6']
}
const attributesNames = { name: 'nombre', email: 'correo', password: 'contraseña' }

export default function Login() {

    const [errorMessage, setErrorMessage] = useState('')
    const [signUp, setSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (signUp) return handleSignUp()
        handleSignIn()
    }

    function handleSignUpButtonClick(e) {
        if (!signUp) {
            e.preventDefault();
            setSignUp(true);
        }
    }

    async function handleSignIn() {
        const validator = new Validator({ email, password }, signInValidationRules)
        validator.setAttributeNames(attributesNames)
        const validInput = validator.check()
        setErrorMessage(Object.values(validator.errors.errors)[0])
        if(!validInput) return
        try {
            setLoading(true);
            setErrorMessage('');
            await authService.signIn(email, password);
            setEmail('');
            setPassword('');
            setSignUp(false);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setErrorMessage(translations[error.code]);
        } finally {
            setLoading(false);
        }
    }

    async function handleSignUp() {
        if (!signUp) return setSignUp(true);
        const validator = new Validator({ name, email, password }, signUpValidationRules)
        validator.setAttributeNames(attributesNames)
        const validInput = validator.check()
        setErrorMessage(Object.values(validator.errors.errors)[0])
        if(!validInput) return
        try {
            setLoading(true);
            setErrorMessage('');
            await authService.signUp(email, password, name);
            alert('Se a registrado el usuario');
            setEmail('');
            setPassword('');
            setSignUp(false);
        } catch (error) {
            setErrorMessage(translations[error.code]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="d-flex justify-content-center">
                    <div className='mt-5 d-flex flex-column w-50'>
                        <form onSubmit={handleSubmit}>
                            <h1 className='display-4'>{signUp ? 'Registrarse' : 'Iniciar Sesion'}</h1>
                            {
                                errorMessage &&
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            }
                            <input className='form-control mt-2' type="email" required placeholder='Correo'
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <input className='form-control mt-2' type="password" required placeholder='Contraseña'
                                value={password} onChange={e => setPassword(e.target.value)} />
                            {
                                signUp ? <input className='form-control mt-2' type="text" required placeholder='Nombre'
                                    value={name} onChange={e => setName(e.target.value)} /> : <></>
                            }
                            <div className='mt-4 d-flex flex-column'>
                                {
                                    !signUp && <button disabled={loading} type='submit' className='btn btn-primary mt-2'>Iniciar Sesion</button>
                                }
                                <button type={signUp ? 'submit' : 'button'} disabled={loading} className='btn btn-success mt-2' onClick={e => handleSignUpButtonClick(e)}>Registrarse</button>
                                {
                                    signUp && <button type='button' disabled={loading} className='btn btn-danger mt-2' onClick={e => setSignUp(false)}>Cancelar</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}
