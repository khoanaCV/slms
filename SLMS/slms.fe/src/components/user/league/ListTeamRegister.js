import styles from "../../../Assets/css/user/league/manageTeamLeague.css"
import classNames from "classnames/bind";
import "../../../Assets/css/user/league/leaguedashboard.css"
import { Row, Col, Button, Table } from 'react-bootstrap';

import { toast } from "react-toastify";

const cx = classNames.bind(styles);


export default function ListTeamRegister({ teams, onStatusClick, onInviteClick }) {



    const renderStatusButton = (team) => {
        let variant = '';
        switch (team.status) {
            case 'Chờ xác nhận':
                variant = 'secondary';
                break;
            case 'Chấp nhận':
                variant = 'success';
                break;
            case 'Từ chối':
                variant = 'danger';
                break;
            case 'Được mời':
                variant = 'primary';
                break;
            // ... other status cases
            default:
                variant = 'secondary';
        }
        return (
            <Button
                onClick={() => onStatusClick(team)}
                style={{ width: "150px", height: "40px" }}
                variant={variant}
            >
                {team.status}
            </Button>
        );
    };

    return (
        <Row>
            <Col style={{ padding: "0" }}>
                <Row style={{ textAlign: "end", margin: "10px 0" }}>
                    <Col xs={11} style={{ padding: "0" }}>
                        <Button style={{ backgroundColor: "#FD1E50" }} onClick={() => onInviteClick()}> + Mời tham gia</Button>
                    </Col>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Col xs={10} style={{ padding: "0" }}>
                        <Table striped bordered hover variant="light" style={{ textAlign: "center" }}>
                            <thead style={{ background: "#FD1E50", color: "white" }}>
                                <tr style={{ background: "#FD1E50", color: "white" }}>
                                    <th >#</th>
                                    <th>Tên đội</th>
                                    <th>Thành viên</th>
                                    <th>Người liên hệ</th>
                                    <th>SĐT</th>
                                    <th>Thời gian đăng ký</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, index) => (
                                    <tr key={index}>
                                        <td>{team.id}</td>
                                        <td>{team.teamName}</td>
                                        <td>{team.members}</td>
                                        <td>{team.contact}</td>
                                        <td>{team.contactNumber}</td>
                                        <td>{team.registrationDate}</td>
                                        <td>{renderStatusButton(team)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>

    );
}
