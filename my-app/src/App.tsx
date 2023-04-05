import React from 'react';
import {BrowserRouter, Routes  , Route} from 'react-router-dom';

import { Home,Quizz,CreatedRoute,CityContainer,FormConatiner } from './Container';
import { Navbar } from './Elements';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/quizz" element={<Quizz/>}/>
        <Route path="/city">
          <Route index element={<Home/>}/>
          <Route path=":id" element={<CityContainer/>}/>
        </Route>
        <Route path="/createdRoute" element={<CreatedRoute/>}/>
        <Route path="/form" element={<FormConatiner/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
