import styles from "../../../Assets/css/user/league/tableranking.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Button, } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLeagueDetailByIdLeague, getTeamStandings } from '../../../services/LeagueSevice';
import images from "../../../Assets/images";
import {
    faStar, faCircleXmark, faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import { toast } from "react-toastify";
import ListTeamRegister from "./ListTeamRegister";

const cx = classNames.bind(styles);


export default function TableRanking() {
    const [activeStarIndex, setActiveStarIndex] = useState(-1);
    const [typeLeague, setTypeLeague] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const idLeague = useParams()
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
    const [teams, setTeams] = useState([]);

    // const fileInputRef = useRef(null);
    const [LeagueDetail, setLeagueDetail] = useState({});

    useEffect(() => {
        getLeagueDetailByIdLeague(idLeague.idLeague)
            .then(data => {
                setLeagueDetail(data);
                setTypeLeague(data.competitionFormatName)
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);
            });
    }, [idLeague]);

    console.log(typeLeague);
    const handleBtnCircleClick = (idLeague) => {
        setShowPopup(true);
        setSelectedLeagueId(idLeague);
    };

    const closePopup = () => {
        setShowPopup(false);
        setActiveStarIndex(-1)
    };
    const handleStarClick = (index) => {
        setActiveStarIndex(index);
    };
    const handleVoteButtonClick = () => {

        setShowPopup(false);
        setActiveStarIndex(-1);
        toast.success("Bình chọn thành công");
    };



    // const teams = [
    //     { id: '1', name: 'Bethlehem', matches: 0, wins: 0, draws: 0, loses: 0, lostGoals: 0, goals: 0, yellowcard: 0, redcard: 0, points: 0, table: 'A' },
    //     { id: '1', name: 'Bethlehem', matches: 0, wins: 0, draws: 0, loses: 0, lostGoals: 0, goals: 0, yellowcard: 0, redcard: 0, points: 0, table: 'B' },
    //     { id: '1', name: 'Bethlehem', matches: 0, wins: 0, draws: 0, loses: 0, lostGoals: 0, goals: 0, yellowcard: 0, redcard: 0, points: 0, table: 'C' },

    // ];

    const [showAdditionalComponent, setShowAdditionalComponent] = useState(true);
    const [showAdditionalComponent1, setShowAdditionalComponent1] = useState(false);
    const [showAdditionalComponent2, setShowAdditionalComponent2] = useState(false);

    useEffect(() => {
        if (typeLeague === "Đấu vòng tròn") {
            setShowAdditionalComponent1(true);
        } else {
            setShowAdditionalComponent1(false);
        }
        if (typeLeague === "Loại trực tiếp") {
            setShowAdditionalComponent2(true);
        } else {
            setShowAdditionalComponent2(false);
        }
    })

    useEffect(() => {
        // Bước 2: Gọi API khi component được mount
        const fetchTeamStandings = async () => {
            try {
                const data = await getTeamStandings(idLeague.idLeague); // Sử dụng idLeague để lấy dữ liệu
                setTeams(data); // Cập nhật dữ liệu vào state
            } catch (error) {
                console.error('Failed to fetch team standings:', error);
            }
        };

        fetchTeamStandings();
    }, [idLeague]);

    console.log(idLeague)
    console.log(idLeague.idLeague)

    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "100px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague} onBtnCircleClick={() => handleBtnCircleClick(idLeague)} />
                        <Row className="team-bg_inner">
                            <Col xs={12} className="table_ranking-img">
                            </Col>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={10} style={{ padding: "10px 0px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Button style={{ backgroundColor: "#FD1E50" }}>
                                    <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faDownload} />
                                    Tải BXH
                                </Button>
                                <div>
                                    <div>T-H-B = Thắng - Hoà - Bại</div>
                                </div>
                            </Col>
                        </Row>
                        {/* đội thi đấu */}
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            {showAdditionalComponent1 === "Đấu vòng tròn" ? (
                                <Col xs={11}>
                                    <div className="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>TÊN ĐỘI</th>
                                                    <th>SỐ TRẬN</th>
                                                    <th>T - H - B</th>
                                                    <th>HIỆU SỐ</th>
                                                    <th style={{ display: "flex", justifyContent: "center" }}>
                                                        <img style={{ width: "20px", height: "30px" }} src={images.yellowcard} alt="Thẻ vàng" />
                                                        <div style={{ fontSize: "20px" }}>/</div>
                                                        <img style={{ width: "20px", height: "30px" }} src={images.redcard} alt="Thẻ đỏ" />
                                                    </th>
                                                    <th>ĐIỂM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {teams.map((team, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{team.teamName}</td>
                                                        <td>{team.played}</td>
                                                        <td>{team.win}-{team.draw}-{team.lose}</td>
                                                        <td>{team.goalsFor}/{team.goalsAgainst}({team.goalDifference})</td>
                                                        <td>{team.yellowCards}/{team.redCards}</td>
                                                        <td>{team.points}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            ) : (<Col xs={11}>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>TÊN ĐỘI</th>
                                                <th>SỐ TRẬN</th>
                                                <th>T - H - B</th>
                                                <th>HIỆU SỐ</th>
                                                <th style={{ display: "flex", justifyContent: "center" }}>
                                                    <img style={{ width: "20px", height: "30px" }} src={images.yellowcard} alt="Thẻ vàng" />
                                                    <div style={{ fontSize: "20px" }}>/</div>
                                                    <img style={{ width: "20px", height: "30px" }} src={images.redcard} alt="Thẻ đỏ" />
                                                </th>
                                                {/* <th>ĐIỂM</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {teams.map((team, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{team.teamName}</td>
                                                    <td>{team.played}</td>
                                                    <td>{team.win}-{team.draw}-{team.lose}</td>
                                                    <td>{team.goalsFor}/{team.goalsAgainst}({team.goalDifference})</td>
                                                    <td>{team.yellowCards}/{team.redCards}</td>
                                                    {/* <td>{team.points}</td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>)}                          
                        </Row>
                    </Col>
                </Row>
                {showPopup && (
                    <div className="popup_wrapper">
                        <div className="popup_inner">
                            <div className="popup_header">
                                <h3 className="popup_header-text">Bình chọn giải đấu</h3>
                                <FontAwesomeIcon onClick={closePopup} className="icon_close" icon={faCircleXmark} />
                            </div>
                            <div className="popup_body">
                                <div className="list_star">
                                    {[...Array(5)].map((_, index) => (
                                        <FontAwesomeIcon
                                            key={index}
                                            className={index <= activeStarIndex ? 'star_item active_star' : 'star_item'}
                                            icon={faStar}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="popup_footer">
                                <Button onClick={handleVoteButtonClick} style={{ backgroundColor: "#fd1e50" }} className="popup_footer_btn">Bình chọn</Button>
                            </div>
                        </div>
                    </div>

                )}


            </Container>
            <Footer />
        </div>

    );
}
