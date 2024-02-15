import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./Page/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Question from "./Page/Question";
import Contact from "./Page/Contact";
import Connexion from "./Page/Connexion";
import AuthContext from "./Components/AuthContext";
import Auth from "./Services/Auth";
import ScrollToTop from "./Components/ScrollToTop";
import Taverne from "./Page/Taverne";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scenario from "./Page/Scenario";
import Profil from "./Page/Profil";
import MentionsLegale from "./Page/MentionsLegale";
import Regles from "./Page/Regles";

const Auth0 = new Auth();
Auth0.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Auth0.isAuthenticated()
  );
  const [user, setUser] = useState(Auth0.getUser());

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/question"} element={<Question />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route path={"/connexion"} element={<Connexion />} />
          <Route path={"/taverne"} element={<Taverne />} />
          <Route path={"/scenarios/:id"} element={<Scenario />} />
          <Route path={"/profil/:email"} element={<Profil />} />
          <Route path={"/regle"} element={<Regles />} />
          <Route path={"/mentionlegale"} element={<MentionsLegale />}/>
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
