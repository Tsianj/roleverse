import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./HomePage/HomePage";
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Question from './Question/Question';
import Contact from './Contact/Contact';
import Connexion from './Connexion/Connexion';
import AuthContext from './Components/AuthContext';
import Auth from './Services/Auth';
import ScrollToTop from './Components/ScrollToTop';
import Taverne from './Taverne/Taverne';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scenario from './Scenario/Scenario';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.isAuthenticated());
  const [user, setUser] = useState(JSON.parse(Auth.getUser()));

  return (  <AuthContext.Provider
        value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={"/question"} element={<Question />} />
          <Route path={'/contact'} element={<Contact />} />
          <Route path={'/connexion'} element={<Connexion />} />
          <Route path={'/taverne'} element={<Taverne />} />
          <Route path={'/scenarios/:id'} element={<Scenario />} />
        </Routes>
        <Footer />
      <ToastContainer />
        
      </BrowserRouter>
      </AuthContext.Provider>
  );
}


export default App;
