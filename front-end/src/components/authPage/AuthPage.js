import React, { useState } from 'react'
// conponents
import Login from '@components/authPage/elements/Login.js'
import Register from '@components/authPage/elements/Register.js'
// redux
import { store } from '@store/store.js'
// img
import background from '@img/welcome/welcome_background.png'
/// styled
import styled from 'styled-components'

export default function AuthPage() {
    const [chosenForm, setChosenForm] = useState(store.getState().authPageChosenForm)

    const choseLogin = () => {
        setChosenForm('login')
    }

    const choseRegister = () => {
        setChosenForm('register')
    }

    store.subscribe(() => setChosenForm(store.getState().authPageChosenForm))

    return (
        <AuthPageStyled>
            <AuthForms>
                <ButtonsWrapper>
                    <Button
                        style={chosenForm === 'login' ? { borderBottom: 'none', borderRight: 'none' } : {}}
                        onClick={choseLogin}>
                        Вход
                    </Button>
                    <Button
                        style={chosenForm === 'register' ? { borderBottom: 'none', borderLeft: 'none' } : {}}
                        onClick={choseRegister}>
                        Регистрация
                    </Button>
                </ButtonsWrapper>
                {chosenForm === 'login' ? <Login /> : <Register />}
            </AuthForms>
        </AuthPageStyled>
    )
}

const AuthPageStyled = styled.div`
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
    padding: 5%;
    height: calc(100vh - 80px);
`

const AuthForms = styled.div`
    margin: 0 auto;
    padding: 0;
    max-width: 500px;
    background-color: rgba(00, 00, 00, 0.3);
`

const ButtonsWrapper = styled.div`
    display: flex;
    margin: 0;
    z-index: 1;
`

const Button = styled.div`
    text-align: center;
    font-style: normal;
    font-weight: 100;
    font-size: 22px;
    color: #fff;
    cursor: pointer;
    border: 1px #aaa solid;
    padding: 10px 40px;
    flex: 1;
    &:nth-of-type(1) {
        border-radius: 5px 0 5px 0;
        -webkit-border-radius: 5px 0 5px 0;
        -moz-border-radius: 5px 0 5px 0;
        -ms-border-radius: 5px 0 5px 0;
        -o-border-radius: 5px 0 5px 0;
    }
    &:nth-of-type(2) {
        border-radius: 0 5px 0 5px;
        -webkit-border-radius: 0 5px 0 5px;
        -moz-border-radius: 0 5px 0 5px;
        -ms-border-radius: 0 5px 0 5px;
        -o-border-radius: 0 5px 0 5px;
    }
`
