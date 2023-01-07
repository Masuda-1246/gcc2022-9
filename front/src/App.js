import { Home, SignIn, SignUp } from './pages/index';
import { Room } from './components/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route exact path='/home' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/room' element={<Room />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
