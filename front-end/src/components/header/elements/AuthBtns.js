// Link
import { Link } from 'react-router-dom'
// redux
import { store } from '@store/store.js'
import { changeAuthPageChosenForm } from '@store/actions.js'
// styled
import styled from 'styled-components'

const goToAuthPageLogin = () => {
    store.dispatch(changeAuthPageChosenForm('login'))
}

const goToAuthPageRegister = () => {
    store.dispatch(changeAuthPageChosenForm('register'))
}

export default function AuthBtns() {
    return (
        <div>
            <CustomLink onClick={goToAuthPageLogin} to="/auth">
                Вход
            </CustomLink>
            <span>/</span>
            <CustomLink onClick={goToAuthPageRegister} to="/auth">
                Регистрация
            </CustomLink>
        </div>
    )
}

const CustomLink = styled(Link)`
    margin: 0 10px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    &:hover {
        border-bottom: 1px #000 solid;
    }
`
