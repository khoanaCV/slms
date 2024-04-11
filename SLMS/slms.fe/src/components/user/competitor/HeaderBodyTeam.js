import styles from "../../../Assets/css/user/competitor/profileteam.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import { faArrowTurnUp, faCakeCandles, faCalendar, faCircleUser, faEnvelope, faPhone, faStar, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const cx = classNames.bind(styles);

export default function HeaderBodyTeam({ inforTeam, countPlayers }) {

    const { id } = useParams();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('Chung'); // Mặc định item "Chung" được chọn
    const navigate = useNavigate();
    const memberCount = countPlayers;

    const handleNaviga = (e) => {
        e.preventDefault();
        navigate("/")
    }
    const currentToken = localStorage.getItem('token');
    //Mã hoá token
    const dataDecoded = jwtDecode(currentToken);
    const currentId = dataDecoded.id;

    const menuItems = useMemo(() => [
        {
            id: 1,
            title: "Thông tin đội",
            linknav: `/competitor/${currentId}/${id}/profile/`
        },
        {
            id: 2,
            title: "Thành viên",
            linknav: `/competitor/${currentId}/${id}/player/`
        },
        {
            id: 3,
            title: "Đội hình",
            linknav: `/competitor/${currentId}/${id}/lineup/`
        },
        {
            id: 4,
            title: "Thống kê",
            linknav: `/competitor/${currentId}/${id}/statistic/`
        },
        {
            id: 5,
            title: "Cấu hình đội",
            linknav: `/competitor/${currentId}/${id}/settingteam/`
        },


    ], [currentId, id]);

    // 'Lịch thi đấu', 'Bảng xếp hạng', 'Đội thi đấu', 'Thống kê', 'Cấu hình giải', 'Tuỳ chỉnh'
    const handleClick = (item) => {
        setActiveItem(item); // Cập nhật item được chọn
    };


    useEffect(() => {
        // Xác định item dựa trên đường dẫn hiện tại và cập nhật activeItem
        const currentPath = location.pathname;

        const currentItem = menuItems.find(item => currentPath === item.linknav);
        if (currentItem) {
            setActiveItem(currentItem.title);
        } else {
            setActiveItem('Thông tin đội');
        }
    }, [location.pathname, menuItems]);



    //console.log(inforTeam);
    return (
        <Row >
            <Col style={{ padding: "0" }} className={cx(" width-header_team")}>
                <Row >
                    <Col style={{ display: "flex", justifyContent: "center", padding: "0" }}>
                        <div style={{ display: "flex", alignItems: "center", padding: "20px" }}>

                            {inforTeam.logo === null && (
                                <img src={images.champion} alt="Logo team" className={cx("user-image-preview ")} />
                            )}
                            {inforTeam.logo !== null && (
                                <img src={inforTeam.logo} style={{ width: "150px", height: "150px" }} alt="Default  Image" className={cx("")} />
                            )}
                        </div>
                        <div className={cx('user_info-inner padding-10')}>
                            <h4 className={cx('user_info-name mg-8px')}>FC SEP490</h4>
                            <table style={{ borderCollapse: "collapse" }} className="menu-information-teams">
                                <tr className="menu-information_item">
                                    <td>
                                        <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faCircleUser} />
                                        Người liên hệ:
                                    </td>
                                    <td>
                                        {inforTeam.contactPerson}
                                    </td>
                                </tr>
                                <tr className="menu-information_item">
                                    <td>
                                        <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faPhone} />
                                        Số điện thoại:
                                    </td>
                                    <td>
                                        {inforTeam.phone}
                                    </td>
                                </tr>
                                <tr className="menu-information_item">
                                    <td>
                                        <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faEnvelope} />
                                        Email:
                                    </td>
                                    <td>
                                        {inforTeam.contactPersonEmail}
                                    </td>
                                </tr>
                                <tr className="menu-information_item">
                                    <td>
                                        <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faUsers} />
                                        Thành viên:
                                    </td>
                                    <td>
                                        {memberCount}
                                    </td>
                                </tr>
                                <tr className="menu-information_item">
                                    <td>
                                        <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faArrowTurnUp} />
                                        Trình độ:
                                    </td>
                                    <td>
                                        {inforTeam.level}
                                    </td>
                                </tr>
                                <tr className="menu-information_item">
                                    <td>
                                        <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faCakeCandles} />
                                        Độ tuổi:
                                    </td>
                                    <td>
                                        {inforTeam.ageJoin}
                                    </td>
                                </tr>

                            </table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ padding: "0" }}>
                        <div className={cx("menu_header-inner")}>
                            {menuItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.linknav}
                                    className={cx("menu_header-item", { 'active-color-white': item.title === activeItem, 'active-color-xam': item.title !== activeItem })}
                                    onClick={() => handleClick(item)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </Col>

                </Row>
            </Col>
        </Row>


    );
}
