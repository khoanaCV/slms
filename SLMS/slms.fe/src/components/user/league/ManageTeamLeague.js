import styles from "../../../Assets/css/user/league/manageTeamLeague.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Card, Button, Image, Modal, Badge, ListGroup, Table } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import {
    faCalendarDays, faCaretRight, faChartBar, faLocationArrow, faStar, faCircleXmark, faDownload, faChevronCircleRight, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { startTransition, useState, useRef, useEffect } from "react";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import { toast } from "react-toastify";
import ListTeamRegister from "./ListTeamRegister";
import { getLeagueDetailByIdLeague } from "../../../services/LeagueSevice";

const cx = classNames.bind(styles);


export default function ManageTeamLeague() {
    const [activeStarIndex, setActiveStarIndex] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);
    const idLeague = useParams()
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const handleInviteClick = () => {
        setShowInviteModal(true);
    };
    // const fileInputRef = useRef(null);


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

    //add class active
    const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
    const [showAdditionalComponent1, setShowAdditionalComponent1] = useState(true);
    const [activeFormat, setActiveFormat] = useState(1);
    const handleFormatClick = (index) => {

        setActiveFormat(index);
        if (index === 0) {
            setShowAdditionalComponent(true);
        }
        else {
            setShowAdditionalComponent(false);
        }

        if (index === 1) {
            setShowAdditionalComponent1(true);
        }
        else {
            setShowAdditionalComponent1(false);
        }
    };
    //danh sách đăng ký

    const [teams, setTeams] = useState([
        {
            id: 1,
            teamName: 'Bethlehem 1',
            members: 0,
            contact: 'Bethlehem',
            contactNumber: '0362001404',
            registrationDate: '15/02/2024',
            status: 'Chờ xác nhận'
        },
        {
            id: 2,
            teamName: 'Bethlehem 2',
            members: 0,
            contact: 'Bethlehem',
            contactNumber: '0362001404',
            registrationDate: '15/02/2024',
            status: 'Chấp nhận'
        },
        {
            id: 3,
            teamName: 'Bethlehem 3',
            members: 0,
            contact: 'Bethlehem',
            contactNumber: '0362001404',
            registrationDate: '15/02/2024',
            status: 'Được mời'
        },
        {
            id: 4,
            teamName: 'Bethlehem 4',
            members: 0,
            contact: 'Bethlehem',
            contactNumber: '0362001404',
            registrationDate: '15/02/2024',
            status: 'Từ chối'
        },
        // ... other rows
    ]);
    // State để lưu trữ đội được chọn hiện tại
    const [currentTeam, setCurrentTeam] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);

    // Hàm để mở modal và đặt đội hiện tại
    const handleStatusClick = (team) => {
        setCurrentTeam(team);
        setShowStatusModal(true);
    };

    // Hàm để cập nhật trạng thái của đội bóng
    const updateTeamStatus = (newStatus) => {
        if (currentTeam) {
            setTeams(prevTeams => {
                return prevTeams.map(team => {
                    if (team.id === currentTeam.id) {
                        return { ...team, status: newStatus };
                    }
                    return team;
                });
            });
            setShowStatusModal(false);
            toast.success(`Đã ${newStatus === 'Chấp nhận' ? 'chấp nhận' : 'từ chối'} đội ${currentTeam.teamName}.`);
        }
    };

    //Modal Invite team 
    const [rows, setRows] = useState([]);

    const addRow = () => {
        setRows([...rows, {}]);
    };

    const removeRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const [leagueDetail, setLeagueDetail] = useState({});
    const [numberTeam, setNumberTeam] = useState(1);

    useEffect(() => {
        getLeagueDetailByIdLeague(idLeague.idLeague)
            .then(data => {
                setLeagueDetail(data);
                setNumberTeam(data.numberOfTeams)
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);
            });
    }, [idLeague.idLeague]);

    console.log(idLeague.idLeague);
    const teamCards = Array.from({ length: numberTeam }, (_, index) => (
        <Col xs={3} key={index}>
            <Card className="team-card">
                <Card.Img variant="top" src={images.logoteam2} className="team-logo1" />
                <Card.Body>
                    <Card.Title className="team-title">VinHome SC</Card.Title>
                    <Card.Text className="stats">
                        <p style={{ fontSize: "16px", textAlign: "center" }}>2 trận đã chơi</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Badge bg="success">2 thắng</Badge>{' '}
                            <Badge bg="warning">0 hòa</Badge>{' '}
                            <Badge bg="danger">0 thua</Badge>
                        </div>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Thành viên</ListGroup.Item>
                    <ListGroup.Item>
                        <div className="member-list">
                            <div className="card_img"><img src={images.aovang} alt="" /></div>
                            <div className="card_img"><img src={images.aovang} alt="" /></div>
                            <div className="card_img"><img src={images.aovang} alt="" /></div>
                            <div className="card_img"><p className="card_img_quantity">+7</p></div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                <Card.Footer className="team-links">
                    <Card.Text className="team-link">Liên kết đội</Card.Text>
                    <Button className="linked-button">
                        Đã liên kết
                        <FontAwesomeIcon style={{ marginLeft: "4px" }} icon={faChevronCircleRight} />
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    ));
    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague} onBtnCircleClick={() => handleBtnCircleClick(idLeague)} />
                        <Row className="team-bg_inner">
                            <Col xs={12} className="team-body_img">
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} style={{ padding: "10px 0px" }}>
                                <ul className="btn-menu">
                                    <li
                                        onClick={() => handleFormatClick(0)}
                                        className={cx('btn-menu-item border-left', { 'bg-active': activeFormat === 0, 'bg-inactive': activeFormat !== 0 })}>
                                        Danh sách đăng ký
                                    </li>
                                    <li
                                        onClick={() => handleFormatClick(1)}
                                        className={cx('btn-menu-item border-right', { 'bg-active': activeFormat === 1, 'bg-inactive': activeFormat !== 1 })}>
                                        Danh sách đội thi đấu
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        {/* đội thi đấu */}
                        <Row>
                            <Col>
                                {showAdditionalComponent1 && (
                                    <>
                                        <Row style={{ display: "flex", justifyContent: "center" }}>
                                            <Col xs={11} style={{ display: "flex", justifyContent: "space-between" }}>
                                                <div style={{ fontSize: "18px", color: "#8b8b8b" }}>Có 3 đội và 30 người chơi tham gia giải</div>
                                                <Button style={{ backgroundColor: "#fd1e50" }}>
                                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: "4px" }} />
                                                    Danh sách
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Row style={{ padding: "10px 25px", display: "flex", justifyContent: "center" }}>

                                                    {teamCards}





                                                </Row>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                                {showAdditionalComponent && (

                                    <ListTeamRegister teams={teams} onStatusClick={handleStatusClick} onInviteClick={handleInviteClick} />

                                )
                                }
                            </Col>
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
                <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
                    <Modal.Header style={{ backgroundColor: "#fd1e50", color: "white" }} closeButton>
                        <Modal.Title>Xác nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                        Bạn có muốn {currentTeam && currentTeam.status === 'Chờ xác nhận' ? 'chấp nhận' : 'từ chối'} đội {currentTeam && currentTeam.teamName}?
                        <div style={{ marginTop: "20px" }}>
                            <Button
                                style={{ margin: "0 10px", width: "150px", height: "40px" }}
                                variant="success"
                                onClick={() => updateTeamStatus('Chấp nhận')}
                            >
                                Chấp Nhận
                            </Button>
                            <Button
                                style={{ margin: "0 10px", width: "150px", height: "40px" }}
                                variant="danger"
                                onClick={() => updateTeamStatus('Từ chối')}
                            >
                                Từ Chối
                            </Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)} className="custom-modal-width">
                    <Modal.Header closeButton>
                        <Modal.Title>Mời đội tham gia giải đấu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={addRow} style={{ backgroundColor: "#fd1e50" }}>Thêm đội</Button>
                        {rows.map((row, index) => (
                            <Row key={index} style={{ width: "100%", padding: "10px" }}>
                                <Col xs={3}>
                                    <div>Tên đội được mời<span style={{ color: "red" }}>*</span></div>
                                    <input style={{ width: "100%", padding: "4px" }} type="text" placeholder="Tên đội được mời" />
                                </Col>
                                <Col>
                                    <div>Địa chỉ email<span style={{ color: "red" }}>*</span></div>
                                    <input style={{ width: "100%", padding: "4px" }} type="text" placeholder="Địa chỉ email" />
                                </Col>
                                <Col xs={3}>
                                    <div>Số điện thoại<span style={{ color: "red" }}>*</span></div>
                                    <input style={{ width: "100%", padding: "4px" }} type="text" placeholder="Số điện thoại" />
                                </Col>
                                <Col xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px" }}>
                                    <FontAwesomeIcon style={{ color: 'red', cursor: "pointer" }} icon={faTrash} onClick={() => removeRow(index)} />
                                </Col>
                            </Row>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
                            Đóng
                        </Button>
                        <Button style={{ backgroundColor: "#fd1e50" }} onClick={() => {
                            // Add functionality for sending invite here
                            setShowInviteModal(false);
                        }}>
                            Gửi lời mời
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
            <Footer />
        </div>

    );
}
