// Link
import { Link } from 'react-router-dom'
// styles
// import './nav.scss';
import styled from 'styled-components'

export default function Nav() {
    return (
        <NavStyled>
            <NavList>
                <NavEl className="header-nav-el">
                    <CustomLink to="/">Главная</CustomLink>
                </NavEl>
                <NavEl className="header-nav-el">
                    <CustomLink to="/">Статистика</CustomLink>
                </NavEl>
                <NavEl className="header-nav-el">
                    <CustomLink to="/">Карты</CustomLink>
                </NavEl>
                {/* <NavEl className="header-nav-el">
                    <Link to="/">Финансовый календарь</Link>
                </NavEl> */}
            </NavList>
        </NavStyled>
    )
}

const NavStyled = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
    margin: 0 30px;
`

const NavList = styled.ul`
    justify-self: center;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`

const NavEl = styled.li`
    border: #000 1px solid;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    &:hover {
        background-color: rgb(94, 94, 94);
    }
    &:active {
        background-color: rgb(124, 124, 124);
    }
`

const CustomLink = styled(Link)`
    text-decoration: none;
    color: #fff;
`
