import React from 'react';
import { Route, Routes } from 'react-router';
import Main from "./Main";
import Template from "./Template";
import Test from "./Test";
import Test2 from "./Test2";



const MyRouter = () => {

    return <Routes>
                <Route element={<Template />}>
                    <Route path ='/' element={<Test/>}></Route>
                    <Route path ='/login' element={<Test2/>}></Route>
                    <Route path ='/main' element={<Main/>}></Route>
                </Route>
           </Routes>
};

export default MyRouter;