import axios from 'axios';

function fetchUtilisateur() {
    return axios.get('/http://127.0.0.1:3000/utilisateur');
}

function addUtilisateur(utilisateur){
    return axios.post("http://127.0.0.1:3000/utilisateur", utilisateur, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function loginUtilisateur(utilisateur) {
    return axios.post("http://127.0.0.1:3000/connexion", utilisateur);
    
}

export default {
    fetchUtilisateur, 
    addUtilisateur,
    loginUtilisateur
 };