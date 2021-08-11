import React, { useState, useEffect, useContext } from 'react'
// castom hook
import { useHttp } from '@hooks/http.hook.js'
import { useMessage } from '@hooks/message.hook.js'
// context
import { AuthContext } from '@src/context/AuthContext.js'
// styled
import styled from 'styled-components'

export default function Login() {
    // используем контекст кторый создали (AuthContext)
    // это нужно, чтобы воспользоваться методом login
    const auth = useContext(AuthContext)

    // кастомный хук для вывоа ошибки
    const message = useMessage()

    // кастомный хук для отправки данных
    const { loading, error, request, clearError } = useHttp()

    // state для email и pass
    const [form, setForm] = useState({ email: '', password: '' })

    // обработаем ошибку
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // сохраняем в наш state email и password
    const changeUserData = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // вызывает хук useHttp, отправляет запрос на сервер,
    // получает ответ в виде промиса и выводит его на экран
    // при авторизации
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId, data.userName)
        } catch (e) {}
    }

    return (
        <LoginWrapper>
            <LoginForm>
                <Input placeholder="Email" id="login-email" type="text" name="email" onChange={changeUserData} />
                <Input
                    placeholder="Password"
                    id="login-password"
                    type="password"
                    name="password"
                    onChange={changeUserData}
                />
                <Button onClick={loginHandler} disabled={loading}>
                    Войти
                </Button>
            </LoginForm>
        </LoginWrapper>
    )
}

const LoginWrapper = styled.div`
    padding: 50px 100px 40px;
    width: 100%;
    box-shadow: 2 2 5px #000;
    border: 1px #aaa solid;
    border-top: none;

    border-radius: 0 0 10px 10px;
    -webkit-border-radius: 0 0 10px 10px;
    -moz-border-radius: 0 0 10px 10px;
    -ms-border-radius: 0 0 10px 10px;
    -o-border-radius: 0 0 10px 10px;
`

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    margin-bottom: 30px !important;
    background-color: rgba(44, 44, 44, 0.9) !important;
    padding: 0 20px !important;
    color: #fff;
    &:focus {
        border-bottom: 1px solid #00b0d2 !important;
        box-shadow: 0px 1px 0 0 #00b0d2 !important;
    }
`

const Button = styled.button`
    padding: 5px 25px 10px;
    margin: 15px 0 0 0;
    font-size: 20px;
    color: #fff;
    background-color: rgba(00, 00, 00, 0) !important;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    &:focus {
        background-color: rgba(00, 00, 00, 0) !important;
    }
`
