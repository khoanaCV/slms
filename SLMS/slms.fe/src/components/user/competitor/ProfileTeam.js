import styles from "../../../Assets/css/user/competitor/profileteam.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import HeaderBodyTeam from "./HeaderBodyTeam";
import { faArrowTurnUp, faCakeCandles, faCircleInfo, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getTeamsByTeamId } from "../../../services/TeamSevice";
import { useParams } from "react-router-dom";



const cx = classNames.bind(styles);




export default function ProfileTeam() {
    const { id } = useParams();
    const [infomationTeam, setInformationTeam] = useState([

    ])


    const [memberTeams, setMemberTeams] = useState(1);
    const [leagueImage, setLeagueImage] = useState(null);
    const [leagueImage1, setLeagueImage1] = useState(null);
    const [leagueImage2, setLeagueImage2] = useState(null);
    const [leagueImage3, setLeagueImage3] = useState(null);

    useEffect(() => {
        if (id) {
            getTeamsByTeamId(id)
                .then(data => {
                    setInformationTeam(data);
                    setLeagueImage(data.logo);
                    setLeagueImage1(data.uniForm1);
                    setLeagueImage2(data.uniForm2);
                    setLeagueImage3(data.uniForm3);


                })
                .catch(error => {
                    console.error('Failed to fetch leagues:', error);
                });
        }
    }, [id]);

    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyTeam inforTeam={infomationTeam} />
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={10} style={{ display: "flex", justifyContent: "center" }}>
                                {/* Body */}
                                <Row style={{ display: "flex", justifyContent: "center" }}>
                                    <Row style={{ padding: "20px 0" }}>
                                        <Col >
                                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                                <Col xs={12} style={{ display: "flex", alignItems: "center" }}>
                                                    <FontAwesomeIcon style={{ marginRight: "4px" }} icon={faCircleInfo} />
                                                    <div style={{ fontWeight: "600" }}>Giới thiệu</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Row style={{ display: "flex", justifyContent: "center" }}>
                                                        <Col data-aos="flip-left" xs={4}>
                                                            <Card>
                                                                <Card.Header
                                                                    style={{ backgroundColor: "#fd1e50", color: "white", textAlign: "center", fontWeight: "600" }}
                                                                >
                                                                    Số Lượng thành viên
                                                                </Card.Header>
                                                                <Card.Body style={{ textAlign: "center" }}>
                                                                    <FontAwesomeIcon style={{ fontSize: "100px", color: "#fd1e50" }} icon={faUsers} />

                                                                    <Card.Text style={{ padding: "20px" }}>
                                                                        {memberTeams}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col data-aos="flip-up" xs={4}>
                                                            <Card>
                                                                <Card.Header
                                                                    style={{ backgroundColor: "#fd1e50", color: "white", textAlign: "center", fontWeight: "600" }}
                                                                >
                                                                    Trình độ đội bóng
                                                                </Card.Header>
                                                                <Card.Body style={{ textAlign: "center" }}>
                                                                    <FontAwesomeIcon style={{ fontSize: "100px", color: "#fd1e50" }} icon={faArrowTurnUp} />

                                                                    <Card.Text style={{ padding: "20px" }}>
                                                                        {infomationTeam.level}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col data-aos="flip-right" xs={4}>
                                                            <Card>
                                                                <Card.Header
                                                                    style={{ backgroundColor: "#fd1e50", color: "white", textAlign: "center", fontWeight: "600" }}
                                                                >
                                                                    Độ tuổi trung bình
                                                                </Card.Header>
                                                                <Card.Body style={{ textAlign: "center" }}>
                                                                    <FontAwesomeIcon style={{ fontSize: "100px", color: "#fd1e50" }} icon={faCakeCandles} />

                                                                    <Card.Text style={{ padding: "20px" }}>
                                                                        {infomationTeam.ageJoin}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                                <Col xs={12} style={{ display: "flex", alignItems: "center" }}>
                                                    <FontAwesomeIcon style={{ marginRight: "4px" }} icon={faCircleInfo} />
                                                    <div style={{ fontWeight: "600" }}>Đồng phục</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4}
                                                    style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "10px" }}>
                                                    <div >Đồng phục 1</div>
                                                    <div className={cx("image-container")}>
                                                        {leagueImage1 === null && (
                                                            <img src={images.shirt} alt="Default  Image" className={cx("")} />
                                                        )}
                                                        {leagueImage1 !== null && (
                                                            <img src={leagueImage1} alt="Default  Image" className={cx("")} />
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col xs={4}
                                                    style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "10px" }}>
                                                    <div >Đồng phục 2</div>
                                                    <div className={cx("image-container")}>
                                                        {leagueImage2 === null && (
                                                            <img src={images.shirt} alt="Default  Image" className={cx("")} />
                                                        )}
                                                        {leagueImage2 !== null && (
                                                            <img src={leagueImage2} alt="Default  Image" className={cx("")} />
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col xs={4}
                                                    style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "10px" }}>
                                                    <div >Đồng phục 3</div>
                                                    <div className={cx("image-container")}>

                                                        {leagueImage3 === null && (
                                                            <img src={images.shirt} alt="Default  Image" className={cx("")} />
                                                        )}
                                                        {leagueImage3 !== null && (
                                                            <img src={leagueImage3} alt="Default  Image" className={cx("")} />
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </Container>
            <Footer />
        </div>

    );
}
