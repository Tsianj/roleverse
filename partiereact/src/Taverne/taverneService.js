import axios from "axios";

function fetchEscapes() {
    return axios.get("http://127.0.0.1:3000/taverne");
  }



export default { 
    fetchEscapes,
};
