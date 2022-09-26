import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './login';
import Dashboard from './Dashboards';
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes,Route,Navigate } from 'react-router-dom';
import userRoutes from './routes/userRoutes';
function App() {

  const code = new URLSearchParams(window.location.search).get('code');
  localStorage.setItem("code",JSON.stringify(code));
  console.log("codee",code)


  useEffect(()=>{
    document.body.style.backgroundColor = "#3C3F42"
  },[])

  // const PrivateRoute = ({ component: Component, type, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       // sessionManager.validateUser() ? (
  //       //   <Component {...props} />
  //       // ) : 
  //       (
  //         <Navigate to="/login" />
  //       )
  //     }
  //   />
  // );

  // const PublicRoute = ({ component: Component, type, ...rest }) => {
  //   // return()    
  //   console.log(component,)
  //   // <Route path='' element={}/>
  // };
  const userData = typeof localStorage !== 'undefined' && localStorage.getItem('session');
  console.log("tokennn",userData)
  return (
    <div >
      {code&&userData? <Dashboard code={code} /> : <Login/>}
    </div>
    // <>
    // <Routes>
    //    {userRoutes.map((route, i) => {
    //           // if (route.isProtected === true)
    //           //   return (
    //           //     <PrivateRoute key={i} {...route} path={`${route.path}`} />
    //           //   );
    //           return <PublicRoute key={i} {...route} path={`${route.path}`} />;
    //         })}
    // </Routes>
    // </>
  );
}

export default App;
