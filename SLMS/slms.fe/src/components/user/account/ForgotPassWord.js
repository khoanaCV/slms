import { Container, Card, Button } from "react-bootstrap";
import Header from "../../common/Header";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../Assets/css/user/account/forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";

import images from "../../../Assets/images";
import Footer from "../../common/Footer";
import { useState } from "react";
import { sendEmail } from "../../../services/auth";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
export default function ForgotPassWord() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    sendEmail(email).then(response => {
      toast.success('Gửi email thành công, vui lòng kiểm tra email.')
    }).catch(error => {
      toast.error('Gửi email thất bại.')
    });
  }
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
                  Đặt lại mật khẩu
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
                      type="email"
                      placeholder="Địa chỉ email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <Button
                    style={{ backgroundColor: "#fd1e50" }}
                    className={cx("form-btn")}
                    onClick={handleSubmit}
                  >
                    Gửi
                  </Button>
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
