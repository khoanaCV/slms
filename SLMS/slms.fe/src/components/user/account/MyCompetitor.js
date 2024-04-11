import styles from "../../../Assets/css/user/account/mycompetitor.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, ListGroup } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import { faCalendar, faCircleXmark, faEnvelope, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getTeamsByUserId } from "../../../services/TeamSevice";
import { getProfileById } from "../../../services/UserSevice";

const cx = classNames.bind(styles);

const TeamCard = ({ logo, name, description, memberCount, players, handleMenuClick }) => {


    return (
        <Col xs={4}>
            <Card style={{ cursor: "pointer" }} className="team-card" onClick={handleMenuClick}>
                <div className="team-logo-container">
                    <Card.Img variant="top" src={logo} className="team-logo1" />
                    {logo === null && <Card.Img variant="top" src={images.logoteam1} className="team-logo1" />}
                    {logo !== null && <Card.Img variant="top" src={logo} className="team-logo1" />}
                </div>
                <Card.Body>
                    <Card.Title className="team-title" style={{ color: 'black' }}>{name}</Card.Title>
                    <Card.Text style={{ fontWeight: "300", fontSize: "16px", color: "#8d8d8d", textAlign: "center" }}>{description}</Card.Text>

                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Thành viên</ListGroup.Item>
                    <ListGroup.Item>

                        <div className="member-list">
                            <div className="member-list">
                                {players && players.length > 0 ? (
                                    <>
                                        {players.slice(0, 3).map((member, index) => (
                                            <div className="card_img1" key={index}>
                                                {member.avatar === null ? (
                                                    <img className="card_img-ex" src={images.avtplayerdf} alt="" />
                                                ) : (
                                                    <img className="card_img-ex" src={member.avatar} alt="" />
                                                )}
                                            </div>
                                        ))}
                                        {memberCount > 3 && (
                                            <div className="card_img1">
                                                <p className="card_img_quantity1">+{memberCount - 3}</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="">
                                        <p style={{fontSize:"16px"}}>Chưa có thành viên.</p>
                                    </div>
                                )}
                            </div>



                        </div>
                    </ListGroup.Item>
                </ListGroup>

            </Card>
        </Col>
    );
};



export default function MyCompetitor() {



    //     {
    //         id: 1,
    //         logo: images.logodefault, // Thay thế với đường dẫn hình ảnh của bạn
    //         name: 'Tên đội',
    //         description: 'Mô tả',
    //         memberCount: 5, // Số lượng thành viên
    //         members: [
    //             {
    //                 id: 1,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 2,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 3,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 3,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 3,
    //                 avt: images.aovang,
    //             },
    //         ]
    //     },
    //     {
    //         id: 2,
    //         logo: images.logodefault, // Thay thế với đường dẫn hình ảnh của bạn
    //         name: 'Tên đội 1',
    //         description: 'Mô tả 1',
    //         memberCount: 5, // Số lượng thành viên
    //         members: [
    //             {
    //                 id: 1,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 2,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 3,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 3,
    //                 avt: images.aovang,
    //             },
    //             {
    //                 id: 3,
    //                 avt: images.aovang,
    //             },
    //         ]
    //     },
    // ];


    const [teamInfo, setTeamInfo] = useState([]);
    const navigate = useNavigate();


    const currentToken = localStorage.getItem('token');
    //Mã hoá token
    const dataDecoded = jwtDecode(currentToken);
    const currentId = dataDecoded.id;

    const handleMenuClick = (id) => {
        navigate(`/competitor/${currentId}/${id}/profile`);
    };

    const [profileData, setProfileData] = useState({});
    //call api
    useEffect(() => {
        getTeamsByUserId(currentId)
            .then(data => {
                setTeamInfo(data);
            })
            .catch(error => {
                console.error("Failed to fetch teams:", error);
            });
        getProfileById(currentId)
            .then(response => {
                setProfileData(response.data);
            })
    }, [currentId]);

    const formattedDate = profileData.birthDate?.split("T")[0] ?? "";
    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <Row className={cx("infomation-myleague_header")}>
                            <Col style={{ padding: "0" }}>
                                <Row >
                                    <Col style={{ display: "flex", justifyContent: "center", padding: "0" }}>
                                        <div>
                                            <img src={profileData.avatar || images.logoteam1} alt="Hình ảnh giải đấu" className={cx("user-image-preview")} />
                                        </div>
                                        <div className={cx('user_info-inner')}>
                                            <h4 className={cx('user_info-name')}>{profileData.fullname}</h4>
                                            <div className={cx('user_info-item')}>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                                <p className="user_info">{profileData.email}</p>
                                            </div>
                                            <div className={cx('user_info-item')}>
                                                <FontAwesomeIcon icon={faPhone} />
                                                <p className="user_info">{profileData.contactInfo}</p>
                                            </div>
                                            <div className={cx('user_info-item')}>
                                                <FontAwesomeIcon icon={faCalendar} />
                                                <p className="user_info">{formattedDate}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ padding: "0" }}>
                                        <div className={cx("menu_header-inner")}>
                                            <Link to={'/account/myleague'} className={cx("menu_header-item active-color-xam")}>Quản lý giải đấu</Link>
                                            <Link to={'/account/mycompetitor'} className={cx("menu_header-item  active-color-white")}>Quản lý đội</Link>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                        <Row className={cx("infomation-myleague-body")}>
                            <Col className={cx('myleague_body_left')} xs={2}>
                                <ul className={cx('menu_left_inner')}>
                                    <li className={cx('menu_left_item active-menu-body')}>
                                        Đội đã tạo
                                    </li>
                                    <li className={cx('menu_left_item inactive-menu-body')}>

                                    </li>
                                    <li className={cx('menu_left_item inactive-menu-body')}>

                                    </li>
                                </ul>
                            </Col>
                            <Col className={cx('myleague_body_right')} xs={7}>
                                <Row className={cx('body-right-header')}>
                                    <Col>Đội đã tạo</Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <Button href="/mycompetitor/create" style={{ backgroundColor: "#FD1E50" }}>Tạo đội</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={cx('body-right_wrapper')}>
                                        {/* Các item ở đây */}
                                        <Row>
                                            {teamInfo.map((myTeams, index) => (
                                                <TeamCard key={index} {...myTeams} handleMenuClick={() => handleMenuClick(myTeams.id)} />
                                            ))
                                            }
                                        </Row>

                                    </Col>
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
