import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountdownHeader from './CountdownHeader';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import Header from '../../common/Header';
import Footer from '../../common/Footer';




const CountdownTimer = () => {
    // Set the end date for the countdown
    const countDownDate = new Date('April 20, 2024'); // Sửa ở đây
    const idLeague = useParams()
    const [activeStarIndex, setActiveStarIndex] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
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

    // State to store the countdown time
    const [countDown, setCountDown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate.getTime() - now;


            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);


            setCountDown({ days, hours, minutes, seconds });


            if (distance < 0) {
                clearInterval(interval);

            }
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);


    return (
        <Container fluid style={{ padding: "0" }}>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "30px" }}>
                <Row>
                    <Col style={{ padding: "0" }}>
                        <CountdownHeader idLeague={idLeague.idLeague} onBtnCircleClick={() => handleBtnCircleClick(idLeague.idLeague)} />
                        <Row style={{ marginTop: "80px", marginBottom: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Col xs={10}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "8px",
                                    padding: "50px 0",
                                    backgroundColor: "#fd1e50",
                                    color: "white"
                                }}
                            >

                                <Row>
                                    <Col>
                                        {/* Hiển thị ngày dừng đăng ký */}
                                        <div>Giải cho phép đăng ký trực tuyến đến hết ngày {countDownDate.toLocaleDateString()}</div>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '20px' }}>
                                    <Col md={3}>
                                        <div style={{ width: '100px', backgroundColor: "#9C9C9C", textAlign: 'center', padding: '8px', borderRadius: "8px" }} className="countdown-number">{countDown.days} Ngày</div>
                                    </Col>
                                    <Col md={3}>
                                        <div style={{ width: '100px', backgroundColor: "#9C9C9C", textAlign: 'center', padding: '8px', borderRadius: "8px" }} className="countdown-number">{countDown.hours} Giờ</div>
                                    </Col>
                                    <Col md={3}>
                                        <div style={{ width: '100px', backgroundColor: "#9C9C9C", textAlign: 'center', padding: '8px', borderRadius: "8px" }} className="countdown-number">{countDown.minutes} Phút</div>
                                    </Col>
                                    <Col md={3}>
                                        <div style={{ width: '100px', backgroundColor: "#9C9C9C", textAlign: 'center', padding: '8px', borderRadius: "8px" }} className="countdown-number">{countDown.seconds} Giây</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="primary">Bắt đầu đăng ký</Button>
                                    </Col>
                                </Row>
                            </Col>
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

            </Container>
            <Footer />
        </Container>
    );
};

export default CountdownTimer;
