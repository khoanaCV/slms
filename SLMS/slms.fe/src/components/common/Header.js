import { Link, useNavigate } from "react-router-dom";

import styles from "../../Assets/css/common/header.css";
import classNames from "classnames/bind";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import images from "../../Assets/images";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from "react";
import Popup from "./Popup";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [tippyVisible, setTippyVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const [visible1, setVisible1] = useState(false);
  const show1 = () => setVisible1(true);
  const hide1 = () => setVisible1(false);

  const [visible2, setVisible2] = useState(false);
  const show2 = () => setVisible2(true);
  const hide2 = () => setVisible2(false);

  const [visibleNotifications, setVisibleNotifications] = useState(false);
  const toggleNotifications = () => setVisibleNotifications(!visibleNotifications);

  const toggleTippyVisibility = () => {
    setTippyVisible(!tippyVisible);
    console.log(tippyVisible);
  };
  
  const curentUser = localStorage.getItem('token');
  const [nameCurentUser, setNameCurrentUser] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (curentUser !== null) {
      setIsLogin(true);
      setNameCurrentUser(localStorage.getItem('username'));
    }
  }, [curentUser]);




  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLogin(false)
    navigate('/');
    toast.success("Đăng xuất thành công")
  }

  // console.log(nameCurentUser);
  return (

    <Container style={{ height: "80px" }} fluid>
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <Link className={cx("logo")} to={"/"}>
            <h5 className={cx("logo_text1")}>SMART LEAGUE</h5>
          </Link>
          <div className={cx("header_left")}>
            <ul className={cx("header_left_menu")}>
              <li className={cx("header_left_item")}>
                <Link className={cx("header_left_link")} to="/">
                  Trang chủ
                </Link>
              </li>
              <li className={cx("header_left_item")}>
                <Tippy
                  interactive
                  visible={visible2}
                  onClickOutside={hide2}
                  render={(attrs) => (
                    <div className={cx("box_popup1")} tabIndex="-1" {...attrs}>
                      <Popup>
                        <Link className={cx("box_popup_item")} to={"/league/create-league"}>
                          Tạo giải đấu
                        </Link>
                      </Popup>
                      <Popup>
                        <Link className={cx("box_popup_item")} to={"/league/leagues"}>
                          Tìm giải đấu
                        </Link>
                      </Popup>


                    </div>
                  )}
                >
                  <Link onClick={visible2 ? hide2 : show2} className={cx("header_left_link")} to="">
                    Giải đấu
                    <FontAwesomeIcon
                      style={{ marginLeft: "5px" }}
                      icon={faCaretDown}
                    />
                  </Link>
                </Tippy>
              </li>
              <li className={cx("header_left_item")}>
                <Tippy
                  interactive
                  visible={visible1}
                  onClickOutside={hide1}
                  render={(attrs) => (
                    <div className={cx("box_popup1")} tabIndex="-1" {...attrs}>
                      <Popup>
                        <Link className={cx("box_popup_item")} to={"/mycompetitor/create"}>
                          Tạo đội
                        </Link>
                      </Popup>
                      <Popup>
                        <Link className={cx("box_popup_item")} to={"/"}>
                          Tìm đội
                        </Link>
                      </Popup>
                      <Popup>
                        <Link className={cx("box_popup_item")} to={"/lineup"}>
                          Tạo đội hình
                        </Link>
                      </Popup>

                    </div>
                  )}
                >
                  <Link onClick={visible1 ? hide1 : show1} className={cx("header_left_link")} to="">
                    Đội thi đấu
                    <FontAwesomeIcon
                      style={{ marginLeft: "5px" }}
                      icon={faCaretDown}
                    />
                  </Link>
                </Tippy>

              </li>
              {isLogin ? (
                <li className={cx("header_left_item")}>
                  <div className={cx("header_left_infomation")}>
                    <div className={cx("item_avt")}>
                      <img
                        className={cx("avatar")}
                        src={localStorage.getItem("avatar")}
                        alt="avatar"
                      />
                    </div>
                    <Tippy
                      interactive
                      visible={tippyVisible}
                      onClickOutside={() => toggleTippyVisibility()} // Sử dụng hàm chuyển đổi
                      render={(attrs) => (
                        <div className={cx("box_popup")} tabIndex="-1" {...attrs}>
                          <Popup>
                            <Link className={cx("box_popup_item")} to={"/account/profile"}>
                              Thông tin tài khoản
                            </Link>
                          </Popup>
                          <Popup>
                            <Link className={cx("box_popup_item")} to={"/account/myleague"}>
                              Quản lý giải đấu
                            </Link>
                          </Popup>
                          <Popup>
                            <Link className={cx("box_popup_item")} to={"/account/mycompetitor"}>
                              Quản lý đội
                            </Link>
                          </Popup>
                          <Popup>
                            <Link
                              className={cx("box_popup_item")}
                              onClick={handleLogout}
                            >
                              Đăng Xuất
                            </Link>
                          </Popup>
                        </div>
                      )}
                    >
                      <div
                        className={cx("infomation_name")}
                        onClick={() => toggleTippyVisibility()}
                      >
                        <div className={cx("item_name")}>{nameCurentUser}</div>
                        <FontAwesomeIcon
                          style={{ marginLeft: "5px" }}
                          icon={faCaretDown}
                        />
                      </div>
                    </Tippy>

                    <FontAwesomeIcon
                      style={{ marginLeft: "5px", color: "red" }}
                      icon={faBell}
                      onClick={() => toggleNotifications()} // Sử dụng hàm toggle mới cho thông báo
                    />
                    {visibleNotifications && (
                      <div className={cx("notifications-container")}>

                        <div class="notification-header">
                          <h2 class="notification-title">Thông báo</h2>
                          <FontAwesomeIcon style={{ color: "#DC143C", height: "24px", width: "24px", cursor: "pointer" }}
                            icon={faEnvelope} onClick={() => window.location.href = '/account/notifications'} />
                        </div>
                        <ul>
                          <li class="notification-item" style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon style={{ color: "#DC143C", height: "24px", width: "24px", marginRight: "10px", cursor: "pointer" }} icon={faBell} />
                            <span class="notification-content">Nội dung thông báo 1</span>
                            <div class="notification-timestamp">1 giờ trước</div>
                          </li>
                          <li class="notification-item" style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon style={{ color: "#DC143C", height: "24px", width: "24px", marginRight: "10px", cursor: "pointer" }} icon={faBell} />
                            <span class="notification-content">Nội dung thông báo 1</span>
                            <div class="notification-timestamp">1 giờ trước</div>
                          </li>
                          <li class="notification-item" style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon style={{ color: "#DC143C", height: "24px", width: "24px", marginRight: "10px", cursor: "pointer" }} icon={faBell} />
                            <span class="notification-content">Nội dung thông báo 1</span>
                            <div class="notification-timestamp">1 giờ trước</div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ) : (
                <><li className={cx("header_left_item")}>
                  <Button
                    className={cx("btn-login")}
                    style={{ background: "#fd1e50", border: "none" }}
                    href="/account/login"
                  >
                    Đăng Nhập
                  </Button>
                </li><li className={cx("header_left_item")}>
                    <Button
                      className={cx("btn-register")}
                      style={{
                        background: "white",
                        color: "#8f8f8f",
                        border: "none",
                        fontWeight: "700",
                      }}
                      href="/account/register"
                    >
                      Đăng ký
                    </Button>
                  </li></>
              )}







            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}