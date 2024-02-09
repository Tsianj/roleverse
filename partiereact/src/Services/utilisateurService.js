import axios from 'axios';

function fetchUtilisateur(email) {
    return axios.get('http://127.0.0.1:3000/utilisateur/' + email);
}

function addUtilisateur(utilisateur){
    return axios.post("http://127.0.0.1:3000/utilisateur", utilisateur, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function updateUtilisateur(utilisateur) {
    return axios.patch(`http://127.0.0.1:3000/utilisateur`, utilisateur, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}
function deleteUtilisateur(email) {
    return axios.delete(`http://127.0.0.1:3000/utilisateur/${email}`)
}

function loginUtilisateur(utilisateur) {
    return axios.post("http://127.0.0.1:3000/connexion", utilisateur);
    
}

export default {
    fetchUtilisateur, 
    addUtilisateur,
    loginUtilisateur,
    updateUtilisateur,
    deleteUtilisateur
 };