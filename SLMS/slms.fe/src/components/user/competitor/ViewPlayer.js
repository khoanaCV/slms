import styles from "../../../Assets/css/user/competitor/viewplayer.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import images from "../../../Assets/images";
import HeaderBodyTeam from "./HeaderBodyTeam";
import { useNavigate, useParams } from "react-router-dom";
import { faArrowsRotate, faCircleArrowRight, faDownload, faFutbol, faPenToSquare, faRedo, faSquare } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef, useState } from "react";


import 'tippy.js/dist/tippy.css';
import Tippy from "@tippyjs/react";
import { createTeamMember, getTeamsByTeamId } from "../../../services/TeamSevice";



const cx = classNames.bind(styles);


const PlayerCard = ({ player, removePlayer, onEdit }) => {
    const navigate = useNavigate();
    const handleNavigative = (id, name) => {
        navigate(`/player/${id}/${name}`);
    }
    return (
        <Col xs={3} style={{ padding: "20px" }}>
            <div className="player-card1">
                <div className="player-card-header">
                    {player.roles}
                    <span onClick={() => removePlayer(player.id)} className="close-icon">X</span>
                </div>
                <div className="player-card-image">
                    <img src={player.avtplayer} alt="Cầu thủ" />
                </div>
                <div className="player-card-info">
                    <h3>{player.name}</h3>
                    <p>Số áo: {player.number}</p>
                </div>
                <div className="player-card-stats">
                    <div className="stat">
                        <FontAwesomeIcon icon={faFutbol} />
                        <span>{player.goals}</span>
                    </div>
                    <div className="stat">
                        <img style={{ width: "20px", height: "20px" }} src={images.yellowcard} /> {/* Giả định đây là icon assists */}
                        <span>{player.yellowCards}</span>
                    </div>
                    <div className="stat">
                        <img style={{ width: "20px", height: "20px" }} src={images.redcard} /> {/* Giả định đây là icon thẻ vàng */}
                        <span>{player.redCards}</span>
                    </div>

                </div>
                <div className="player-card-footer">
                    <Tippy content="Cập nhật thông tin VĐV">
                        <div className="card-footer-item" onClick={() => onEdit(player)}>
                            <FontAwesomeIcon icon={faArrowsRotate} />
                        </div>
                    </Tippy>
                    <Tippy content="Cập nhật thông tin bổ sung">
                        <div className="card-footer-item">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                    </Tippy>
                    <Tippy content="Chi tiết VĐV">
                        <div onClick={() => handleNavigative(player.id, player.name)} className="card-footer-item">
                            <FontAwesomeIcon icon={faCircleArrowRight} />
                        </div>
                    </Tippy>
                </div>
            </div>
        </Col>
    );
};
const EditPlayerModal = ({ show, onHide, player, onSave }) => {
    const [editedPlayer, setEditedPlayer] = useState(player || {
        avtplayer: images.aovang,
        name: '',
        copname: '',
        dateBirth: '',
        phone: '',
        email: '',
        position: '',
        number: '',
        goals: 0,
        yellowCards: 0,
        redCards: 0,
        roles: 'Vận động viên' // Giá trị mặc định
    });

    useEffect(() => {
        if (player) {
            setEditedPlayer(player);
        }
    }, [player]);
    const handleChange = (e) => {
        setEditedPlayer({
            ...editedPlayer,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeNumber = (e) => {
        setEditedPlayer({
            ...editedPlayer,
            [e.target.number]: e.target.value,
        });
    };

    const handleSave = () => {
        onSave(editedPlayer);
        onHide();
    };


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin vận động viên</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {/* Include all the fields that you want to be editable */}
                <Form>
                    {/* ... form fields here */}
                    <div className="form-edit-player">
                        <div className="id-card-container">
                            <div className="avatar-section">
                                <img src={images.avtplayerdf} alt="Player Avatar" className="player-avatar" />
                            </div>
                            <div className="id-card-section">
                                <div>
                                    <div>Mặt trước:</div>
                                    <div className="id-card id-card-front">
                                        <img src={images.idplayerbefore} alt="" className="player-id_before" />
                                    </div>
                                </div>
                                <div>
                                    <div>Mặt sau:</div>
                                    <div className="id-card id-card-back">
                                        <img src={images.idplayerafter} alt="" className="player-id_after" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="edit-player-right">
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>Tên vận động viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên"
                                    name="name"
                                    value={editedPlayer.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>Số áo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Number"
                                    value={editedPlayer.number}
                                    onChange={handleChangeNumber}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>Vị trí</Form.Label>
                                <Form.Select>
                                    <option selected>Thủ môn</option>
                                    <option>Hậu Vệ</option>
                                    <option>Tiền vệ</option>
                                    <option>Tiền đạo</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>Vai trò</Form.Label>
                                <Form.Select>
                                    <option selected>Vận động viên</option>
                                    <option>Ông bầu</option>
                                    <option>Lãnh đội</option>
                                    <option>HLV trưởng</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>SĐT</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"

                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control
                                    placeholder="dd-mm-yyyy"
                                    type="date"
                                    name="phone"

                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Email"

                                />
                            </Form.Group>
                        </div>
                    </div>

                    {/* ... more form fields */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
                <Button style={{ backgroundColor: "#fd1e50" }} onClick={handleSave}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default function ViewPlayer() {
    const defaultPlayers = new Array(1).fill(null).map((_, index) => ({
        avtplayer: images.aovang,
        name: `Nguyễn Văn ${index + 1}`,
        copname: `Văn ${index + 1}`,
        dateBirth: '',
        phone: '',
        email: '',
        position: 'Khác',
        roles: 'Vận động viên',
        number: `0${index + 1}`,
        goals: 10 - index, // Giả định số bàn thắng
        yellowCards: index % 3,
        redCards: index % 5
    }));

    const [players, setPlayers] = useState(defaultPlayers);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newPlayer, setNewPlayer] = useState({
        avtplayer: images.avtplayerdf,
        name: '',
        copname: '',
        dateBirth: '',
        phone: '',
        email: '',
        position: '',
        number: '',
        goals: 0,
        yellowCards: 0,
        redCards: 0,
        roles: 'Vận động viên' // Giá trị mặc định
    });

    //console.log(players.length);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const removePlayer = (playerId) => {
        setPlayers(players.filter(player => player.id !== playerId));
    };

    const handleSavePlayer = () => {
        // Tạo FormData hoặc một object đơn giản nếu API của bạn nhận JSON
        const formData = new FormData();
        formData.append("Name", newPlayer.name);
        formData.append("ShirtNumber", newPlayer.number);
        formData.append("Position", newPlayer.position);
        formData.append("Phone", newPlayer.phone);
        formData.append("CompetitionName", newPlayer.copname);
        formData.append("BirthDate", newPlayer.dateBirth);
        formData.append("Email", newPlayer.email);
        formData.append("Avatar", newPlayer.avtplayer);





        createTeamMember(formData) // Hoặc playerData nếu bạn gửi JSON
            .then((data) => {
                // Xử lý sau khi thêm thành công
                console.log("Thêm thành công cầu thủ", data.name);

                handleCloseModal();

                setPlayers([...players, { ...newPlayer, id: data.id, ...data }]);
            })
            .catch((error) => {
                console.error("Lỗi khi thêm vận động viên", error);
            });
    };


    const roleOptions = [
        'Vận động viên', 'HLV trưởng', 'Ông bầu', 'Lãnh đội',
        'trợ lý HLV', 'HLV thủ môn', 'HLV thể lực', 'Đội trưởng', 'Đội phó'
    ];


    //edit inforPlayer
    const [editingPlayer, setEditingPlayer] = useState(null);

    const handleShowEditModal = (player) => {
        if (player) {
            setEditingPlayer(player);
            setShowModal1(true);
        }
    };

    const handleEditPlayerSave = (updatedPlayer) => {
        setPlayers(
            players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
        );
    };

    //search VĐV 
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const { id } = useParams();
    const [infomationTeam, setInformationTeam] = useState([

    ])


    const [leagueImage, setLeagueImage] = useState(null);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            newPlayer.avtplayer = file;
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

    useEffect(() => {
        if (id) {
            getTeamsByTeamId(id)
                .then(data => {
                    setInformationTeam(data);

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
                        <HeaderBodyTeam inforTeam={infomationTeam} countPlayers={players.length} />
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={10}>
                                {/* Body */}
                                <Row style={{ padding: "10px", borderBottom: "1px solid #8d8d8d" }}>
                                    <Col style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                        <h3>
                                            Thông tin thành viên
                                        </h3>

                                    </Col>
                                </Row>
                                <Row style={{ padding: "20px", borderBottom: "1px solid #8d8d8d" }}>
                                    <Col style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Button style={{ backgroundColor: "#fd1e50" }} onClick={handleShowModal}>
                                            <span style={{ fontWeight: "600", marginRight: "4px" }}>+</span>
                                            Thêm thành viên
                                        </Button>
                                        <Form.Control
                                            type="text"
                                            placeholder="Tìm kiếm cầu thủ theo tên"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            style={{ margin: '0 10px', width: '700px' }} // Adjust styling as needed
                                        />
                                        <Button>
                                            <FontAwesomeIcon icon={faDownload} />
                                            Danh sách
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            {filteredPlayers.map(player => (
                                                <PlayerCard key={player.id} player={player} removePlayer={removePlayer} onEdit={handleShowEditModal} />
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>

                    </Col>
                </Row>
                {/* Modal component */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm vận động viên</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: "flex", justifyContent: "center" }}>

                        <div className="modal_createVDV">
                            <div className={cx("avatar-section")} onClick={handleImageClick}>
                                {leagueImage === null && (
                                    <>
                                        <img src={images.avtplayerdf} alt="Default League Image" className={cx("player-avatar")} />
                                        <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                                    </>
                                )}
                                {leagueImage !== null && (
                                    <>
                                        <img onClick={handleImageClick} src={leagueImage} alt="Hình ảnh giải đấu" className={cx("player-avatar")} />
                                        <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                                    </>

                                )}
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <Form.Group className="mb-3" controlId="playerName">
                                    <Form.Label>Số áo<span style={{ fontSize: '16px', color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên"
                                        value={newPlayer.number}
                                        onChange={e => setNewPlayer({ ...newPlayer, number: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="playerName">
                                    <Form.Label>Tên thi đấu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên thi đấu"
                                        value={newPlayer.copname}
                                        onChange={e => setNewPlayer({ ...newPlayer, copname: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="playerName">
                                    <Form.Label>Tên cầu thủ<span style={{ fontSize: '16px', color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Họ tên đầy đủ"
                                        value={newPlayer.name}
                                        onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="playerName">
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Ngày sinh"
                                        value={newPlayer.dateBirth}
                                        onChange={e => setNewPlayer({ ...newPlayer, dateBirth: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="playerName">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newPlayer.phone}
                                        onChange={e => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="playerName">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newPlayer.email}
                                        onChange={e => setNewPlayer({ ...newPlayer, email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Vị trí thi đấu</Form.Label>
                                    <Form.Select aria-label="Default select example" value={newPlayer.position}
                                        onChange={e => setNewPlayer({ ...newPlayer, position: e.target.value })}>
                                        <option value={'Thủ môn'}>Thủ môn</option>
                                        <option value={'Hậu vệ'}>Hậu vệ</option>
                                        <option value={'Tiền vệ'}>Tiền vệ</option>
                                        <option value={'Tiền đạo'}>Tiền đạo</option>
                                        <option value={'Khác'}>Khác</option>

                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Vai trò<span style={{ fontSize: '16px', color: 'red' }}>*</span> </Form.Label>
                                    <Form.Select aria-label="Default select example" value={newPlayer.roles}
                                        onChange={e => setNewPlayer({ ...newPlayer, roles: e.target.value })}>
                                        {roleOptions.map((role, index) => (
                                            <option key={index} value={role}>{role}</option>
                                        ))}

                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Đóng
                        </Button>
                        <Button style={{ backgroundColor: "#fd1e50" }} onClick={handleSavePlayer}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Modal>
                {editingPlayer && (
                    <EditPlayerModal
                        show={showModal1}
                        onHide={() => {
                            setEditingPlayer(null);
                            setShowModal1(false);
                        }}
                        player={editingPlayer}
                        onSave={handleEditPlayerSave}
                    />
                )}
            </Container>
            <Footer />
        </div>

    );
}
