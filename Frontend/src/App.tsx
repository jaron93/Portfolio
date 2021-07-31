import React from 'react';
import './styles/global.scss'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Home from './pages/Home';

import {
   BrowserRouter as Router,
   Switch,
   Route,
} from "react-router-dom"
import { ToastProvider } from 'react-toast-notifications';

export default function App() {

   const sidebarOpen = useSelector(state => state.preferences.sidebarOpen);
   return (
      <ToastProvider>
         <Router>
            <>
               <Header />
               <Sidebar />
               <div className={classNames('main-content', sidebarOpen && 'isActive')}>
                  <Switch>
                     <Route exact component={Home} path="/" />
                     <Route exact component={Signin} path="/signin" />
                     <Route exact component={Signup} path="/signup" />
                     {/*                   <PrivateRoute exact component={Dashboard} path="/" /> */}
                  </Switch>
               </div>
            </>
         </Router >
      </ToastProvider>
   );
}
