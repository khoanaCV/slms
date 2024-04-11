import styles from "../../../Assets/css/user/league/leaguedashboard.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Card, Button, Image, Modal } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import {
    faCalendarDays, faCaretRight, faChartBar, faLocationArrow, faStar, faCircleXmark, faChevronCircleRight, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { startTransition, useState, useRef, useEffect } from "react";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import { toast } from "react-toastify";
import { downdloadDocument, getLeaguesStatisticByTournamentId, getMatchWithMostCardsByTournamentId, 
    getMatchWithMostGoalsByTournamentId, getPlayerWithMostCardByTournamentId, 
    getTeamWithMostCardByTournamentId, getTeamWithMostGoalsByTournamentId, getPlayerWithMostGoalsByTournamentId } from "../../../services/LeagueSevice";

const cx = classNames.bind(styles);

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', options);
}


const DashboardComponent = () => {
    const handleOpenLink = (url) => {
        window.open(url, '_blank');
    };

    const { idLeague } = useParams();
    //Call api
    const [Leaguestatistics, setLeagueStatistics] = useState([]);
    const [mostCard, setMostCard] = useState([]);
    const [mostGoal, setMostGoal] = useState([]);
    const [mostTeamGoal, setMostTeamGoal] = useState([]);
    const [mostTeamCard, setMostTeamCard] = useState([]);

    const [mostPlayerGoal, setMostPlayerGoal] = useState([]);
    const [mostPlayerCard, setMostPlayerCard] = useState([]);

    useEffect(() => {
        getLeaguesStatisticByTournamentId(idLeague)
            .then(data => {
                setLeagueStatistics(data);
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);

            });

        getMatchWithMostCardsByTournamentId(idLeague)
            .then(data => {
                setMostCard(data);
            })
            .catch(error => {

                if (error.response && error.response.status === 404) {
                    setMostCard(null);
                } else {
                    console.error("Error fetching league statistics:", error);
                }

            });
        getMatchWithMostGoalsByTournamentId(idLeague)
            .then(data => {
                setMostGoal(data);
            })
            .catch(error => {

                if (error.response && error.response.status === 404) {
                    setMostGoal(null);
                } else {
                    console.error("Error fetching league statistics:", error);
                }

            });
        getTeamWithMostGoalsByTournamentId(idLeague)
            .then(data => {
                setMostTeamGoal(data);
            })
            .catch(error => {

                if (error.response && error.response.status === 404) {
                    setMostTeamGoal(null);
                } else {
                    console.error("Error fetching league statistics:", error);
                }

            });
        getTeamWithMostCardByTournamentId(idLeague)
            .then(data => {
                setMostTeamCard(data);
            })
            .catch(error => {

                if (error.response && error.response.status === 404) {
                    setMostTeamCard(null);
                } else {
                    console.error("Error fetching league statistics:", error);
                }

            });

        getPlayerWithMostCardByTournamentId(idLeague)
            .then(data => {
                setMostPlayerCard(data);
            })
            .catch(error => {

                if (error.response && error.response.status === 404) {
                    setMostPlayerCard(null);
                } else {
                    console.error("Error fetching league statistics:", error);
                }

            });
            getPlayerWithMostGoalsByTournamentId(idLeague)
            .then(data => {
                setMostPlayerGoal(data);
            })
            .catch(error => {

                if (error.response && error.response.status === 404) {
                    setMostPlayerGoal(null);
                } else {
                    console.error("Error fetching league statistics:", error);
                }

            });
    }, [idLeague]);

    // console.log(Leaguestatistics);
    console.log();


    // Define your statistics as an array or fetch them from an API
    const statistics = [
        { icon: images.vdv, title: 'Số vận động viên tham dự giải đấu', text: `${Leaguestatistics.totalAthletes}`, bgColor: '#67809f' },
        { icon: images.goals, title: 'Số bàn ghi được', text: `${Leaguestatistics.totalGoals}`, bgColor: '#f4d03f' },
        { icon: images.phanluoi, title: 'Số bàn phản lưới', text: `${Leaguestatistics.totalOwnGoals}`, bgColor: '#8e44ad' },
        { icon: images.match, title: 'Tổng số trận đấu', text: `${Leaguestatistics.totalMatches}`, bgColor: '#e26a6a' },
        { icon: images.sumcard, title: 'Tổng số thẻ', text: `${Leaguestatistics.totalCards}`, bgColor: '#578ebe' },
        {
            icon: images.phanluoi, title: 'Trận có nhiều bàn thắng nhất',
            subtitle: mostGoal === null ? 'Chưa xác định' : `${mostGoal.team1Name} ${mostGoal.goalsTeam1}-${mostGoal.goalsTeam2} ${mostGoal.team2Name}`,
            body: mostGoal === null ? 'Chưa xác định' : formatDate(`${mostGoal.startDate}`),
            bgColor: '#36d7b7'
        },
        {
            icon: images.sumcard, title: 'Trận có nhiều thẻ phạt nhất',
            subtitle: mostCard === null ? 'Chưa xác định' : `${mostCard.team1Name} ${mostCard.goalsTeam1}-${mostCard.goalsTeam2} ${mostCard.team2Name}`,
            body: mostCard === null ? 'Chưa xác định' : formatDate(`${mostCard.matchDate}`),
            bgColor: '#95a5a6'
        },
        { icon: images.ban1tran, title: 'Bàn / Trận', text: `${Leaguestatistics.averageGoalsPerMatch}`, bgColor: '#f4d03f' },
        { icon: images.the1tran, title: 'Thẻ / Trận', text: `${Leaguestatistics.averageCardsPerMatch}`, bgColor: '#e35b5a' },
        { icon: images.cudup, title: 'Tổng số cú đúp', text: `${Leaguestatistics.totalDoubleGoals}`, bgColor: '#67809f' },
        { icon: images.hattick, title: 'Tổng số hattrick', text: `${Leaguestatistics.totalHattricks}`, bgColor: '#32c5d2' },
        { icon: images.poker, title: 'Tổng số Poker', text: `${Leaguestatistics.totalPokers}`, bgColor: '#8e44ad' },
        {
            icon: images.ghinhieuban,
            title: 'Đội ghi nhiều bàn nhất',
            subtitle: mostTeamGoal === null ? 'Chưa xác định' : `${mostTeamGoal.teamName}`,
            text: mostTeamGoal === null ? 'Chưa xác định' : `${mostTeamGoal.totalGoalsScored}`,
            bgColor: '#36d7b7'
        },
        {
            icon: images.ghinhieuban, title: 'Đội nhiều thẻ phạt nhất',
            subtitle: mostTeamCard === null ? 'Chưa xác định' : `${mostTeamCard.teamName}`,
            text: mostTeamCard === null ? 'Chưa xác định' : `${mostTeamCard.totalCards}`,
            bgColor: '#8e44ad'
        },
        {
            icon: images.cauthu, title: 'Vận động viên nhiều thẻ phạt nhất',
            subtitle: mostPlayerCard === null ? 'Chưa xác định' : `${mostPlayerCard.playerName}`,
            text: mostPlayerCard === null ? 'Chưa xác định' : `${mostPlayerCard.totalCards}`,
            bgColor: '#f4d03f'
        },
        {
            icon: images.cauthu, title: 'Vận động viên nhiều nhiều bàn nhất',
            subtitle: mostPlayerGoal === null ? 'Chưa xác định' : `${mostPlayerGoal.playerName}`,
            text: mostPlayerGoal === null ? 'Chưa xác định' : `${mostPlayerGoal.totalGoals}`,
            bgColor: '#f4d03f'
        },
        { icon: images.thevang, title: 'Tổng số thẻ vàng', text: `${Leaguestatistics.totalYellowCards}`, bgColor: '#578ebe' },
        { icon: images.thedo, title: 'Tổng số thẻ đỏ', text: `${Leaguestatistics.totalRedCards}`, bgColor: '#1bbc9b' },

        // ... other statistics
    ];




    return (
        <div id="generalStatistic" className="portlet-body">
            <Row>
                {statistics.map((stat, index) => {
                    let colSize = 3; // Default size for single blocks
                    if (stat.title === 'Số vận động viên tham dự giải đấu') {
                        colSize = 6; // Double block size vertically
                    } else if (stat.title === 'Trận có nhiều bàn thắng nhất' || stat.title === 'Trận có nhiều thẻ phạt nhất') {
                        colSize = 6; // Double block size horizontally
                    }

                    return (
                        <Col data-aos="zoom-out-up" className="statitics_item" key={index} sm={12} md={colSize} style={{ padding: "4px", margin: "5px 0px" }}>
                            <Card
                                className="text-center tile" style={{ backgroundColor: `${stat.bgColor}` }}  >
                                <Card.Body>
                                    <img style={{ width: "200px", height: "200px" }} src={stat.icon} alt="" />
                                    <Card.Title>{stat.title}</Card.Title>
                                    <Card.Subtitle>{stat.subtitle}</Card.Subtitle>
                                    <Card.Body>{stat.body}</Card.Body>
                                    <Card.Text style={{ fontSize: "16px", fontWeight: "500" }}>{stat.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div >
    );
};


export default function LeagueDashBoard() {
    const [activeStarIndex, setActiveStarIndex] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);
    const idLeague = useParams()
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
    const fileInputRef = useRef(null);

    const handleBtnCircleClick = (idLeague) => {
        setShowPopup(true);
        setSelectedLeagueId(idLeague);
    };

    console.log(idLeague.idLeague);
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

    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            // Giả sử bạn tải tệp lên server và lưu đường dẫn tệp vào state
            setFile(URL.createObjectURL(uploadedFile));
        }
    };

    const handleDeleteFile = () => {
        setShowModal(false);
        setFile(null);
        // Thực hiện xóa tệp tin trên server nếu cần
    };



    //api download document

    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague.idLeague} onBtnCircleClick={() => handleBtnCircleClick(idLeague.idLeague)} />
                        <Row className={cx("myleague-wrapper")}>
                            <Row className="league-inner">
                                <Col xs={3} className="league-inner_left" style={{ padding: "0" }}>
                                    <Row className="league-left_awards">
                                        <Col style={{ padding: "0" }} >
                                            <Row
                                                style={{ display: "flex", marginBottom: "4px" }}
                                            >
                                                <Col className="award_item" >
                                                    <img className="award_item-img" src={images.champion} alt="" />
                                                    <p className="award_item-text">Vô địch: chưa có dữ liệu</p>
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{ display: "flex", marginBottom: "4px" }}
                                            >
                                                <Col className="award_item" >
                                                    <img className="award_item-img" src={images.champion2} alt="" />
                                                    <p className="award_item-text">Á quân: chưa có dữ liệu</p>
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{ display: "flex" }}
                                            >
                                                <Col className="award_item" >
                                                    <img className="award_item-img" src={images.champion3} alt="" />
                                                    <p className="award_item-text">Giải ba: chưa có dữ liệu</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="league-right_topgoals">
                                        <Col style={{ padding: "0" }}>
                                            <Row className="topgoals_wrapper">
                                                <Col className="topgoals_inner">
                                                    <Row >
                                                        <Col className="topgoals_inner_header">
                                                            <p className="topgoals-header-title">Top ghi bàn</p>
                                                            <Link className="topgoals-header-statitics" to="/league/dashboard/:id/statitics">
                                                                Thống kê
                                                                <FontAwesomeIcon style={{ fontSize: "14px" }} icon={faChevronRight} />
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="topgoals_inner-body">
                                                            <Row className="topgoals_body-menu">
                                                                <Col xs={3} className="topgoals_menu-item">
                                                                    <Image className="item_img" style={{ width: "80px", height: "80px" }} src={images.aovang} roundedCircle />
                                                                    <span style={{ borderRadius: "50%" }} className="badge1">
                                                                        <img src={images.aovang} alt="" className="badge-img1" />
                                                                    </span>
                                                                    <p className="item_name-topgoals">Văn Rin</p>
                                                                </Col>
                                                                <Col xs={3} className="topgoals_menu-item">
                                                                    <Image className="item_img" style={{ width: "80px", height: "80px" }} src={images.aovang} roundedCircle />
                                                                    <span style={{ borderRadius: "50%" }} className="badge1">
                                                                        <img src={images.logoteam2} alt="" className="badge-img1" />
                                                                    </span>
                                                                    <p className="item_name-topgoals">Văn Rin</p>
                                                                </Col>
                                                                <Col xs={3} className="topgoals_menu-item">
                                                                    <Image className="item_img" style={{ width: "80px", height: "80px" }} src={images.aovang} roundedCircle />
                                                                    <span style={{ borderRadius: "50%" }} className="badge1">
                                                                        <img src={images.logoteam1} alt="" className="badge-img1" />
                                                                    </span>
                                                                    <p className="item_name-topgoals">Văn Rin</p>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={12} style={{ padding: "20px" }}>
                                                                    <Button href="/league/dashboard/:id/calendarleague" style={{ width: "100%", backgroundColor: "#fd1e50" }}>
                                                                        <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faCalendarDays} />
                                                                        <Link
                                                                            className=""
                                                                            style={{ textDecoration: "none", color: "white" }}
                                                                            to="">
                                                                            Toàn bộ lịch thi đấu
                                                                        </Link>
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {/* <Row className="league-left_calendar">
                                        <Col className="calendar_wrapper">
                                            <Row className="calender_inner">
                                                <Row className="calender_item" style={{ padding: "0" }}>
                                                    <Col className="calender_item-inner" style={{ padding: "0" }}>
                                                        <div class="next-match-fixtures light">
                                                            <ul class="match-teams-vs">
                                                                <li class="team-logo"><img src={images.logoteam1} alt="" /> <strong>FC Champs</strong> </li>
                                                                <li class="mvs">
                                                                    <p> Bán kết </p>
                                                                    <strong>Tên giải đấu</strong>
                                                                    <strong>22-05-2024</strong>
                                                                    <strong>18:00</strong>
                                                                    <strong class="vs">VS</strong> </li>
                                                                <li class="team-logo"><img src={images.logoteam2} alt="" /> <strong>FC Tigers</strong> </li>
                                                            </ul>
                                                            <ul class="nmf-loc">
                                                                <li><FontAwesomeIcon icon={faLocationArrow} /> New Expo Stadium, NYK</li>
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </Row>
                                        </Col>
                                    </Row> */}
                                </Col>
                                <Col xs={6} style={{ padding: "0 10px" }}>
                                    <Row className="league-inner_right" style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "end" }}>

                                        <Button
                                            style={{ width: "200px", backgroundColor: "#fd1e50", border: "none" }}
                                            className="btn_rule_download"
                                            onClick={() => downdloadDocument(idLeague.idLeague)}>
                                            Tải luật thi đấu
                                        </Button>

                                        <input type="file" id="fileRegulations" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" style={{ display: 'none' }} />
                                    </Row>
                                    {/* Overview dashborad league */}
                                    <Row className="right-content_wrapper">
                                        <Col style={{ padding: "0 0 0 15px" }} className="right-content_inner">
                                            <Row >
                                                <Col style={{ padding: "0" }} className="right-content_header">
                                                    <FontAwesomeIcon style={{ color: "#fd1e50", width: "25px", height: "25px" }} icon={faChartBar} />
                                                    <h4>Thống kê tổng quát</h4>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="right-content_body" style={{ padding: "20px" }}>
                                                    <DashboardComponent />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

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

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={handleDeleteFile}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <Footer />
        </div>

    );
}
