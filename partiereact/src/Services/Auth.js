import axios from "axios";
import { jwtDecode } from "jwt-decode";

export class Auth {
  constructor() {}

  authenticate(utilisateur) {
    return axios
      .post("http://127.0.0.1:3000/connexion", utilisateur)
      .then((response) => response.data)
      .then((data) => {
        // Je stocke le token dans le localStorage
        window.localStorage.setItem("authToken", data.access_token);
        // On informe axios qu'on a maintenant un header sur toutes nos futures requêtes http
        this.setAxiosToken(data.access_token);
        return data;
      });
  }

  logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
  }

  setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  }

  setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
      const { exp: expiration } = jwtDecode(token);
      if (expiration * 1000 > new Date().getTime()) {
        this.setAxiosToken(token);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
      const { exp: expiration } = jwtDecode(token);
      return expiration * 1000 > new Date().getTime();
    }
    return false;
  }

  getUser() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
      const { user } = jwtDecode(token);
      return user;
    }
    return null;
  }
}

export default Auth;
