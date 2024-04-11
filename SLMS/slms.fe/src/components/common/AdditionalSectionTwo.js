import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
    <Row className="justify-content-center">
       
            <Card className={cx("text-center")}>
                <Card.Body >
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faCalendarDays} />
                    <Card.Title style={{ color: "gray", marginTop:"10px" }}>Thời gian</Card.Title>
                    <Card.Text>
                        Tiết kiệm tới 90% thời gian gọi điện, email, gặp gỡ, sắp xếp lịch, cập nhật kết quả, bảng xếp hạng... theo cách làm truyền thống.
                    </Card.Text>
                </Card.Body>
            </Card>
       
            <Card className={cx("text-center")}>
                <Card.Body >
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faCamera} />
                    <Card.Title style={{ color: "gray", marginTop:"10px" }}>Tài nguyên giấy</Card.Title>
                    <Card.Text>
                    Tổ chức giải đấu điện tử, không in ấn, tiết kiệm giấy, góp phần bảo vệ môi trường, không lãng phí tài nguyên.
                    </Card.Text>
                </Card.Body>
            </Card>
       
            <Card className={cx("text-center")}>
                <Card.Body >
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faGlobe} />
                    <Card.Title style={{ color: "gray", marginTop:"10px" }}>Sự tiện lợi</Card.Title>
                    <Card.Text>
                    Truy cập thông tin mọi lúc, mọi nơi qua máy tính, điện thoại, tablet. Báo cáo và thống kê được tự động hóa hoàn toàn.
                    </Card.Text>
                </Card.Body>
            </Card>
       
            <Card className={cx("text-center")}>
                <Card.Body >
                    <FontAwesomeIcon style={{ color: "#ff6f61", height: "100px" }} icon={faCamera} />
                    <Card.Title style={{ color: "gray", marginTop:"10px" }}>Khả năng lưu trữ</Card.Title>
                    <Card.Text>
                    Thông tin giải đấu được lưu, tái sử dụng, tra cứu. Tương tác, bình luận, chia sẻ dữ liệu dễ dàng cho tương lai.
                    </Card.Text>
                </Card.Body>
            </Card>
    </Row>
</Container>
    );
}
