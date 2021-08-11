// Link
import { Link } from 'react-router-dom'
// img
import logo from '@img/header/logo.png'
// styles
import styled from 'styled-components'

export default function Logo() {
    return (
        <CustomLink to="/">
            <IMG src={logo} alt="logo" />
            <H1>AVTelma</H1>
        </CustomLink>
    )
}

const CustomLink = styled(Link)`
    flex: 0;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.24);
    padding: 0 20px;
    text-decoration: none;
    user-select: none;
    height: 75%;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
`

const IMG = styled.img`
    width: auto;
    height: 65%;
    margin-right: 10px;
`

const H1 = styled.h1`
    line-height: 30px;
    color: #00b0d2;
    padding: 0 0 5px 0;
    margin: 0;
    font-size: 20px;
    white-space: nowrap;
`
