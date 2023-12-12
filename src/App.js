
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import HomePage from "./pages/homepage"
import * as React from "react";
import NoPage from "./pages/Page404"
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import YourList from "./pages/YourList";


export default function App() {
  return (
    
    <div>
      <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage/>}></Route>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="*" element={<NoPage/>} />
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='/mybooks' element={<YourList/>}/>

     </Routes>
    </div>


   

   
    
    
  );
}
