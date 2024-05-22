import React, { Component } from 'react'

export class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    };

    handleAuthClick = () =>{
        this.props.onAuthClick(this.state.login, this.state.password);
        this.setState({
            login: '',
            password: ''
        });
    }

    handleRegisterClick = () =>{
        this.props.onRegisterClick(this.state.login, this.state.password);
        this.setState({
            login: '',
            password: ''
        });
    }

    render() {
        return (
            <div className='formdiv'>
                <form className='authform'>
                    <div className='formgroup'>
                        <label htmlFor='login'>Логін</label>
                        <input
                            type='text'
                            id='logininput'
                            name='login'
                            value={this.state.login}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className='formgroup'>
                        <label htmlFor='password'>Пароль </label>
                        <input
                            type='password'
                            id='passwordinput'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className='formbuttons'>
                        <button type='button' onClick={this.handleAuthClick}>Авторизація</button>
                        <button type='button' onClick={this.handleRegisterClick}>Реєстрація</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AuthForm