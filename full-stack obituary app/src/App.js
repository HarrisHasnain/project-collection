import './index.css';
import {Routes, Route } from 'react-router-dom';
import Obituary from './Obituary';
import NewObituary from './NewObituary';
import NotFound from './NotFound';

function App() {


  return (
    <>
      <Routes>
        <Route path = "/" element = {<Obituary />}/>
        <Route path = "create" element = {<NewObituary/>}/>
        <Route path = "*" element = {<NotFound />}/>
      </Routes>
    </>
  )

}

export default App;
