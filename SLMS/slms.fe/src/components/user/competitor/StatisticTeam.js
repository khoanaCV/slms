import styles from "../../../Assets/css/user/competitor/statisticteam.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Form, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import { faCalendar, faChevronCircleDown, faCircleXmark, faEnvelope, faPenToSquare, faPhone, faStar, faTrashCan, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import HeaderBodyTeam from "./HeaderBodyTeam";
import { GiSoccerKick } from "react-icons/gi";
import { getTeamsByTeamId } from "../../../services/TeamSevice";

const cx = classNames.bind(styles);




export default function StatisticTeam() {
    const [activeStarIndex, setActiveStarIndex] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);
    const idLeague = useParams()
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
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
    const [activeFormat, setActiveFormat] = useState(1);
    const [showAdditionalComponent1, setShowAdditionalComponent1] = useState(true);
    const [showAdditionalComponent2, setShowAdditionalComponent2] = useState(false);
    const [showAdditionalComponent3, setShowAdditionalComponent3] = useState(false);
    const [showAdditionalComponent4, setShowAdditionalComponent4] = useState(false);
    const [showAdditionalComponent5, setShowAdditionalComponent5] = useState(false);

    const handleFormatClick = (index) => {

        setActiveFormat(index);

        if (index === 1) {
            setShowAdditionalComponent1(true);
        }
        else {
            setShowAdditionalComponent1(false);
        }
        if (index === 2) {
            setShowAdditionalComponent2(true);
        }
        else {
            setShowAdditionalComponent2(false);
        }
        if (index === 3) {
            setShowAdditionalComponent3(true);
        }
        else {
            setShowAdditionalComponent3(false);
        }
        if (index === 4) {
            setShowAdditionalComponent4(true);
        }
        else {
            setShowAdditionalComponent4(false);
        }

        if (index === 5) {
            setShowAdditionalComponent5(true);
        }
        else {
            setShowAdditionalComponent5(false);
        }

    };


    //Manage nhà tài trợ
    const [sponsors, setSponsors] = useState([]); // Quản lý danh sách nhà tài trợ
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null); // Lưu index của nhà tài trợ cần xóa

    const addSponsor = () => {
        const newSponsor = { name: 'Tên nhà tài trợ', email: '', phone: '', link: '' };
        setSponsors([...sponsors, newSponsor]);
    };
    const openDeleteModal = (index) => {
        setShowDeleteModal(true);
        setDeleteIndex(index);
    };

    const deleteSponsor = () => {
        const updatedSponsors = sponsors.filter((_, index) => index !== deleteIndex);
        setSponsors(updatedSponsors);
        setShowDeleteModal(false); // Đóng modal sau khi xóa
    };
    // Thêm vào phần khai báo state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editSponsor, setEditSponsor] = useState({ name: '', email: '', phone: '', link: '' });

    // Hàm mở Modal sửa thông tin
    const openEditModal = (index) => {
        setEditIndex(index);
        setEditSponsor({ ...sponsors[index] }); // Sao chép thông tin nhà tài trợ hiện tại để sửa
        setShowEditModal(true);
    };

    // Hàm xử lý sự kiện khi thay đổi thông tin trong form sửa
    const handleEditChange = (key, value) => {
        setEditSponsor({ ...editSponsor, [key]: value });
    };

    // Hàm cập nhật thông tin nhà tài trợ
    const updateSponsor = () => {
        const updatedSponsors = [...sponsors];
        updatedSponsors[editIndex] = editSponsor;
        setSponsors(updatedSponsors);
        setShowEditModal(false); // Đóng modal sau khi cập nhật
    };

    //Cap quyen giai dau
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddMember = () => {
        // Xử lý logic khi thêm thành viên vào danh sách
        handleCloseModal(); // Đóng modal sau khi thêm thành viên
    };


    const { id } = useParams();
    const [infomationTeam, setInformationTeam] = useState([

    ])


    const [leagueImage, setLeagueImage] = useState(null);

    useEffect(() => {
        if (id) {
            getTeamsByTeamId(id)
                .then(data => {
                    setInformationTeam(data);
                    setLeagueImage(data.logo);

                })
                .catch(error => {
                    console.error('Failed to fetch leagues:', error);
                });
        }
    }, [id]);
    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "900px" }}>
                <Row style={{ width: "100%", height: "100%" }}>
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyTeam inforTeam={infomationTeam} />
                        <Row style={{ padding: "20px 10px", display: "flex", justifyContent: "center", height: "600px" }}>
                            <Col className={cx('option_body_left')} xs={2}>
                                <ul className={cx('menu_left_inner')}>
                                    <li
                                        onClick={() => handleFormatClick(1)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 1, 'inactive-menu-body': activeFormat !== 1 })}>
                                        Thành tích giải đấu
                                    </li>
                                    <li
                                        onClick={() => handleFormatClick(2)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 2, 'inactive-menu-body': activeFormat !== 2 })}>
                                        Thành tích giao hữu
                                    </li>
                                    <li
                                        onClick={() => handleFormatClick(3)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 3, 'inactive-menu-body': activeFormat !== 3 })}>
                                        Giải đấu tham gia
                                    </li>

                                </ul>
                            </Col>

                            <Col className={cx('myleague_body_right')} xs={7}>
                                <Row className={cx('body-right-header')}>
                                    <Col>Thành tích giải đấu</Col>
                                </Row>
                                <Row>
                                    <Col >
                                        {/* component item*/}
                                        <Row data-aos="fade-down" style={{ padding: "10px" }}>
                                            <Col style={{ border: "1px solid #ccd1d9", width: "100%", borderRadius: "4px" }}>
                                                <Row>
                                                    <Col className="team-statistic_header">
                                                        <div>Giải thưởng</div>
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: "0", backgroundColor: "rgb(224 244 230)" }}>
                                                    <Col >
                                                        <Row style={{ padding: "10px 10px 20px 10px" }}>
                                                            <Col xs={4}>
                                                                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Vô địch
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Giải nhì
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Giải ba
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ padding: "10px 10px 20px 10px" }}>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={4}>
                                                                <img src={images.champion} alt="" />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={4}>
                                                                <img src={images.champion2} alt='' />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={4}>
                                                                <img src={images.champion3} alt="" />
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ padding: "0 0 10px 0" }}>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}>
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row data-aos="fade-down" style={{ padding: "10px" }}>
                                            <Col style={{ border: "1px solid #ccd1d9", width: "100%", borderRadius: "4px" }}>
                                                <Row>
                                                    <Col className="team-statistic_header">
                                                        <div>Trận đấu</div>
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: "0", backgroundColor: "rgb(224 244 230)" }}>
                                                    <Col >
                                                        <Row style={{ padding: "10px 10px 20px 10px" }}>
                                                            <Col xs={3}>
                                                                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Tổng số trận
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Số trận thắng
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Số trận hoà
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Số trận thua
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                        <Row style={{ padding: "10px 10px 20px 10px" }}>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={3}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.match} alt="" />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={3}>
                                                                {/* <img style={{ width: "100%", height: "100%" }} src={images.phanluoi} alt="" /> */}
                                                                <GiSoccerKick style={{ width: "60px", height: "60px", marginTop: "20px" }} />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={3}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.phanluoi} alt="" />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={3}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.ban1tran} alt="" />
                                                            </Col>


                                                        </Row>
                                                        <Row style={{ padding: "0 0 10px 0" }}>
                                                            <Col xs={3}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}>
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row data-aos="fade-down" style={{ padding: "10px" }}>
                                            <Col style={{ border: "1px solid #ccd1d9", width: "100%", borderRadius: "4px" }}>
                                                <Row>
                                                    <Col className="team-statistic_header">
                                                        <div>Bàn thắng/thua</div>
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: "0", backgroundColor: "rgb(224 244 230)" }}>
                                                    <Col >
                                                        <Row style={{ padding: "10px 10px 20px 10px" }}>
                                                            <Col xs={4}>
                                                                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Ghi được
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Thủng lưới
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Phản lưới
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ padding: "10px 10px 20px 10px" }}>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={4}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.goals} alt="" />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={4}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.ban1tran} alt='' />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={4}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.phanluoi} alt="" />
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ padding: "0 0 10px 0" }}>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}>
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row data-aos="fade-down" style={{ padding: "10px" }}>
                                            <Col style={{ border: "1px solid #ccd1d9", width: "100%", borderRadius: "4px" }}>
                                                <Row>
                                                    <Col className="team-statistic_header">
                                                        <div>Thẻ phạt</div>
                                                    </Col>
                                                </Row>
                                                <Row style={{ padding: "0", backgroundColor: "rgb(224 244 230)" }}>
                                                    <Col >
                                                        <Row
                                                            style={{ padding: "10px 10px 20px 10px", display: "flex", justifyContent: "center" }}>
                                                            <Col xs={5}>
                                                                <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Thẻ vàng
                                                                </div>
                                                            </Col>
                                                            <Col xs={5}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    Thẻ đỏ
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                        <Row style={{ padding: "10px 10px 20px 10px", display: "flex", justifyContent: "center" }}>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={5}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.thevang} alt="" />
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center" }} xs={5}>
                                                                <img style={{ width: "100%", height: "100%" }} src={images.thedo} alt='' />
                                                            </Col>

                                                        </Row>
                                                        <Row style={{ padding: "0 0 10px 0", display: "flex", justifyContent: "center" }}>
                                                            <Col xs={5}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}
                                                                >
                                                                    0
                                                                </div>
                                                            </Col>
                                                            <Col xs={5}>
                                                                <div
                                                                    style={{ textAlign: "center", fontSize: "25px", fontWeight: "600" }}>
                                                                    0
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
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
