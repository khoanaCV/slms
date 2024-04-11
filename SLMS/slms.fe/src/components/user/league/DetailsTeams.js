import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Card, ListGroup, Image, Badge, Modal, ListGroupItem, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faSoccerBall, faSquare, faCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import HeaderBodyLeague from '../../common/HeaderBodyLeague';
import styles from "../../../Assets/css/user/league/detailsteam.css"
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import images from "../../../Assets/images";
import { icon } from '@fortawesome/fontawesome-svg-core';
const cx = classNames.bind(styles);
const fakeData = {
    teamInfo: {
        logo: 'example',
        name: "CĐ Augustino Thanh Thuỷ",
        representative: "Nguyễn Hoàng",
        linked: true,
        achievements: "View More",
        matchesPlayed: 7,
        stats: { wins: 5, draws: 2, losses: 0 }
    },
    players: [
        {
            id: 1,
            name: "QUANG TỤNG",
            position: "Thủ môn",
            number: 1,
            avatar: 'https://html.com/wp-content/uploads/flamingo.jpg',
            scores: 0,
            yellows: 1,
            reds: 0
        },
        {
            id: 2,
            name: "QUANG TỤNG",
            position: "Goalkeeper",
            number: 1,
            avatar: 'https://html.com/wp-content/uploads/flamingo.jpg',
            scores: 0,
            yellows: 1,
            reds: 0
        },
        {
            id: 3,
            name: "QUANG TỤNG",
            position: "Goalkeeper",
            number: 1,
            avatar: 'https://html.com/wp-content/uploads/flamingo.jpg',
            scores: 0,
            yellows: 1,
            reds: 0
        },
        {
            id: 4,
            name: "QUANG TỤNG",
            position: "Goalkeeper",
            number: 1,
            avatar: 'https://html.com/wp-content/uploads/flamingo.jpg',
            scores: 0,
            yellows: 1,
            reds: 0
        },
        // More players...
    ],
    matches: [
        {
            id: "8640611",
            date: "19:30-08/10/2023",
            teams: [
                {
                    name: "CĐ Vinh - Hà Tĩnh",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgolBdeaXdt7hZ4G28YiA8shOCg4jkBg08uA&usqp=CAU",
                    score: 0,
                    subscore: 0,
                    yellowCards: 1,
                    redCards: 0,
                },
                {
                    name: "CĐ Augustino Thanh Thuỷ",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgolBdeaXdt7hZ4G28YiA8shOCg4jkBg08uA&usqp=CAU",
                    score: 0,
                    subscore: 0,
                    yellowCards: 2,
                    redCards: 0,
                }
            ],
            location: "Chưa cập nhật",
            phase: "Vòng 1",
            matchDetailLink: "example",
            matchPublicationLink: "example",
            events: [
                { time: "10'", detail: "Phạm Quốc Chung", team: 1, icon: images.vao },
                { time: "35'", detail: "Nguyễn Văn Huấn", team: 1, icon: images.yellowcard },
                { time: "50'", detail: "QUỐC ST", team: 2, icon: images.vao },
                { time: "75'", detail: "QUÂN TÍP", team: 2, icon:images.redcard },
                // More events...
            ]
        },
        {
            id: "8640611",
            date: "19:30-08/10/2023",
            teams: [
                {
                    name: "CĐ Vinh - Hà Tĩnh",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgolBdeaXdt7hZ4G28YiA8shOCg4jkBg08uA&usqp=CAU",
                    score: 0,
                    subscore: 0,
                    yellowCards: 1,
                    redCards: 0,
                },
                {
                    name: "CĐ Augustino Thanh Thuỷ",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgolBdeaXdt7hZ4G28YiA8shOCg4jkBg08uA&usqp=CAU",
                    score: 0,
                    subscore: 0,
                    yellowCards: 2,
                    redCards: 0,
                }
            ],
            location: "Chưa cập nhật",
            phase: "Vòng 1",
            matchDetailLink: "example",
            matchPublicationLink: "example",
            events: [
                { time: "10'", detail: "Phạm Quốc Chung", team: 1, icon: images.vao },
                { time: "35'", detail: "Nguyễn Văn Huấn", team: 1, icon: images.yellowcard },
                { time: "50'", detail: "QUỐC ST", team: 2, icon: images.vao },
                { time: "75'", detail: "QUÂN TÍP", team: 2, icon:images.redcard },
                // More events...
            ]
        },
        // Additional matches can be added here following the same structure.
    ]
};

const TeamOverview = () => {
    const { teamInfo } = fakeData;
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col sm={12}>
                        <div className="competitor-info">
                            <div className='img-competitor-container'>
                                <Image
                                    className="competitor-info__img"
                                    src="https://html.com/wp-content/uploads/flamingo.jpg" // Change this to actual image source if needed
                                    roundedCircle
                                />
                            </div>
                            <div className="competitor-info__des">
                                <h4 style={{ marginLeft: "15px", color: "#fd1e50" }}>

                                    {teamInfo.name}

                                </h4>
                                <div className="flex-extend">
                                    <div className="competitor-info__manager">
                                        <p className="label-1">Người đại diện</p>
                                        <p className="value">{teamInfo.representative}</p>
                                    </div>
                                    <div className="competitor-info__manager">
                                        <p className="label-1">Liên kết đội</p>
                                        <p className="value">
                                            <Badge bg="success" text="light">
                                                Đã liên kết <FontAwesomeIcon icon={faAngleRight} />
                                            </Badge>
                                        </p>
                                    </div>
                                    <div className="competitor-info__manager">
                                        <p className="label-1">Thành tích</p>
                                        <div className="value">
                                            <Link style={{ textDecoration: "none", color: "#fd1e50" }} href="" >
                                                Xem thêm <FontAwesomeIcon icon={faAngleRight} />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="competitor-info__manager">
                                        <p className="label-1">Số trận đã chơi</p>
                                        <p className="value">{teamInfo.matchesPlayed} trận</p>
                                    </div>
                                    <div className="competitor-info__manager">
                                        <p className="label-1">thắng - hòa - thua</p>
                                        <div className="value">
                                            <Badge bg="success">{teamInfo.stats.wins}</Badge> -
                                            <Badge bg="warning">{teamInfo.stats.draws}</Badge> -
                                            <Badge bg="danger">{teamInfo.stats.losses}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

const PlayerInfo = ({ players }) => {
    return (
        <Row>
            {players.map((player, index) => (
                <Col sm={6} key={player.id}>
                    <Card className="mb-3">
                        <Card.Header as="h5">{player.name}</Card.Header>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <div className="d-flex">
                                    <Image
                                        src={player.avatar}
                                        roundedCircle
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        className="mr-3"
                                    />
                                    <div>
                                        <Card.Title>{player.name}</Card.Title>
                                        <Card.Text>Vị trí thi đấu: {player.position}</Card.Text>
                                        <Card.Text>Số áo: {player.number}</Card.Text>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <ul className="list-inline">
                                    <li className="list-inline-item">{player.scores} <i className="fa fa-soccer-ball-o"></i></li>
                                    <li className="list-inline-item">{player.yellows} <span className="card card--yellow"></span></li>
                                    <li className="list-inline-item">{player.reds} <span className="card card--red"></span></li>
                                </ul>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

const MatchList = ({ matches }) => {
    const [selectedMatch, setSelectedMatch] = useState(null);

    const handleMatchSelect = (match) => {
        setSelectedMatch(match);
    };

    const handleCloseModal = () => {
        setSelectedMatch(null);
    };

    return (
        <>
            {matches.map((match) => (
                <Card style={{ cursor: "pointer" }} key={match.id} className="match-card" onClick={() => handleMatchSelect(match)}>
                    <Card.Header as="h5" style={{ display: "flex", alignItems: "center" }}>
                        <h5 style={{ marginBottom: "0" }}>{match.phase.toUpperCase()}</h5>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className='logo-team-details'>
                                            <img src={match.teams[0].logo} alt={`Logo of ${match.teams[0].name}`} />
                                        </div>
                                        <strong style={{ padding: "0 10px" }} className="ml-2">{match.teams[0].name}</strong>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            width: "15%",
                                            backgroundColor: "#fd1e50",
                                            borderRadius: "8px",
                                            padding: "8px 0"
                                        }}
                                    >
                                        <span style={{ color: "white", textAlign: "center", }}>
                                            {match.teams[0].score} - {match.teams[1].score}
                                        </span>
                                        {/* <span style={{color:"#8a8989",textAlign:"center"}}>
                                            {match.teams[0].subscore} - {match.teams[1].subscore}
                                        </span> */}
                                        <span style={{ color: "white", textAlign: "center" }}>
                                            {match.date}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <strong style={{ padding: "0 10px" }} className="mr-2">{match.teams[1].name}</strong>
                                        <div className='logo-team-details'>
                                            <img src={match.teams[1].logo} alt={`Logo of ${match.teams[1].name}`} />
                                        </div>
                                    </div>
                                </div>
                            </ListGroupItem>

                        </ListGroup>
                    </Card.Body>
                </Card>
            ))}
            {selectedMatch && <MatchDetailModal match={selectedMatch} handleClose={handleCloseModal} />}
        </>
    );
};

const MatchDetailModal = ({ match, handleClose }) => {
    const eventItems = match.events.map((event, index) => (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 30px" }}>

            <div key={index} style={{ marginBottom: '20px' }}>
                {event.team === 1 &&
                    <div style={{ fontSize: "16px", fontWeight:"600px" }}>
                       <img style={{ width: "30px", height: "30px" }} src={event.icon} alt="" />
                        {event.detail} ( {event.time} ) 
                    </div>
                }
            </div>
            <div key={index} style={{ marginBottom: '20px' }}>
            {event.team === 2 &&
                    <div style={{ fontSize: "16px", fontWeight:"600px" }}>
                        ( {event.time} ){event.detail}
                        <img style={{ width: "30px", height: "30px" }} src={event.icon} alt="" />
                    </div>
                }
            </div>
        </div>
    ));

    return (
        <Modal show={!!match} onHide={handleClose} className="custom-modal-width">
            <Modal.Header closeButton>
                <Modal.Title>Match Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                    <div style={{ textAlign: "center" }}>
                        <img style={{ marginBottom: "8px" }} src={match.teams[0].logo} alt={`Logo of ${match.teams[0].name}`} width="100" height="100" />
                        <h4 style={{ wordWrap: "break-word", wordBreak: "break-word", color: "#fd1e50" }}>{match.teams[0].name} </h4>
                    </div>
                    <div style={{ color: "black", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span>{match.teams[0].score} - {match.teams[1].score}</span>
                        <span> {match.date}</span>
                        <span>{match.location}</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <img style={{ marginBottom: "8px" }} src={match.teams[1].logo} alt={`Logo of ${match.teams[1].name}`} width="100" height="100" />
                        <h4 style={{ wordWrap: "break-word", wordBreak: "break-word", color: "#fd1e50" }}>{match.teams[1].name} </h4>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid #d9d9d9" }}>
                    {eventItems}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default function DetailsTeams() {
    const [activeKey, setActiveKey] = useState('matches');
    return (
        <Container fluid>
            <Header />
            <HeaderBodyLeague />
            <Container style={{ padding: "20px 0" }}>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <TeamOverview />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {/* Nav tabs */}
                                <Tab.Container id="team-details-tabs" defaultActiveKey={activeKey} onSelect={setActiveKey}>
                                    <Nav variant="tabs">
                                        <Nav.Item>
                                            <Nav.Link eventKey="matches">Trận đấu</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="players">Vận động viên</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="matches">
                                            {/* Danh sách trận đấu */}
                                            <MatchList matches={fakeData.matches} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="players">
                                            {/* Thông tin cầu thủ */}
                                            <PlayerInfo players={fakeData.players} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Container>

    );
}

