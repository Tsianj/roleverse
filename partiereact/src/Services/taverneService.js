import axios from "axios";

function fetchScenario() {
  return axios.get("http://127.0.0.1:3000/scenario");
}
function fetchScenarioById(id) {
  return axios.get("http://127.0.0.1:3000/scenario/" + id);
}
function fetchScenarioImage(scenarioId) {
  return axios.get(`http://127.0.0.1:3000/scenario/image/${scenarioId}`);
}

export default {
  fetchScenario,
  fetchScenarioById,
  fetchScenarioImage,
};