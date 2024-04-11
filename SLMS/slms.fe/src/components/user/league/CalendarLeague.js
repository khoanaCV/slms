import React, { useState, useEffect, useRef } from 'react';
import styles from "../../../Assets/css/user/league/calenderleague.css";
import { Container, Row, Col, Tab, Tabs, Button, Card, ListGroup, Table, Form, Modal } from 'react-bootstrap';
import { BsDownload, BsEyeFill, BsPencil, } from 'react-icons/bs'; // Assuming you're using react-icons
import { GiSoccerBall } from "react-icons/gi";
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import HeaderBodyLeague from '../../common/HeaderBodyLeague';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import {
    fetchMatchesForGroup, fetchMatchesForRoundRobinStages, getGroupStages,
    getKnockoutStages, getMatchesReport, getMatchesbyTournamentId, getRoundRobinStages,
    updateEventReport, updateMatchesReportsbyId, updateStatisticReport, getKnockoutStagesTypes, fetchMatchesForKnockoutStagesTypes,
    getLeagueDetailByIdLeague
} from '../../../services/LeagueSevice';
import axios from "axios";
import { getPlayerByTeamId } from '../../../services/TeamSevice';

const downloadImage = (canvas, filename) => {
    // Chắc chắn canvas đã được vẽ xong
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.95); // Sử dụng chất lượng 95% cho jpg
};


export default function CalendarLeague() {

    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [reportModalShow, setReportModalShow] = useState(false);
    const [reportDetails, setReportDetails] = useState({});

    const goalsTeam1 = selectedMatch?.matchStatistics?.goalsTeam1 ?? "N/A";
    const [reportModalEdit, setreportModalEdit] = useState(false)

    const handleReportShowClick = (matchId, match) => {
        getMatchesReport(matchId)
            .then(({ matchData, hasData }) => {
                if (!hasData) {
                    // Hiển thị toast thông báo
                    toast.error("Chưa có dữ liệu trận đấu");
                } else {
                    // Hiển thị modal
                    setReportModalShow(true);
                    setSelectedMatch(matchData);
                    setReportDetails(matchData)
                }
            });
    }

    const handleDownloadReportClick = (matchId, match) => {
        getMatchesReport(matchId)
            .then(({ matchData, hasData }) => {
                if (!hasData) {
                    // Hiển thị toast thông báo
                    toast.error("Chưa có dữ liệu trận đấu");
                } else {
                    const reportModal = document.getElementById('reportModal');

                    if (reportModal) {
                        downloadImage(reportModal, `report-${matchId}.jpg`);
                    } else {
                        toast.error('Không thể tải về hình ảnh.');
                    }
                }
            });
    }
    const handleReportEditlick = (matchId, match) => {
        getMatchesReport(matchId)
            .then(({ matchData, hasData }) => {
                if (hasData) {
                    // Hiển thị toast thông báo
                    toast.error("Bạn chỉ được xem biên bản vì trận đấu đã được xác nhận");
                } else {
                    if (match) {
                        // Hiển thị modal Edit
                        setreportModalEdit(true);
                        setSelectedMatch(match);
                        setReportDetails(matchData)
                    }
                }
            });
    }

    const handleCloseShow = () => {
        setReportModalShow(false);
    };

    const handleCloseEdit = () => {
        setreportModalEdit(false);
    };

    const handleMatchStatisticEditChange = (field, value) => {
        // Kiểm tra nếu giá trị là rỗng hoặc không hợp lệ, gán giá trị mặc định là 0
        const parsedValue = value === '' || isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);

        setReportDetails((prevDetails) => ({
            ...prevDetails,
            matchStatistics: {
                ...prevDetails.matchStatistics,
                [field]: parsedValue,
            }
        }));
    };

    const handleReportDetailsEditChange = (field, value) => {
        setReportDetails(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };
    const mergeEvents = () => {
        const allGoals = [...editableGoals.team1, ...editableGoals.team2].map(goal => ({
            ...goal,
            eventType: 'Goal', // Đảm bảo eventType là 'Goal'
            description: '', // Các sự kiện bàn thắng không cần mô tả
        }));

        const allYellowCards = rowsYellowCard.map(card => ({
            ...card,
            eventType: 'YellowCard', // Đảm bảo eventType là 'YellowCard'
        }));

        const allRedCards = rowsRedCard.map(card => ({
            ...card,
            eventType: 'RedCard', // Đảm bảo eventType là 'RedCard'
        }));

        // Logic để tạo mảng mới giống như bạn đã làm
        const combinedEvents = [...allGoals, ...allYellowCards, ...allRedCards];
        return new Promise((resolve) => {
            setEvents(combinedEvents, resolve(combinedEvents));
        });

    };
    const [events, setEvents] = useState([]);

    const handleReportSubmit = async () => {
        try {
            // Xây dựng 'matchEvents' từ dữ liệu hiện có và thêm mới
            const formData = new FormData();
            formData.append('matchId', selectedMatch.id);
            formData.append('firstHalfExtraTime', reportDetails.matchStatistics.firstHalfExtraTime || 0);
            formData.append('secondHalfExtraTime', reportDetails.matchStatistics.secondHalfExtraTime || 0);
            formData.append('team1Id', reportDetails.team1Id);
            formData.append('team2Id', reportDetails.team2Id);
            formData.append('goalsTeam1', reportDetails.matchStatistics.goalsTeam1 || 0);
            formData.append('goalsTeam2', reportDetails.matchStatistics.goalsTeam2 || 0);
            formData.append('yellowCardsTeam1', reportDetails.matchStatistics.yellowCardsTeam1 || 0)
            formData.append('yellowCardsTeam2', reportDetails.matchStatistics.yellowCardsTeam2 || 0)
            formData.append('redCardsTeam1', reportDetails.matchStatistics.redCardsTeam1 || 0)
            formData.append('redCardsTeam2', reportDetails.matchStatistics.redCardsTeam2 || 0)
            formData.append('subGoalsTeam1', reportDetails.matchStatistics.subGoalsTeam1 || 0);
            formData.append('subGoalsTeam2', reportDetails.matchStatistics.subGoalsTeam2 || 0);
            formData.append('mainReferee', reportDetails.mainReferee || '');
            formData.append('reportCreatorName', reportDetails.reportCreatorName || '');

            const formData1 = new FormData();
            const combinedEvents = await mergeEvents();
            console.log(combinedEvents);
            const dataToSend = {
                events: combinedEvents,
            };
            // Chờ updateStatisticReport hoàn thành
            const statisticResponse = await updateStatisticReport(formData);
            console.log('Statistic report updated:', statisticResponse);

            // Tiếp tục với updateEventReport
            const eventResponse = await updateEventReport(dataToSend);
            console.log("Report updated successfully:", eventResponse);

            // Cập nhật UI sau khi thành công
            toast.success('Lưu thông tin thành công.');
            setReportModalShow(false);
        } catch (error) {
            console.error('Error updating report:', error);
            toast.error('Lưu thông tin thất bại.');
            // Handle additional error logic here if needed
        }
    }

    const [selectedTab, setSelectedTab] = useState('defaultTabKey');

    const [editableGoals, setEditableGoals] = useState({
        team1: [],
        team2: [],
    });
    // Hàm để thêm một hàng mới cho đội 1
    const addNewGoalTeam1 = () => {
        setEditableGoals(prev => ({
            ...prev,
            team1: [...prev.team1, { matchId: selectedMatch.id, eventType: 'Goal', eventMinute: null, playerId: null, playerName: '', teamId: reportDetails.team1Id, description: '' }],
        }));

    };
    const [rowsYellowCard, setRowsYellowCard] = useState([]); // Khởi tạo với một dòng


    const [rowsRedCard, setRowsRedCard] = useState([]); // Khởi tạo với một dòng
    // Hàm tương tự để thêm một hàng mới cho đội 2
    const addNewGoalTeam2 = () => {
        setEditableGoals(prev => ({
            ...prev,
            team2: [...prev.team2, { matchId: selectedMatch.id, eventType: 'Goal', eventMinute: null, playerId: null, playerName: '', teamId: reportDetails.team2Id, description: '' }],
        }));
    };

    const addNewYellowCard = () => {
        setRowsYellowCard(prev => [
            ...prev,
            { matchId: selectedMatch.id, eventType: 'YellowCard', eventMinute: '', playerId: null, playerName: '', teamId: reportDetails.team1Id, description: '' }
        ]);
    };
    const addNewRedCard = () => {
        setRowsRedCard(prev => [
            ...prev,
            { matchId: selectedMatch.id, eventType: 'RedCard', eventMinute: '', teamId: reportDetails.team1Id, playerName: '', playerId: null, description: '' }
        ]);
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleShowConfirmModal = () => setShowConfirmModal(true);
    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const handleRedCardChange = (index, field, value) => {
        const updatedRedCards = [...rowsRedCard];
        let newCardData = { ...updatedRedCards[index] };

        // Đối với các trường cần chuyển đổi kiểu dữ liệu (ví dụ: 'teamId' sang số)
        if (field === 'teamId') {
            // Chuyển đổi 'teamId' sang số và cập nhật 'teamName' tương ứng
            const numericValue = parseInt(value, 10); // Chuyển đổi giá trị sang số

            newCardData = { ...newCardData, teamId: numericValue };
        } else if (field === 'eventMinute') {
            // Chuyển 'eventMinute' sang số nếu cần (đảm bảo rằng bạn cũng muốn lưu trữ nó như một số)
            const numericValue = parseInt(value, 10);
            newCardData[field] = isNaN(numericValue) ? '' : numericValue;
        } else if (field === 'playerId') {
            let player = playersTeam1.find(p => p.id === parseInt(value, 10));
            if (player) {
                const playerName = player ? player.name : '';
                newCardData = { ...newCardData, playerId: parseInt(value, 10), playerName: playerName };
            } else {
                player = playersTeam2.find(p => p.id === parseInt(value, 10));
                const playerName = player ? player.name : '';
                newCardData = { ...newCardData, playerId: parseInt(value, 10), playerName: playerName };
            }


        }
        else {
            // Đối với tất cả các trường khác, chúng ta có thể chỉ cần gán giá trị
            newCardData[field] = value;
        }

        // Cập nhật mảng và cập nhật state
        updatedRedCards[index] = newCardData;
        setRowsRedCard(updatedRedCards); // Đảm bảo cập nhật đúng state!
    };
    const handleYellowCardChange = (index, field, value) => {

        const updatedYellowCards = [...rowsYellowCard];
        let newCardData = { ...updatedYellowCards[index] };

        // Đối với các trường cần chuyển đổi kiểu dữ liệu (ví dụ: 'teamId' sang số)
        if (field === 'teamId') {
            // Chuyển đổi 'teamId' sang số và cập nhật 'teamName' tương ứng
            const numericValue = parseInt(value, 10); // Chuyển đổi giá trị sang số

            newCardData = { ...newCardData, teamId: numericValue };
        } else if (field === 'eventMinute') {
            // Chuyển 'eventMinute' sang số nếu cần (đảm bảo rằng bạn cũng muốn lưu trữ nó như một số)
            const numericValue = parseInt(value, 10);
            newCardData[field] = isNaN(numericValue) ? '' : numericValue;
        } else if (field === 'playerId') {
            let player = playersTeam1.find(p => p.id === parseInt(value, 10));
            if (player) {
                const playerName = player ? player.name : '';
                newCardData = { ...newCardData, playerId: parseInt(value, 10), playerName: playerName };
            } else {
                player = playersTeam2.find(p => p.id === parseInt(value, 10));
                const playerName = player ? player.name : '';
                newCardData = { ...newCardData, playerId: parseInt(value, 10), playerName: playerName };
            }


        }
        else {
            // Đối với tất cả các trường khác, chúng ta có thể chỉ cần gán giá trị
            newCardData[field] = value;
        }

        // Cập nhật mảng và cập nhật state
        updatedYellowCards[index] = newCardData;
        setRowsYellowCard(updatedYellowCards); // Đảm bảo cập nhật đúng state!


    };
    const handleGoalChangeTeam1 = (index, field, value) => {
        if (field === "eventMinute") {
            const numericValue = parseInt(value, 10);
            const updatedGoals = [...editableGoals.team1];
            updatedGoals[index] = { ...updatedGoals[index], [field]: numericValue };
            setEditableGoals(prev => ({ ...prev, team1: updatedGoals }));
        } else
            if (field === "playerId") {
                const player = playersTeam1.find(p => p.id === parseInt(value, 10));
                const playerName = player ? player.name : '';
                const updatedGoals = [...editableGoals.team1];
                updatedGoals[index] = { ...updatedGoals[index], [field]: parseInt(value, 10), playerName: playerName };
                setEditableGoals(prev => ({ ...prev, team1: updatedGoals }));
            } else {
                const updatedGoals = [...editableGoals.team1];
                updatedGoals[index] = { ...updatedGoals[index], [field]: value };
                setEditableGoals(prev => ({ ...prev, team1: updatedGoals }));
            }


    };
    // Handle changes for goals for team 2
    const handleGoalChangeTeam2 = (index, field, value) => {
        if (field === "eventMinute") {
            const numericValue = parseInt(value, 10);
            const updatedGoals = [...editableGoals.team2];
            updatedGoals[index] = { ...updatedGoals[index], [field]: numericValue };
            setEditableGoals(prev => ({ ...prev, team2: updatedGoals }));
        } else
            if (field === "playerId") {
                const player = playersTeam2.find(p => p.id === parseInt(value, 10));
                const playerName = player ? player.name : '';
                const updatedGoals = [...editableGoals.team2];
                updatedGoals[index] = { ...updatedGoals[index], [field]: parseInt(value, 10), playerName: playerName };
                setEditableGoals(prev => ({ ...prev, team2: updatedGoals }));
            } else {
                const updatedGoals = [...editableGoals.team2];
                updatedGoals[index] = { ...updatedGoals[index], [field]: value };
                setEditableGoals(prev => ({ ...prev, team2: updatedGoals }));
            }

    };
    const { idLeague } = useParams();
    const [roundRobinStages, setRoundRobinStages] = useState([]);

    const [knockoutStagesType, setKnockoutStagesType] = useState([])
    useEffect(() => {
        if (idLeague) {
            getMatchesbyTournamentId(idLeague).then(data => {
                setMatches(data);
            });
        }
    }, [idLeague]);

    // useEffect cho KnockoutStagesType
    useEffect(() => {
        async function fetchDataForKnockoutStagesType() {
            try {
                const knockoutStagesTypeData = await getKnockoutStagesTypes(idLeague);
                if (knockoutStagesTypeData && Array.isArray(knockoutStagesTypeData)) {
                    const knockoutStagesTypeWithMatches = await Promise.all(knockoutStagesTypeData.map(async (stage) => {
                        if (stage.id) {
                            const matches = await fetchMatchesForKnockoutStagesTypes(idLeague, stage.id);
                            return { ...stage, matches: Array.isArray(matches) ? matches : [] };
                        }
                        return stage;
                    }));
                    setKnockoutStagesType(knockoutStagesTypeWithMatches);
                } else {
                    setKnockoutStagesType([]);
                }
            } catch (error) {
                console.error('Failed to fetch data for knockout stages type:', error);
                setKnockoutStagesType([]);
            }
        }
    
        fetchDataForKnockoutStagesType();
    }, [idLeague]);

    // useEffect cho RoundRobin
    useEffect(() => {
        async function fetchDataForRoundRobin() {
            try {
                const roundRobinStagesData = await getRoundRobinStages(idLeague);
                if (roundRobinStagesData && Array.isArray(roundRobinStagesData)) {
                    const roundRobinStagesWithMatches = await Promise.all(roundRobinStagesData.map(async (stage) => {
                        if (stage.id) {
                            const matches = await fetchMatchesForRoundRobinStages(idLeague, stage.id);
                            return { ...stage, matches: Array.isArray(matches) ? matches : [] };
                        }
                        return stage;
                    }));
                    setRoundRobinStages(roundRobinStagesWithMatches);
                } else {
                    setRoundRobinStages([]);
                }
            } catch (error) {
                console.error('Failed to fetch data for round robin stages:', error);
                setRoundRobinStages([]);
            }
        }
    
        fetchDataForRoundRobin();
    }, [idLeague]);

    const [playersTeam1, setPlayersTeam1] = useState([]);
    const [playersTeam2, setPlayersTeam2] = useState([]);
    useEffect(() => {
        if (selectedMatch) {
            getPlayerByTeamId(selectedMatch.team1Id)
                .then(players => {
                    setPlayersTeam1(players);

                })
                .catch(error => {
                    console.error('Error fetching players:', error);
                });
            getPlayerByTeamId(selectedMatch.team2Id)
                .then(players => {
                    setPlayersTeam2(players);

                })
                .catch(error => {
                    console.error('Error fetching players:', error);
                });
        }
    }, [selectedMatch]);

    const [typeCurrentLeague, setTypeCurrentLeague] = useState('');
    const [LeagueDetail, setLeagueDetail] = useState({});

    useEffect(() => {
        getLeagueDetailByIdLeague(idLeague)
            .then(data => {
                setLeagueDetail(data);
                setTypeCurrentLeague(data.competitionFormatName)
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);
            });
    }, [idLeague]);

    useEffect(() => {
        // Cập nhật tab dựa trên typeCurrentLeague
        if (typeCurrentLeague === "Đấu vòng tròn") {
            setSelectedTab('roundRobin');
        } else if (typeCurrentLeague === "Loại trực tiếp") {
            setSelectedTab('Knockout');
        }
    }, [typeCurrentLeague]);

    const [isLeagueDetailLoaded, setIsLeagueDetailLoaded] = useState(false);

    console.log(typeCurrentLeague);

    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0" }}>

                <Row style={{ padding: "0" }}>
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague} />
                        <Row className="team-bg_inner">
                            <Col xs={12} className="schedule-img">
                            </Col>
                        </Row>
                        <Container style={{ padding: "0", marginBottom: "100px" }}>
                            <Row>
                                <Col style={{ padding: "20px" }}>
                                    <Row style={{ display: "flex", alignItems: "end" }}>
                                        <Col xs={3}>
                                        </Col>
                                        <Col xs={3}>
                                        </Col>
                                        <Col xs={3}>
                                        </Col>
                                        <Col xs={3} style={{ textAlign: "right" }}>
                                            <Button variant="danger" >
                           <BsDownload /> Tải lịch thi đấu
                                            </Button>
                                        </Col>
                                    </Row>
                                    
                                    <Tabs
                                     activeKey={selectedTab} // Kiểm soát tab đang được chọn
                                     onSelect={(k) => setSelectedTab(k)}
                                        className="mb-3">
                                        {typeCurrentLeague === "Đấu vòng tròn" && (
                                            <Tab eventKey="roundRobin" title="Lịch thi đấu thể loại vòng tròn">
                                                {roundRobinStages.length > 0 ? (
                                                    roundRobinStages.map(groupStage => (
                                                        <Card className="mb-4 match-card" key={groupStage.id}>
                                                            <Card.Header as="h5" className="text-center bg-danger text-white">
                                                                {groupStage.name}
                                                            </Card.Header>
                                                            <Card.Body style={{ padding: '0' }}>
                                                                {groupStage.matches && groupStage.matches.length > 0 ? (
                                                                    groupStage.matches.map(match => (
                                                                        <Row style={{ width: "100%", border: "1px solid #ccc", padding: "20px" }} key={match.id}>
                                                                            <Col xs={4} className="d-flex align-items-center justify-content-center">
                                                                                <div className="team-info text-center">
                                                                                    <strong>{match.team1Name}</strong>
                                                                                </div>
                                                                                <div className='logo-card'>
                                                                                    <img src={match.logoTeam1} alt={`${match.team1Name} Logo`} className="team-logo" />
                                                                                </div>
                                                                                <span className="score">{match.goalsTeam1 ?? "?"}</span>
                                                                            </Col>
                                                                            <Col xs={4} className="match-details d-flex flex-column justify-content-center align-items-center">
                                                                                <div className="Tournament">{match.tournamentName}</div>
                                                                                <div className="time">{match.startTime?.split("T")[1].slice(0, 5) ?? "??:??"}</div>
                                                                                <div className="date">{match.matchDate?.split("T")[0] ?? "??/??/??"}</div>
                                                                                <GiSoccerBall />
                                                                                <div className="stadium">{match.venueName}</div>
                                                                                <Button variant="link" className="info-button">Thông tin trận đấu</Button>
                                                                            </Col>
                                                                            <Col xs={4} className="d-flex align-items-center justify-content-center">
                                                                                <span className="score">{match.goalsTeam2 ?? "?"}</span>
                                                                                <div className='logo-card'>
                                                                                    <img src={match.logoTeam2} alt={`${match.team2Name} Logo`} className="team-logo" />
                                                                                </div>
                                                                                <div className="team-info text-center">
                                                                                    <strong>{match.team2Name}</strong>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    ))
                                                                ) : (
                                                                    <div className="text-center">Không có trận đấu trong vòng này.</div>
                                                                )}
                                                            </Card.Body>
                                                        </Card>
                                                    ))
                                                ) : (
                                                    <div className="text-center">Đang tải dữ liệu...</div>
                                                )}
                                            </Tab>
                                        )}
                                        {typeCurrentLeague === "Loại trực tiếp" && (
                                            <Tab eventKey="Knockout" title="Lịch thi đấu loại trực tiếp">
                                                {knockoutStagesType.length > 0 ? (
                                                    knockoutStagesType.map(groupStage => (
                                                        <Card className="mb-4 match-card" key={groupStage.id}>
                                                            <Card.Header as="h5" className="text-center bg-danger text-white">
                                                                {groupStage.name}
                                                            </Card.Header>
                                                            <Card.Body style={{ padding: '0' }}>
                                                                {groupStage.matches && groupStage.matches.length > 0 ? (
                                                                    groupStage.matches.map(match => (
                                                                        <Row style={{ width: "100%", border: "1px solid #ccc", padding: "20px" }} key={match.id}>
                                                                            <Col xs={4} className="d-flex align-items-center justify-content-center">
                                                                                <div className="team-info text-center">
                                                                                    <strong>{match.team1Name}</strong>
                                                                                </div>
                                                                                <div className='logo-card'>
                                                                                    <img src={match.logoTeam1} alt={`${match.team1Name} Logo`} className="team-logo" />
                                                                                </div>
                                                                                <span className="score">{match.goalsTeam1 ?? "?"}</span>
                                                                            </Col>
                                                                            <Col xs={4} className="match-details d-flex flex-column justify-content-center align-items-center">
                                                                                <div className="Tournament">{match.tournamentName}</div>
                                                                                <div className="time">{match.startTime?.split("T")[1].slice(0, 5) ?? "??:??"}</div>
                                                                                <div className="date">{match.matchDate?.split("T")[0] ?? "??/??/??"}</div>
                                                                                <GiSoccerBall />
                                                                                <div className="stadium">{match.venueName}</div>
                                                                                <Button variant="link" className="info-button">Thông tin trận đấu</Button>
                                                                            </Col>
                                                                            <Col xs={4} className="d-flex align-items-center justify-content-center">
                                                                                <span className="score">{match.goalsTeam2 ?? "?"}</span>
                                                                                <div className='logo-card'>
                                                                                    <img src={match.logoTeam2} alt={`${match.team2Name} Logo`} className="team-logo" />
                                                                                </div>
                                                                                <div className="team-info text-center">
                                                                                    <strong>{match.team2Name}</strong>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    ))
                                                                ) : (
                                                                    <div className="text-center">Không có trận đấu trong vòng này.</div>
                                                                )}
                                                            </Card.Body>
                                                        </Card>
                                                    ))
                                                ) : (
                                                    <div className="text-center">Đang tải dữ liệu...</div>
                                                )}
                                            </Tab>
                                        )}
                                        <Tab eventKey="list" title="Danh sách">
                                            <Table responsive="sm" striped bordered hover variant="white">
                                                <thead>
                                                    <tr>
                                                        <th>Đội 1</th>
                                                        <th>Đội 2</th>
                                                        <th>Vòng đấu</th>
                                                        <th>Ngày thi đấu</th>
                                                        <th>Thời gian</th>
                                                        <th>Địa điểm</th>
                                                        <th colSpan="2">Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {
                                                        matches.map((match, index) => (
                                                            <tr key={index}>
                                                                <td style={{ textAlign: 'left' }}>
                                                                    <div className='logo-card'><img src={match.logoTeam1} alt={match.team1Name} className="team-logo" /> {match.team1Name}</div>
                                                                </td>
                                                                <td style={{ textAlign: 'left' }}>
                                                                    <div className='logo-card'><img src={match.logoTeam2} alt={match.team2Name} className="team-logo" /> {match.team2Name}</div>
                                                                </td>
                                                                <td>{match.stageName}</td>
                                                                <td>{match.matchDate}</td>
                                                                <td>{match.startTime}</td>
                                                                <td style={{ textAlign: 'left' }}>{match.venueName}</td>
                                                                <td><Button variant="danger" onClick={() => handleReportShowClick(match.id, match)}>
                                                                    <BsEyeFill></BsEyeFill>Xem biên bản
                                                                </Button></td>
                                                                <td><Button variant="danger" onClick={() => handleReportEditlick(match.id, match)}><BsPencil />Nhập biên bản</Button></td>
                                                                <td><Button variant="danger" onClick={() => handleDownloadReportClick(match.id, match)}><BsDownload />Tải về biên bản</Button></td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </Table>
                                        </Tab>
                                    </Tabs>

                                    <Modal show={reportModalShow} onHide={handleCloseShow} id="reportModal" className="custom-modal-width" style={{ maxWidth: '100%' }}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Xem biên bản trận đấu</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {selectedMatch && (
                                                <>
                                                    {/* {phan I} */}
                                                    <Row style={{ padding: "20px" }}>
                                                        <Col>
                                                            <div style={{ fontWeight: '600' }}>I. Thông tin về trận đấu</div>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col xs={5}>
                                                                    Kết quả:
                                                                    <input type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.goalsTeam1}
                                                                        placeholder='Đội 1'
                                                                        min='0'
                                                                        disabled={reportDetails.matchStatistics.goalsTeam1 !== null && reportDetails.matchStatistics.goalsTeam1 !== undefined}
                                                                    />
                                                                    -
                                                                    <input type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.goalsTeam2}
                                                                        placeholder='Đội 2'

                                                                        min='0'
                                                                        disabled={reportDetails.matchStatistics.goalsTeam2 !== null && reportDetails.matchStatistics.goalsTeam2 !== undefined}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col >
                                                                    Luân lưu (Nếu không có điền 0-0):
                                                                    <input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.subGoalsTeam1}
                                                                        placeholder='0'

                                                                        disabled={reportDetails.matchStatistics.subGoalsTeam1 !== null && reportDetails.matchStatistics.subGoalsTeam1 !== undefined}
                                                                    />
                                                                    -
                                                                    <input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.subGoalsTeam2}
                                                                        placeholder='0'

                                                                        disabled={reportDetails.matchStatistics.subGoalsTeam2 !== null && reportDetails.matchStatistics.subGoalsTeam2 !== undefined}
                                                                    />
                                                                </Col>

                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col >
                                                                    Thời gian bù giờ: <br />
                                                                    Hiệp 1:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        placeholder='Hiệp 1'
                                                                        value={reportDetails.matchStatistics.firstHalfExtraTime}

                                                                        disabled={reportDetails.matchStatistics.firstHalfExtraTime !== null && reportDetails.matchStatistics.firstHalfExtraTime !== undefined}
                                                                    /> phút -
                                                                    Hiệp 2:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        placeholder='Hiệp 2'
                                                                        value={reportDetails.matchStatistics.secondHalfExtraTime}

                                                                        disabled={reportDetails.matchStatistics.secondHalfExtraTime !== null && reportDetails.matchStatistics.secondHalfExtraTime !== undefined}
                                                                    />phút
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col >
                                                                    Số Thẻ vàng: <br />
                                                                    Đội 1:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        placeholder='Số thẻ'
                                                                        value={reportDetails.matchStatistics.yellowCardsTeam1}

                                                                        disabled={reportDetails.matchStatistics.yellowCardsTeam1 !== null && reportDetails.matchStatistics.yellowCardsTeam1 !== undefined}
                                                                    /> thẻ -
                                                                    Đội 2:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        placeholder='Số thẻ'
                                                                        value={reportDetails.matchStatistics.yellowCardsTeam2}

                                                                        disabled={reportDetails.matchStatistics.yellowCardsTeam2 !== null && reportDetails.matchStatistics.yellowCardsTeam2 !== undefined}
                                                                    />thẻ
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col >
                                                                    Số thẻ đỏ: <br />
                                                                    Đội 1:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        placeholder='Hiệp 1'
                                                                        value={reportDetails.matchStatistics.redCardsTeam1}

                                                                        disabled={reportDetails.matchStatistics.redCardsTeam1 !== null && reportDetails.matchStatistics.redCardsTeam1 !== undefined}
                                                                    /> thẻ -
                                                                    Đội 2:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        placeholder='Hiệp 2'
                                                                        value={reportDetails.matchStatistics.redCardsTeam2}

                                                                        disabled={reportDetails.matchStatistics.redCardsTeam2 !== null && reportDetails.matchStatistics.redCardsTeam2 !== undefined}
                                                                    />thẻ
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col>
                                                                    Trọng tài chính:<input
                                                                        type='text'
                                                                        value={reportDetails.mainReferee}

                                                                        disabled={reportDetails.mainReferee !== null && reportDetails.mainReferee !== undefined} />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    Người tạo báo cáo: <input type='text'
                                                                        value={reportDetails.reportCreatorName}

                                                                        disabled={reportDetails.reportCreatorName !== null && reportDetails.reportCreatorName !== undefined}
                                                                    />

                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                    </Row>

                                                    {/* {Phan II} */}
                                                    <Row style={{ padding: "20px" }}>
                                                        <Col>
                                                            <div style={{ fontWeight: '600' }}>II. Số liệu chuyên môn:</div>
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col xs={5} className='bd_up bd_right bd_left'>
                                                                    Đội 1: {reportDetails.team1Name}
                                                                </Col>
                                                                <Col xs={5} className='bd_up bd_right'>
                                                                    Đội 2: {reportDetails.team2Name}
                                                                </Col>
                                                            </Row>

                                                            {/* Càu thủ ghi bàn */}
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ textAlign: "center" }}
                                                                    className='bd_up bd_right bd_left bd_bottom'>
                                                                    Cầu thủ ghi bàn
                                                                </Col>

                                                            </Row>
                                                            <Row style={{ display: "flex", justifyContent: 'center', marginBottom: '10px' }}>
                                                                <Col
                                                                    xs={5}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Phút</th>

                                                                                <th>Tên cầu thủ</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {reportDetails.matchEvents.filter(event => event.eventType === "Goal" && event.teamId === reportDetails.team1Id).map((event, index) => (
                                                                                <tr key={index}>
                                                                                    <td >
                                                                                        <input
                                                                                            type='number'
                                                                                            value={event.eventMinute}
                                                                                            style={{ width: "50px" }}

                                                                                            min='0'
                                                                                            readOnly
                                                                                            disabled
                                                                                        />
                                                                                    </td>
                                                                                    <td className="input-wrapper">
                                                                                        <Form.Select style={{ width: "200px" }} disabled >
                                                                                            <option>{event.playerName}</option>

                                                                                        </Form.Select>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>
                                                                    </Table>


                                                                </Col>
                                                                <Col
                                                                    xs={5}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Phút</th>

                                                                                <th>Tên cầu thủ</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {reportDetails.matchEvents.filter(event => event.eventType === "Goal" && event.teamId === reportDetails.team2Id).map((event, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <input
                                                                                            disabled
                                                                                            type='number'
                                                                                            value={event.eventMinute || ''}
                                                                                            style={{ width: "50px" }}
                                                                                            min='0'
                                                                                        />
                                                                                    </td>

                                                                                    <td className="input-wrapper">
                                                                                        <Form.Select style={{ width: "200px" }} disabled >
                                                                                            <option>{event.playerName}</option>

                                                                                        </Form.Select>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>

                                                                </Col>

                                                            </Row>

                                                            {/* Thẻ vàng */}
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ textAlign: "center" }}
                                                                    className='bd_up bd_right bd_left '>
                                                                    Thẻ vàng
                                                                </Col>

                                                            </Row>
                                                            <Row style={{ display: "flex", justifyContent: 'center', marginBottom: '10px' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>CLB</th>
                                                                                <th>Phút</th>
                                                                                <th>Tên cầu thủ</th>
                                                                                <th>Lý do</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            {reportDetails.matchEvents.filter(event => event.eventType === "YellowCard").map((event, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <select
                                                                                            value={event.teamId || ''}
                                                                                            style={{ width: '100px', height: '30px' }}
                                                                                            disabled
                                                                                        >
                                                                                            <option value={reportDetails.team1Id}>{reportDetails.team1Name}</option>
                                                                                            <option value={reportDetails.team2Id}>{reportDetails.team2Name}</option>
                                                                                        </select>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type='number'
                                                                                            value={event.eventMinute}
                                                                                            style={{ width: "50px" }}
                                                                                            readOnly
                                                                                            disabled

                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <Form.Select style={{ width: "200px" }} disabled>
                                                                                            <option value="">{event.playerName}</option>
                                                                                        </Form.Select>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type='text'
                                                                                            style={{ width: "300px" }}
                                                                                            value={event.description} placeholder='Ghi ngắn gọn lí do'
                                                                                            readOnly
                                                                                            disabled
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>
                                                                    </Table>

                                                                </Col>

                                                            </Row>
                                                            {/* Thẻ đỏ */}
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ textAlign: "center" }}
                                                                    className='bd_up bd_right bd_left '>
                                                                    Thẻ đỏ
                                                                </Col>

                                                            </Row>
                                                            <Row style={{ display: "flex", justifyContent: 'center', marginBottom: '10px' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>CLB</th>
                                                                                <th>Phút</th>
                                                                                <th>Tên cầu thủ</th>

                                                                                <th>Lý do</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {reportDetails.matchEvents.filter(event => event.eventType === "RedCard").map((event, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <select
                                                                                            value={event.teamId || ''}
                                                                                            style={{ width: '100px', height: '30px' }}
                                                                                            disabled
                                                                                        >
                                                                                            <option value={reportDetails.team1Id}>{reportDetails.team1Name}</option>
                                                                                            <option value={reportDetails.team2Id}>{reportDetails.team2Name}</option>
                                                                                        </select>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type='number'
                                                                                            value={event.eventMinute || ''}
                                                                                            style={{ width: "50px" }}
                                                                                            disabled
                                                                                        />
                                                                                    </td>

                                                                                    <td>
                                                                                        <Form.Select style={{ width: "200px" }} disabled>
                                                                                            <option value="">{event.playerName}</option>
                                                                                        </Form.Select>
                                                                                    </td>

                                                                                    <td>
                                                                                        <input
                                                                                            type='text'
                                                                                            value={event.description || ''}
                                                                                            style={{ width: "300px" }}
                                                                                            placeholder='Ghi ngắn gọn lí do'
                                                                                            disabled
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>
                                                                    </Table>

                                                                </Col>



                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </>

                                            )}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseShow}>
                                                Đóng
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Modal show={reportModalEdit} onHide={handleCloseEdit} className="custom-modal-width" style={{ maxWidth: '100%' }}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Nhập biên bản trận đấu</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            {selectedMatch && (
                                                <>

                                                    {/* {phan I} */}
                                                    <Row style={{ padding: "20px" }}>
                                                        <Col>
                                                            <div style={{ fontWeight: '600' }}>I. Thông tin về trận đấu</div>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col xs={5}>
                                                                    Kết quả:
                                                                    <input type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.goalsTeam1}
                                                                        placeholder='Đội 1'
                                                                        onChange={(e) => handleMatchStatisticEditChange('goalsTeam1', e.target.value)}
                                                                        min='0'
                                                                    />
                                                                    -
                                                                    <input type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.goalsTeam2}
                                                                        placeholder='Đội 2'
                                                                        onChange={(e) => handleMatchStatisticEditChange('goalsTeam2', e.target.value)}
                                                                        min='0'


                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col>
                                                                    Luân lưu (Nếu không có điền 0-0):
                                                                    <input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.subGoalsTeam1}
                                                                        placeholder='0'
                                                                        onChange={(e) => handleMatchStatisticEditChange('subGoalsTeam1', e.target.value)}
                                                                    />
                                                                    -
                                                                    <input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.subGoalsTeam2}
                                                                        placeholder='0'
                                                                        onChange={(e) => handleMatchStatisticEditChange('subGoalsTeam2', e.target.value)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col>
                                                                    Thời gian bù giờ: <br />
                                                                    Hiệp 1:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.firstHalfExtraTime}
                                                                        placeholder='Hiệp 1'
                                                                        onChange={(e) => handleMatchStatisticEditChange('firstHalfExtraTime', e.target.value)}
                                                                    /> phút -
                                                                    Hiệp 2:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.secondHalfExtraTime}
                                                                        placeholder='Hiệp 2'
                                                                        onChange={(e) => handleMatchStatisticEditChange('secondHalfExtraTime', e.target.value)}
                                                                    />phút
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col>
                                                                    Số Thẻ vàng: <br />
                                                                    Đội 1:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.yellowCardsTeam1}
                                                                        placeholder='Số thẻ'
                                                                        onChange={(e) => handleMatchStatisticEditChange('yellowCardsTeam1', e.target.value)}
                                                                    /> thẻ -
                                                                    Đội 2:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.yellowCardsTeam2}
                                                                        placeholder='Số thẻ'
                                                                        onChange={(e) => handleMatchStatisticEditChange('yellowCardsTeam2', e.target.value)}
                                                                    />thẻ
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col>
                                                                    Số thẻ đỏ: <br />
                                                                    Đội 1:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.redCardsTeam1}
                                                                        placeholder='Hiệp 1'
                                                                        onChange={(e) => handleMatchStatisticEditChange('redCardsTeam1', e.target.value)}
                                                                    /> thẻ -
                                                                    Đội 2:<input
                                                                        min='0'
                                                                        type='number'
                                                                        style={{ width: "80px" }}
                                                                        value={reportDetails.matchStatistics.redCardsTeam2}
                                                                        placeholder='Hiệp 2'
                                                                        onChange={(e) => handleMatchStatisticEditChange('redCardsTeam2', e.target.value)}
                                                                    />thẻ
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: '10px' }}>
                                                                <Col>
                                                                    Trọng tài chính:<input
                                                                        type='text'
                                                                        value={reportDetails.matchStatistics.mainReferee}
                                                                        onChange={(e) => handleReportDetailsEditChange('mainReferee', e.target.value)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    Người tạo báo cáo: <input type='text'
                                                                        value={reportDetails.matchStatistics.reportCreatorName}
                                                                        onChange={(e) => handleReportDetailsEditChange('reportCreatorName', e.target.value)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                    </Row>

                                                    {/* {Phan II} */}
                                                    <Row style={{ padding: "20px" }}>
                                                        <Col>
                                                            <div style={{ fontWeight: '600' }}>II. Số liệu chuyên môn:</div>
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col xs={5} className='bd_up bd_right bd_left'>
                                                                    Đội 1: {reportDetails?.team1Name}
                                                                </Col>
                                                                <Col xs={5} className='bd_up bd_right'>
                                                                    Đội 2: {reportDetails?.team2Name}
                                                                </Col>
                                                            </Row>

                                                            {/* Càu thủ ghi bàn */}
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ textAlign: "center" }}
                                                                    className='bd_up bd_right bd_left bd_bottom'>
                                                                    Cầu thủ ghi bàn
                                                                </Col>

                                                            </Row>
                                                            <Row style={{ display: "flex", justifyContent: 'center', marginBottom: '10px' }}>
                                                                <Col
                                                                    xs={5}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Phút</th>

                                                                                <th>Tên cầu thủ</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {editableGoals.team1.map((goal, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <input
                                                                                            min='0'
                                                                                            placeholder='0'
                                                                                            type="number"
                                                                                            style={{ width: "50px" }}
                                                                                            value={goal.eventMinute}
                                                                                            onChange={(e) => handleGoalChangeTeam1(index, 'eventMinute', e.target.value)}
                                                                                        />
                                                                                    </td>

                                                                                    <td className="input-wrapper">
                                                                                        <Form.Select style={{ width: "200px" }} value={goal.playerId} onChange={(e) => handleGoalChangeTeam1(index, 'playerId', e.target.value)}>
                                                                                            <option>Chọn cầu thủ</option>
                                                                                            {playersTeam1.map((player, i) => (
                                                                                                <option value={player.id}>{player.name}</option>
                                                                                            ))}
                                                                                        </Form.Select>
                                                                                    </td>

                                                                                </tr>

                                                                            ))}
                                                                            <Button onClick={addNewGoalTeam1}>Thêm</Button>
                                                                        </tbody>
                                                                    </Table>


                                                                </Col>
                                                                <Col
                                                                    xs={5}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Phút</th>

                                                                                <th>Tên cầu thủ</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {editableGoals.team2.map((goal, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <input
                                                                                            min='0'
                                                                                            type="number"
                                                                                            style={{ width: "50px" }}
                                                                                            value={goal.eventMinute}
                                                                                            onChange={(e) => handleGoalChangeTeam2(index, 'eventMinute', e.target.value)}
                                                                                            placeholder='0'
                                                                                        />
                                                                                    </td>

                                                                                    <td className="input-wrapper">
                                                                                        <Form.Select style={{ width: "200px" }} value={goal.playerId} onChange={(e) => handleGoalChangeTeam2(index, 'playerId', e.target.value)}>
                                                                                            <option>Chọn cầu thủ</option>
                                                                                            {playersTeam2.map((player, i) => (
                                                                                                <option value={player.id}>{player.name}</option>
                                                                                            ))}
                                                                                        </Form.Select>
                                                                                    </td>

                                                                                </tr>
                                                                            ))}
                                                                            <Button onClick={addNewGoalTeam2}>Thêm</Button>
                                                                        </tbody>
                                                                    </Table>

                                                                </Col>

                                                            </Row>

                                                            {/* Thẻ vàng */}
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ textAlign: "center" }}
                                                                    className='bd_up bd_right bd_left '>
                                                                    Thẻ vàng
                                                                </Col>

                                                            </Row>
                                                            <Row style={{ display: "flex", justifyContent: 'center', marginBottom: '10px' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>CLB</th>
                                                                                <th>Phút</th>
                                                                                <th>Tên cầu thủ</th>
                                                                                <th>Lý do</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {rowsYellowCard.map((yellowCard, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <select
                                                                                            style={{ width: '100px', height: '30px' }}
                                                                                            value={yellowCard.teamId}
                                                                                            onChange={(e) => handleYellowCardChange(index, 'teamId', e.target.value)}
                                                                                        >
                                                                                            <option value={reportDetails.team1Id}>{reportDetails.team1Name}</option>
                                                                                            <option value={reportDetails.team2Id}>{reportDetails.team2Name}</option>
                                                                                        </select>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type='number'
                                                                                            style={{ width: "50px" }}
                                                                                            value={yellowCard.eventMinute}
                                                                                            onChange={(e) => handleYellowCardChange(index, 'eventMinute', e.target.value)}
                                                                                            min='0'
                                                                                            placeholder='0'
                                                                                        />
                                                                                    </td>
                                                                                    <td style={{ display: "flex", justifyContent: "center" }}>
                                                                                        {yellowCard.teamId && (
                                                                                            <Form.Select style={{ width: "200px" }} value={yellowCard.playerId} onChange={(e) => handleYellowCardChange(index, 'playerId', e.target.value)}>
                                                                                                <option value="">Chọn cầu thủ</option>
                                                                                                {(yellowCard.teamId === reportDetails.team1Id ? playersTeam1 : playersTeam2).map((player) => (
                                                                                                    <option key={player.id} value={player.id}>{player.name}</option>
                                                                                                ))}
                                                                                            </Form.Select>
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type='text'
                                                                                            style={{ width: "300px" }}
                                                                                            value={yellowCard.description}
                                                                                            placeholder='Ghi ngắn gọn lí do'
                                                                                            onChange={(e) => handleYellowCardChange(index, 'description', e.target.value)}
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>
                                                                    <Button onClick={addNewYellowCard}>Thêm</Button>
                                                                </Col>

                                                            </Row>
                                                            {/* Thẻ đỏ */}
                                                            <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ textAlign: "center" }}
                                                                    className='bd_up bd_right bd_left '>
                                                                    Thẻ đỏ
                                                                </Col>

                                                            </Row>
                                                            <Row style={{ display: "flex", justifyContent: 'center', marginBottom: '10px' }}>
                                                                <Col
                                                                    xs={10}
                                                                    style={{ padding: '0' }}
                                                                >
                                                                    <Table bordered >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>CLB</th>
                                                                                <th>Phút</th>
                                                                                <th>Tên cầu thủ</th>

                                                                                <th>Lý do</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {rowsRedCard.map((redCard, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <select
                                                                                            style={{ width: '100px', height: '30px' }}
                                                                                            value={redCard.teamId}
                                                                                            onChange={(e) => handleRedCardChange(index, 'teamId', e.target.value)}
                                                                                        >
                                                                                            <option value={reportDetails.team1Id}>{reportDetails.team1Name}</option>
                                                                                            <option value={reportDetails.team2Id}>{reportDetails.team2Name}</option>
                                                                                        </select>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type='number'
                                                                                            style={{ width: "50px" }}
                                                                                            value={redCard.eventMinute}
                                                                                            onChange={(e) => handleRedCardChange(index, 'eventMinute', e.target.value)}
                                                                                            min='0'
                                                                                            placeholder='0'
                                                                                        />
                                                                                    </td>

                                                                                    <td style={{ display: "flex", justifyContent: "center" }}>
                                                                                        {redCard.teamId && (
                                                                                            <Form.Select style={{ width: "200px" }} value={redCard.playerId} onChange={(e) => handleRedCardChange(index, 'playerId', e.target.value)}>
                                                                                                <option value="">Chọn cầu thủ</option>
                                                                                                {(redCard.teamId === reportDetails.team1Id ? playersTeam1 : playersTeam2).map((player) => (
                                                                                                    <option key={player.id} value={player.id}>{player.name}</option>
                                                                                                ))}
                                                                                            </Form.Select>
                                                                                        )}
                                                                                    </td>

                                                                                    <td>
                                                                                        <input
                                                                                            type='text'
                                                                                            style={{ width: "300px" }}
                                                                                            placeholder='Ghi ngắn gọn lí do'
                                                                                            value={redCard.description || ''}
                                                                                            onChange={(e) => handleRedCardChange(index, 'description', e.target.value)}
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>
                                                                    <Button onClick={addNewRedCard}>Thêm</Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </>

                                            )}
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseEdit}>
                                                Đóng
                                            </Button>
                                            <Button variant="danger" onClick={handleShowConfirmModal}>
                                                Lưu biên bản
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Xác Nhận</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Xác nhận trận đấu đã kết thúc. Hành động không thể hoàn tác. Bạn chắc chắn chứ?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseConfirmModal}>
                                                Hủy
                                            </Button>
                                            <Button variant="danger" onClick={() => {
                                                handleReportSubmit();
                                                handleCloseConfirmModal();
                                            }}>
                                                Đồng Ý
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
            <Footer />
        </div>

    );
}
