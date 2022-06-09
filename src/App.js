import React from 'react';
import './App.css';
import FormData from './pages/FormData';
import ListData from './pages/ListData';
import PreviewData from './pages/PreviewData';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<ListData/>}/>
            <Route path='/add' element={<FormData/>}/>
            <Route path='/preview-data' element={<PreviewData/>}/>
         </Routes>    
      </BrowserRouter>
   );
}

export default App;
