import React from 'react'
// routes
import { BrowserRouter as Router } from 'react-router-dom'
// components
import useRoutes from '@routes/Routes.js'
import Header from '@header/Header.js'
// hooks
import { useAuth } from '@hooks/auth.hook.js'
// context
import { AuthContext } from '@context/AuthContext.js'
// styles
import 'materialize-css'

export default function App() {
    // берем из хука аутентификации
    const { login, logout, token, userId, userName } = useAuth()

    // флаг, который показывает, есть ли токен(вошел ли пользователь)
    const isAuthenticated = !!token

    const routes = useRoutes(isAuthenticated)

    return (
        // AuthContext - является контекстом, но он должен быть обязательно провайдером
        <AuthContext.Provider
            // передаем в наш контекст матоды и переменные из хука аутентификации
            value={{ token, userId, userName, login, logout, isAuthenticated }}>
            <Router>
                <Header />
                {routes}
                {/* <Footer /> */}
            </Router>
        </AuthContext.Provider>
    )
}
