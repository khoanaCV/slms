import { Container, Form, Button, Row, Col, InputGroup, ToggleButtonGroup, ToggleButton, Dropdown, Image } from 'react-bootstrap';
import Header from "../../common/Header";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faTable, faCircleNodes } from '@fortawesome/free-solid-svg-icons';
import styles from "../../../Assets/css/user/league/createleague.css";
import { Link, useNavigate } from "react-router-dom";

import images from "../../../Assets/images";
import Footer from "../../common/Footer";
import { useEffect, useState } from 'react';
import { createConfigTournament, createLeague } from '../../../services/LeagueSevice';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
export default function CreateLeague() {

    const [tournamentTypeId, setTournamentTypeId] = useState("Loại trực tiếp");
    const [modeDisplay, setModeDisplay] = useState('Chọn chế độ');
    const [leagueImage, setLeagueImage] = useState(null);
    const [leagueAvt, setLeagueAvt] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLeagueAvt(file);
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

    //xử lý click
    const [activeFormat, setActiveFormat] = useState(0);
    const [activeFormat2, setActiveFormat2] = useState(1);
    const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
    const [showAdditionalComponent1, setShowAdditionalComponent1] = useState(false);
    const [minTeams, setMinTeams] = useState(2);
    const [maxTeams, setMaxTeams] = useState(128);




    const handleFormatClick = (index) => {
        setActiveFormat(index);


        if (index === 1) {
            setShowAdditionalComponent(true);
            setTournamentTypeId("Đấu vòng tròn"); // Cập nhật giá trị sử dụng state
            setMinTeams(2);
            setMaxTeams(30);
            setActiveFormat2(1)
            setNumberOfTeams(2)
        }
        else {
            setShowAdditionalComponent(false);
            setTournamentTypeId("Loại trực tiếp"); // Cập nhật giá trị sử dụng state
            setMinTeams(2);
            setMaxTeams(128)
            setNumberOfTeams(2)
        }

        if (index === 2) {
            setShowAdditionalComponent1(true);
            setTournamentTypeId("Đấu chia bảng"); // Cập nhật giá trị sử dụng state
            setMinTeams(6);
            setMaxTeams(128)
            setActiveFormat2(1)
            setNumberOfTeams(6)
        }
        else {
            setShowAdditionalComponent1(false);
            // Không cần thiết phải đặt lại nếu không muốn
        }
    };

    const handleFormatClick2 = (index1) => {
        setActiveFormat2(index1);
    };

    // State cho điểm thắng, hoà và thua
    const [winPoints, setWinPoints] = useState(3);
    const [drawPoints, setDrawPoints] = useState(1);
    const [losePoints, setLosePoints] = useState(0);
    // State cho thông tin giải đấu
    const [leagueName, setLeagueName] = useState('');
    const [organizerID, setOrganizerID] = useState(null);
    const [phone, setPhone] = useState('');
    const [openOrNot, setOpenOrNot] = useState(null);
    const [location, setLocation] = useState('');
    const [filePDF, setFilePDF] = useState(null);
    //configurationLeague
    const [numberOfTeams, setNumberOfTeams] = useState(2);
    const [numberOfPlayersPerTeamRange, setNumberOfPlayersPerTeamRange] = useState(null);
    //config of đấu chia bảng
    //const [numberOfTables, setNumberOfTables] = useState(null);

    const [numberOfTeamsToNextRound, setNumberOfTeamsToNextRound] = useState(2);
    const [registrationAllowed, setRegistrationAllowed] = useState("Không được phép");
    const [numberOfMatches, setNumberOfMatches] = useState(0);
    //const [numberOfRounds, setNumberOfRounds] = useState(null);
    const [leagueCount, setLeagueCount] = useState('2');

    useEffect(() => {
        setOrganizerID(localStorage.getItem("id"));
    }, []);

    // Hàm này sẽ tạo ra một mảng các option dựa trên số đội
    const getLeagueOptions = () => {

        const maxLeagues = Math.ceil(numberOfTeams / 3); // bảng tối đa 3 đội
        const options = [];
        for (let i = 2; i <= maxLeagues; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;


    };
    //console.log(activeFormat2);
    // tính toán số trận đấu


    //console.log("Tổng giải đấu:" + ((((numberOfTeams / leagueCount) * ((numberOfTeams / leagueCount) - 1) / 2) * leagueCount) * activeFormat2) + ((numberOfTeamsToNextRound * leagueCount) - 1));
    const calculateMatches = (numberOfTeams, format, activeFormat2, leagueCount, numberOfTeamsToNextRound) => {
        let matches = 0;
        if (format === "Đấu vòng tròn") { // Đấu vòng tròn
            if (activeFormat2 === 1) {
                matches = numberOfTeams * (numberOfTeams - 1) / 2; // Mỗi đội đấu với nhau một lần
            }
            if (activeFormat2 === 2) {
                matches = (numberOfTeams * (numberOfTeams - 1) / 2) * 2;
            }
            if (activeFormat2 === 3) {
                matches = (numberOfTeams * (numberOfTeams - 1) / 2) * 3;
            }
            if (activeFormat2 === 4) {
                matches = (numberOfTeams * (numberOfTeams - 1) / 2) * 4;
            }

        } else if (format === "Đấu chia bảng") { // Đấu chia bảng
            // console.log(numberOfTeams);
            // console.log(parseInt(leagueCount, 10));
            // console.log(parseInt(activeFormat2));
            // console.log(numberOfTeamsToNextRound);

            let so_tran_vong_bang = (((numberOfTeams / parseInt(leagueCount, 10)) * ((numberOfTeams / parseInt(leagueCount, 10)) - 1) / 2) * parseInt(leagueCount, 10)) * activeFormat2;
            let so_tran_playoff = numberOfTeamsToNextRound - 1;
            matches = so_tran_vong_bang + so_tran_playoff   // Placeholder, cần logic cụ thể

        } else { // Loại trực tiếp
            matches = numberOfTeams - 1; // Mỗi trận loại trực tiếp giảm số đội đi một 
        }
        return matches;
    };

    useEffect(() => {
        setNumberOfTeams(numberOfTeams);
        const matches = calculateMatches(numberOfTeams, tournamentTypeId, activeFormat2, leagueCount, numberOfTeamsToNextRound);
        setNumberOfMatches(matches);
    }, [numberOfTeams, tournamentTypeId, activeFormat2, leagueCount, numberOfTeamsToNextRound]);


    // xử lý sự kiện
    const handleModeSelect = (eventKey) => {
        // Đặt giá trị hiển thị dựa trên lựa chọn
        const modeText = eventKey === 'No' ? 'Riêng tư' : 'Công khai';
        setModeDisplay(modeText);

        // Cập nhật giá trị openOrNot dựa trên eventKey
        setOpenOrNot(eventKey);

    };

    const handleNumberOfNextRoundChange = (event) => {
        const value = parseInt(event.target.value);
        setNumberOfTeamsToNextRound(value);
    };
    // Hàm xử lý khi checkbox thay đổi
    const handleCheckboxChange = (event) => {
        setRegistrationAllowed(event.target.checked ? "yes" : "No");
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFilePDF(file);
        }
    };
    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    const removeSpaces = (string) => {
        const outputString = string.replace(/\s+/g, '').toLowerCase(); // Sử dụng regular expression để thay thế tất cả các dấu cách bằng ''

        return removeAccents(outputString.toLow);
    }

    //Call api
    const handleSubmitLeague = async (event) => {
        event.preventDefault();
        if (!leagueName || !phone || openOrNot === null || !location) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Kiểm tra numberOfTeams dựa vào tournamentTypeId
        let isValidNumberOfTeams = true;
        let errorMessage = '';
        switch (tournamentTypeId) {
            case "Loại trực tiếp":
                if (numberOfTeams <= 2 || numberOfTeams > 128) {
                    isValidNumberOfTeams = false;
                    errorMessage = 'Số đội tham gia phải lớn hơn 2 và bé hơn hoặc bằng 128 cho Loại trực tiếp.';
                }
                break;
            case "Đấu vòng tròn":
                if (numberOfTeams <= 2 || numberOfTeams > 30) {
                    isValidNumberOfTeams = false;
                    errorMessage = 'Số đội tham gia phải lớn hơn 2 và bé hơn hoặc bằng 30 cho Đấu vòng tròn.';
                }
                break;
            case "Vòng đấu bảng":
                if (numberOfTeams <= 6 || numberOfTeams > 128) {
                    isValidNumberOfTeams = false;
                    errorMessage = 'Số đội tham gia phải lớn hơn 6 và bé hơn hoặc bằng 128 cho Vòng đấu bảng.';
                }
                break;
            default:
                // Mặc định giá trị là hợp lệ, không làm gì cả
                break;
        }

        // Nếu số đội không hợp lệ, hiển thị thông báo lỗi và dừng xử lý
        if (!isValidNumberOfTeams) {
            toast.error(errorMessage);
            return;
        }
        if (numberOfPlayersPerTeamRange === null || numberOfPlayersPerTeamRange <= 5) {
            toast.error("Số người mỗi đội phải lớn hơn 5.");
            return;
        }

        // Kiểm tra ngày "Hạn cuối đăng ký" trước khi tiếp tục
        if (registrationAllowed === "yes" && selectedDate < minDate) {
            toast.error('Hạn cuối đăng ký không hợp lệ. Vui lòng chọn ngày lớn hơn ngày hiện tại.');
            return; // Dừng xử lý form nếu ngày không hợp lệ
        }

        const formData = new FormData();
        formData.append("organizerID", organizerID);
        formData.append("LeagueName", leagueName);
        formData.append("Phone", phone);
        formData.append("Open_Or_Not", openOrNot);
        formData.append("Location", location);
        formData.append("ImageAvatar", leagueAvt);
        formData.append("FilePDF", filePDF);
        formData.append("CompetitionFormatName", tournamentTypeId);
        formData.append("NumberOfPlayersPerTeamRange", numberOfPlayersPerTeamRange);
        formData.append("NumberOfMatches", numberOfMatches);
        formData.append("NumberOfTurns", activeFormat2);
        formData.append("NumberOfTables", leagueCount);
        formData.append("NumberOfTeams", numberOfTeams);
        formData.append("RegistrationAllowed", registrationAllowed);
        formData.append("WinPoints", winPoints);
        formData.append("DrawPoints", drawPoints);
        formData.append("LossPoints", losePoints);

        if (registrationAllowed === "yes") {
            formData.append("SubmissionDeadline", selectedDate);
        }
        try {
            const response = await createLeague(formData);
            console.log(response);
            if (response && response.tournamentId) {

                // Trực tiếp sử dụng ID từ phản hồi để gọi hàm cấu hình giải đấu
                localStorage.setItem("tournamentId", response.tournamentId)

                // await handleCreateConfigTournament(response.tournamentId);
                toast.success('Tạo giải đấu thành công');
                navigate(`/league/dashboard/${organizerID}/${response.tournamentId}`);
            }
        } catch (error) {
            console.log('Lỗi khi tạo giải đấu: ' + error.message);
        }
    };


    

    // Tạo một state để lưu giữ giá trị ngày tối thiểu cho input
    const [minDate, setMinDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const formattedToday = `${yyyy}-${mm}-${dd}`;
        setMinDate(formattedToday);
    }, []);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    console.log(selectedDate);
    return (
        <Container style={{ maxWidth: "100%", height: "100%" }} fluid>
            <Header />
            <Container fluid
                style={{ display: "flex", justifyContent: "center", alignItems: "start", maxHeight: "100%", margin: "0px 0px 700px 0" }}>
                <Row className={cx("create-league_form ")} >
                    <Row className={cx('header_form')}>
                        <h2 className={cx("header_title")}>Tạo giải</h2>
                        <p className={cx("header_rule")}>Vui lòng nhập thông tin hợp lệ cho trường hợp được yêu cầu <span>*</span></p>
                    </Row>
                    <Row>
                        <Form>

                            <Row style={{ padding: "10px 0" }}>
                                <Col xs="4" className={cx("form_avt")} onClick={handleImageClick}>
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
                                <Col xs="8" className={cx("form_infomation")}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridLeagueName">
                                            <Form.Label>Tên giải đấu <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control type="text" placeholder="Nhập tên giải đấu" onChange={(e) => setLeagueName(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridPhone">
                                            <Form.Label>Số điện thoại <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control type="tel" placeholder="Nhập số điện thoại" onChange={(e) => setPhone(e.target.value)} />
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
                                            <Form.Control placeholder="Địa điểm thi đấu" onChange={(e) => setLocation(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridUpload">
                                            <Form.Label>Tải luật thi đấu<span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control type="file" onChange={handleFileChange} accept="application/pdf" />
                                        </Form.Group>
                                    </Row>
                                </Col>
                            </Row>


                            <Row style={{ margin: "20px 0", borderBottom: "1px solid #8f8f8f", padding: "20px 0" }}>
                                <Row style={{ margin: "20px 0" }}>
                                    <Col>
                                        <div style={{ margin: "8px 0" }}>Hình thức thi đấu<span style={{ color: "red" }}>*</span></div>
                                        <Row style={{ padding: " 0" }} className={cx('format_inner')}>
                                            <Col style={{ padding: " 0" }}>
                                                <div
                                                    onClick={() => handleFormatClick(0)}
                                                    className={cx('format_item border_left', { 'active_fomart': activeFormat === 0, 'inactive_fomart': activeFormat !== 0 })}
                                                >
                                                    <FontAwesomeIcon style={{ height: "40px" }} icon={faSitemap} />
                                                    <p style={{ fontSize: "16px" }}>Loại trực tiếp</p>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: " 0" }}>
                                                <div
                                                    onClick={() => handleFormatClick(1)}
                                                    className={cx('format_item', { 'active_fomart': activeFormat === 1, 'inactive_fomart': activeFormat !== 1 })}
                                                >
                                                    <FontAwesomeIcon style={{ height: "40px" }} icon={faCircleNodes} />
                                                    <p style={{ fontSize: "16px" }}>Đấu vòng tròn</p>
                                                </div>
                                            </Col>
                                            {/* <Col style={{ padding: " 0" }}>
                                                <div
                                                    onClick={() => handleFormatClick(2)}
                                                    className={cx('format_item border_right', { 'active_fomart': activeFormat === 2, 'inactive_fomart': activeFormat !== 2 })}
                                                >
                                                    <FontAwesomeIcon style={{ height: "40px" }} icon={faTable} />
                                                    <p style={{ fontSize: "16px" }}>Đấu chia bảng</p>
                                                </div>
                                            </Col> */}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridLeagueName">
                                        <Form.Label>Số đội tham gia ({minTeams}-{maxTeams}) <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control type="number" placeholder="Nhập số lượng đội thi đấu" value={numberOfTeams} onChange={(e) => setNumberOfTeams(e.target.value)} />
                                    </Form.Group>
                                </Row>
                            </Row>
                            {showAdditionalComponent && (
                                <Row data-aos="fade-down">
                                    {/* Hiển thị component mới ở đây */}
                                    <Col>
                                        <Row style={{ margin: "10px 0" }}>
                                            <Col>
                                                <Form.Group as={Col} controlId="formGridWinPoints">
                                                    <Form.Label>Điểm thắng <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={winPoints}
                                                        onChange={(e) => setWinPoints(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Col} controlId="formGridDrawPoints">
                                                    <Form.Label>Điểm hoà <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={drawPoints}
                                                        onChange={(e) => setDrawPoints(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Col} controlId="formGridLosePoints">
                                                    <Form.Label>Điểm thua <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={losePoints}
                                                        onChange={(e) => setLosePoints(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: "20px 0" }}>
                                            <Row className={cx('round_inner')} style={{ padding: " 0" }}>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(1)}
                                                        className={cx("round_item border_left ", { 'active_fomart': activeFormat2 === 1, 'inactive_fomart': activeFormat2 !== 1 })}>
                                                        <p style={{ fontSize: "16px" }}>1 lượt</p>
                                                    </div>
                                                </Col>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(2)}
                                                        className={cx("round_item ", { 'active_fomart': activeFormat2 === 2, 'inactive_fomart': activeFormat2 !== 2 })}>
                                                        <p style={{ fontSize: "16px" }}>2 lượt</p>
                                                    </div>
                                                </Col>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(3)}
                                                        className={cx("round_item ", { 'active_fomart': activeFormat2 === 3, 'inactive_fomart': activeFormat2 !== 3 })}>
                                                        <p style={{ fontSize: "16px" }}>3 lượt</p>
                                                    </div>
                                                </Col>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(4)}
                                                        className={cx("round_item border_right ", { 'active_fomart': activeFormat2 === 4, 'inactive_fomart': activeFormat2 !== 4 })}>
                                                        <p style={{ fontSize: "16px" }}>4 lượt</p>
                                                    </div>
                                                </Col>

                                            </Row>
                                        </Row>
                                    </Col>
                                </Row>
                            )}
                            {showAdditionalComponent1 && (
                                <Row data-aos="fade-down">
                                    {/* Hiển thị component mới ở đây */}
                                    <Col>
                                        <Row style={{ margin: "10px 0" }}>
                                            <Col xs="12" >
                                                <Form.Group as={Col} controlId="formGridPhone">
                                                    <Form.Label>Số bảng đấu <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <p style={{ fontSize: "14px", fontWeight: "400", color: "#8f8f8f" }}>Số lượng bảng đấu ở giai đoạn vòng bảng</p>
                                                    <select value={leagueCount}
                                                        onChange={(e) => setLeagueCount(e.target.value)}
                                                        className={cx('league_inner')}>
                                                        {getLeagueOptions()}
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: "10px 0" }}>
                                            <Col xs="12" >
                                                <Form.Group as={Col} controlId="formGridPhone">
                                                    <Form.Label>Số đội vào vòng trong <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <p style={{ fontSize: "14px", fontWeight: "400", color: "#8f8f8f" }}>Tổng số đội vượt qua vòng bảng của tất cả các bảng đấu.</p>
                                                    <select
                                                        onChange={handleNumberOfNextRoundChange}
                                                        value={numberOfTeamsToNextRound}
                                                        className={cx('league_inner')}>
                                                        <option className={cx('league_item')} value={2}>2</option>
                                                        <option className={cx('league_item')} value={4}>4</option>
                                                        <option className={cx('league_item')} value={8}>8</option>
                                                        <option className={cx('league_item')} value={16}>16</option>
                                                        <option className={cx('league_item')} value={32}>32</option>
                                                        <option className={cx('league_item')} value={64}>64</option>
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: "10px 0" }}>
                                            <Col>
                                                <Form.Group as={Col} controlId="formGridWinPoints">
                                                    <Form.Label>Điểm thắng <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={winPoints}
                                                        onChange={(e) => setWinPoints(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Col} controlId="formGridDrawPoints">
                                                    <Form.Label>Điểm hoà <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={drawPoints}
                                                        onChange={(e) => setDrawPoints(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Col} controlId="formGridLosePoints">
                                                    <Form.Label>Điểm thua <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={losePoints}
                                                        onChange={(e) => setLosePoints(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: "20px 0" }}>
                                            <Row className={cx('round_inner')} style={{ padding: " 0" }}>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(1)}
                                                        className={cx("round_item border_left ", { 'active_fomart': activeFormat2 === 1, 'inactive_fomart': activeFormat2 !== 1 })}>
                                                        <p style={{ fontSize: "16px" }}>1 lượt</p>
                                                    </div>
                                                </Col>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(2)}
                                                        className={cx("round_item ", { 'active_fomart': activeFormat2 === 2, 'inactive_fomart': activeFormat2 !== 2 })}>
                                                        <p style={{ fontSize: "16px" }}>2 lượt</p>
                                                    </div>
                                                </Col>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(3)}
                                                        className={cx("round_item ", { 'active_fomart': activeFormat2 === 3, 'inactive_fomart': activeFormat2 !== 3 })}>
                                                        <p style={{ fontSize: "16px" }}>3 lượt</p>
                                                    </div>
                                                </Col>
                                                <Col style={{ padding: " 0" }}>
                                                    <div
                                                        onClick={() => handleFormatClick2(4)}
                                                        className={cx("round_item border_right ", { 'active_fomart': activeFormat2 === 4, 'inactive_fomart': activeFormat2 !== 4 })}>
                                                        <p style={{ fontSize: "16px" }}>4 lượt</p>
                                                    </div>
                                                </Col>

                                            </Row>
                                        </Row>
                                    </Col>
                                </Row>
                            )}

                            <Row>
                                <Col className={cx("active_fomart")} style={{ borderRadius: "4px", margin: "0 0 20px 0", padding: "4px 0px 4px 8px" }}>
                                    <p style={{ fontSize: "16px" }}>Đối với cấu hình này thì số lượng trận đấu của giải là: {numberOfMatches}</p>
                                </Col>
                            </Row>
                            <Row style={{ margin: "5px 0 20px 0" }}>
                                <Col>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xl={12}>
                                            <Form.Group as={Col} controlId="formGridLeagueName">
                                                <Form.Label>Số người mỗi đội <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Control type="number" placeholder="Nhập số người mỗi đội" onChange={(e) => setNumberOfPlayersPerTeamRange(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>


                            <Row style={{ margin: "0 0 20px 0" }}>
                                <Col style={{ display: "flex" }}>
                                    <input
                                        type='checkbox'
                                        style={{ margin: "0 8px" }}
                                        onChange={handleCheckboxChange}
                                        // Tích checkbox nếu registrationAllowed là 1
                                        checked={registrationAllowed === "yes"}
                                    />
                                    <div>Cho phép đăng ký tham gia</div>
                                </Col>
                            </Row>
                            {registrationAllowed === "yes" &&
                                <Row style={{ margin: "0 0 20px 0" }}>
                                    <Col style={{}}>
                                        <div style={{ color: '#9ba4b4' }}>
                                            Bạn sẽ mở giải đấu này cho các đội trong hệ thống MyLeague đăng ký tham gia.
                                            Hãy để ý danh sách đăng ký và chia sẻ thông tin của giải đến các đội.
                                        </div>
                                        <div>Hạn cuối đăng ký</div>
                                        <input type='date' min={minDate} value={selectedDate} onChange={handleDateChange} />

                                    </Col>
                                </Row>
                            }

                            <Row>
                                <Col className={cx("btn_create-league")}>
                                    <Button
                                        onClick={handleSubmitLeague}
                                        className={cx("btn_item active_fomart")}
                                        style={{ background: "#FD1E50" }} type="submit">
                                        Tạo giải
                                    </Button>
                                </Col>
                            </Row>

                        </Form>
                    </Row>

                </Row>

            </Container>
            <Footer></Footer>
        </Container>
    );
}