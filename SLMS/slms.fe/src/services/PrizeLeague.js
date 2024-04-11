import axios from "axios";
import { useEffect } from "react";

const { REACT_APP_URL_SERVER } = process.env;
const url = REACT_APP_URL_SERVER;


const getPlayerMostGoals = (tournamentId) => {
    return axios
        .get(url + "/api/Prizes/GetPlayerMostGoals/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getPlayerMostAssists = (tournamentId) => {
    return axios
        .get(url + "/api/Prizes/GetPlayerMostAssists/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getPlayerMostSaves = (tournamentId) => {
    return axios
        .get(url + "/api/Prizes/GetPlayerMostSaves/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}
const getTeamFewestTotalCards = (tournamentId) => {
    return axios
        .get(url + "/api/Prizes/GetTeamFewestTotalCards/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}





export {
    getPlayerMostGoals,
    getPlayerMostAssists,
    getPlayerMostSaves,
    getTeamFewestTotalCards
};