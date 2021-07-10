import React from 'react';
import './styles/global.scss'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import { useTypedSelector } from './store/store';
import classNames from 'classnames';

import {
   BrowserRouter as Router,
} from "react-router-dom"

export default function App() {

   const sidebarOpen = useTypedSelector(state => state.preferences.sidebarOpen);

   return (
      <Router>
         <>
            <Header />
            <Sidebar />
            <div className={classNames('main-content', sidebarOpen && 'isActive')}>
               <div className="text"><p>Home Conten</p></div>
               <div className="text"><p>Home Conten</p></div>
               <div className="text"><p>Home Conten</p></div>
               <div className="text"><p>Home Conten</p></div>
            </div>
         </>
      </Router >
   );
}
