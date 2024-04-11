import { Container, Card, Button } from "react-bootstrap";
import Header from "../../common/Header";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../Assets/css/user/account/forgotpassword.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import images from "../../../Assets/images";
import Footer from "../../common/Footer";
import { useEffect, useState } from "react";
import { AuthorEmailOTP, ReSendEmailOTP, sendEmail } from "../../../services/auth";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
export default function EnterOtp() {
    const [otpString, setOtpString] = useState('');
    const navigate = useNavigate();
    const { email } = useParams();
    // console.log(email);



    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [countDown, setCountDown] = useState(300); // 5 phút = 300 giây

    useEffect(() => {
        // Hàm để cập nhật giảm giây mỗi giây
        const timer = countDown > 0 && setInterval(() => {
            setCountDown(countDown - 1);
        }, 1000);

        // Khi đếm ngược về 0, cho phép nhấn nút
        if (countDown === 0) {
            setIsButtonDisabled(false);
            clearInterval(timer);
        }

        return () => clearInterval(timer); // Dọn dẹp
    }, [countDown]);

    // Hàm để xử lý gửi lại OTP
    const handleResendOtp = async () => {
        setIsButtonDisabled(true); // Vô hiệu hóa nút
        setCountDown(300); // Đặt lại thời gian đếm ngược

        try {
            const response = await ReSendEmailOTP(email);
            // Kiểm tra phản hồi từ server và xử lý tương ứng
            if (response.success) {
                toast.success("OTP đã được gửi lại.");
            } else {
                toast.error("Không thể gửi lại OTP.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi gửi lại OTP.");
        }
    };


    const handleConfirmOtp = async () => {
        if (!otpString || otpString.length === 0) {
            toast.error("Vui lòng nhập mã OTP.");
            return;
        }

        try {
            const response = await AuthorEmailOTP(email, otpString);
            // Kiểm tra phản hồi từ server và xử lý tương ứng
            if (response.success) {
                toast.success("Xác nhận OTP thành công.");
                localStorage.removeItem("token");
                navigate('/account/login');
            } else {
                toast.error("Xác nhận OTP không thành công.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xác nhận OTP.");
        }
    };

    return (
        <Container style={{ maxWidth: "100%", height: "100%" }} fluid>
            <Header />
            <Container fluid style={{ height: "600px", maxHeight: "100%" }}>
                <div className={cx("wrapper")}>
                    <div className={cx("inner")}>
                        <div className={cx("logo_images")}>
                            <h1 className={cx("logo_text")}>SMART LEAGUE</h1>
                            <img
                                className={cx("logo_img")}
                                src={images.aovang}
                                alt="ảnh cầu thủ"
                            />
                        </div>
                        <div className={cx("form_all")}>
                            <Card
                                style={{
                                    width: "600px",
                                    border: "1px solid #8f8f8f",
                                    boxShadow:
                                        "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19)",
                                    padding: "10px",
                                }}
                            >
                                <Card.Header
                                    style={{
                                        width: "100%",
                                        fontWeight: "600",
                                        color: "var(--primary-text)",
                                        backgroundColor: "white",
                                        borderBottom: "2px solid #8f8f8f",
                                    }}
                                    as="h5"
                                >
                                    Xác nhận email
                                </Card.Header>
                                <Card.Body>
                                    <div className={cx("form_input")}>
                                        <Card.Text className={cx("card_text")}>
                                            Nhập mã OTP
                                            <p
                                                style={{
                                                    color: "red",
                                                    display: "inline-block",
                                                    marginLeft: "4px",
                                                    fontSize: "16px"
                                                }}
                                            >
                                                *
                                            </p>
                                        </Card.Text>
                                        <input
                                            className={cx("input_info")}
                                            required={true}
                                            type="email"
                                            placeholder="Nhập mã OTP"
                                            value={otpString}
                                            onChange={e => setOtpString(e.target.value)}
                                        />
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <Button
                                            style={{
                                                backgroundColor: isButtonDisabled ? "#d3d3d3" : "#fd1e50",
                                                width: "200px"
                                            }}
                                            className={cx("form-btn")}
                                            onClick={handleResendOtp}
                                            disabled={isButtonDisabled}
                                        >
                                            Gửi lại OTP sau {isButtonDisabled && `(${Math.floor(countDown / 60)}:${('0' + countDown % 60).slice(-2)})`}
                                        </Button>
                                        <Button
                                            style={{ backgroundColor: "#fd1e50", width: "150px" }}
                                            className={cx("form-btn")}
                                            onClick={handleConfirmOtp}
                                        >
                                            Xác nhận
                                        </Button>

                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer></Footer>
        </Container>
    );
}
