import { Container, Card, Button } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "../../../../Assets/css/user/account/reset/resetpassword.css";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";

import { jwtDecode } from 'jwt-decode';
import { useState } from "react";
import { toast } from "react-toastify";
import { resetpassword } from "../../../../services/UserSevice";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../../services/auth";



const cx = classNames.bind(styles);
export default function ResetPassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const currentToken = localStorage.getItem('token');
  //Mã hoá token
  const dataDecoded = jwtDecode(currentToken);
  const currentId = dataDecoded.id;
  console.log(currentId);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (currentPassword === '' || newPassword === '' || reNewPassword === '') {
      toast.error("Vui lòng điền hết thông tin");
      return;
    }
    if (!newPassword) {
    } else if (newPassword.length < 8) {
      toast.error("Mật khẩu phải dài hơn 8 kí tự.");
      return;
    } else if (!/[A-Z]/.test(newPassword)) {
      toast.error("Mật khẩu phải chứa một chữ cái viết hoa.");
      return;
    } else if (!/[0-9]/.test(newPassword)) {
      toast.error("Mật khẩu phải chứa ít nhất một số.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      toast.error("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
      return;
    }

    if (!reNewPassword) {
    } else if (newPassword !== reNewPassword) {
      toast.error("Mật khẩu không trùng khớp");
      return;
    }
    try {
      const respone = await resetpassword(currentId, currentPassword, newPassword, reNewPassword);
      console.log(respone);
      if (respone.message === "Change password successfully") {
        toast.success("Đổi mật khẩu thành công!")
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        navigate('/');

      }
      if (respone && respone.message === "Failed to change password. Please check your current password.") {
        toast.error("Vui lòng kiểm tra lại mật khẩu cũ");

        navigate('/account/resetpassword');
      }
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại");
    }


  }

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
                      Mật khẩu cũ
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
                      placeholder="Mật Khẩu cũ"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
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
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      onChange={(e) => setReNewPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    style={{ backgroundColor: "#fd1e50" }}
                    className={cx("form-btn")}
                    onClick={handleResetPassword}
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
