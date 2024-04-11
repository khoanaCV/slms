import styles from "../../../Assets/css/user/account/myleague.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import { faCalendar, faCircleXmark, faEnvelope, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getLeaguesByOrganizerId } from "../../../services/LeagueSevice";
import Leagues from "../league/leagues";
import { getProfileById } from "../../../services/UserSevice";

const cx = classNames.bind(styles);


const MyLeagueItem = ({ id, leagueName, avtLeague, type, numberOfPeople, user, locationStadium, handleMenuClick, currentId }) => {
    const handleClick = () => {
        handleMenuClick(currentId, id); // Gọi hàm xử lý sự kiện click và truyền id của giải đấu
    };
    return (

        <Row className={cx('body-right_menu')} onClick={handleClick}>
            <Col xs="12" className={cx('body-right_item')}>
                <Card style={{ height: "150px" }}>
                    <Card.Body>
                        <Row className="d-flex align-items-start justify-content-center" style={{ width: "100%", height: "100%" }}>
                            <Col xs={2} className="d-flex align-items-start justify-content-center" style={{ height: "100px", width: "100px", }}>
                                
                                {avtLeague === null && <Image style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} src={images.logoteam1} rounded />}
                                    {avtLeague !== null && <Image style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} src={avtLeague} rounded />}
                            </Col>
                            <Col xs={9} style={{ marginLeft: "30px", display: "flex", alignItems: "start", flexDirection: "column" }}>
                                <h4>{leagueName}</h4>
                                <div className={cx('info_league')}>
                                    {type || 'Không xác định'} || Bóng đá sân {numberOfPeople} || {user} || {locationStadium}
                                </div>
                                <Button variant="success" style={{ height: "30px" }} className={cx('btn-active1')}>
                                    Hoạt động
                                </Button>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};


export default function MyLeague() {

    //test data
    const [myleagues, setMyLeagues] = useState([
        // { id: 1, leagueName: 'FCS1', type: 'Loại trực tiếp', numberOfPeople: '7', user: "Nguyễn Rin", locationStadium: "Cầu Giấy,Hà Nội" },
        // { id: 2, leagueName: 'FCS2', type: 'Loại trực tiếp', numberOfPeople: '5', user: "Nguyễn Rin", locationStadium: "Cầu Giấy,Hà Nội" },
        // { id: 3, leagueName: 'FCS3', type: 'Đấu vòng tròn', numberOfPeople: '11', user: "Nguyễn Rin", locationStadium: "Cầu Giấy,Hà Nội" },
        // { id: 4, leagueName: 'FCS4', type: 'Loại trực tiếp', numberOfPeople: '7', user: "Nguyễn Rin", locationStadium: "Cầu Giấy,Hà Nội" },
        // { id: 5, leagueName: 'FCS5', type: 'Đấu chia bảng', numberOfPeople: '5', user: "Nguyễn Rin", locationStadium: "Cầu Giấy,Hà Nội" },

        // ... more notifications
    ]);

    const navigate = useNavigate();
    const currentToken = localStorage.getItem('token');
    //Mã hoá token
    const dataDecoded = jwtDecode(currentToken);
    const currentId = dataDecoded.id;

    const handleMenuClick = (id, currentId) => {
        navigate(`/league/dashboard/${currentId}/${id}`);
    };

    const [profileData, setProfileData] = useState({});
    //call api 
    useEffect(() => {
        if (currentId) {
            getLeaguesByOrganizerId(currentId)
                .then(data => {
                    setMyLeagues(data);
                })
                .catch(error => {
                    console.error('Failed to fetch leagues:', error);
                });
        }

        getProfileById(currentId)
            .then(response => {
                setProfileData(response.data);
            })
    }, [currentId]);

    // console.log(myleagues);
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
                                            <Link to={'/account/myleague'} className={cx("menu_header-item active-color-white")}>Quản lý giải đấu</Link>
                                            <Link to={'/account/mycompetitor'} className={cx("menu_header-item active-color-xam")}>Quản lý đội</Link>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                        <Row className={cx("infomation-myleague-body")}>
                            <Col className={cx('myleague_body_left')} xs={2}>
                                <ul className={cx('menu_left_inner')}>
                                    <li className={cx('menu_left_item active-menu-body')}>
                                        Giải đấu đã tạo
                                    </li>
                                    <li className={cx('menu_left_item inactive-menu-body')}>

                                    </li>
                                    <li className={cx('menu_left_item inactive-menu-body')}>

                                    </li>
                                </ul>
                            </Col>
                            <Col className={cx('myleague_body_right')} xs={7}>
                                <Row className={cx('body-right-header')}>
                                    <Col>Giải đấu đã tạo</Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <Button href="/league/create-league" style={{ backgroundColor: "#FD1E50" }}>Tạo giải đấu</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={cx('body-right_wrapper')}>
                                        {myleagues.map((myleague, index) => (
                                            <MyLeagueItem key={index}
                                                id={myleague.id}
                                                currentId={currentId}
                                                avtLeague={myleague.imageLeague}
                                                leagueName={myleague.leagueName}
                                                type={myleague.competitionFormatName}
                                                numberOfPeople={myleague.numberOfPlayersPerTeamRange}
                                                user={myleague.organizerName}
                                                locationStadium={myleague.location}
                                                handleMenuClick={() => handleMenuClick(myleague.id, currentId)} />
                                        ))}


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
