// React, Redux...
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   BrowserRouter as Router,
   Switch,
   Route
} from "react-router-dom"
import './styles/global.scss'

// Components
import Header from './components/Header/Header'
import Home from './pages/Home';
import Help from './pages/Help/Help';
import Messenger from './pages/Messenger/Messenger';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Sidebar from './components/Sidebar/Sidebar'
import Settings from './pages/Settings/Settings';

// Classname
import classNames from 'classnames';

// Hooks
import { SocketProvider } from './hooks/useSocket';
import { PrivateRoute } from './routes/PrivateRoute';

// Toaster
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