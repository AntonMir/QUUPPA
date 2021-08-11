import { useContext } from 'react'
// context
import { AuthContext } from '@src/context/AuthContext.js'
// Link
import { Link } from 'react-router-dom'
// img
import user from '@img/header/user.svg'
// styled
import styled from 'styled-components'

export default function User() {
    const auth = useContext(AuthContext)

    return (
        <CustomLink to="auth">
            <ImgStyled src={user} alt="user" />
            <UserName>{auth.userName ? auth.userName.toUpperCase() : ''}</UserName>
        </CustomLink>
    )
}

const CustomLink = styled(Link)`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    height: 70%;
    user-select: none;
    margin: 0 20px;
`

const ImgStyled = styled.img`
    height: 100%;
    width: auto;
`

const UserName = styled.p`
    margin: 0 10px;
    color: #aae03d;
    text-shadow: #000 0 0 5px;
`
