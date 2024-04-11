import styles from "../../Assets/css/admin/admindashboard.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Dropdown, Form, NavLink } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../Assets/images";
import { faChalkboardUser, faChessBoard, faClipboard, faFlag, faFutbol } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const cx = classNames.bind(styles);




export default function RightPageAdmin() {
    const stats = [
        { title: "Số giải đấu", number: 50 },
        { title: "Số trận đấu", number: 200 },
        { title: "Số đội thi đấu", number: 150 },
        { title: "Số vận động viên", number: 300 },

    ];
    const colors = ['#FFC107', '#FF5722', '#3F51B5', '#4CAF50', '#00BCD4', '#9C27B0'];

    // Dữ liệu giả định cho biểu đồ
    const data = {
        labels: stats.map(stat => stat.title), // Sử dụng mảng các chuỗi từ stats để làm nhãn trục x
        datasets: [
            {
                label: 'Dữ liệu',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: stats.map(stat => stat.number), // Sử dụng mảng các số từ stats để làm dữ liệu biểu đồ
            },
        ],
    };
    return (
        <Container>
            <Row className={cx("row clearfix", "row-deck")}>
                {stats.map((stat, index) => (
                    <Col key={index} xs={3}>
                        <Card>
                            <Card.Header style={{ backgroundColor: colors[index % colors.length] }}>
                                <Card.Title as="h3">{stat.title}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5 className={cx("number", "mb-0", "font-32", "counter")}>{stat.number}</h5>
                                <span className={cx("font-12")}>Thêm thông tin...</span>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row >
                <Col xs={12}>
                    <h2>Thống kê</h2>

                </Col>
            </Row>
            <Row >
                <Col xs={12}>

                    <Line
                        datasetIdKey='id'
                        data={{
                            labels: stats.map(stat => stat.title),
                            datasets: [
                                {
                                    id: 1,
                                    label: '',
                                    data: stats.map(stat => stat.number),
                                },
                            ],
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
}
