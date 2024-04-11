import styles from "../../../Assets/css/user/league/prizeleague.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Container, Row, Col, Card, Button, Image, Modal, Badge, ListGroup, Table } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import {
    faCalendarDays, faCaretRight, faChartBar, faLocationArrow, faStar, faCircleXmark, faDownload, faChevronCircleRight, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { startTransition, useState, useRef, useEffect } from "react";
import HeaderBodyLeague from "../../common/HeaderBodyLeague";
import { toast } from "react-toastify";
import ListTeamRegister from "./ListTeamRegister";
import { getPlayerMostAssists, getPlayerMostGoals, getPlayerMostSaves, getTeamFewestTotalCards } from "../../../services/PrizeLeague";

const cx = classNames.bind(styles);


export default function PrizeLeague() {
    const [activeStarIndex, setActiveStarIndex] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);
    const idLeague = useParams()
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);

    // const fileInputRef = useRef(null);

    const handleBtnCircleClick = (idLeague) => {
        setShowPopup(true);
        setSelectedLeagueId(idLeague);
    };

    //console.log(idLeague.idLeague);
    const closePopup = () => {
        setShowPopup(false);
        setActiveStarIndex(-1)
    };
    const handleStarClick = (index) => {
        setActiveStarIndex(index);
    };
    const handleVoteButtonClick = () => {

        setShowPopup(false);
        setActiveStarIndex(-1);
        toast.success("Bình chọn thành công");
    };

    //cal api

    useEffect(() => {
        getPlayerMostGoals(idLeague.idLeague)
            .then(data => {
                setListPrizes(prizes => prizes.map(prize => {
                    if (prize.id === 1) {
                        console.log(data);
                        return {
                            ...prize,
                            awardRecipient: data.length > 0 ? data[0].playerName : "Chưa xác định",
                            information: data.length > 0 ? data[0].phone : "Chưa xác định"
                        };
                    }
                    return prize;
                }));
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);

            });
        getPlayerMostAssists(idLeague.idLeague)
            .then(data => {
                setListPrizes(prizes => prizes.map(prize => {
                    if (prize.id === 3) {
                        return {
                            ...prize,
                            awardRecipient: data.length > 0 ? data[0].playerName : "Chưa xác định",
                            information: data.length > 0 ? data[0].phone : "Chưa xác định"
                        };
                    }
                    return prize;
                }));
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);

            });

        getPlayerMostSaves(idLeague.idLeague)
            .then(data => {
                setListPrizes(prizes => prizes.map(prize => {
                    if (prize.id === 2) {
                        return {
                            ...prize,
                            awardRecipient: data.length > 0 ? data[0].playerName : "Chưa xác định",
                            information: data.length > 0 ? data[0].phone : "Chưa xác định"
                        };
                    }
                    return prize;
                }));
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);

            });

        getTeamFewestTotalCards(idLeague.idLeague)
            .then(data => {
                setListPrizes(prizes => prizes.map(prize => {
                    if (prize.id === 4) {
                        return {
                            ...prize,
                            awardRecipient: data ? data.teamName : "Chưa xác định",
                            information: data ? data.phone : "Chưa xác định"
                        };
                    }
                    return prize;
                }));

            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);

            });

    }, [idLeague.idLeague]);
    //Data
    const [listPrizes, setListPrizes] = useState([
        {
            id: 1,
            prizeName: 'Vua phá lưới',
            note: 'Ghi nhiều bàn thắng nhất',
            typePrize: 'Cá nhân',
            awardRecipient: 'Chưa xác định',
            information: 'Chưa xác định'
        },
        {
            id: 2,
            prizeName: 'Bàn tay vàng',
            note: 'Thủ môn xuất sắc nhất',
            typePrize: 'Cá nhân',
            awardRecipient: 'Chưa xác định',
            information: 'Chưa xác định'
        },
        {
            id: 3,
            prizeName: 'Vua kiến tạo',
            note: 'Kiến tạo nhiều nhất',
            typePrize: 'Cá nhân',
            awardRecipient: 'Chưa xác định',
            information: 'Chưa xác định'
        },
        {
            id: 4,
            prizeName: 'Đội chơi đẹp mắt',
            note: 'Đội bóng nhận ít thẻ phạt',
            typePrize: 'Tập thể',
            awardRecipient: 'Chưa xác định',
            information: 'Chưa xác định'
        },

    ])




    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0", marginBottom: "150px" }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague.idLeague} onBtnCircleClick={() => handleBtnCircleClick(idLeague)} />
                        <Row className="team-bg_inner">
                            <Col xs={12} className="prize-img">
                            </Col>
                        </Row>

                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Col xs={11} style={{ padding: "10px 0px" }}>
                                <ul className="btn-menu space_center">
                                    <li
                                        className={cx('btn-menu-item border_8px bg-active')}>
                                        Thống kê
                                    </li>
                                    <li
                                        className={cx('btn-menu-item border_8px bg-active')}>
                                        Tải danh sách giải thưởng
                                    </li>

                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col style={{ padding: "0" }}>

                                        <Row style={{ display: "flex", justifyContent: "center" }}>
                                            <Col xs={10} style={{ padding: "0" }}>
                                                <Table striped bordered hover variant="light" style={{ textAlign: "center" }}>
                                                    <thead style={{ background: "#FD1E50", color: "white" }}>
                                                        <tr style={{ background: "#FD1E50", color: "white" }}>
                                                            <th >#</th>
                                                            <th>Tên giải thưởng</th>
                                                            <th>Mô tả</th>
                                                            <th>Phân loại</th>
                                                            <th>Người/Nhóm nhận giải</th>
                                                            <th>Thông tin liên hệ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {listPrizes.map((team, index) => (
                                                            <tr key={index}>
                                                                <td>{team.id}</td>
                                                                <td>{team.prizeName}</td>
                                                                <td>{team.note}</td>
                                                                <td>{team.typePrize}</td>
                                                                <td>{team.awardRecipient}</td>
                                                                <td>{team.information}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                {showPopup && (
                    <div className="popup_wrapper">
                        <div className="popup_inner">
                            <div className="popup_header">
                                <h3 className="popup_header-text">Bình chọn giải đấu</h3>
                                <FontAwesomeIcon onClick={closePopup} className="icon_close" icon={faCircleXmark} />
                            </div>
                            <div className="popup_body">
                                <div className="list_star">
                                    {[...Array(5)].map((_, index) => (
                                        <FontAwesomeIcon
                                            key={index}
                                            className={index <= activeStarIndex ? 'star_item active_star' : 'star_item'}
                                            icon={faStar}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="popup_footer">
                                <Button onClick={handleVoteButtonClick} style={{ backgroundColor: "#fd1e50" }} className="popup_footer_btn">Bình chọn</Button>
                            </div>
                        </div>
                    </div>

                )}


            </Container>
            <Footer />
        </div>

    );
}
