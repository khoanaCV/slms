import styles from "../../../Assets/css/user/competitor/lineupTeam.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Button, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import HeaderBodyTeam from "./HeaderBodyTeam";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import FootballField from "../lineup/FootballField";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getTeamsByTeamId } from "../../../services/TeamSevice";



const cx = classNames.bind(styles);


const downloadImage = (canvas, filename) => {
    // Chắc chắn canvas đã được vẽ xong
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.95); // Sử dụng chất lượng 95% cho jpg
};

export default function LineupTeam() {
    const [teamFormations, setTeamFormations] = useState([
        { id: '0', name: 'FCS', numberOfPeople: '11', formation: '4-4-2 D', createdAt: '01:26:14 11-03-2024' },
        { id: '1', name: 'BFC', numberOfPeople: '11', formation: '3-5-2', createdAt: '02:00:00 11-03-2024' },
        { id: '2', name: 'GFV', numberOfPeople: '11', formation: '3-5-2', createdAt: '02:00:00 11-03-2024' },
        { id: '3', name: 'HDS', numberOfPeople: '11', formation: '3-5-2', createdAt: '02:00:00 11-03-2024' },
        // ... more formations ...
    ]);

    //Delete
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [formationToDelete, setFormationToDelete] = useState(null);

    const handleDeleteClick = (formationId) => {
        setFormationToDelete(formationId);
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        setTeamFormations(currentFormations =>
            currentFormations.filter(formation => formation.id !== formationToDelete)
        );
        setShowConfirmationModal(false);
    };

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
    };

    //Chỉnh sửa
    const [showUpdateLineup, setShowUpdateLineup] = useState(false);
    const [showListLineup, setShowListLineup] = useState(true);
    const [showCreateLineup, setShowCreateLineup] = useState(false);


    const handleUpdateClick = (formationId) => {
        setShowUpdateLineup(true);
        setShowListLineup(false);
        setShowCreateLineup(false)
    };
    const handleCreateClick = () => {
        setShowUpdateLineup(false);
        setShowListLineup(false);
        setShowCreateLineup(true)
        resetPlayersActiveStatus();
    };
    const handleListClick = () => {
        setShowUpdateLineup(false);
        setShowListLineup(true);
        setShowCreateLineup(false)
    };

    //Update TeamSquad
    const [teamName, setTeamName] = useState('');
    const [formationName, setFormationName] = useState('');
    const [playerCount, setPlayerCount] = useState('11');
    const [matchType, setMatchType] = useState('4-4-2 D');
    const [visibility, setVisibility] = useState('Công Khai');

    const [players, setPlayers] = useState([
        { id: 1, name: 'Cầu thủ A', position: 'Thủ Môn', number: '1', active: true, x: 50, y: 90 }, // Gần phía dưới cùng
        { id: 2, name: 'Cầu thủ B', position: 'Hậu Vệ', number: '2', active: true, x: 15, y: 70 },
        { id: 3, name: 'Cầu thủ C', position: 'Hậu Vệ', number: '3', active: true, x: 85, y: 70 },
        { id: 4, name: 'Cầu thủ D', position: 'Hậu Vệ', number: '4', active: true, x: 30, y: 75 },
        { id: 5, name: 'Cầu thủ E', position: 'Hậu Vệ', number: '5', active: true, x: 70, y: 75 },
        { id: 6, name: 'Cầu thủ F', position: 'Tiền Vệ', number: '6', active: true, x: 20, y: 50 },
        { id: 7, name: 'Cầu thủ G', position: 'Tiền Vệ', number: '7', active: true, x: 50, y: 65 },
        { id: 8, name: 'Cầu thủ H', position: 'Tiền Vệ', number: '8', active: true, x: 80, y: 50 },
        { id: 9, name: 'Cầu thủ I', position: 'Tiền Vệ', number: '9', active: true, x: 50, y: 35 },
        { id: 10, name: 'Cầu thủ K', position: 'Tiền Đạo', number: '10', active: true, x: 30, y: 10 },
        { id: 11, name: 'Cầu thủ L', position: 'Tiền Đạo', number: '11', active: true, x: 70, y: 10 }, // Gần phía trên cùng
        // Add the rest of the players similarly...
    ]);
    const resetPlayersActiveStatus = () => {
        setPlayers(currentPlayers =>
            currentPlayers.map(player => ({ ...player, active: false }))
        );
    };
    const onPlayersChange = (newPlayersCallback) => {
        setPlayers(newPlayersCallback);
    };

    const handleNameChange = (id, newName) => {
        setPlayers(players.map(player => {
            if (player.id === id) {
                return { ...player, name: newName };
            }
            return player;
        }));
    };

    const handlePositionChange = (id, newPosition) => {
        setPlayers(players.map(player => {
            if (player.id === id) {
                return { ...player, position: newPosition };
            }
            return player;
        }));
    };

    const toggleActive = (id) => {
        setPlayers(players.map(player => {
            if (player.id === id) {
                return { ...player, active: !player.active };
            }
            return player;
        }));
    };
    const handleNumberChange = (id, newNumber) => {
        setPlayers(players.map(player => {
            if (player.id === id) {
                return { ...player, number: newNumber.toString() };
            }
            return player;
        }));
    };

    const updatePlayerList = (playerCount) => {
        const newPlayerCount = parseInt(playerCount, 10); // Chuyển đổi sang số nguyên
        const newPlayers = [...players];

        // Cập nhật trạng thái active dựa trên số lượng mới
        if (newPlayerCount < players.length) {
            // Đặt active = false cho những cầu thủ vượt quá số lượng mới
            for (let i = newPlayerCount; i < players.length; i++) {
                newPlayers[i].active = false;
            }
        } else {
            // Nếu số lượng tăng lên, cố gắng kích hoạt lại cầu thủ (hoặc thêm mới nếu cần)
            for (let i = 0; i < newPlayers.length; i++) {
                newPlayers[i].active = true;
            }
            while (newPlayers.length < newPlayerCount) {
                const newId = newPlayers.length + 1;
                newPlayers.push({
                    id: newId,
                    name: `Cầu thủ ${newId}`,
                    position: 'Chưa xác định',
                    number: `${newId}`,
                    active: true,
                    x: 50, // Giả sử cho vị trí x
                    y: (10 * newId) % 100 // Giả sử cho vị trí y
                });
            }
        }
        setPlayers(newPlayers);
    };

    // xử lý việc tải về
    const handleDownload = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            downloadImage(canvas, 'team-setup.jpg');
        } else {
            toast.error('Không thể tải về hình ảnh.');
        }
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
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyTeam inforTeam={infomationTeam} />
                        {showListLineup && (
                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <Col xs={9}>
                                    {/* Body */}
                                    <Row style={{ borderBottom: "1px solid #ccc" }}>
                                        <Col style={{ padding: "20px 0" }}>
                                            <div
                                                style={{ fontSize: "25px", textAlign: "center" }}
                                            >Danh sách đội hình</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ padding: "20px 0" }}>
                                            <Row>
                                                <Col>
                                                    <Button style={{ backgroundColor: "#fd1e50" }} onClick={() => handleCreateClick()}>Thêm đội hình</Button>
                                                </Col>
                                            </Row>

                                            <Row
                                                style={{ height: "400px", border: "1px solid #ccc", marginTop: "20px", overflowY: "auto" }}
                                            >
                                                <Col className="table-container">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Tên đội hình</th>
                                                                <th>Số lượng người</th>
                                                                <th>Sơ đồ thi đấu</th>
                                                                <th>Ngày tạo</th>
                                                                <th>Thao tác</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {teamFormations.map((formation, index) => (
                                                                <tr key={formation.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{formation.name}</td>
                                                                    <td>{formation.numberOfPeople}</td>
                                                                    <td>{formation.formation}</td>
                                                                    <td>{formation.createdAt}</td>
                                                                    <td>
                                                                        <button className="btn-detail">Chi tiết</button>
                                                                        <button className="btn-edit" onClick={() => handleUpdateClick(formation.id)}>Chỉnh sửa</button>
                                                                        <button className="btn-delete" onClick={() => handleDeleteClick(formation.id)}>Xóa</button>
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </table>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                        {showUpdateLineup && (
                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <Col xs={9}>
                                    {/* Body */}
                                    <Row style={{ borderBottom: "1px solid #ccc" }}>
                                        <Col style={{ padding: "20px 0" }}>
                                            <div
                                                style={{ fontSize: "25px", textAlign: "center" }}
                                            >Cập nhật đội hình</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ padding: "20px 0" }}>
                                            <Row>
                                                <Col>
                                                    <Button style={{ backgroundColor: "#fd1e50", marginRight: "4px" }} onClick={() => handleCreateClick()}>Thêm đội hình</Button>
                                                    <Button style={{ backgroundColor: "#fd1e50" }} onClick={() => handleListClick()}>Danh sách đội hình</Button>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col xs={6} style={{ padding: "20px" }}>

                                                            <Row style={{ marginTop: "10px" }}>
                                                                <Col >
                                                                    <Row>
                                                                        <Col>
                                                                            <Row>
                                                                                <Col>
                                                                                    <Row
                                                                                        style={{ marginRight: "100px" }}
                                                                                        className="mb-3 align-items-center">
                                                                                        <Col xs="2">

                                                                                        </Col>
                                                                                        <Col xs={2}>
                                                                                            <div>Số áo <span style={{ color: "red" }}>*</span> </div>
                                                                                        </Col>
                                                                                        <Col >
                                                                                            <div>Tên cầu thủ <span style={{ color: "red" }}>*</span></div>
                                                                                        </Col>
                                                                                        <Col xs={3}>

                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col xs={11} className="vdv_wrapper">
                                                                                    {players.map(player => (

                                                                                        <Row key={player.id} className="mb-3 align-items-center ">
                                                                                            <Col xs="auto">
                                                                                                <Button
                                                                                                    id={`toggle-${player.id}`}
                                                                                                    variant={player.active ? "success" : "danger"}
                                                                                                    onClick={() => toggleActive(player.id)}
                                                                                                >
                                                                                                    {player.active ? 'Active' : 'Inactive'}
                                                                                                </Button>
                                                                                            </Col>
                                                                                            <Col xs={2}>
                                                                                                <Form.Control
                                                                                                    type="number"
                                                                                                    value={player.number}
                                                                                                    disabled
                                                                                                />
                                                                                            </Col>
                                                                                            <Col>
                                                                                                <Form.Control
                                                                                                    type="text"
                                                                                                    value={player.name}
                                                                                                    disabled
                                                                                                />
                                                                                            </Col>
                                                                                            <Col xs={3} className="position-dropdown-col">
                                                                                                <DropdownButton

                                                                                                    className="position-dropdown custom-dropdown"
                                                                                                    title={player.position}
                                                                                                    id={`dropdown-positions-${player.id}`}
                                                                                                    onSelect={(e) => handlePositionChange(player.id, e)}
                                                                                                >
                                                                                                    <Dropdown.Item eventKey="Thủ Môn">Thủ Môn</Dropdown.Item>
                                                                                                    <Dropdown.Item eventKey="Hậu Vệ">Hậu Vệ</Dropdown.Item>
                                                                                                    <Dropdown.Item eventKey="Tiền Vệ">Tiền Vệ</Dropdown.Item>
                                                                                                    <Dropdown.Item eventKey="Tiền Đạo">Tiền Đạo</Dropdown.Item>
                                                                                                </DropdownButton>
                                                                                            </Col>
                                                                                        </Row>

                                                                                    ))}
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={2} style={{ padding: "120px 0px 10px 0" }}>
                                                            {/* <Form.Group className="mb-3">
                                                                <Form.Label>Tên đội hình<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Nhập tên đội hình"
                                                                    value={formationName}
                                                                    onChange={(e) => setFormationName(e.target.value)}
                                                                    required
                                                                />
                                                            </Form.Group> */}

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Số lượng người<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Select
                                                                    value={playerCount}
                                                                    onChange={(e) => {
                                                                        const newCount = e.target.value;
                                                                        setPlayerCount(newCount);
                                                                        updatePlayerList(newCount);
                                                                    }}
                                                                    required
                                                                >
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>
                                                                    <option value="7">7</option>
                                                                    <option value="9">9</option>
                                                                    <option value="11">11</option>
                                                                </Form.Select>
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Sơ đồ thi đấu<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Select value={matchType} onChange={(e) => setMatchType(e.target.value)} required>
                                                                    <option value="4-4-2 D">4-4-2 D</option>
                                                                    {/* Add more options if necessary */}
                                                                </Form.Select>
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Chế độ<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Select value={visibility} onChange={(e) => setVisibility(e.target.value)} required>
                                                                    <option value="Công Khai">Công Khai</option>
                                                                    <option value="Công Khai">Riêng Tư</option>
                                                                </Form.Select>
                                                            </Form.Group>



                                                            <Button style={{ backgroundColor: "#fd1e50" }}>
                                                                Cập nhật
                                                            </Button>

                                                            <Button variant="secondary" onClick={handleDownload} className="ms-2">
                                                                <FontAwesomeIcon icon="download" /> Tải về
                                                            </Button>
                                                        </Col>
                                                        <Col xs={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <FootballField players={players} onPlayersChange={onPlayersChange} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                        {showCreateLineup && (
                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <Col xs={9}>
                                    {/* Body */}
                                    <Row style={{ borderBottom: "1px solid #ccc" }}>
                                        <Col style={{ padding: "20px 0" }}>
                                            <div
                                                style={{ fontSize: "25px", textAlign: "center" }}
                                            >Thêm mới đội hình</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ padding: "20px 0" }}>
                                            <Row>
                                                <Col>
                                                    <Button style={{ backgroundColor: "#fd1e50" }} onClick={() => handleListClick()}>Danh sách đội hình</Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col xs={6} style={{ padding: "20px" }}>

                                                            <Row style={{ marginTop: "10px" }}>
                                                                <Col >
                                                                    <Row>
                                                                        <Col>
                                                                            <Row>
                                                                                <Col>
                                                                                    <Row
                                                                                        style={{ marginRight: "100px" }}
                                                                                        className="mb-3 align-items-center">
                                                                                        <Col xs="2">

                                                                                        </Col>
                                                                                        <Col xs={2}>
                                                                                            <div>Số áo <span style={{ color: "red" }}>*</span> </div>
                                                                                        </Col>
                                                                                        <Col >
                                                                                            <div>Tên cầu thủ <span style={{ color: "red" }}>*</span></div>
                                                                                        </Col>
                                                                                        <Col xs={3}>

                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col xs={11} className="vdv_wrapper">
                                                                                    {players.map(player => (

                                                                                        <Row key={player.id} className="mb-3 align-items-center ">
                                                                                            <Col xs="auto">
                                                                                                <Button
                                                                                                    id={`toggle-${player.id}`}
                                                                                                    variant={player.active ? "success" : "danger"}
                                                                                                    onClick={() => toggleActive(player.id)}
                                                                                                >
                                                                                                    {player.active ? 'Active' : 'Inactive'}
                                                                                                </Button>
                                                                                            </Col>
                                                                                            <Col xs={2}>
                                                                                                <Form.Control
                                                                                                    type="number"
                                                                                                    value={player.number}
                                                                                                    onChange={(e) => handleNumberChange(player.id, e.target.value)}
                                                                                                />
                                                                                            </Col>
                                                                                            <Col>
                                                                                                <Form.Control
                                                                                                    type="text"
                                                                                                    value={player.name}
                                                                                                    onChange={(e) => handleNameChange(player.id, e.target.value)}
                                                                                                />
                                                                                            </Col>
                                                                                            <Col xs={3} className="position-dropdown-col">
                                                                                                <DropdownButton

                                                                                                    className="position-dropdown custom-dropdown"
                                                                                                    title={player.position}
                                                                                                    id={`dropdown-positions-${player.id}`}
                                                                                                    onSelect={(e) => handlePositionChange(player.id, e)}
                                                                                                >
                                                                                                    <Dropdown.Item eventKey="Thủ Môn">Thủ Môn</Dropdown.Item>
                                                                                                    <Dropdown.Item eventKey="Hậu Vệ">Hậu Vệ</Dropdown.Item>
                                                                                                    <Dropdown.Item eventKey="Tiền Vệ">Tiền Vệ</Dropdown.Item>
                                                                                                    <Dropdown.Item eventKey="Tiền Đạo">Tiền Đạo</Dropdown.Item>
                                                                                                </DropdownButton>
                                                                                            </Col>
                                                                                        </Row>

                                                                                    ))}
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={2} style={{ padding: "120px 0px 10px 0" }}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Tên đội hình<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Nhập tên đội hình"
                                                                    value={formationName}
                                                                    onChange={(e) => setFormationName(e.target.value)}
                                                                    required
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Số lượng người<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Select
                                                                    value={playerCount}
                                                                    onChange={(e) => {
                                                                        const newCount = e.target.value;
                                                                        setPlayerCount(newCount);
                                                                        updatePlayerList(newCount);
                                                                    }}
                                                                    required
                                                                >
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>
                                                                    <option value="7">7</option>
                                                                    <option value="9">9</option>
                                                                    <option value="11">11</option>
                                                                </Form.Select>
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Sơ đồ thi đấu<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Select value={matchType} onChange={(e) => setMatchType(e.target.value)} required>
                                                                    <option value="4-4-2 D">4-4-2 D</option>
                                                                    {/* Add more options if necessary */}
                                                                </Form.Select>
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Chế độ<span style={{ color: "red" }}>*</span></Form.Label>
                                                                <Form.Select value={visibility} onChange={(e) => setVisibility(e.target.value)} required>
                                                                    <option value="Công Khai">Công Khai</option>
                                                                    <option value="Công Khai">Riêng Tư</option>
                                                                </Form.Select>
                                                            </Form.Group>



                                                            <Button style={{ backgroundColor: "#fd1e50" }}>
                                                                Cập nhật
                                                            </Button>

                                                            <Button variant="secondary" onClick={handleDownload} className="ms-2">
                                                                <FontAwesomeIcon icon="download" /> Tải về
                                                            </Button>
                                                        </Col>
                                                        <Col xs={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <FootballField players={players} onPlayersChange={onPlayersChange} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>


                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}


                    </Col>
                </Row>
                <Modal show={showConfirmationModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa đội hình này không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Không
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Có
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <Footer />
        </div>

    );
}
