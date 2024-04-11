import styles from "../../../Assets/css/user/competitor/createteam.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Button, Dropdown, Form } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import images from "../../../Assets/images";

import { Component, useState } from "react";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import { createTeam } from "../../../services/TeamSevice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);


class TextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        this.props.onDescriptionChange(draftToHtml(rawContentState)); // Gọi hàm callback và truyền nội dung vào đó

        this.setState({
            editorState,
        });
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


export default function CreateTeam() {
    //Infomation Team
    const currentToken = localStorage.getItem('token');
    //Mã hoá token
    const dataDecoded = jwtDecode(currentToken);
    const currentId = dataDecoded.id;
    const currentName = dataDecoded.fullname;

    const [teamAvt, setTeamAvt] = useState(null);
    const [teamName, setTeamName] = useState("");
    const [skillLevel, setSkillLevel] = useState("");
    const [privacyMode, setPrivacyMode] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [contactPerson, setContactPerson] = useState(currentName);
    const [contactPersonEmail, setContactPersonEmail] = useState("");
    const [activityArea, setActivityArea] = useState("");
    const [operatingTime, setOperatingTime] = useState("");
    const [teamUniform1, setTeamUniform1] = useState(null);
    const [teamUniform2, setTeamUniform2] = useState(null);
    const [teamUniform3, setTeamUniform3] = useState(null);
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    console.log(privacyMode);
    console.log(skillLevel);

    const handleDescriptionChange = (content) => {
        const cleanedContent = content.replace(/<p>/g, '').replace(/<\/p>/g, '');
        setDescription(cleanedContent);
    };

    const [leagueImage, setLeagueImage] = useState(null);
    const [leagueImage1, setLeagueImage1] = useState(null);
    const [leagueImage2, setLeagueImage2] = useState(null);
    const [leagueImage3, setLeagueImage3] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setTeamAvt(file);
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
            setTeamUniform1(file);
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
            setTeamUniform2(file);
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
            setTeamUniform3(file);
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

    //call api
    const handleSave = () => {
        if (!teamName || !skillLevel || !phoneNumber) {
            toast.error("Vui lòng điền đầy đủ thông tin có dấu *.");
            return;
        }
        // Form data you want to send to the server
        const formData = new FormData();
        formData.append('Name', teamName);
        formData.append('Level', skillLevel);
        formData.append('OpenOrNot', privacyMode);
        formData.append('Phone', phoneNumber);
        formData.append('AgeJoin', ageRange);
        formData.append('ContactPerson', contactPerson);
        formData.append('ContactPersonEmail', contactPersonEmail);
        formData.append('ActivityArea', activityArea);
        formData.append('OperatingTime', operatingTime);
        formData.append('Logo', teamAvt);
        formData.append('UniForm1', teamUniform1);
        formData.append('UniForm2', teamUniform2);
        formData.append('UniForm3', teamUniform3);
        formData.append('Description', description);
        formData.append('TeamManagerId', currentId);


        createTeam(formData)
            .then((data) => {
                // Handle success response here
                console.log("Team created successfully:", data);
                toast.success("Tạo team thành công");
                navigate(`/competitor/${currentId}/${data.id}/profile`)
            })
            .catch((error) => {
                // Handle error here
                console.error("Error creating team:", error);
                toast.success("Tạo team thất bại");
            });
    };
    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={11} >
                                <Row>
                                    <Col style={{ padding: "10px 20px", borderBottom: "1px solid #8f8f8f" }}>
                                        <p className="info_basic">Tạo đội thi đấu</p>
                                    </Col>
                                </Row>
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
                                                <Form.Control type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Nhập tên đội" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridPhone">
                                                <Form.Label>Trình độ <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Form.Select aria-label="Default select example" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
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
                                                <Form.Select aria-label="Default select example" value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
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
                            </Col>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={11} >
                                <Row>
                                    <Col style={{ padding: "10px 20px", borderBottom: "1px solid #8f8f8f" }}>
                                        <p className="info_basic">Thông tin liên hệ</p>
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>

                                    <Col xs="10" className={cx("form_infomation")}>
                                        <Row className="mb-3">
                                            <Col xs={5} >
                                                <Form.Group as={Col} controlId="formGridLeagueName">
                                                    <Form.Label>Tên người liên hệ </Form.Label>
                                                    <Form.Control type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
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


                            </Col>
                        </Row>

                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={11} >
                                <Row>
                                    <Col style={{ padding: "10px 20px", borderBottom: "1px solid #8f8f8f" }}>
                                        <p className="info_basic">Đồng phục</p>
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


                            </Col>
                        </Row>

                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={11} >
                                <Row>
                                    <Col style={{ padding: "10px 20px", borderBottom: "1px solid #8f8f8f" }}>
                                        <p className="info_basic">Giới thiệu</p>
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>

                                    <Col xs="10" className={cx("form_infomation")}>

                                        <TextEditor onDescriptionChange={handleDescriptionChange} />
                                    </Col>
                                </Row>


                            </Col>
                        </Row>

                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Col xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    style={{ width: "100px", backgroundColor: "#FD1E50" }}
                                    onClick={handleSave}>Lưu</Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>

    );
}
