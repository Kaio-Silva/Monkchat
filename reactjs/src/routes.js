
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MonkChat from './pages/monkchat'
import Login from './pages/login'


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/chat" component={MonkChat} />
            </Switch>
        </BrowserRouter>
    )
}
