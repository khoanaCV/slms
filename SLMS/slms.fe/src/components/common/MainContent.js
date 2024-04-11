import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../../Assets/css/common/MainContent.css";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);
export default function MainContent() {
    return (
        <Container className={cx("main-content")}>
            <Row className={cx("my-5 text-center")}>
                <Col data-aos="fade-down">
                    <h1>Điều hành giải</h1>
                    <h2>Có 3 giai đoạn để điều hành một giải đấu</h2>

                </Col>
            </Row>
            <Row data-aos="zoom-out" className={cx("my-5 text-center")}>
                <Col className={cx("background-image-col")}>
                </Col>
                <Col className={cx("background-image-col")}>
                </Col>
                <Col className={cx("background-image-col")}>
                </Col>
            </Row>
            <Row className={cx("my-5")}>
                <Col md={4} className={cx("text-center")}>
                    <div data-aos="fade-up"
                        data-aos-duration="1000" className={cx("content-box")}>
                        <h2>1. Tạo giải</h2>
                        <ul className={cx("list-unstyled")}>
                            <li>Loại trực tiếp</li>
                            <li>Đấu vòng tròn</li>
                            {/* <li>Chia bảng đấu</li> */}
                        </ul>
                    </div>
                </Col>

                <Col md={4} className={cx("text-center")}>
                    <div data-aos="fade-up"
                        data-aos-duration="2000" className={cx("content-box")}>
                        <h2>2. Tùy chỉnh giải đấu</h2>
                        <ul className={cx("list-unstyled")}>
                            <li>Nhập điều lệ, hình và địa điểm</li>
                            <li>Nhập thông tin đội/VĐV</li>
                            <li>Mời người tham gia</li>
                            <li>Lập lịch thi đấu</li>
                            <li>Tùy chỉnh giai đoạn</li>
                        </ul>
                    </div>
                </Col>
                <Col md={4} className={cx("text-center")}>
                    <div data-aos="fade-up"
                        data-aos-duration="3000" className={cx("content-box")}>
                        <h2>3. Điều hành giải</h2>
                        <ul className={cx("list-unstyled")}>
                            <li>Kích hoạt</li>
                            <li>Nhập tỉ số</li>
                            <li>Xem thông kê</li>
                            <li>Chia sẻ với bạn bè</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
