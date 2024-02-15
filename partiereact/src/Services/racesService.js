import axios from "axios";

function fetchRaces() {
  return axios.get("http://127.0.0.1:3000/races");
}
function fetchRacesById(id) {
  return axios.get("http://127.0.0.1:3000/races/" + id);
}
function fetchRacesImage(racesId) {
  return axios.get(`http://127.0.0.1:3000/races/image/${racesId}`);
}

export default {
  fetchRaces,
  fetchRacesById,
  fetchRacesImage,
};