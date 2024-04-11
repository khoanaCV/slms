import { Container, Card, Button } from "react-bootstrap";
import Header from "../../common/Header";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../Assets/css/user/account/register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import images from "../../../Assets/images";
import Footer from "../../common/Footer";
import { useEffect, useState } from "react";
import { register, sendEmailOTP } from "../../../services/auth";

const cx = classNames.bind(styles);
export default function Register() {
  const [email, setInputEmail] = useState("");
  const [fullname, setInputFullname] = useState("");
  const [password, setInputPassword] = useState("");
  const [rePassword, setReInputPassword] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (event) => {
    event.preventDefault();
    if (email === '' || password === '' || rePassword === '' || fullname === '') {
      toast.error("Vui lòng điền hết thông tin");
      return;
    }
    if (!email) {
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    if (!password) {
    } else if (password.length < 8) {
      toast.error("Mật khẩu phải dài hơn 8 kí tự.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Mật khẩu phải chứa một chữ cái viết hoa.");
      return;
    } else if (!/[0-9]/.test(password)) {
      toast.error("Mật khẩu phải chứa ít nhất một số.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
      return;
    }

    if (!rePassword) {
    } else if (password !== rePassword) {
      toast.error("Mật khẩu không trùng khớp");
      return;
    }

    try {
      const response = await register(email, password, rePassword, fullname);
      if (response.success === false) {
        toast.error("Email đã tồn tại, vui lòng điền email khác!");
      } else {
        // Gửi email OTP ngay sau khi đăng ký thành công
        await sendEmailOTP(email)
          .then(() => {
            toast.success("Đăng ký thành công!");
            toast.success("Mã OTP đã được gửi về email!");
            navigate(`/account/email-authentication/${email}`);
          })
          .catch((error) => {
            console.error('Lỗi khi gửi OTP: ' + error.message);
            toast.error("Có lỗi xảy ra khi gửi OTP, vui lòng thử lại.");
          });
      }
    } catch (error) {
      console.log('Lỗi khi đăng ký: ' + error.message);
      toast.error("Đăng ký thất bại");
    }

  }




  return (
    <Container style={{ maxWidth: "100%", height: "100%" }} fluid>
      <Header />
      <Container fluid style={{ height: "700px", maxHeight: "100%" }}>
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
                  Đăng Ký
                </Card.Header>
                <Card.Body>
                  <div className={cx("form_input")}>
                    <Card.Text className={cx("card_text")}>
                      Họ và tên
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
                      type="text"
                      placeholder="Họ và tên"
                      onChange={(e) => setInputFullname(e.target.value)}
                    />
                  </div>
                  <div className={cx("form_input")}>
                    <Card.Text className={cx("card_text")}>
                      Địa chỉ email
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
                      type="text"
                      placeholder="Địa chỉ email"
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                  </div>
                  <div className={cx("form_input")}>
                    <Card.Text className={cx("card_text")}>
                      Mật Khẩu
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
                      placeholder="Mật Khẩu"
                      onChange={(e) => setInputPassword(e.target.value)}
                    />
                  </div>
                  <div className={cx("form_input")}>
                    <Card.Text className={cx("card_text")}>
                      Nhập Lại Mật Khẩu
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
                      placeholder="Nhập Lại Mật Khẩu"
                      onChange={(e) => setReInputPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    style={{ backgroundColor: "#fd1e50" }}
                    className={cx("form-btn")}
                    onClick={handleRegister}
                  >
                    Đăng Ký
                  </Button>
                  <div className={cx("form_rules")}>
                    Bằng cách nhấp vào Đăng ký, bạn cho biết rằng bạn đã đọc
                    hiểu và đồng ý với{" "}
                    <Link
                      style={{ color: "#fd1e50", textDecoration: "none" }}
                      to={"/account/register"}
                    >
                      Điều khoản sử dụng
                    </Link>{" "}
                    và
                    <Link
                      style={{ color: "#fd1e50", textDecoration: "none" }}
                      to={"/account/register"}
                    >
                      Chính sách bảo mật của chúng tôi
                    </Link>
                    .
                  </div>
                </Card.Body>
                <Card.Footer
                  style={{
                    width: "100%",
                    fontSize: "16px",
                    paddingTop: "20px",
                    color: "var(--primary-text)",
                    backgroundColor: "white",
                    borderTop: "2px solid #8f8f8f",
                    textAlign: "start",
                    display: "flex",
                  }}
                  as="h5"
                >
                  <p className={cx("card_footer_text")}>Bạn đã có tài khoản?</p>
                  <Link to={"/account/login"} className={cx("url_register")}>
                    Đăng nhập
                  </Link>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </Container>
  );
}
