import styles from "../../../Assets/css/user/competitor/updateteam.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Form, Dropdown, Button } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import images from "../../../Assets/images";
import HeaderBodyTeam from "./HeaderBodyTeam";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Component, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateTeamsByTeamId, getTeamsByTeamId } from "../../../services/TeamSevice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.editorState !== prevProps.editorState) {
            this.setState({ editorState: this.props.editorState });
        }
    }

    onEditorStateChange = (editorState) => {
        this.props.setEditorState(editorState);
        this.setState({ editorState });
        const contentState = editorState.getCurrentContent();
        let rawText = contentState.getPlainText();
        this.props.onDescriptionChange(rawText);
    };

    render() {
        const { editorState } = this.state;
        const editorStyles = cx('editorStyle');

        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName={editorStyles}
                onEditorStateChange={this.onEditorStateChange}
            />
        );
    }
}


export default function UpdateTeam() {
    const [infomationTeam, setInformationTeam] = useState({});
    const currentToken = localStorage.getItem('token');
    //Mã hoá token
    const dataDecoded = jwtDecode(currentToken);
    const currentId = dataDecoded.id;

    const [leagueImage, setLeagueImage] = useState(null);
    const [leagueImage1, setLeagueImage1] = useState(null);
    const [leagueImage2, setLeagueImage2] = useState(null);
    const [leagueImage3, setLeagueImage3] = useState(null);
    const { id } = useParams();
    const [teamAvatar, setTeamAvatar] = useState(null);
    const [uniForm1, setUniForm1] = useState(null);
    const [uniForm2, setUniForm2] = useState(null);
    const [uniForm3, setUniForm3] = useState(null);



    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setTeamAvatar(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLeagueImage(e.target.result);
            };
            setLeagueImage(reader.readAsDataURL(file));
        }
    };
    const handleImageUpload1 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUniForm1(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLeagueImage1(e.target.result);
            };
            setLeagueImage1(reader.readAsDataURL(file));
        }
    };
    const handleImageUpload2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUniForm2(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLeagueImage2(e.target.result);
            };
            setLeagueImage2(reader.readAsDataURL(file));
        }
    };
    const handleImageUpload3 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUniForm3(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLeagueImage3(e.target.result);
            };
            setLeagueImage3(reader.readAsDataURL(file));
        }
    };

    const handleImageClick = () => {
        // Truy cập input khi hình ảnh được click
        document.getElementById('leagueImageInput').click();
    };
    const handleImageClick1 = () => {
        // Truy cập input khi hình ảnh được click
        document.getElementById('leagueImageInput1').click();
    };
    const handleImageClick2 = () => {
        // Truy cập input khi hình ảnh được click
        document.getElementById('leagueImageInput2').click();
    };
    const handleImageClick3 = () => {
        // Truy cập input khi hình ảnh được click
        document.getElementById('leagueImageInput3').click();
    };
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    //infomation team 
    const [teamName, setTeamName] = useState("");
    const [skillLevel, setSkillLevel] = useState("");
    const [privacyMode, setPrivacyMode] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [contactPerson, setContactPerson] = useState('');
    const [contactPersonEmail, setContactPersonEmail] = useState("");
    const [activityArea, setActivityArea] = useState("");
    const [operatingTime, setOperatingTime] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleDescriptionChange = (content) => {
        const cleanedContent = content.replace(/<p>/g, '').replace(/<\/p>/g, '');
        setDescription(cleanedContent);
    };
    useEffect(() => {
        if (id) {
            getTeamsByTeamId(id)
                .then(data => {

                    setInformationTeam(data);
                    setLeagueImage(data.logo);
                    setLeagueImage1(data.uniForm1);
                    setLeagueImage2(data.uniForm2);
                    setLeagueImage3(data.uniForm3);


                    setTeamName(data.name);
                    setSkillLevel(data.level);
                    setPrivacyMode(data.openOrNot);
                    setPhoneNumber(data.phone);
                    setAgeRange(data.ageJoin);
                    setContactPerson(data.contactPerson);
                    setContactPersonEmail(data.contactPersonEmail);
                    setActivityArea(data.activityArea);
                    setOperatingTime(data.operatingTime);

                    setDescription(data.description);

                    const blocksFromHTML = convertFromHTML(data.description);
                    const state = ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap,
                    );
                    setEditorState(EditorState.createWithContent(state));

                })
                .catch(error => {
                    console.error('Failed to fetch leagues:', error);
                });
        }
    }, [id]);

    console.log(teamAvatar);
    //Update thông tin team
    const handleUpdateTeam = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('TeamID', id);
        formData.append('Name', teamName);
        formData.append('Level', skillLevel);
        formData.append('OpenOrNot', privacyMode);
        formData.append('Phone', phoneNumber);
        formData.append('AgeJoin', ageRange);
        formData.append('ContactPerson', contactPerson);
        formData.append('ContactPersonEmail', contactPersonEmail);
        formData.append('ActivityArea', activityArea);
        formData.append('OperatingTime', operatingTime);

        formData.append('Logo', teamAvatar);


        formData.append('UniForm1', uniForm1);
        formData.append('UniForm2', uniForm2);
        formData.append('UniForm3', uniForm3);
        formData.append('Description', description);
        formData.append('TeamManagerId', currentId);

        try {
            const response = await UpdateTeamsByTeamId(id, formData);
            toast.success('Cập nhật thông tin thành công.');
            console.log();
            getTeamsByTeamId(id)
                .then(data => {

                    setInformationTeam(data);
                    setLeagueImage(data.logo);
                    setLeagueImage1(data.uniForm1);
                    setLeagueImage2(data.uniForm2);
                    setLeagueImage3(data.uniForm3);


                    setTeamName(data.name);
                    setSkillLevel(data.level);
                    setPrivacyMode(data.openOrNot);
                    setPhoneNumber(data.phone);
                    setAgeRange(data.ageJoin);
                    setContactPerson(data.contactPerson);
                    setContactPersonEmail(data.contactPersonEmail);
                    setActivityArea(data.activityArea);
                    setOperatingTime(data.operatingTime);

                    setDescription(data.description);

                    const blocksFromHTML = convertFromHTML(data.description);
                    const state = ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap,
                    );
                    setEditorState(EditorState.createWithContent(state));
                    //console.log("data: " + data);

                })
                .catch(error => {
                    console.error('Failed to fetch leagues:', error);
                });
        } catch (error) {
            toast.error('Cập nhật thông tin thất bại.');
        }
    };

    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyTeam inforTeam={infomationTeam} />
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={10}>
                                {/* Body */}
                                <Row style={{ padding: "10px", borderBottom: "1px solid #8d8d8d" }}>
                                    <Col style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                        <h3>
                                            Chỉnh sửa đội đấu
                                        </h3>
                                        <div>
                                            Vui lòng nhập thông tin hợp lệ cho các trường được yêu cầu
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>
                                            <Col xs="12" xl={3} lg={12} md={12} className={cx("form_avt")} onClick={handleImageClick}>
                                                <div style={{ margin: "0 0 10px 0" }}>Ảnh đại diện</div>
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
                                            <Col xs="12" xl={5} lg={12} md={12} className={cx("form_infomation")}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridLeagueName">
                                                        <Form.Label>Tên đội <span style={{ color: "red" }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Nhập tên đội" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} controlId="formGridPhone">
                                                        <Form.Label>Trình độ <span style={{ color: "red" }}>*</span></Form.Label>
                                                        <Form.Select aria-label="Default select example" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} >
                                                            <option value="">---Vui lòng chọn---</option>
                                                            <option value="Chuyên nghiệp">Chuyên nghiệp</option>
                                                            <option value="Bán chuyên nghiệp">Bán chuyên nghiệp</option>
                                                            <option value="Cao cấp">Cao cấp</option>
                                                            <option value="Trung cấp">Trung cấp</option>
                                                            <option value="Phong trào">Phong trào</option>
                                                            <option value="Khác">Khác</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group as={Col} controlId="formGridPhone">
                                                        <Form.Label>Chế độ</Form.Label>
                                                        <Form.Select aria-label="Default select example" value={privacyMode} onChange={(e) => setPrivacyMode(e.target.value)}>
                                                            <option value={1}>Công khai</option>
                                                            <option value={2}>Riêng tư</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} controlId="formGridAddress">
                                                        <Form.Label>Số điện thoại<span style={{ color: "red" }}>*</span></Form.Label>
                                                        <Form.Control placeholder="Nhập số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} controlId="formGridAddress">
                                                        <Form.Label>Độ tuổi</Form.Label>
                                                        <Form.Select aria-label="Default select example" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} >
                                                            <option>---Vui lòng chọn---</option>
                                                            <option value="15-20">15-20</option>
                                                            <option value="20-25">20-25</option>
                                                            <option value="25-30">25-30</option>
                                                            <option value=">30">&gt;30</option>

                                                        </Form.Select>
                                                    </Form.Group>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>

                                            <Col xs="10" className={cx("form_infomation")}>
                                                <Row className="mb-3">
                                                    <Col xs={5} >
                                                        <Form.Group as={Col} controlId="formGridLeagueName">
                                                            <Form.Label>Tên người liên hệ </Form.Label>
                                                            <Form.Control type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="" />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridLeagueName">
                                                            <Form.Label>Khu vực hoạt động </Form.Label>
                                                            <Form.Control type="text" placeholder="Nhập vị trí" value={activityArea} onChange={(e) => setActivityArea(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Form.Group as={Col} controlId="formGridLeagueName">
                                                            <Form.Label>Địa chỉ email </Form.Label>
                                                            <Form.Control type="text" value={contactPersonEmail} onChange={(e) => setContactPersonEmail(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridLeagueName">
                                                            <Form.Label>Khung thời gian hoạt động </Form.Label>
                                                            <Form.Control type="text" placeholder="VD:T2-07:23 hoặc CN-18:23" value={operatingTime} onChange={(e) => setOperatingTime(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                        <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>

                                            <Col xs="10" className={cx("form_infomation")}>
                                                <Row className="mb-3">
                                                    <Col xs={4} onClick={handleImageClick1}>
                                                        <div>Đồng phục 1</div>
                                                        <div className={cx("image-container")}>
                                                            {leagueImage1 === null && (
                                                                <>
                                                                    <img src={images.shirt} alt="Default  Image" className={cx("default-league-image")} />
                                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput1" onChange={handleImageUpload1} />
                                                                </>
                                                            )}
                                                            {leagueImage1 !== null && (
                                                                <>
                                                                    <img onClick={handleImageClick1} src={leagueImage1} alt="Hình ảnh giải đấu" className={cx("league-image-preview")} />
                                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput1" onChange={handleImageUpload1} />
                                                                </>

                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col xs={4} onClick={handleImageClick2}>
                                                        <div>Đồng phục 2</div>
                                                        <div className={cx("image-container")}>
                                                            {leagueImage2 === null && (
                                                                <>
                                                                    <img src={images.shirt} alt="Default  Image" className={cx("default-league-image")} />
                                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput2" onChange={handleImageUpload2} />
                                                                </>
                                                            )}
                                                            {leagueImage2 !== null && (
                                                                <>
                                                                    <img onClick={handleImageClick} src={leagueImage2} alt="Hình ảnh giải đấu" className={cx("league-image-preview")} />
                                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput2" onChange={handleImageUpload2} />
                                                                </>

                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col xs={4} onClick={handleImageClick3}>
                                                        <div>Đồng phục 3</div>
                                                        <div className={cx("image-container")}>
                                                            {leagueImage3 === null && (
                                                                <>
                                                                    <img src={images.shirt} alt="Default  Image" className={cx("default-league-image")} />
                                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput3" onChange={handleImageUpload3} />
                                                                </>
                                                            )}
                                                            {leagueImage3 !== null && (
                                                                <>
                                                                    <img onClick={handleImageClick3} src={leagueImage3} alt="Hình ảnh giải đấu" className={cx("league-image-preview")} />
                                                                    <input style={{ display: "none" }} type='file' id="leagueImageInput3" onChange={handleImageUpload3} />
                                                                </>

                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ padding: "10px 20px", borderBottom: "1px solid #8f8f8f" }}>
                                                <p className="info_basic">Giới thiệu</p>
                                            </Col>
                                        </Row>
                                        <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>

                                            <Col xs="10" className={cx("form_infomation")}>

                                                <TextEditor editorState={editorState} setEditorState={setEditorState} onDescriptionChange={handleDescriptionChange} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{ display: "flex", justifyContent: "center" }}>
                                    <Col xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                        <Button
                                            style={{ width: "100px", backgroundColor: "#FD1E50" }}
                                            href={`/competitor/${id}/settingteam`} onClick={handleUpdateTeam}>Lưu</Button>

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
