import React from 'react';
import './styles/global.scss'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { SocketProvider } from './hooks/useSocket';
import { PrivateRoute } from './routes/PrivateRoute';

import Help from './pages/Help/Help';
import Home from './pages/Home';
import Messenger from './pages/Messenger/Messenger';
import MyAccount from './pages/MyAccount/MyAccount';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';

import {
   BrowserRouter as Router,
   Switch,
   Route,
} from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

   const sidebarOpen = useSelector(state => state.preferences.sidebarOpen);

   return (
      <>
         <SocketProvider>
            <Router>

               <Header />
               <Sidebar />

               <div className={classNames('main-content', sidebarOpen && 'isActive')}>
                  <Switch>
                     <Route exact component={Home} path="/" />
                     <Route exact component={Signin} path="/signin" />
                     <Route exact component={Signup} path="/signup" />
                     <Route exact component={Help} path="/help" />
                     <PrivateRoute exact component={Messenger} path="/messenger" />
                     <PrivateRoute exact component={MyAccount} path="/myaccount" />
                  </Switch>
               </div>

            </Router >

            <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
         </SocketProvider>
      </>
   );
}
