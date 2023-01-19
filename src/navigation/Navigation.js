import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// Navigation middlewares
import { PrivateNavigation } from "./PrivateNavigation";
import { PublicNavigation } from "./PublicNavigation";

import Manual from '../pages/private/manual/Manual';
import Summary from '../pages/private/summary/Summary';
import HomeLayout from '../pages/private/homeLayout/HomeLayout';
import Signup from '../pages/public/signup/Signup';
import Signin from '../pages/public/signin/Signin';
import History from '../pages/private/history/History';
import Categories from '../pages/private/categories/Categories';
import Charts from '../pages/private/charts/Charts';
import ChangeCurrency from '../pages/private/change currency/ChangeCurency';
import { useAuth } from  "../hooks/useAuth"

export const Navigation = () => {
    const { getUser } = useAuth();
    console.log(getUser())
  return (
    <Routes>
      {/** Private routes for logged users */}
        {getUser() &&
        <Route path="/home" element={<HomeLayout/>}>
            <Route index element={<Summary/>}/> 
            <Route path='summary' element={<Summary/>}/> 
            <Route path='history' element={<History />}/>
            <Route path='categories' element={<Categories />}/>
            <Route path='charts' element={<Charts />}/>
            <Route path='changeCurrency' element={<ChangeCurrency />}/>          
            <Route path='manual' element={<Manual/>}/>
        </Route>  
        }
        

      {/** Authorization routing group */}
         <Route path="/" element={<Navigate to="/signin"/>}/>
         <Route path="/signin" element={<Signin />}/>
         <Route path="/signup" element={<Signup />}/>

    </Routes>
  );
};