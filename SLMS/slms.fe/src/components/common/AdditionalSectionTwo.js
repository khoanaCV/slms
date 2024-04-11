import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../../Assets/css/common/AdditionalSectionTwo.css";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays, // This icon should match the calendar in your image
    faTrophy, // This icon should match the trophy in your image
    faClipboardList, // This icon should match the clipboard in your image
    faGlobe, // This icon should match the globe in your image
    faCamera, // This icon should match the camera in your image
    faAward,
    faCrown,
    faMedal,
    faFileCircleCheck,
    faCircleCheck
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function AdditionalSectionTwo() {
    return (
        <Container fluid className={cx("additional-section-two")} style={{ padding: "50px 0" }}>
            <Row>
                <Col data-aos="flip-left" xs={6} md={4} className={cx("text-center")}>
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faCalendarDays} />
                    <p>Thời gian</p>
                    <span>Tiết kiệm tới 90% thời gian gọi điện, email, gặp gỡ, sắp xếp lịch, cập nhật kết quả, bảng xếp hạng... theo cách làm truyền thống.</span>
                </Col>
                <Col data-aos="zoom-in-down" xs={6} md={4} className={cx("text-center")}>
                    <FontAwesomeIcon style={{ color: "#00e673", height: "300px" }} icon={faCircleCheck} />
                    {/* <p>Tài nguyên giấy</p>
                    <span>Tổ chức giải đấu hoàn toàn không in ấn, không lãng phí tài nguyên giấy, chung tay bảo vệ môi trường.</span> */}
                </Col>
                <Col data-aos="flip-right" xs={6} md={4} className={cx("text-center")}>
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faClipboardList} />
                    <p>Tài nguyên giấy</p>
                    <span>Tổ chức giải đấu hoàn toàn không in ấn, không lãng phí tài nguyên giấy, chung tay bảo vệ môi trường.</span>
                </Col>
                <Col data-aos="flip-left" xs={6} md={4} className={cx("text-center")}>
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faGlobe} />
                    <p>Sự tiện lợi</p>
                    <span>Thông tin luôn sẵn sàng để truy cập mọi lúc, mọi nơi qua máy tính, điện thoại thông minh, máy tính bảng. Báo cáo, thống kê hoàn toàn tự động.</span>
                </Col>
                <Col xs={6} md={4} className={cx("text-center")}>

                </Col>
                <Col data-aos="flip-right" xs={6} md={4} className={cx("text-center")}>
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faCamera} />
                    <p>Khả năng lưu trữ</p>
                    <span>Mọi thông tin của giải đấu sẽ được lưu lại làm kỷ niệm, phục vụ tra cứu, hoặc tái sử dụng cho giải tiếp theo. Dễ dàng tương tác, bình luận, chia sẻ các dữ liệu giải đấu.</span>
                </Col>
            </Row>
        </Container>
    );
}
