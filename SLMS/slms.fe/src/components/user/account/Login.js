import { Container, Card, Button } from "react-bootstrap";
import Header from "../../common/Header";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../Assets/css/user/account/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import images from "../../../Assets/images";
import Footer from "../../common/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login, sendEmailOTP } from "../../../services/auth";
import { jwtDecode } from 'jwt-decode';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);
export default function Login() {
  const [email, setInputEmail] = useState("");
  const [password, setInputPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy đường dẫn mà người dùng đã cố gắng truy cập trước khi chuyển hướng họ đến trang đăng nhập
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate(from); // Sửa đây để chuyển hướng người dùng về trang họ muốn sau khi đã đăng nhập
    }
  }, [navigate, from]); // Thêm phụ thuộc vào useEffect

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      toast.error("Email hoặc Mật khẩu không được rỗng");
      return;
    }
    try {
      const response = await login(email, password); // Sử dụng try/catch với async/await

      if (response.data === null) {
        toast.error("Email hoặc Mật khẩu không chính xác!");
        return;
      }

      const dataDecoded = jwtDecode(response.data);
      localStorage.setItem("token", response.data);
      localStorage.setItem("username", dataDecoded.fullname);
      localStorage.setItem("avatar", dataDecoded.avatar);
      localStorage.setItem("id", dataDecoded.id);

      if (dataDecoded.status === 'Pending') {
        try {
          await sendEmailOTP(email);
          toast.success("Vui lòng xác thực Email!");
          toast.success("Mã OTP đã được gửi về Email!");
          navigate(`/account/email-authentication/${email}`);
        } catch (error) {
          console.error('Lỗi khi gửi OTP: ' + error.message);
          toast.error("Có lỗi xảy ra khi gửi OTP, vui lòng thử lại.");
        }
      } else if (dataDecoded.status === 'Active') {
        toast.success(`Chúc mừng ${dataDecoded.fullname} đăng nhập thành công`);
        if (dataDecoded.roleId === '3' && dataDecoded.permissionId === '6') {
          navigate('/admin/dashboard');
        } else {
          navigate(from); // Đảm bảo `from` đã được định nghĩa ở đâu đó trong code của bạn
        }
      } else {
        toast.error('Tài khoản đã bị khoá');
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập: " + error.message);
      toast.error("Đăng nhập thất bại");
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
                  Đăng nhập
                </Card.Header>
                <Card.Body>
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
                  <div className={cx("form_input_footer")}>
                    <div className={cx("remember_me")}>
                      <input
                        className={cx("remember_me_checkbox")}
                        type="checkbox"
                      />
                      <p className={cx("remember_me_text")}>
                        Nhớ tài khoản của tôi
                      </p>
                    </div>
                    <div className={cx("form_input_forgot")}>
                      <Link
                        to={"/account/forgotpassword"}
                        className={cx("forgot_text")}
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                  </div>
                  <Button
                    style={{ backgroundColor: "#fd1e50" }}
                    className={cx("form-btn")}
                    onClick={handleLogin}
                  >

                    Đăng Nhập
                  </Button>
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
                  <p className={cx("card_footer_text")}>
                    Bạn chưa có tài khoản?
                  </p>
                  <Link to={"/account/register"} className={cx("url_register")}>
                    Đăng ký
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
