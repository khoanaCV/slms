import React, { useEffect, useState } from 'react';
import styles from "../../Assets/css/common/TopBanner.css";
import classNames from "classnames/bind";
import { Container, Row, Col, Button } from 'react-bootstrap';
import AOS from 'aos';

const cx = classNames.bind(styles);
export default function TopBanner() {
    const [bannerHeight, setBannerHeight] = useState('100vh'); // Mặc định là 100vh
    useEffect(() => {
        // Hàm tính toán chiều cao tổng của 3 hàng
        const calculateHeight = () => {
            const rows = document.querySelectorAll('.top-banner .row');
            let totalHeight = 0;
            rows.forEach(row => {
                totalHeight += row.offsetHeight;
            });
            return totalHeight + 'px'; // Trả về tổng chiều cao dưới dạng chuỗi
        };

        // Cập nhật chiều cao cho banner
        setBannerHeight(calculateHeight());

        // Đảm bảo rằng chiều cao được cập nhật mỗi khi cửa sổ được thay đổi kích thước
        window.addEventListener('resize', () => setBannerHeight(calculateHeight()));

        return () => window.removeEventListener('resize', () => setBannerHeight(calculateHeight()));
    }, []); // Chỉ chạy một lần sau khi component được mount
    return (
        <Container fluid className={cx("top-banner")} style={{ height: bannerHeight  }} >
            <Row className={cx("align-items-center top-row")}>
                <Col xs={12} className={cx("text-center")}>
                    <h1><span data-aos="fade-right" data-aos-duration="2000">Tổ chức giải đấu dễ dàng</span> | <span data-aos="fade-left" data-aos-duration="2000">Quản lý đội bóng đơn giản</span></h1>
                </Col>
            </Row>
            <Row className={cx("justify-content-md-center align-items-center action-row")} style={{ padding:"0px",marginTop: "0px" }}>
                <Col md={12} className={cx("text-center")}>
                    <Button data-aos="fade-right" data-aos-duration="1000" variant="danger" className={cx("action-button mx-2")} href='/league/create-league'>Tạo giải đấu</Button>
                    <Button data-aos="zoom-out" data-aos-duration="1000" variant="secondary" className={cx("action-button mx-2")} href='/league/leagues'>Tìm giải đấu</Button>
                    <Button data-aos="zoom-out" data-aos-duration="1000" variant="light" className={cx("action-button mx-2")} href='/account/mycompetitor'>Quản lý đội</Button>
                    <Button data-aos="fade-left" data-aos-duration="1000" variant="dark" className={cx("action-button mx-2")} href='/lineup'>Tạo đội hình</Button>
                </Col>
            </Row>

            <Row className={cx("justify-content-md-center align-items-center stats-row")} style={{ padding: "50px 0" }}>

                <Col data-aos="zoom-in" data-aos-duration="1000" xs={6} md={3} className={cx("text-center stat-col")}>
                    <h3 className={cx("stat-title")}>Giải đấu</h3>
                    <p className={cx("stat-number")}>40.987</p>
                </Col>
                <Col data-aos="zoom-in" data-aos-duration="1000" xs={6} md={3} className={cx("text-center stat-col")}>
                    <h3 className={cx("stat-title")}>Đội thi đấu</h3>
                    <p className={cx("stat-number")}>40.987</p>
                </Col>
                <Col data-aos="zoom-in" data-aos-duration="1000" xs={6} md={3} className={cx("text-center stat-col")}>
                    <h3 className={cx("stat-title")}>Vận động viên</h3>
                    <p className={cx("stat-number")}>40.987</p>
                </Col>
                <Col data-aos="zoom-in" data-aos-duration="1000" xs={6} md={3} className={cx("text-center stat-col")}>
                    <h3 className={cx("stat-title")}>Trận đấu</h3>
                    <p className={cx("stat-number")}>40.987</p>
                </Col>
            </Row>
        </ Container>
    );
}
