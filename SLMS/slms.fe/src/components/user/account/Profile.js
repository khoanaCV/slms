import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Modal, Alert, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser, faWarning } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames/bind";
import 'bootstrap/dist/css/bootstrap.min.css';
import images from "../../../Assets/images";
import styles from "../../../Assets/css/user/league/createleague.css";
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { getProfileById, updateProfile } from '../../../services/UserSevice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
export default function Profile() {
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [email, setEmail] = useState('binyeutin@gmail.com');
  const [profileData, setProfileData] = useState({});

  const [validated, setValidated] = useState(false);

  const currentToken = localStorage.getItem('token');
  const navigate = useNavigate();
  //Mã hoá token
  const dataDecoded = jwtDecode(currentToken);
  const currentId = dataDecoded.id;
  const currentEmail = dataDecoded.email;

  const handleCloseChangeEmail = () => setShowChangeEmail(false);
  const handleShowChangeEmail = () => setShowChangeEmail(true);

  const handleEditChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };
  
  const [userImage, setUserImage] = useState(null);
  const [fullname, setFullname] = useState('');
  const [country, setCountry] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const formattedDate = birthDate?.split("T")[0] ?? "";

  const handleSubmit = (event) => {
    event.preventDefault()

    const phoneRegex = /^0[0-9]{9}$/;

    // Check if contactInfo is a valid phone number
    if(contactInfo !== null){
      if (!phoneRegex.test(contactInfo)) {
        toast.error("Sai định dạng Số điện thoại");
        return; // Stop the form submission
    }
    }
    
    
    const formData = new FormData();
    
    formData.append('Avatar', userImage);
    formData.append('Fullname', fullname);
    formData.append('Country', country);
    formData.append('ContactInfo', contactInfo);
    formData.append('BirthDate', birthDate);
    formData.append('Bio', bio);
    

    updateProfile(currentId, formData)
      .then((data) => {
        console.log("Profile updated successfully:", data);
       
        toast.success("Cập nhật thông tin thành công");
        getProfileById(currentId)
        .then(response => {
          setProfileData(response.data);
          setLeagueImage(response.data.avatar)
          setFullname(response.data.fullname)
          setCountry(response.data.country)
          setContactInfo(response.data.contactInfo)
          setBirthDate(response.data.birthDate)
          setBio(response.data.bio)
          localStorage.setItem('username', fullname)
          localStorage.setItem('avatar', response.data.avatar)
          navigate('/account/profile')
        })
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Cập nhật thông tin thất bại");
      });



  };

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleShowDeleteAccountModal = () => setShowDeleteAccount(true);
  const handleCloseDeleteAccount = () => setShowDeleteAccount(false);
  const handleDeleteAccount = () => {
    // Implement the delete account functionality here
    setShowDeleteAccount(false);
  };


  const [leagueImage, setLeagueImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        setUserImage(file);
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

  //call api
  useEffect(() => {
    getProfileById(currentId)
      .then(response => {
        setProfileData(response.data);
        setLeagueImage(response.data.avatar)
        setFullname(response.data.fullname)
        setCountry(response.data.country)
        setContactInfo(response.data.contactInfo)
        setBirthDate(response.data.birthDate)
        setBio(response.data.bio)
      })
  }, [currentId]);



  console.log("info " + profileData);
  // console.log(currentEmail);
 
  return (
    <Container fluid>
      <Header />
      <Container style={{ padding: "20px 0", marginBottom: "30px" }}>


        <Row className="mb-4">
          <Col>
            <h3>
              <FontAwesomeIcon icon={faUser} /> Thông tin tài khoản
            </h3>
          </Col>
        </Row>


        <Row>
          <Col xl={4} md={4} sm={12} className="text-center">
            <Row style={{ padding: "10px 0" }}>
              <Col xs="4" className={cx("form_avt")} onClick={handleImageClick}>

                <div className={cx("image-container")}>
                  {leagueImage === null && (
                    <>
                      <img src={images.logoteam1} alt="Default League Image" className={cx("default-league-image")} />
                      <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                    </>
                  )}
                  {leagueImage !== null && (
                    <>
                      <img onClick={handleImageClick} src={leagueImage} alt="Ảnh đại diện" className={cx("league-image-preview")} />
                      <input style={{ display: "none" }} type='file' id="leagueImageInput" onChange={handleImageUpload} />
                    </>

                  )}
                </div>
              </Col>

            </Row>
            <Row>
              <Col xl={6} md={4} sm={12}>
                <h2 style={{ color: "#FD1E50", fontWeight: "550", fontSize: "20px", cursor: "pointer" }} className="panel-title text-center pointer" onClick={handleShowChangeEmail}>
                  {currentEmail}
                </h2>
                <Button href='/account/resetpassword' variant="link" style={{ color: "#FD1E50", textDecoration: "none" }}>Nhấn để đổi mật khẩu</Button>
                <div>
                  <FontAwesomeIcon icon={faWarning} style={{ color: '#fcc05b' }} />
                  <span> Chưa kích hoạt email</span>
                  <Button variant="warning">Gửi lại Email</Button>
                </div>
              </Col>
            </Row>

          </Col>

          <Col md={7} sm={12}>
            <Row>
              <Col>
                <Form.Group as={Col} controlId="fullname">
                  <Form.Label>Họ & Tên</Form.Label>
                  <Form.Control type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="country">
                  <Form.Label>Quốc tịch</Form.Label>
                  <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="contactInfo">
                  <Form.Label>Điện Thoại</Form.Label>
                  <Form.Control type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="birthDate">
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control type="date" value={formattedDate} placeholder="dd/mm/yyyy" onChange={(e) => setBirthDate(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="bio">
                  <Form.Label>Giới thiệu</Form.Label>
                  <Form.Control value={bio} as="textarea" rows={3} onChange={(e) => setBio(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col style={{ textAlign: "center" }}>
                <Button style={{ marginTop: "10px", width: "80px", backgroundColor: "#FD1E50", border: "none" }} onClick={handleSubmit} type="button">Lưu</Button>
              </Col>
            </Row>
          </Col>
        </Row>


        <Modal show={showChangeEmail} onHide={handleCloseChangeEmail}>
          <Modal.Header closeButton>
            <Modal.Title>Đổi Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newEmail">
              <Form.Label>New Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter new email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseChangeEmail}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleCloseChangeEmail}>
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </Container>

  );
}                 
