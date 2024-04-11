import styles from "../../Assets/css/admin/admindashboard.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Dropdown, Form, NavLink, DropdownButton, Table } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../Assets/images";
import { faChalkboardUser, faChessBoard, faClipboard, faFlag, faFutbol } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import Pagination from "../common/Pagination";

const cx = classNames.bind(styles);



let PageSize = 10;
export default function TournamentsManagement() {
    const [tournaments, setTournaments] = useState([
        {
            id: 1,
            name: 'Bethlehem1',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Loại trực tiếp',
            status: 'Đang đăng ký',
            mode: 'Công khai',
        },
        {
            id: 2,
            name: 'Bethlehem2',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng tròn',
            status: 'Đang hoạt động',
            mode: 'Riêng tư',
        },
        {
            id: 3,
            name: 'Bethlehem3',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Công khai',
        },
        {
            id: 4,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Công khai',
        },
        {
            id: 5,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Công khai',
        },
        {
            id: 6,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Công khai',
        },
        {
            id: 7,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Công khai',
        },
        {
            id: 8,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Công khai',
        },
        {
            id: 9,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Riêng tư',
        },
        {
            id: 10,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Riêng tư',
        },
        {
            id: 11,
            name: 'Bethlehem',
            startDate: '26/05/2023',
            endDate: '26/07/2023',
            format: 'Đấu vòng bảng',
            status: 'Kết thúc',
            mode: 'Riêng tư',
        },
        // ... thêm dữ liệu cho các giải đấu khác
    ]);

    const handleSort = (column) => {
        // Sắp xếp dữ liệu theo cột được chọn
    };

    // Additional state for filters
    const [modeFilter, setModeFilter] = useState('Tất cả');
    const [statusFilter, setStatusFilter] = useState('Tất cả');
    const [formatFilter, setFormatFilter] = useState('Tất cả');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Derived state for filtered tournaments
    const filteredTournaments = useMemo(() => {
        let result = tournaments.filter(tournament =>
            tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) // Lọc theo nội dung tìm kiếm
        );

        // Áp dụng các bộ lọc khác nếu kết quả của việc tìm kiếm không trống hoặc không có nội dung tìm kiếm
        if (result.length > 0 || searchTerm === '') {
            if (modeFilter && modeFilter !== 'Tất cả') {
                result = result.filter(tournament => tournament.mode === modeFilter);
            }
            if (statusFilter && statusFilter !== 'Tất cả') {
                result = result.filter(tournament => tournament.status === statusFilter);
            }
            if (formatFilter && formatFilter !== 'Tất cả') {
                result = result.filter(tournament => tournament.format === formatFilter);
            }
            if (startDateFilter) {
                result = result.filter(tournament => new Date(tournament.startDate) >= new Date(startDateFilter));
            }
            if (endDateFilter) {
                result = result.filter(tournament => new Date(tournament.endDate) <= new Date(endDateFilter));
            }
        }

        return result;
    }, [tournaments, modeFilter, statusFilter, formatFilter, startDateFilter, endDateFilter, searchTerm]);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Cập nhật trạng thái nội dung tìm kiếm
        setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi có sự thay đổi tìm kiếm
    };

    // State and derived state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredTournaments.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredTournaments]);

    const renderTournament = (tournament) => {
        return (
            <tr className="table-row">
                <td>{tournament.id}</td>
                <td>{tournament.name}</td>
                <td>{tournament.startDate}</td>
                <td>{tournament.endDate}</td>
                <td>{tournament.format}</td>
                <td>{tournament.status}</td>
                <td>{tournament.mode}</td>
                <td>
                    <Button className="button-primary" size="sm">Chi tiết</Button>
                    <Button className="button-secondary" size="sm">Sửa</Button>
                </td>
            </tr>
        );
    };

    return (
        <Row style={{ width: "100%" }}>
            <Col>
                <Row style={{ width: "100%" }}>
                    <Col style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>

                            <input
                                value={searchTerm} // Điều khiển giá trị ô nhập liệu
                                onChange={handleSearchChange} // Thiết lập xử lý sự kiện
                                style={{ marginRight: "20px", padding: "10px", height: "30px" }} className="mb-0" placeholder="Tìm kiếm theo tên giải đấu" />
                            <div>
                                <div style={{ fontSize: "16px" }}>Chế độ:</div>
                                <DropdownButton
                                    style={{ marginRight: "20px" }}
                                    id="dropdown-basic-button"
                                    title={modeFilter}
                                    variant="danger"
                                    size="sm"
                                    onSelect={(eventKey) => setModeFilter(eventKey)}
                                >
                                    <Dropdown.Item eventKey="Tất cả">Tất cả</Dropdown.Item>
                                    <Dropdown.Item eventKey="Công khai">Công khai</Dropdown.Item>
                                    <Dropdown.Item eventKey="Riêng tư">Riêng tư</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div>
                                <div style={{ fontSize: "16px" }}>Trạng thái:</div>
                                <DropdownButton
                                    style={{ marginRight: "20px" }}
                                    id="dropdown-basic-button"
                                    title={statusFilter}
                                    variant="danger"
                                    size="sm"
                                    onSelect={(eventKey) => setStatusFilter(eventKey)}
                                >
                                    <Dropdown.Item eventKey="Tất cả">Tất cả</Dropdown.Item>
                                    <Dropdown.Item eventKey="Đang đăng ký">Đang đăng ký</Dropdown.Item>
                                    <Dropdown.Item eventKey="Hoạt động">Hoạt động</Dropdown.Item>
                                    <Dropdown.Item eventKey="Kết thúc">Kết thúc</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div>
                                <div style={{ fontSize: "16px" }}>Thể thức:</div>
                                <DropdownButton
                                    style={{ marginRight: "20px" }}
                                    id="dropdown-basic-button"
                                    title={formatFilter}
                                    variant="danger"
                                    size="sm"
                                    onSelect={(eventKey) => setFormatFilter(eventKey)}
                                >
                                    <Dropdown.Item eventKey="Tất cả">Tất cả</Dropdown.Item>
                                    <Dropdown.Item eventKey="Loại trực tiếp">Loại trực tiếp</Dropdown.Item>
                                    <Dropdown.Item eventKey="Đấu vòng tròn">Đấu vòng tròn</Dropdown.Item>
                                    <Dropdown.Item eventKey="Chia bảng đấu">Chia bảng đấu</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <input
                                style={{ marginRight: "20px", padding: "10px", height: "30px" }}
                                className="mb-0"
                                type="date"
                                placeholder="Ngày bắt đầu"
                                onChange={(e) => setStartDateFilter(e.target.value)}
                            />
                            <input
                                style={{ marginRight: "20px", padding: "10px", height: "30px" }}
                                className="mb-0"
                                type="date"
                                placeholder="Ngày kết thúc"
                                onChange={(e) => setEndDateFilter(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button style={{ backgroundColor: "#fd1e50" }}>Tạo giải đấu</Button>
                        </div>


                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                        <Table striped bordered hover>
                            <thead>
                                <tr className="table-header">
                                    <th>#</th>
                                    <th>Tên giải đấu</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Cấu hình giải đấu</th>
                                    <th>Trạng thái</th>
                                    <th>Chế độ</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData.map((tournament) => renderTournament(tournament))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Col xs={3}>
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={filteredTournaments.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}

                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}