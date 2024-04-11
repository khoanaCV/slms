import styles from "../../../Assets/css/user/league/optionleague.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Form, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import { faCalendar, faChevronCircleDown, faCircleXmark, faEnvelope, faPenToSquare, faPhone, faStar, faTrashCan, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import { addNewSponsor, deleteSponsorByLeagueIdAndId, getLeagueDetailByIdLeague, getSponsorByLeagueId, getSponsorByLeagueIdAndId, updateSponsorByLeagueIdAndId } from "../../../services/LeagueSevice";

const cx = classNames.bind(styles);




export default function OptionLeague() {
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
    const [showAddSponsorModal, setShowAddSponsorModal] = useState(false);
    const [newSponsor, setNewSponsor] = useState({
        name: '',
        email: '',
        phone: '',
        link: '',
        image: images.aovang
    });


    const handleShowAddSponsorModal = () => {
        setShowAddSponsorModal(true);
    };

    const handleAddNewSponsor = () => {
        const formData = new FormData();
        formData.append('SponsorName', newSponsor.name);
        formData.append('SponsorInfo', newSponsor.email);
        formData.append('SponsorPhone', newSponsor.phone);
        formData.append('SponsorLink', newSponsor.link);
        formData.append('TournamentId', idLeague.idLeague);

        // Thêm file ảnh vào formData nếu người dùng đã chọn file
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            formData.append('SponsorLogo', fileInputRef.current.files[0]);
        }

        // Gọi API để thêm nhà tài trợ mới
        addNewSponsor(idLeague.idLeague, formData).then(data => {
            // Xử lý kết quả trả về từ API
            toast.success('Thêm nhà tài trợ thành công')
            // Đặt lại form và đóng Modal


            setShowAddSponsorModal(false); // Đóng Modal sau khi thêm
            getSponsorByLeagueId(idLeague.idLeague)
                .then(data => {
                    setSponsors(data); // Giả sử API trả về một mảng các nhà tài trợ
                })
                .catch(error => {
                    console.error("Error fetching sponsors:", error);
                });

            // Đặt lại form
            setNewSponsor({ name: '', email: '', phone: '', link: '', image: images.aovang });
        }).catch(error => {
            // Xử lý lỗi nếu có
            console.log(newSponsor);
            toast.error('Thêm nhà tài trợ thất bại')
            console.error("Có lỗi khi thêm nhà tài trợ mới:", error);
        });

    };

    const fileInputRef = useRef(null);

    const handleImageavtClick = () => {
        fileInputRef.current.click();
    };
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.onload = (e) => {
                setNewSponsor({ ...newSponsor, image: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef1 = useRef(null);

    const handleImageavtClick1 = () => {
        fileInputRef1.current.click();
    };
    const handleImageChange1 = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.onload = (e) => {
                setEditSponsor({ ...editSponsor, sponsorLogo: e.target.result })
            };
            reader.readAsDataURL(file);
        }
    };

    // const addSponsor = () => {
    //     const newSponsor = { name: 'Tên nhà tài trợ', email: '', phone: '', link: '' };
    //     setSponsors([...sponsors, newSponsor]);
    // };
    const openDeleteModal = (id) => {
        setShowDeleteModal(true);
        setDeleteIndex(id);
    };

    const deleteSponsor = () => {
        deleteSponsorByLeagueIdAndId(deleteIndex, idLeague.idLeague)
            .then(data => {
                toast.success('Xoá nhà tài trợ thành công.')
                setShowDeleteModal(false);
                getSponsorByLeagueId(idLeague.idLeague)
                    .then(data => {
                        setSponsors(data); // Giả sử API trả về một mảng các nhà tài trợ
                    })
                    .catch(error => {
                        console.error("Error fetching sponsors:", error);
                    });
            })
            .catch(error => {
                console.error("Error fetching sponsors:", error);
                toast.error('Xoá nhà tài trợ thất bại.')
            });
        // Đóng modal sau khi xóa
    };
    // Thêm vào phần khai báo state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editSponsor, setEditSponsor] = useState({});



    const [leagueImage, setLeagueImage] = useState(null);
    const [sponsorImage, setSponsorImage] = useState(null);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSponsorImage(file)
            const reader = new FileReader();
            reader.onload = (e) => {
                setLeagueImage(e.target.result);
            };
            setLeagueImage(reader.readAsDataURL(file));
        }
    };



    const handleImageClick = () => {
        // Truy cập input khi hình ảnh được click
        document.getElementById('leagueImageInput').click();
    };


    // Hàm mở Modal sửa thông tin
    const openEditModal = (id) => {
        // Sao chép thông tin nhà tài trợ hiện tại để sửa

        getSponsorByLeagueIdAndId(id, idLeague.idLeague)
            .then(data => {
                setEditSponsor(data);
                setLeagueImage(data.sponsorLogo || images.aovang);
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching sponsors:", error);
            });
        setShowEditModal(true);
        localStorage.setItem('idSponsor', id);
    };

    // Hàm xử lý sự kiện khi thay đổi thông tin trong form sửa
    const handleEditChange = (key, value) => {
        setEditSponsor({ ...editSponsor, [key]: value });
    };


    // Hàm cập nhật thông tin nhà tài trợ

    const updateSponsor = () => {
        const formData = new FormData();
        formData.append('SponsorName', editSponsor.sponsorName);
        formData.append('SponsorInfo', editSponsor.sponsorInfo);
        formData.append('SponsorPhone', editSponsor.sponsorPhone);
        formData.append('SponsorLink', editSponsor.sponsorLink);
        formData.append('TournamentId', idLeague.idLeague);


        if (sponsorImage) {
            formData.append('SponsorLogo', sponsorImage);
        } else {
            formData.append('SponsorLogo', leagueImage);
        }


        updateSponsorByLeagueIdAndId(localStorage.getItem('idSponsor'), idLeague.idLeague, formData)
            .then(data => {
                setEditSponsor(data);
                toast.success('Sửa thông tin thành công.')
                setShowEditModal(false);
                getSponsorByLeagueId(idLeague.idLeague)
                    .then(data => {
                        setSponsors(data); // Giả sử API trả về một mảng các nhà tài trợ
                    })
                    .catch(error => {
                        console.error("Error fetching sponsors:", error);
                    });
                localStorage.removeItem('idSponsor');
            })
            .catch(error => {
                console.error("Error fetching sponsors:", error);
                toast.error('Sửa thông tin thất bại.')
            });

        // Đóng modal sau khi cập nhật
    };

    //Cap quyen giai dau
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddMember = () => {
        // Xử lý logic khi thêm thành viên vào danh sách
        handleCloseModal(); // Đóng modal sau khi thêm thành viên
    };



    const [leagueDetail, setLeagueDetail] = useState({});
    const [numberTeam, setNumberTeam] = useState(1);


    const teamCards = Array.from({ length: numberTeam }, (_, index) => (
        <Row key={index} className="menu-teams_item" style={{ padding: "10px 0", borderBottom: "1px solid #d8d8d8" }}>
            <Col xs={2} onClick={handleImageClick}>
                <div style={{ width: "100%", height: "150px", cursor: "pointer" }} className={cx("image-container")}>
                    {leagueImage === null && (
                        <>
                            <img style={{ width: "100%", height: "150px" }} src={images.logodefault} alt="Default League Image" className={cx("default-league-image")} />
                            <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                        </>
                    )}
                    {leagueImage !== null && (
                        <>
                            <img style={{ width: "100%", height: "150px" }} onClick={handleImageClick} src={leagueImage} alt="Hình ảnh giải đấu" className={cx("league-image-preview")} />
                            <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                        </>

                    )}
                </div>
            </Col>
            <Col xs={1}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}>
                    <FontAwesomeIcon style={{ margin: "10px 0", fontSize: "25px", color: "green" }} icon={faUsersLine} />
                    <FontAwesomeIcon style={{ margin: "10px 0", fontSize: "25px", color: "red" }} icon={faTrashCan} />
                </div>
            </Col>
            <Col xs={9}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Tên đội" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="SĐT liên hệ" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Tên người liên hệ" />
                </Form.Group>
            </Col>
        </Row>
    ));

    // console.log(leagueImage);

    //getAll sponsor
    useEffect(() => {
        getSponsorByLeagueId(idLeague.idLeague)
            .then(data => {
                setSponsors(data); // Giả sử API trả về một mảng các nhà tài trợ
            })
            .catch(error => {
                console.error("Error fetching sponsors:", error);
            });
    }, [idLeague.idLeague]);

    console.log(editSponsor.sponsorLogo);
    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "400px" }}>
                <Row style={{}}>
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague} onBtnCircleClick={() => handleBtnCircleClick(idLeague)} />
                        <Row style={{ padding: "20px 10px", display: "flex", justifyContent: "center", height: "500px" }}>
                            <Col className={cx('option_body_left')} xs={2}>
                                <ul className={cx('menu_left_inner')}>
                                    <li
                                        onClick={() => handleFormatClick(1)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 1, 'inactive-menu-body': activeFormat !== 1 })}>
                                        Phân quyền
                                    </li>
                                    <li
                                        onClick={() => handleFormatClick(2)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 2, 'inactive-menu-body': activeFormat !== 2 })}>
                                        Quản lý đội
                                    </li>
                                    <li
                                        onClick={() => handleFormatClick(3)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 3, 'inactive-menu-body': activeFormat !== 3 })}>
                                        Sắp xếp cặp đấu
                                    </li>
                                    <li
                                        onClick={() => handleFormatClick(4)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 4, 'inactive-menu-body': activeFormat !== 4 })}>
                                        Quản lý lịch thi đấu
                                    </li>
                                    <li
                                        onClick={() => handleFormatClick(5)}
                                        className={cx('menu_left_item', { 'active-menu-body': activeFormat === 5, 'inactive-menu-body': activeFormat !== 5 })}>
                                        Nhà tài trợ
                                    </li>
                                </ul>
                            </Col>
                            {showAdditionalComponent1 && (
                                <Col className={cx('myleague_body_right')} xs={7}>
                                    <Row className={cx('body-right-header')}>
                                        <Col>Cấp quyền quản lý giải đấu</Col>

                                    </Row>
                                    <Row>
                                        <Col >
                                            <Row>
                                                <Col style={{ textAlign: "right", marginTop: "10px" }}>
                                                    <Button style={{ backgroundColor: "#FD1E50" }} onClick={handleShowModal}>Thêm thành viên</Button>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "10px" }}>
                                                <Col >
                                                    <Row>
                                                        <table className="table dataTable no-footer" id="adminTournament">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="" rowspan="1" colspan="1" aria-label="Tên" style={{ width: '501px' }}>Tài khoản Email</th>
                                                                    <th className="width150 text-center sorting" id="intro-vaitro" tabindex="0" rowspan="1" colspan="1" style={{ width: '154px' }}>Vai trò
                                                                        <span style={{ color: '#1c752c' }} className="hvr-pulse-grow">
                                                                            <i className="fa fa-question-circle-o hvr-icon" data-toggle="modal" data-target="#tourRoleLeague"></i>
                                                                        </span>
                                                                    </th>

                                                                    <th className="width100 text-center sorting_disabled" rowspan="1" colspan="1" aria-label="Thao tác" style={{ width: '100px' }}>Thao tác</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr role="row" className="adminLeague">
                                                                    <td className="sorting_1">Rin Nguyễn - vanrin112002@gmail.com</td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                                                Người tạo giải đấu
                                                                            </Dropdown.Toggle>

                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item href="#/action-1">Người tạo giải đấu</Dropdown.Item>
                                                                                <Dropdown.Item href="#/action-2">Thư ký</Dropdown.Item>
                                                                                <Dropdown.Item href="#/action-3">Trọng tài 1</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </td>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <Button variant="danger">Xoá</Button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ textAlign: "center" }}>
                                                            <Button style={{ backgroundColor: "#FD1E50", width: "80px", border: "none" }}>Lưu</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Col>
                            )}
                            {showAdditionalComponent2 && (
                                <Col className={cx('myleague_body_right')} xs={7}>
                                    <Row className={cx('body-right-header')}>
                                        <Col>Quản lý đội</Col>

                                    </Row>
                                    <Row>
                                        <Col className="menu-manager_teams">
                                            {/* Code body here */}

                                            {teamCards}
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "10px 0" }}>
                                        <Col style={{ textAlign: "center" }}>
                                            <Button style={{ backgroundColor: "#FD1E50", width: "80px", border: "none" }}>Lưu</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                            {showAdditionalComponent3 && (
                                <Col className={cx('myleague_body_right')} xs={7}>
                                    <Row className={cx('body-right-header')}>
                                        <Col>Sắp xếp cặp thi đấu</Col>

                                    </Row>
                                    <Row>
                                        <Col >
                                            {/* Code body here */}
                                            <Row>
                                                <Col style={{ padding: "10px 20px" }}>
                                                    <div style={{ color: "#8d8d8d" }}>
                                                        Bạn có thể thay đổi cấu hình cho từng trận đấu
                                                    </div>
                                                    <Button style={{ backgroundColor: "#FD1E50", width: "200px", border: "none" }}>Bốc thăm ngẫu nhiên</Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ul className={cx("rounds_menu_setting")}>
                                                        <li className={cx("rounds_item_setting active_item-bg")}>1</li>
                                                        <li className={cx("rounds_item_setting")}>2</li>
                                                        <li className={cx("rounds_item_setting")}>3</li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col style={{ height: "600px", overflowY: "auto" }}>
                                                    <div className="sortable roundInfo" id="1/2">
                                                        <div className="round panel-border clearfix panel-padding">
                                                            <span id="name_1/2" className="name-round">Vòng 1</span>
                                                            <span className="fa fa-arrows pull-right hidden" data-place="bottom"></span>
                                                            <div className="match" group="matchgroup">
                                                                <div className="match_inner">
                                                                    <span className="stt">#1</span>
                                                                    <div className="matchInfo " id="1/21">
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorA " id="matchA_8995919">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601" selected>3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="175601" />
                                                                        </div>
                                                                        <div className="text-center versus">-</div>
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorB " id="matchB_8995919">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249" selected>2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="171249" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="match_inner">
                                                                    <span className="stt">#2</span>
                                                                    <div className="matchInfo " id="1/22">
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorA " id="matchA_8995920">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602" selected>4</option>
                                                                            </select>
                                                                            <input type="hidden" value="175602" />
                                                                        </div>
                                                                        <div className="text-center versus">-</div>
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorB " id="matchB_8995920">
                                                                                <option value="171248" selected>1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="171248" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="match_inner">
                                                                    <span className="stt">#3</span>
                                                                    <div className="matchInfo " id="1/21">
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorA " id="matchA_8995919">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601" selected>3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="175601" />
                                                                        </div>
                                                                        <div className="text-center versus">-</div>
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorB " id="matchB_8995919">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249" selected>2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="171249" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="match_inner">
                                                                    <span className="stt">#4</span>
                                                                    <div className="matchInfo " id="1/22">
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorA " id="matchA_8995920">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602" selected>4</option>
                                                                            </select>
                                                                            <input type="hidden" value="175602" />
                                                                        </div>
                                                                        <div className="text-center versus">-</div>
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorB " id="matchB_8995920">
                                                                                <option value="171248" selected>1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="171248" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="match_inner">
                                                                    <span className="stt">#5</span>
                                                                    <div className="matchInfo " id="1/21">
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorA " id="matchA_8995919">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601" selected>3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="175601" />
                                                                        </div>
                                                                        <div className="text-center versus">-</div>
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorB " id="matchB_8995919">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249" selected>2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="171249" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="match_inner">
                                                                    <span className="stt">#6</span>
                                                                    <div className="matchInfo " id="1/22">
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorA " id="matchA_8995920">
                                                                                <option value="171248">1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602" selected>4</option>
                                                                            </select>
                                                                            <input type="hidden" value="175602" />
                                                                        </div>
                                                                        <div className="text-center versus">-</div>
                                                                        <div className="competitor-container">
                                                                            <select className="team form-control competitorB " id="matchB_8995920">
                                                                                <option value="171248" selected>1</option>
                                                                                <option value="171249">2</option>
                                                                                <option value="175601">3</option>
                                                                                <option value="175602">4</option>
                                                                            </select>
                                                                            <input type="hidden" value="171248" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", justifyContent: "center" }}>
                                                    <Button style={{ backgroundColor: "#FD1E50", width: "80px", border: "none" }} onClick={handleShowModal}>Lưu</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                            {showAdditionalComponent4 && (
                                <Col className={cx('myleague_body_right')} xs={7}>
                                    <Row className={cx('body-right-header')}>
                                        <Col>Quản lý lịch thi đấu</Col>

                                    </Row>
                                    <Row>
                                        <Col >
                                            {/* Code body here */}
                                            <Row>
                                                <Col style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>
                                                    <div style={{ color: "#8d8d8d" }}>
                                                        Bạn có thể quản lý địa điểm thi đấu
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <div style={{ cursor: "pointer", color: "green" }}>Tải về tệp tin mẫu</div>
                                                        <Button
                                                            style={{ backgroundColor: "#FD1E50", width: "120px", border: "none", marginLeft: "4px" }}>
                                                            Nhập tập tin
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ul className={cx("rounds_menu_setting")}>
                                                        <li className={cx("rounds_item_setting active_item-bg")}>1</li>
                                                        <li className={cx("rounds_item_setting")}>2</li>
                                                        <li className={cx("rounds_item_setting")}>3</li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                            <Row>
                                                {/* style={{ height: "600px", overflowY: "auto" }} */}
                                                <Col >
                                                    <Row>
                                                        <Col>
                                                            <div style={{ fontWeight: "600" }}>Vòng 1</div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Row style={{ padding: "0", display: "flex", alignItems: "center", margin: "10px" }}>
                                                                <Col xs={1} style={{ padding: "0", display: "flex", alignItems: "center" }}>
                                                                    <div>#1</div>
                                                                </Col>
                                                                <Col xs={3}>
                                                                    <div className="match-schedule_setting">
                                                                        <div className="match-schedule_team1">Đội #1</div>
                                                                        <div className="match-schedule_vs">⚔</div>
                                                                        <div className="match-schedule_team1">Đội #2</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="text" placeholder="Địa điểm" />

                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="date" placeholder="Ngày/Tháng/Năm" />

                                                                </Col>
                                                                <Col xs={2}>

                                                                    <Form.Control type="text" placeholder="Thời gian" />

                                                                </Col>
                                                            </Row>
                                                            <Row style={{ padding: "0", display: "flex", alignItems: "center", margin: "10px" }}>
                                                                <Col xs={1} style={{ padding: "0", display: "flex", alignItems: "center" }}>
                                                                    <div>#1</div>
                                                                </Col>
                                                                <Col xs={3}>
                                                                    <div className="match-schedule_setting">
                                                                        <div className="match-schedule_team1">Đội #1</div>
                                                                        <div className="match-schedule_vs">⚔</div>
                                                                        <div className="match-schedule_team1">Đội #2</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="text" placeholder="Địa điểm" />

                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="date" placeholder="Ngày/Tháng/Năm" />

                                                                </Col>
                                                                <Col xs={2}>

                                                                    <Form.Control type="text" placeholder="Thời gian" />

                                                                </Col>
                                                            </Row>
                                                            <Row style={{ padding: "0", display: "flex", alignItems: "center", margin: "10px" }}>
                                                                <Col xs={1} style={{ padding: "0", display: "flex", alignItems: "center" }}>
                                                                    <div>#1</div>
                                                                </Col>
                                                                <Col xs={3}>
                                                                    <div className="match-schedule_setting">
                                                                        <div className="match-schedule_team1">Đội #1</div>
                                                                        <div className="match-schedule_vs">⚔</div>
                                                                        <div className="match-schedule_team1">Đội #2</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="text" placeholder="Địa điểm" />

                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="date" placeholder="Ngày/Tháng/Năm" />

                                                                </Col>
                                                                <Col xs={2}>

                                                                    <Form.Control type="text" placeholder="Thời gian" />

                                                                </Col>
                                                            </Row>
                                                            <Row style={{ padding: "0", display: "flex", alignItems: "center", margin: "10px" }}>
                                                                <Col xs={1} style={{ padding: "0", display: "flex", alignItems: "center" }}>
                                                                    <div>#1</div>
                                                                </Col>
                                                                <Col xs={3}>
                                                                    <div className="match-schedule_setting">
                                                                        <div className="match-schedule_team1">Đội #1</div>
                                                                        <div className="match-schedule_vs">⚔</div>
                                                                        <div className="match-schedule_team1">Đội #2</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="text" placeholder="Địa điểm" />

                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="date" placeholder="Ngày/Tháng/Năm" />

                                                                </Col>
                                                                <Col xs={2}>

                                                                    <Form.Control type="text" placeholder="Thời gian" />

                                                                </Col>
                                                            </Row>
                                                            <Row style={{ padding: "0", display: "flex", alignItems: "center", margin: "10px" }}>
                                                                <Col xs={1} style={{ padding: "0", display: "flex", alignItems: "center" }}>
                                                                    <div>#1</div>
                                                                </Col>
                                                                <Col xs={3}>
                                                                    <div className="match-schedule_setting">
                                                                        <div className="match-schedule_team1">Đội #1</div>
                                                                        <div className="match-schedule_vs">⚔</div>
                                                                        <div className="match-schedule_team1">Đội #2</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="text" placeholder="Địa điểm" />

                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="date" placeholder="Ngày/Tháng/Năm" />

                                                                </Col>
                                                                <Col xs={2}>

                                                                    <Form.Control type="text" placeholder="Thời gian" />

                                                                </Col>
                                                            </Row>
                                                            <Row style={{ padding: "0", display: "flex", alignItems: "center", margin: "10px" }}>
                                                                <Col xs={1} style={{ padding: "0", display: "flex", alignItems: "center" }}>
                                                                    <div>#1</div>
                                                                </Col>
                                                                <Col xs={3}>
                                                                    <div className="match-schedule_setting">
                                                                        <div className="match-schedule_team1">Đội #1</div>
                                                                        <div className="match-schedule_vs">⚔</div>
                                                                        <div className="match-schedule_team1">Đội #2</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="text" placeholder="Địa điểm" />

                                                                </Col>
                                                                <Col xs={3}>

                                                                    <Form.Control type="date" placeholder="Ngày/Tháng/Năm" />

                                                                </Col>
                                                                <Col xs={2}>

                                                                    <Form.Control type="text" placeholder="Thời gian" />

                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ display: "flex", justifyContent: "center" }}>
                                                            <Button style={{ backgroundColor: "#FD1E50", width: "80px", border: "none" }} onClick={handleShowModal}>Lưu</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>


                                        </Col>
                                    </Row>
                                </Col>
                            )}
                            {showAdditionalComponent5 && (
                                <Col className={cx('myleague_body_right')} xs={7}>
                                    <Row className={cx('body-right-header')}>
                                        <Col>Quản lý nhà tài trợ</Col>

                                    </Row>
                                    <Row>
                                        <Col >
                                            {/* Code body here */}
                                            <Row>
                                                <Col style={{ textAlign: "left", marginTop: "10px" }}>
                                                    <Button onClick={handleShowAddSponsorModal} style={{ backgroundColor: "#FD1E50" }}>
                                                        <strong style={{ fontWeight: "700", fontSize: "18px", marginRight: "4px" }}>+</strong>Thêm nhà tài trợ
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row style={{ height: "500px", overflowY: "auto" }}>
                                                {sponsors.map((sponsor, index) => (
                                                    <Col key={index} xs={4} style={{ padding: "20px" }}>
                                                        <Card style={{ width: '18rem', boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
                                                            <Card.Header style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#FD1E50" }}>
                                                                <FontAwesomeIcon style={{ cursor: "pointer", color: "white" }} icon={faPenToSquare} onClick={() => openEditModal(sponsor.id)} />
                                                                <FontAwesomeIcon onClick={() => openDeleteModal(sponsor.id)} style={{ cursor: "pointer", color: "white" }} icon={faCircleXmark} />
                                                            </Card.Header>
                                                            {/* Sử dụng ảnh mặc định nếu sponsor.logo không tồn tại */}
                                                            <Card.Img variant="top" src={sponsor.sponsorLogo || images.aovang} style={{ width: "100%", height: "200px", cursor: "pointer" }} />
                                                            <Card.Body>
                                                                <Card.Title style={{ fontSize: "20px", textAlign: "center", color: "#FD1E50" }}>{sponsor.sponsorName}</Card.Title>
                                                                <div style={{ textAlign: "left" }}>
                                                                    <Card.Text style={{ fontSize: "16px", fontWeight: "500" }}>Email: {sponsor.sponsorInfo}</Card.Text>
                                                                    <Card.Text style={{ fontSize: "16px", fontWeight: "500" }}>Số điện thoại: {sponsor.sponsorPhone}</Card.Text>
                                                                    <Card.Text style={{ fontSize: "16px", fontWeight: "500" }}>Link: <a href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer">{sponsor.link}</a></Card.Text>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>

                                        </Col>
                                    </Row>
                                </Col>
                            )}
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
                {/* Modal xác nhận xóa nhà tài trợ */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header style={{ backgroundColor: "#FD1E50", color: "white" }} closeButton>
                        <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa nhà tài trợ này không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={deleteSponsor}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showAddSponsorModal} onHide={() => setShowAddSponsorModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm Nhà Tài Trợ Mới</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Ảnh nhà tài trợ</Form.Label>
                                <div>
                                    <img src={newSponsor.image} onClick={handleImageavtClick} alt="Preview" style={{ width: '100px', height: '100px', marginBottom: '10px', cursor: "pointer" }} />
                                    <Form.Control type="file" style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        onChange={handleImageChange1} />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên nhà tài trợ</Form.Label>
                                <Form.Control type="text" value={newSponsor.name} onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={newSponsor.email} onChange={(e) => setNewSponsor({ ...newSponsor, email: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" value={newSponsor.phone} onChange={(e) => setNewSponsor({ ...newSponsor, phone: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Link</Form.Label>
                                <Form.Control type="text" value={newSponsor.link} onChange={(e) => setNewSponsor({ ...newSponsor, link: e.target.value })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddSponsorModal(false)}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleAddNewSponsor}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header style={{ backgroundColor: "#FD1E50", color: "white" }} closeButton>
                        <Modal.Title>Sửa thông tin nhà tài trợ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                {leagueImage === null && (
                                    <>
                                        <img src={images.aovang} alt="Default League Image" className={cx("default-league-image")} />
                                        <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                                    </>
                                )}
                                {leagueImage !== null && (
                                    <>
                                        <img onClick={handleImageClick} src={leagueImage} alt="Hình ảnh giải đấu" className={cx("league-image-preview")} />
                                        <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                                    </>

                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên nhà tài trợ</Form.Label>
                                <Form.Control type="text" value={editSponsor.sponsorName} onChange={(e) => handleEditChange('sponsorName', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" value={editSponsor.sponsorInfo} onChange={(e) => handleEditChange('sponsorInfo', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" value={editSponsor.sponsorPhone} onChange={(e) => handleEditChange('sponsorPhone', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Đường dẫn liên kết</Form.Label>
                                <Form.Control type="text" value={editSponsor.sponsorLink} onChange={(e) => handleEditChange('sponsorLink', e.target.value)} />
                            </Form.Group>
                            {/* Lặp lại cho các trường thông tin khác */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={updateSponsor}>
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal thêm thành viên */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header style={{ backgroundColor: "#FD1E50", color: "white" }} closeButton>
                        <Modal.Title>Thêm thành viên</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Nội dung modal */}
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Tài khoản - Email</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vai trò:</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ backgroundColor: "#FD1E50", color: "white" }} id="dropdown-basic">
                                        Người tạo giải đấu
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Người tạo giải đấu</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Thư ký</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Trọng tài 1</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>

                            {/* Lặp lại cho các trường thông tin khác */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Đóng
                        </Button>
                        <Button style={{ backgroundColor: "#FD1E50", color: "white" }} onClick={handleAddMember}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <Footer />
        </div>

    );
}
