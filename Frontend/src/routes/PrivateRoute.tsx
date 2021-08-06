import React from 'react'
import { isLoggedIn } from 'axios-jwt'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
   component: any
}

export const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
   const isAuthenticated = isLoggedIn();

   return (
      <Route
         render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />)}
         {...rest}
      />
   )
}
