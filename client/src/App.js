import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import { useState } from 'react';
import Header from './components/Header';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';
import Login from './components/Login';
function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("AdminInfo"))
  return (
    <div >
      {isLogin ? <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} ></Route>
          <Route path="/create/employee" element={<CreateEmployee />}></Route>
          <Route path="/employee/edit/:id" element={<EditEmployee />}></Route>
        </Routes>
      </BrowserRouter> : <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsLogin={setIsLogin} />}></Route>
        </Routes>
      </BrowserRouter>}

    </div>
  );
}

export default App;
