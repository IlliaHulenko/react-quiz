import React, { Component } from 'react'
import './Auth.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Introduzca el email correcto',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Contraseña',
                errorMessage: 'Introduzca la contraseña correcta',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNXEIJ2aK-tnyVsOwDBS2HZJnCD9xOV60', authData)
            console.log(response.data)
        } catch (e){
            console.log(e)
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNXEIJ2aK-tnyVsOwDBS2HZJnCD9xOV60', authData)
            console.log(response.data)
        } catch (e){
            console.log(e)
        }        
    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation){
            return true
        }

        let isValid = true

        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email) {
            isValid = is.all.email(value) && isValid
        }

        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {        

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true
        
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }


    renderInputs() {
       return Object.keys(this.state.formControls).map((controlName, index) => {
           const control = this.state.formControls[controlName]
           return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange = {event => this.onChangeHandler(event, controlName)}
                />
           )            
        })
    }

    render() {
        return (
            <div className="Auth">
                <div>
                    <h1>Autorización</h1>

                    <form onSubmit={this.submitHandler} className="AuthForm">
                       
                       {this.renderInputs()}

                        <Button 
                            type="successBtn" 
                            onClick={this.loginHandler}
                            disabled ={!this.state.isFormValid}
                        >
                            Entrar
                        </Button>

                        <Button 
                            type="primary" 
                            onClick={this.registerHandler}
                            disabled ={!this.state.isFormValid}
                        >
                            Registrarse
                        </Button>

                    </form>
                </div>
                
            </div>
        )
    }
}
