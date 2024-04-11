import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const { REACT_APP_URL_SERVER } = process.env;
const url = REACT_APP_URL_SERVER;

// LeagueName, Phone, Open_Or_Not, Location, ImageAvatar, FilePDF
const createLeague = (formData) => {
    return axios
        .post(url + "/api/League/createInformation", formData)
        .then((response) => {
            return response.data;
        });
}



const createConfigTournament = (TournamentId, competitionFormatName, NumberOfTeams, NumberOfPlayersPerTeamRange, NumberOfMatches, NumberOfRounds,
    NumberOfTables, NumberOfTeamsToNextRound, RegistrationAllowed, WinPoints, DrawPoints, LossPoints) => {
    return axios
        .post(url + "/api/League", {
            TournamentId,
            competitionFormatName,
            NumberOfTeams,
            NumberOfPlayersPerTeamRange,
            NumberOfMatches,
            NumberOfRounds,
            NumberOfTables,
            NumberOfTeamsToNextRound,
            RegistrationAllowed,
            WinPoints,
            DrawPoints,
            LossPoints
        })
        .then((response) => {
            return response.data;
        });
}

const getLeaguesByOrganizerId = (organizerId) => {
    return axios
        .get(url + "/api/League/getLeagues/" + organizerId,)
        .then((response) => {
            return response.data;
        });
}

const getPublicLeagues = () => {
    return axios
        .get(url + "/api/League/publicLeagues",)
        .then((response) => {
            return response.data;
        });
}

const getLeaguesContainText = (searchText) => {
    return axios
        .get(url + "/api/League/search?searchText=" + searchText,)
        .then((response) => {
            return response.data;
        });
}
const getLeaguesByType = (tournamentTypeId) => {
    return axios
        .get(url + "/api/League/getTournamentsByType/" + tournamentTypeId,)
        .then((response) => {
            return response.data;
        });
}


//League statitics
const getLeaguesStatisticByTournamentId = (tournamentId) => {
    return axios
        .get(url + "/api/LeagueStatistics/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}
const getMatchWithMostCardsByTournamentId = (tournamentId) => {
    return axios
        .get(url + "/api/LeagueStatistics/MatchWithMostCards/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getMatchWithMostGoalsByTournamentId = (tournamentId) => {
    return axios
        .get(url + "/api/LeagueStatistics/GetMatchWithMostGoals/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getTeamWithMostGoalsByTournamentId = (tournamentId) => {
    return axios
        .get(url + "/api/LeagueStatistics/GetTeamWithMostGoals/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}
const getTeamWithMostCardByTournamentId = (tournamentId) => {
    return axios
        .get(url + "/api/LeagueStatistics/GetTeamWithMostCard/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getPlayerWithMostGoalsByTournamentId = (tournamentId) => {
    return axios
        .get(url + "/api/LeagueStatistics/GetPlayerWithMostGoals/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getPlayerWithMostCardByTournamentId = (tournamentId) => {
    return axios
        .get(url + "/api/LeagueStatistics/GetPlayerWithMostCards/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getLeagueDetailByIdLeague = (tournamentId) => {
    return axios
        .get(url + "/api/League/getTournamentDetails/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const addNewSponsor = (tournamentId, formData) => {
    return axios
        .post(url + "/api/Sponsor?tournamentId=" + tournamentId, formData)
        .then((response) => {
            return response.data;
        });
}

const getSponsorByLeagueId = (tournamentId) => {
    return axios
        .get(url + "/api/Sponsor/GetAllSponsors/" + tournamentId,)
        .then((response) => {
            return response.data;
        });
}

const getSponsorByLeagueIdAndId = (id, tournamentId) => {
    return axios
        .get(url + `/api/Sponsor/${id}/${tournamentId}`,)
        .then((response) => {
            return response.data;
        });
}
const updateSponsorByLeagueIdAndId = (id, tournamentId, formData) => {
    return axios
        .put(url + `/api/Sponsor/${id}/${tournamentId}`, formData)
        .then((response) => {
            return response.data;
        });
}

const deleteSponsorByLeagueIdAndId = (id, tournamentId,) => {
    return axios
        .delete(url + `/api/Sponsor/${id}/${tournamentId}`)
        .then((response) => {
            return response.data;
        });
}

const downdloadDocument = (tournamentId) => {
    return axios
        .get(url + `/api/League/downloadLatestDocument?tournamentId=${tournamentId}`,)
        .then((response) => {
            // Tạo một URL cho blob
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');

            let filename = "Luat-thi-dau.pdf"; // Một giá trị mặc định

            // Kiểm tra xem tiêu đề 'content-disposition' có tồn tại và có định dạng mong muốn hay không
            if (response.headers['content-disposition']) {
                const disposition = response.headers['content-disposition'];
                const matches = disposition.match(/filename="?([^"]+)"?/); // Sử dụng RegExp để tìm tên file
                if (matches.length > 1) {
                    filename = matches[1].replace(/"/g, ''); // Gán tên file nếu tìm thấy
                }
            }

            fileLink.href = fileURL;
            fileLink.setAttribute('download', filename); // Thiết lập tên file được tải xuống
            document.body.appendChild(fileLink);

            fileLink.click(); // Mô phỏng một cú click để kích hoạt tải xuống

            document.body.removeChild(fileLink); // Dọn dẹp
        })
        .catch(error => {
            console.error('Lỗi tải xuống:', error);
            // Xử lý lỗi, ví dụ: hiển thị thông báo
        });

}; 


const getGroupStages = (tournamentId, phaseId) => {
    return axios
        .get(url + `/api/Matches/GroupStages?tournamentId=${tournamentId}&phaseId=${phaseId}`,)
        .then((response) => {
            return response.data;
        });
}

const fetchMatchesForGroup = (tournamentId, phaseId, groupStageId) => {
    return axios
        .get(url + `/api/Matches?tournamentId=${tournamentId}&phaseId=${phaseId}&groupStageId=${groupStageId}`,)
        .then((response) => {
            return response.data;
        });
}

const getKnockoutStages = (tournamentId, phaseId) => {
    return axios
        .get(url + `/api/Matches/KnockoutStages?tournamentId=${tournamentId}&phaseId=${phaseId}`,)
        .then((response) => {
            return response.data;
        });
}

const getRoundRobinStages = (tournamentId) => {
    return axios
        .get(url + `/api/Matches/RoundRobins?tournamentId=${tournamentId}`,)
        .then((response) => {
            return response.data;
        });
}

const fetchMatchesForRoundRobinStages = (tournamentId, roundRobinId) => {
    return axios
            .get(url + `/api/Matches?tournamentId=${tournamentId}&roundRobinId=${roundRobinId}`,)
            .then((response) => {
                return response.data;
            });
}

const getKnockoutStagesTypes = (tournamentId) => {
    return axios
            .get(url + `/api/Matches/KnockoutStagesTypes?tournamentId=${tournamentId}`,)
            .then((response) => {
                return response.data;
            });
}

const fetchMatchesForKnockoutStagesTypes = (tournamentId, knockoutStageId) => {
    return axios
            .get(url + `/api/Matches?tournamentId=${tournamentId}&knockoutStageId=${knockoutStageId}`,)
            .then((response) => {
                return response.data;
            });
}

const fetchMatchesForKnockoutStages = (tournamentId, phaseId, knockoutStageId) => {
    return axios
        .get(url + `/api/Matches?tournamentId=${tournamentId}&phaseId=${phaseId}&knockoutStageId=${knockoutStageId}`,)
        .then((response) => {
            return response.data;
        });
}

const updateLeagueByTournamentId = (formData) => {
    return axios
        .put(url + `/api/League`, formData)
        .then((response) => {
            return response.data;
        });
}

//Nhập báo cáo

const getMatchesReport = (id) => {
    return axios
        .get(url + `/api/MatchReports/match${id}`)
        .then((response) => {
            const matchData = response.data;
            const hasData = checkDataExist(matchData); // Kiểm tra xem liệu có dữ liệu trận đấu hay không
            return { matchData, hasData }; // Trả về cả dữ liệu trận đấu và trạng thái có dữ liệu hay không
        });

}


const checkDataExist = (matchData) => {
    if (!matchData) {
        return false; // Nếu không có dữ liệu trận đấu, trả về false
    }

    // Kiểm tra dữ liệu trong các trường
    const {
        firstHalfExtraTime,
        secondHalfExtraTime,
        goalsTeam1,
        goalsTeam2,
        subGoalsTeam1,
        subGoalsTeam2,
        yellowCardsTeam1,
        redCardsTeam1,
        yellowCardsTeam2,
        redCardsTeam2,
        mainReferee,
        reportCreatorName,
        matchEvents,
    } = matchData;

    // Kiểm tra xem có ít nhất một trong các trường có dữ liệu hay không
    const hasData =
        firstHalfExtraTime !== null ||
        secondHalfExtraTime !== null ||
        goalsTeam1 !== null ||
        goalsTeam2 !== null ||
        subGoalsTeam1 !== null ||
        subGoalsTeam2 !== null ||
        yellowCardsTeam1 !== null ||
        redCardsTeam1 !== null ||
        yellowCardsTeam2 !== null ||
        redCardsTeam2 !== null ||
        mainReferee !== null ||
        reportCreatorName !== null ||
        (matchEvents || matchEvents.length > 0); // Kiểm tra cả mảng matchEvents không rỗng

    return hasData;
}

const getMatchesbyTournamentId = (tournamentId) => {
    return axios
        .get(url + `/api/Matches?tournamentId=${tournamentId}`,)
        .then((response) => {
            return response.data;
        });
}

// const updateMatchesReportsbyId = (id, data) => { // Đảm bảo bạn truyền 'data' là dữ liệu bạn muốn cập nhật
//     return axios.post(url + `/api/MatchReports/match${id}`, data) // Sử dụng 'data', không phải 'FormData', trừ khi bạn có một đối tượng FormData cụ thể
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             // Xử lý lỗi ở đây
//             console.error("There was an error updating the match report:", error);
//             throw error; // Hoặc bạn có thể throw lỗi để xử lý ngoài hàm này
//         });
// }
const updateStatisticReport = (formData) => { // Đảm bảo bạn truyền 'data' là dữ liệu bạn muốn cập nhật
    return axios.post(url + `/api/MatchReports/createPartOne`,
        formData
    )
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response === "No documents found for the specified tournament." && error.response.status === 404) {
                toast.error("Chưa tải luật thi đấu");
            }
            console.error("There was an error statistic updating the match report:", error);
            throw error; // Hoặc bạn có thể throw lỗi để xử lý ngoài hàm này
        });
}
const updateEventReport = (events) => {
    return axios.post(url + `/api/MatchReports/createPartTwo`, events)

        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.error("There was an error event updating the match report:", error);
            throw error; // Allows for further error handling outside this function
        });
}

const getPlayerByTeamId = (teamId) => {
    return axios
        .get(url + `/api/TeamMember/GetPlayersByTeamIdAsync?teamId=${teamId}`,)
        .then((response) => {
            return response.data;
        });
}

const getTeamStandings = (tournamentId) => {
    return axios
        .get(url + '/api/TeamRanking/' + tournamentId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching team standings:', error);
            throw error; // Or handle the error as needed
        });
}




export {
    createLeague, createConfigTournament, getLeaguesByOrganizerId, getPublicLeagues, getLeaguesContainText, getLeaguesByType,
    getLeaguesStatisticByTournamentId,
    getMatchWithMostCardsByTournamentId,
    getMatchWithMostGoalsByTournamentId,
    getTeamWithMostGoalsByTournamentId,
    getTeamWithMostCardByTournamentId,
    getPlayerWithMostGoalsByTournamentId,
    getPlayerWithMostCardByTournamentId,
    getLeagueDetailByIdLeague
    , addNewSponsor,
    getSponsorByLeagueId,
    getSponsorByLeagueIdAndId,
    updateSponsorByLeagueIdAndId,
    deleteSponsorByLeagueIdAndId,
    downdloadDocument, getGroupStages, fetchMatchesForGroup, getKnockoutStages, fetchMatchesForKnockoutStages,
    getMatchesReport,
    getMatchesbyTournamentId, updateStatisticReport, updateEventReport, getRoundRobinStages, fetchMatchesForRoundRobinStages,
    getKnockoutStagesTypes, fetchMatchesForKnockoutStagesTypes,updateLeagueByTournamentId, getTeamStandings
};

// , updateMatchesReportsbyId