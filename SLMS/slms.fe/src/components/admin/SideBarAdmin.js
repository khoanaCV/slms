import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser, faChessBoard, faClipboard, faFlag, faFutbol } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Assets/css/admin/admindashboard.css";
import classNames from "classnames/bind";
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

export default function SideBarAdmin({ onMenuItemClick }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        { name: 'dashboard', label: 'Bảng điều khiển', icon: faClipboard },
        { name: 'roleManagement', label: 'Phân quyền', icon: faChessBoard },
        { name: 'usersManagement', label: 'Quản lý người dùng', icon: faChalkboardUser },
        { name: 'tournamentsManagement', label: 'Quản lý giải đấu', icon: faFutbol },
        { name: 'teamsManagement', label: 'Quản lý đội', icon: faFutbol },
        { name: 'reportsManagement', label: 'Quản lý báo cáo', icon: faFlag },
    ];

    const handleItemClick = (index, name) => {
        setActiveIndex(index);
        onMenuItemClick(name);
        console.log(name);
    };

    return (
        <Row>
            <Col>
                <div id="left-sidebar" className={cx('sidebar')}>
                    <h5 className={cx('brand-name')}>Bảng điều khiển</h5>
                    <nav id="left-sidebar-nav" className={cx('sidebar-nav')}>
                        <ul className={cx('metismenu')}>
                            {menuItems.map((item, index) => (
                                <li key={index} className={cx({ 'active': activeIndex === index })}>
                                    <button
                                        className={cx('nav-link', 'btn', 'btn-link')} // Add more classes as needed for styling
                                        onClick={() => handleItemClick(index, item.name)}
                                        style={{ textAlign: 'left', width: '100%', padding: '10px' }} // Inline styles for button to mimic NavLink appearance
                                    >
                                        <FontAwesomeIcon icon={item.icon} style={{ marginRight: "10px" }} />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </Col>
        </Row>
    );
}
