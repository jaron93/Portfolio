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
import Settings from './pages/Settings/Settings';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';

import {
   BrowserRouter as Router,
   Switch,
   Route
} from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

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
                     <PrivateRoute exact component={Settings} path="/settings" />
                  </Switch>
               </div>

            </Router >

            <ToastContainer
               position="bottom-right"
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
export default App