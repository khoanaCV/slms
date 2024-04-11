import styles from "../../../Assets/css/user/player/playerinformation.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import images from "../../../Assets/images";
import { useParams } from "react-router-dom";
import { faArrowsRotate, faCircleArrowRight, faDownload, faFutbol, faPenToSquare, faRedo, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


import 'tippy.js/dist/tippy.css';



const cx = classNames.bind(styles);




export default function PlayerInfomation() {
    const stats = [
        { season: '2013', match: 10, goals: 60,  yellowCard: 5, redCard: 1 },
        { season: '2014', match: 10, goals: 60,  yellowCard: 5, redCard: 1 },
        { season: '2016', match: 10, goals: 60,  yellowCard: 5, redCard: 1 },
        { season: '2017', match: 10, goals: 60,  yellowCard: 5, redCard: 1 },
        { season: '2018', match: 10, goals: 60,  yellowCard: 5, redCard: 1 },
        { season: '2019', match: 10, goals: 60,  yellowCard: 5, redCard: 1 },
        // ...add the rest of your data here
    ];

    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", backgroundColor: "#ccc" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <Row>
                            <Col>
                                <Row style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                                    <Col xs={10} >
                                        <div className="player-card">
                                            <div
                                                data-aos="fade-right"
                                                data-aos-offset="300"
                                                data-aos-easing="ease-in-sine"
                                                data-aos-duration="1000"
                                                className="pimg">
                                                <img src={images.aovang} alt="" />
                                            </div>
                                            <div data-aos="flip-right" data-aos-duration="1000" className="player-details">
                                                <h2>Nguyễn Văn Rin  (07)</h2>
                                                <strong className="desi">Vận động viên</strong>

                                                <ul>
                                                    <li>Chiều cao: <strong>1m65</strong></li>
                                                    <li>Cân nặng: <strong>50 kg</strong></li>
                                                    <li>Tuổi: <strong>24</strong></li>
                                                    <li>Quê quán: <strong>Huế</strong></li>
                                                    <li>Tổng số bàn thắng: <strong>117</strong></li>
                                                    <li>Tổng số kiến tạo: <strong>87</strong></li>
                                                    <li>Tổng số trận đã đấu: <strong>92</strong></li>
                                                    <li>Thẻ vàng: <strong>24</strong></li>
                                                    <li>Thẻ đỏ: <strong>03</strong></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row data-aos="fade-down" style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                                    <Col xs={10}
                                        style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1);" }}>
                                        <Row
                                            style={{ backgroundColor: "#fd1e50", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", padding: "20px 0 10px 0" }}>
                                            <Col>
                                                <h2 style={{ color: "white" }}>Tiểu sử Nguyễn Văn Rin</h2>
                                            </Col>
                                        </Row>
                                        <Row style={{ padding: "20px" }}>
                                            <Col>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

                                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt labore at magnam
                                                Sunt in culpa qui officia deserunt mollit anim id est laborum. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.</Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row data-aos="fade-down" style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                                    <Col xs={10}
                                        style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1);" }}>
                                        <Row
                                            style={{ backgroundColor: "#fd1e50", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", padding: "20px 0 10px 0" }}>
                                            <Col>
                                                <h2 style={{ color: "white" }}>Lịch sử thi đấu </h2>
                                            </Col>
                                        </Row>
                                        <Row style={{ padding: "20px" }}>
                                            <Col>
                                                <table className="stats-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Năm</th>
                                                            <th>Số trận thi đấu</th>
                                                            <th>Bàn thắng</th>
                                                            <th>Thẻ vàng</th>
                                                            <th>Thẻ đỏ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {stats.map((stat, index) => (
                                                            <tr key={index}>
                                                                <td>{stat.season}</td>
                                                                <td>{stat.match}</td>
                                                                <td>{stat.goals}</td>
                                                                <td>{stat.yellowCard}</td>
                                                                <td>{stat.redCard}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>
                {/* Modal component */}

            </Container>
            <Footer />
        </div>

    );
}