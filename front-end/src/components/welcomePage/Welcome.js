// Link
import { Link } from 'react-router-dom'
// redux
import { store } from '@store/store.js'
import { changeAuthPageChosenForm } from '@store/actions.js'
// img
import background from '@img/welcome/welcome_background.png'
// styled
import styled from 'styled-components'

export default function WelcomePage() {
    const goToAuthPageLogin = () => {
        store.dispatch(changeAuthPageChosenForm('login'))
    }

    const goToAuthPageRegister = () => {
        store.dispatch(changeAuthPageChosenForm('register'))
    }

    return (
        <Welcome>
            <H1>
                Привет дорогой друг, данное приложение пока что только может показать тебя на карте офиса. Чтобы начать
                пользоваться
                <span> </span>
                <CustomLink onClick={goToAuthPageLogin} to="/auth">
                    войди
                </CustomLink>
                <span> или </span>
                <CustomLink onClick={goToAuthPageRegister} to="/auth">
                    зарегистрируйся
                </CustomLink>
                .
            </H1>
        </Welcome>
    )
}

const Welcome = styled.div`
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
    padding: 0;
    height: calc(100vh - 80px);
    color: #fff;
`

const H1 = styled.h1`
    text-align: center;
    font-size: 30px;
    margin: 0 10%;
    padding: 50px;
`

const CustomLink = styled(Link)`
    position: relative;
    color: #00b0d2;
    cursor: pointer;
    &:before,
    &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        border-bottom: 1px solid #aae03d;
        content: '';
        transition: all 0.3s ease;
    }
    &:hover {
        &:before,
        &:after {
            width: 50%;
        }
        &:after {
            transform: translateX(-99%);
        }
    }
`
