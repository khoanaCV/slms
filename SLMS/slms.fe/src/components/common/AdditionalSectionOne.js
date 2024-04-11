import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../../Assets/css/common/AdditionalSectionOne.css";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faTable, faCircleNodes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
export default function AdditionalSectionOne() {
    return (
        <Container fluid className={cx("additional-section-one")} style={{ padding: "50px 0" }}>
            <Row className={cx("align-items-center")}>
                <Col data-aos="fade-down" xs={12} className={cx("text-center")}>
                    <h2>Hỗ trợ các thể thức thi đấu</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={6} className={cx("text-center")}>
                    <div
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000"
                        className={cx("tournament-format")}>
                        <FontAwesomeIcon style={{ color: "#F0FFFF", height: "100px" }} icon={faSitemap} />
                        <p>Loại trực tiếp</p>
                    </div>
                </Col>
                <Col xs={6} className={cx("text-center")}>
                    <div
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000"
                        className={cx("tournament-format")}>
                        <FontAwesomeIcon style={{ color: "#F0FFFF", height: "100px" }} icon={faCircleNodes} />
                        <p>Đấu vòng tròn</p>
                    </div>
                </Col>
                {/* <Col xs={4} className={cx("text-center")}>
                    <div
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000"
                        className={cx("tournament-format")}>
                        <FontAwesomeIcon style={{ color: "#F0FFFF", height: "100px" }} icon={faTable} />
                        <p>Chia bảng đấu</p>
                    </div>
                </Col> */}
            </Row>
        </Container>
    );
}
