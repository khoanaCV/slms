import React from 'react';
import { Tabs, Tab, Table, Container, Row, Col } from 'react-bootstrap';
import { BsCardChecklist } from 'react-icons/bs'; // Chọn icon phù hợp từ react-icons
import Header from '../../common/Header';
import HeaderBodyLeague from '../../common/HeaderBodyLeague';
import Footer from '../../common/Footer';
import { useParams } from 'react-router-dom';
import styles from "../../../Assets/css/user/league/statisticLeague.css"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export default function StatisticsLeague() {
    // Dữ liệu ảo để hiển thị
    const teamStats = [
        { id: 1, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", name: 'Bethlehem', matches: 5, wins: 1, draws: 2, losts: 3, goalsFor: 6, goalsAgainst: 7, ownGoals: 1, redcards: 3, yellowcards: 4 },
        { id: 1, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", name: 'Bethlehem', matches: 5, wins: 1, draws: 2, losts: 3, goalsFor: 6, goalsAgainst: 7, ownGoals: 1, redcards: 3, yellowcards: 4 },
        { id: 1, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", name: 'Bethlehem', matches: 5, wins: 1, draws: 2, losts: 3, goalsFor: 6, goalsAgainst: 7, ownGoals: 1, redcards: 3, yellowcards: 4 },
        { id: 1, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", name: 'Bethlehem', matches: 5, wins: 1, draws: 2, losts: 3, goalsFor: 6, goalsAgainst: 7, ownGoals: 1, redcards: 3, yellowcards: 4 },
        // thêm dữ liệu các đội khác ở đây
    ];

    // Tính toán tổng các cột cần thiết
    const totals = teamStats.reduce((acc, team) => {
        acc.matches += team.matches;
        acc.wins += team.wins;
        acc.draws += team.draws;
        acc.losts += team.losts;
        acc.goalsFor += team.goalsFor;
        acc.goalsAgainst += team.goalsAgainst;
        acc.ownGoals += team.ownGoals;
        acc.redcards += team.redcards;
        acc.yellowcards += team.yellowcards;
        // Xử lý thêm cho các cột khác nếu cần
        return acc;
    }, { matches: 0, goalsFor: 0, goalsAgainst: 0, ownGoals: 0, wins: 0, draws: 0, losts: 0, redcards: 0, yellowcards: 0 });

    // Dữ liệu ảo cho vận động viên
    const athleteStats = [
        { id: 1, name: 'Nguyễn Văn A', number: 9, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", team: 'Bethlehem', goals: 3, ownGoals: 1, savegoals: 3, yellowCards: 1, redCards: 2 },
        { id: 1, name: 'Nguyễn Văn A', number: 9, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", team: 'Bethlehem', goals: 3, ownGoals: 1, savegoals: 3, yellowCards: 1, redCards: 2 },
        { id: 1, name: 'Nguyễn Văn A', number: 9, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", team: 'Bethlehem', goals: 3, ownGoals: 1, savegoals: 3, yellowCards: 1, redCards: 2 },
        { id: 1, name: 'Nguyễn Văn A', number: 9, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", team: 'Bethlehem', goals: 3, ownGoals: 1, savegoals: 3, yellowCards: 1, redCards: 2 },
        { id: 1, name: 'Nguyễn Văn A', number: 9, logoteam: "https://gramotech.net/html/tigers/images/nmf-logo1.png", team: 'Bethlehem', goals: 3, ownGoals: 1, savegoals: 3, yellowCards: 1, redCards: 2 },
        // thêm dữ liệu các vận động viên khác ở đây
    ];

    // Tính toán tổng các cột cần thiết
    const athleteTotals = athleteStats.reduce((acc, athlete) => {
        acc.goals += athlete.goals;
        acc.ownGoals += athlete.ownGoals;
        acc.savegoals += athlete.savegoals;
        acc.yellowCards += athlete.yellowCards;
        acc.redCards += athlete.redCards;
        // Xử lý thêm cho các cột khác nếu cần
        return acc;
    }, { goals: 0, ownGoals: 0, savegoals: 0, yellowCards: 0, redCards: 0 });
    const { idLeague } = useParams();
    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "0" }}>

                <Row>
                    <Col style={{ padding: "0" }}>
                        <HeaderBodyLeague idLeague={idLeague} />
                        <Row className="team-bg_inner">
                            <Col xs={12} className="statitics-img">
                            </Col>
                        </Row>
                        <Container style={{ padding: "0" }}>
                            <Row>
                                <Col style={{ padding: "20px" }}>
                                    <Tabs defaultActiveKey="teams" id="uncontrolled-tab-example" className="mb-3">
                                        <Tab eventKey="teams" title="Đội thi đấu">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Tên Đội</th>
                                                        <th>Số Trận</th>
                                                        <th>T - H - B</th>
                                                        <th>Số Bàn Ghi Được</th>
                                                        <th>Số Bàn Thua</th>
                                                        <th>Số Bàn Phản Lưới</th>
                                                        <th><BsCardChecklist /> Thẻ vàng</th>
                                                        <th><BsCardChecklist /> Thẻ đỏ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {teamStats.map(team => (
                                                        <tr key={team.id}>
                                                            <td>{team.id}</td>
                                                            <td><img src='https://gramotech.net/html/tigers/images/nmf-logo1.png' alt='' /> {team.name}</td>
                                                            <td>{team.matches}</td>
                                                            <td>{team.wins} - {team.draws} - {team.losts}</td>
                                                            <td>{team.goalsFor}</td>
                                                            <td>{team.goalsAgainst}</td>
                                                            <td>{team.ownGoals}</td>
                                                            <td>{team.redcards}</td>
                                                            <td>{team.yellowcards}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td colSpan={2}>Tổng</td>
                                                        <td>{totals.matches}</td>
                                                        <td>{totals.wins} - {totals.draws} - {totals.losts}</td>
                                                        <td>{totals.goalsFor}</td>
                                                        <td>{totals.goalsAgainst}</td>
                                                        <td>{totals.ownGoals}</td>

                                                        <td>{totals.redcards}</td>
                                                        <td>{totals.yellowcards}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Tab>
                                        <Tab eventKey="athletes" title="Vận động viên">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Tên Vận Động Viên</th>
                                                        <th>Số Áo</th>
                                                        <th>Đội Thi Đấu</th>
                                                        <th>Số Bàn Ghi Được</th>
                                                        <th>Số Bàn Phản Lưới</th>
                                                        <th>Số bàn cứu thua</th>
                                                        <th><BsCardChecklist />Thẻ Vàng</th>
                                                        <th> <BsCardChecklist /> Thẻ Đỏ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {athleteStats.map(athlete => (
                                                        <tr key={athlete.id}>
                                                            <td>{athlete.id}</td>
                                                            <td>{athlete.name}</td>
                                                            <td>{athlete.number}</td>
                                                            <td><img src={athlete.logoteam} alt='' /> {athlete.team}</td>
                                                            <td>{athlete.goals}</td>
                                                            <td>{athlete.ownGoals}</td>
                                                            <td>{athlete.savegoals}</td>
                                                            <td>{athlete.yellowCards}</td>
                                                            <td>{athlete.redCards}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td colSpan={4}>Tổng</td>

                                                        <td>{athleteTotals.goals}</td>
                                                        <td>{athleteTotals.ownGoals}</td>
                                                        <td>{athleteTotals.savegoals}</td>
                                                        <td>{athleteTotals.yellowCards}</td>
                                                        <td>{athleteTotals.redCards}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
            <Footer />
        </div>

    );
}
