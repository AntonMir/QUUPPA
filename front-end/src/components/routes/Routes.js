import React from 'react'
// routes
import { Switch, Route, Redirect } from 'react-router-dom'
// components
import AuthPage from '@authPage/AuthPage.js'
import WelcomePage from '@components/welcomePage/Welcome.js'
import Content from '@content/Content.js'

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        // это для человека, который зашел в систему
        return (
            <Switch>
                <Route exact path="/" component={Content} />
                {/* <Route exact path="/links" component={LinksPage}/>
                <Route exact path="/create" component={CreatePage}/>
                <Route path="/detail/:id" component={DetailPage}/> */}
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/auth" component={AuthPage} />
            <Redirect to="/" />
        </Switch>
    )
}

export default useRoutes
