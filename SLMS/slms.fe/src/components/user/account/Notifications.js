import React, { useState } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import classNames from 'classnames/bind';
import "../../../Assets/css/common/Notifications.css";
import styles from '../../../Assets/css/common/Notifications.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckSquare, faTimesCircle, faBell, faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// const cx = classNames.bind(styles);

const NotificationItem = ({ content, date }) => {
    return (
        <div className="notification-item">
            {/* <FontAwesomeIcon style={{color:"#DC143C"}} icon={faBell} /> */}
            <div className="notification-content">{content}</div>
            <div className="notification-date" style={{ textAlign: 'center' }}>{date}</div>
            <button className="notification-delete" style={{ border: "none" }}>
                <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
            </button>
        </div>
    );
};

const Notifications = () => {
    //test data
    const [notifications, setNotifications] = useState([
        { id: 1, content: 'Nội dung thông báo 1', date: '06/02/2024 11:45' },
        { id: 2, content: 'Nội dung thông báo 2', date: '06/02/2024 11:45' },
        { id: 3, content: 'Nội dung thông báo 3', date: '06/02/2024 11:45' },
        { id: 4, content: 'Nội dung thông báo 4', date: '06/02/2024 11:45' },
        { id: 5, content: 'Nội dung thông báo 5', date: '06/02/2024 11:45' },
        { id: 6, content: 'Nội dung thông báo 6', date: '06/02/2024 11:45' },
        { id: 7, content: 'Nội dung thông báo 7', date: '06/02/2024 11:45' },
        { id: 8, content: 'Nội dung thông báo 7', date: '06/02/2024 11:45' },
        { id: 9, content: 'Nội dung thông báo 7', date: '06/02/2024 11:45' },
        { id: 10, content: 'Nội dung thông báo 7', date: '06/02/2024 11:45' },
        { id: 11, content: 'Nội dung thông báo 7', date: '06/02/2024 11:45' },
        { id: 12, content: 'Nội dung thông báo 7', date: '06/02/2024 11:45' },
        { id: 13, content: 'Nội dung thông báo 10', date: '06/02/2024 11:45' },
        { id: 14, content: 'Nội dung thông báo 11', date: '06/02/2024 11:45' },
        { id: 14, content: 'Nội dung thông báo 11', date: '06/02/2024 11:45' },
        { id: 14, content: 'Nội dung thông báo 11', date: '06/02/2024 11:45' },
        { id: 14, content: 'Nội dung thông báo 11', date: '06/02/2024 11:45' },
        { id: 14, content: 'Nội dung thông báo 11', date: '06/02/2024 11:45' },
        // ... more notifications
    ]);

    return (
        <Container fluid>
            <Header />
            <Container fluid style={{}}>
                <div className="notifications-header">
                    <FontAwesomeIcon style={{ color: "#DC143C" }} icon={faBell} />
                    <span>Thông báo</span>
                </div>
                <div className="notifications-controls">
                    <select>
                        <option value="all">Tất cả</option>
                        <option value="read">Đã đọc</option>
                        <option value="unread">Chưa đọc</option>
                    </select>
                    <div>
                        <button style={{ padding: '20px', borderRadius: '10px' }}>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px', color: '#483D8B' }} />
                            Đánh dấu đã đọc tất cả
                        </button>
                        <button style={{ padding: '20px', borderRadius: '10px' }}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '5px', color: '#B22222' }} />
                            Xóa tất cả thông báo
                        </button>
                    </div>

                </div>
                <div className="notifications-list">
                    {notifications.map((notification, index) => (
                        <NotificationItem key={index} content={notification.content} date={notification.date} />
                    ))}
                </div>

            </Container>
            <Footer />
        </Container>
    );
};
export default Notifications;
