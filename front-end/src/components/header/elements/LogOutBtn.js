import { useContext } from 'react'
// context
import { AuthContext } from '@src/context/AuthContext.js'
// Link
import { Link } from 'react-router-dom'
// styled
import styled from 'styled-components'

export default function LogOutBtn() {
    const auth = useContext(AuthContext)

    return (
        <CustomLink to="/" onClick={auth.logout}>
            Выйти
        </CustomLink>
    )
}

const CustomLink = styled(Link)`
    border: #000 1px solid;
    padding: 10px 20px;
    margin: 0 0 0 20px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
`
