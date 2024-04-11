import styles from "../../../Assets/css/user/league/updateleague.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Dropdown, Form } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";

import { useEffect, useState } from "react";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { downdloadDocument, getLeagueDetailByIdLeague, updateLeagueByTournamentId } from "../../../services/LeagueSevice";

const cx = classNames.bind(styles);




export default function UpdateLeague() {
    const navigate = useNavigate();

    const [leagueImage, setLeagueImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewAvtLeague(file);
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
    const { idLeague } = useParams();
    const { id } = useParams();
    const [leagueDetail, setLeagueDetail] = useState({});
    const [leagueName, setLeagueName] = useState('');
    const [phone, setPhone] = useState('');
    const [openOrNot, setOpenOrNot] = useState(null);
    const [location, setLocation] = useState('');
    const [filePDF, setFilePDF] = useState(null);
    const [newAvtLeague, setNewAvtLeague] = useState(null);
    const [numberOfPlayersPerTeamRange, setNumberOfPlayersPerTeamRange] = useState(0);
    const [modeDisplay, setModeDisplay] = useState('Chọn chế độ');
    const [yellowCardToBand, setYellowCardToBand] = useState(0);
    const [roundYellowCardToBand, setRoundYellowCardToBand] = useState(0);
    const [indirectRedCards, setIndirectRedCards] = useState(0);
    const [roundIndirectRedCards, setRoundIndirectRedCards] = useState(0);
    const [directRedCards, setDirectRedCards] = useState(0);
    const [roundDirectRedCards, setRoundDirectRedCards] = useState(0);

    const handleModeSelect = (eventKey) => {
        // Đặt giá trị hiển thị dựa trên lựa chọn
        const modeText = eventKey === 'No' ? 'Riêng tư' : 'Công khai';
        setModeDisplay(modeText);

        // Cập nhật giá trị openOrNot dựa trên eventKey
        setOpenOrNot(eventKey);

    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFilePDF(file);
        }
    };

    useEffect(() => {
        getLeagueDetailByIdLeague(idLeague)
            .then(data => {
                setLeagueDetail(data);
                setLeagueName(data.name);
                setPhone(data.phone);
                setOpenOrNot(data.openOrNot);
                if(data.openOrNot === "Yes"){
                    setModeDisplay("Công khai")
                }else{
                    setModeDisplay("Riêng tư")
                }
                setLocation(data.description);
                setNumberOfPlayersPerTeamRange(data.numberOfPlayersPerTeamRange)
                if (data.avatarTournament) {
                    setLeagueImage(data.avatarTournament);
                }
                setYellowCardToBand(data.setYellowCardsToBan);
                setRoundYellowCardToBand(data.numberOfMatchesBannedYellowCard);
                setDirectRedCards(data.setDirectRedCards);
                setRoundDirectRedCards(data.numberOfMatchesBannedDirectRedCard);
                setIndirectRedCards(data.setIndirectRedCards);
                setRoundIndirectRedCards(data.numberOfMatchesBannedIndirectRedCard);
                

            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);
            });
    }, [idLeague]);
    console.log(openOrNot);

    const UpdateLeague = () => {
        const updatedData = new FormData();
        updatedData.append("LeagueId", idLeague);
        updatedData.append("organizerID", id);
        updatedData.append("LeagueName", leagueName);
        updatedData.append("Phone", phone);
        updatedData.append("Open_Or_Not", openOrNot);
        updatedData.append("Location", location);
        updatedData.append("ImageAvatar", newAvtLeague);
        updatedData.append("FilePDF", filePDF);
        updatedData.append("NumberOfPlayersPerTeamRange", numberOfPlayersPerTeamRange);
        updatedData.append("SetYellowCardsToBan", yellowCardToBand);
        updatedData.append("NumberOfMatchesBannedYellowCard", roundYellowCardToBand);
        updatedData.append("SetIndirectRedCards", indirectRedCards);
        updatedData.append("NumberOfMatchesBannedIndirectRedCard", roundIndirectRedCards);
        updatedData.append("SetDirectRedCards", directRedCards);
        updatedData.append("NumberOfMatchesBannedDirectRedCard", roundIndirectRedCards);
        updateLeagueByTournamentId( updatedData)
            .then(response => {
                console.log('League updated successfully', response);
                
                getLeagueDetailByIdLeague(idLeague)
                .then(data => {
                    setLeagueDetail(data);
                    setLeagueName(data.name);
                    setPhone(data.phone);
                    setOpenOrNot(data.openOrNot);
                    if(openOrNot === "Yes"){
                        setModeDisplay("Công khai")
                    }else{
                        setModeDisplay("Riêng tư")
                    }
                    setLocation(data.description);
                    setNumberOfPlayersPerTeamRange(data.numberOfPlayersPerTeamRange)
                    if (data.avatarTournament) {
                        setLeagueImage(data.avatarTournament);
                    }
                    setYellowCardToBand(data.setYellowCardsToBan);
                    setRoundYellowCardToBand(data.numberOfMatchesBannedYellowCard);
                    setDirectRedCards(data.setDirectRedCards);
                    setRoundDirectRedCards(data.numberOfMatchesBannedDirectRedCard);
                    setIndirectRedCards(data.setIndirectRedCards);
                    setRoundIndirectRedCards(data.numberOfMatchesBannedIndirectRedCard);
                    
                    
                })
                .catch(error => {
                    console.error("Error fetching league statistics:", error);
                });
                window.location.reload();
                toast.success('Cập nhật thông tin thành công.')
                navigate(`/league/dashboard/${id}/${leagueDetail.id}/settingleague`);
            })
            .catch(error => {
                console.error('Failed to update league', error);
                toast.success('Cập nhật thông tin thất bại.')
            });
    };
    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague} />
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={11} >
                                <Row>
                                    <Col style={{ padding: "10px 20px", borderBottom: "1px solid #8f8f8f" }}>
                                        <p className="info_basic">Thông tin cơ bản</p>
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>
                                    <Col xs="12" xl={3} lg={12} md={12} className={cx("form_avt")} onClick={handleImageClick}>
                                        <div style={{ margin: "0 0 10px 0" }}>Hình ảnh giải đấu</div>
                                        <div className={cx("image-container")}>
                                            {leagueImage === null && (
                                                <>
                                                    <img src={images.logoteam1} alt="Default League Image" className={cx("default-league-image")} />
                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                                                </>
                                            )}
                                            {leagueImage !== null && (
                                                <>
                                                    <img onClick={handleImageClick} src={leagueImage} alt="Hình ảnh giải đấu" className={cx("league-image-preview")} />
                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                                                </>

                                            )}
                                        </div>
                                    </Col>
                                    <Col xs="12" xl={7} lg={12} md={12} className={cx("form_infomation")}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridLeagueName">
                                                <Form.Label>Tên giải đấu <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control type="text" placeholder="Nhập tên giải đấu" value={leagueName} onChange={(e) => setLeagueName(e.target.value)} />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridPhone">
                                                <Form.Label>Số điện thoại <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control type="tel" placeholder="Nhập số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPhone">
                                                <Form.Label>Chế độ</Form.Label>
                                                <Dropdown onSelect={handleModeSelect}>
                                                    <Dropdown.Toggle style={{ background: "#FD1E50" }}>
                                                        {modeDisplay}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="No" >Riêng tư</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Yes">Công khai</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridAddress">
                                                <Form.Label>Địa điểm tổ chức<span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control placeholder="1234 Main St" value={location} onChange={(e) => setLocation(e.target.value)} />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Col xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                                                <Button
                                                    style={{ width: "200px", backgroundColor: "#fd1e50", border: "none" }}
                                                    className="btn_rule_download"
                                                    onClick={() => downdloadDocument(idLeague)}>
                                                    Tải luật thi đấu
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Col} controlId="formGridUpload">
                                                    <Form.Label>Sửa luật thi đấu<span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control type="file" onChange={handleFileChange} accept="application/pdf" />
                                                </Form.Group>
                                            </Col>



                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={11} >
                                <Row>
                                    <Col style={{ padding: "10px 20px", borderBottom: "1px solid #8f8f8f" }}>
                                        <p className="info_basic">Thông tin khác</p>
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>

                                    <Col xs="10" className={cx("form_infomation")}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridLeagueName">
                                                <Form.Label>Số lượng người mỗi đội (Số lượng người thi đấu trên sân của mỗi đội) </Form.Label>
                                                <Form.Control type="number" placeholder="Nhập số người mỗi đội" value={numberOfPlayersPerTeamRange} onChange={(e) => setNumberOfPlayersPerTeamRange(e.target.value)} />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridLeagueName">
                                                <Form.Label>Cài đặt số thẻ phạt để cấm thi đấu  </Form.Label>
                                                <span style={{ display: "block", color: "#747272" }}>
                                                    Dựa trên một trong các thông số được cài đặt bên dưới thì hệ thống sẽ đưa ra thông báo cho Ban Tổ Chức biết được vận động viên nào sẽ bị cấm thi đấu ở các trận tiếp theo
                                                </span>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col xs={12} lg={5}>
                                                <Form.Group as={Col} controlId="formGridLeagueName">
                                                    <Form.Label>Số thẻ vàng</Form.Label>
                                                    <Form.Control type="number" value={yellowCardToBand} onChange={(e) => setYellowCardToBand(e.target.value)} placeholder="Nhập số thẻ vàng" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridLeagueName">
                                                    <Form.Label>Số đỏ gián tiếp</Form.Label>
                                                    <Form.Control type="number" value={indirectRedCards} onChange={(e) => setIndirectRedCards(e.target.value)} placeholder="Nhập số thẻ đỏ gián tiếp" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridLeagueName">
                                                    <Form.Label>Số đỏ trực tiếp</Form.Label>
                                                    <Form.Control type="number" value={directRedCards} onChange={(e) => setDirectRedCards(e.target.value)} placeholder="Nhập số thẻ đỏ trực tiếp" />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} lg={5}>
                                                <Form.Group as={Col} controlId="formGridLeagueName">
                                                    <Form.Label>Số trận cấm thi đấu (Thẻ vàng)</Form.Label>
                                                    <Form.Control type="number" value={roundYellowCardToBand} onChange={(e) => setRoundYellowCardToBand(e.target.value)} placeholder="Nhập số thẻ vàng" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridLeagueName">
                                                    <Form.Label>Số trận cấm thi đấu (Thẻ đỏ gián tiếp)</Form.Label>
                                                    <Form.Control type="number" value={roundIndirectRedCards} onChange={(e) => setRoundIndirectRedCards(e.target.value)} placeholder="Nhập số thẻ đỏ gián tiếp" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridLeagueName">
                                                    <Form.Label>Số trận cấm thi đấu (Thẻ đỏ trực tiếp)</Form.Label>
                                                    <Form.Control type="number" value={roundDirectRedCards} onChange={(e) => setRoundDirectRedCards(e.target.value)} placeholder="Nhập số thẻ đỏ trực tiếp" />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>


                            </Col>
                        </Row>

                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    style={{ width: "100px", backgroundColor: "#FD1E50" }}
                                    onClick={UpdateLeague}
                                >
                                    Lưu
                                </Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>

    );
}
