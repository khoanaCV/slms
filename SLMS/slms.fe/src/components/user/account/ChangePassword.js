import { Container, Card, Button } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "../../../Assets/css/user/account/reset/resetpassword.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { forgotpassword } from "../../../services/auth";
import { toast } from "react-toastify";



const cx = classNames.bind(styles);
export default function ChangePassword() {

    const { encodeEmail } = useParams();
    const [emailUser, setEmailUser] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (encodeEmail) {
            const decodedEmail = atob(encodeEmail);
            setEmailUser(decodedEmail);
        }
    }, [encodeEmail]);

    const handlePasswordChange = (e) => {
        e.preventDefault();

        forgotpassword(emailUser, password, rePassword).then(response => {
            toast.success('Đổi mật khẩu thành công.')
            navigate('/account/login')
        }).catch(error => {
            toast.error('Đổi mật khẩu thất bại. Vui lòng kiểm tra lại Email')
        });
    };

    return (
        <Container style={{ maxWidth: "100%", height: "100%" }} fluid>
            <Header />
            <Container fluid style={{ height: "600px", maxHeight: "100%" }}>
                <div className={cx("wrapper")}>
                    <div className={cx("inner")}>

                        <div className={cx("form_all")}>
                            <Card
                                style={{
                                    width: "100%",
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
                                    Đổi mật khẩu
                                </Card.Header>
                                <Card.Body>
                                    <div className={cx("form_input")}>
                                        <Card.Text className={cx("card_text")}>
                                            Đổi mật khẩu cho: {emailUser}

                                        </Card.Text>

                                    </div>
                                    <div className={cx("form_input")}>
                                        <Card.Text className={cx("card_text")}>
                                            Mật khẩu mới
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
                                            type="password"
                                            placeholder="Mật khẩu mới"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className={cx("form_input")}>
                                        <Card.Text className={cx("card_text")}>
                                            Nhập lại mật khẩu mới
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
                                            type="password"
                                            placeholder="Nhập lại mật khẩu mới"
                                            value={rePassword}
                                            onChange={e => setRePassword(e.target.value)}
                                        />
                                    </div>

                                    <Button
                                        style={{ backgroundColor: "#fd1e50" }}
                                        className={cx("form-btn")}
                                        onClick={handlePasswordChange}
                                    >
                                        Lưu
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </Container>
    );
}
