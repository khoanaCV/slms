import styles from "../../Assets/css/admin/admindashboard.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Dropdown, Form, NavLink, InputGroup, DropdownButton, Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../Assets/images";
import { faChalkboardUser, faChessBoard, faClipboard, faFlag, faFutbol, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import Pagination from "../common/Pagination";

const cx = classNames.bind(styles);


const ProfileCard = ({ id, name, email, city, imageUrl, status, onStatusChange, onViewProfile }) => (
    <Card style={{ width: '18rem', margin: '10px', padding: " 0" }}>
        <Card.Img style={{ height: '150px', border: "1px solid #ccc" }} variant="top" src={imageUrl} />
        <Card.Body>
            <Card.Title style={{ fontSize: "18px", fontWeight: "600", color: "#fd1e50" }}>{name}</Card.Title>
            <Card.Text style={{ fontSize: "16px", fontWeight: "400", color: "black", textAlign: "center" }}>
                {email}
                <br />
                {city}
            </Card.Text>

        </Card.Body>
        <Card.Footer style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="primary" style={{ marginRight: '5px' }} onClick={() => onViewProfile(id)}>
                View Profile
            </Button>
            <Button variant={status === 'Active' ? 'success' : 'danger'} onClick={() => onStatusChange(id)}>
                {status}
            </Button>
        </Card.Footer>
    </Card>
);

let PageSize = 8;
export default function UsersManagement() {
    const [activeStatus, setActiveStatus] = useState("Active");
    const [profiles, setProfiles] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 2,
            name: 'Quỳnh Như',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamNhu',
            bio: 'i love Fooball 1',
            phone: '0362001404',
        },
        {
            id: 3,
            name: 'Đức Anh',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamAnh',
            bio: 'i love Fooball 2',
            phone: '0362001404',
        },
        {
            id: 4,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 5,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 6,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 7,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 8,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 9,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 10,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 11,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 12,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },
        {
            id: 13,
            name: 'Nguyễn Văn Rin',
            email: "lorenkid661@gmail.com",
            city: "Huế",
            status: 'Active',
            imageUrl: images.aovang,
            userName: 'HiIamRin',
            bio: 'i love Fooball',
            phone: '0362001404',
        },



    ])

    //Filter

    const [searchText, setSearchText] = useState(""); // Giữ giá trị nhập vào từ input
    // Các state khác và khởi tạo giống như trước

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        handleSearchChange(); // Cập nhật giá trị lọc dựa trên searchText hiện tại
    };

    const handleSelect = (eventKey) => {
        setActiveStatus(eventKey);
    };
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProfiles = useMemo(() => {
        // Sử dụng filterText để lọc profiles
        return profiles.filter(profile => profile.name.toLowerCase().includes(searchText.toLowerCase()));
    }, [searchText, profiles]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        if (searchText === '') {
            return profiles.slice(firstPageIndex, lastPageIndex);
        } else {
            return filteredProfiles.slice(firstPageIndex, lastPageIndex);
        }

    }, [currentPage, filteredProfiles, profiles]);

    //Block user
    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTilte, setModalTilte] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (userId) => {
        const user = profiles.find(profile => profile.id === userId);
        const message = user.status === 'Active'
            ? "Bạn thực sự muốn khoá người dùng này?"
            : "Bạn thực sự muốn mở khoá người dùng này?";
        const title = user.status === 'Active'
            ? "Khoá người dùng"
            : "Mở khoá người dùng";
        setModalTilte(title);
        setModalMessage(message);
        setShow(true);
        setSelectedUserId(userId);
    };

    const toggleUserStatus = (userId) => {
        setProfiles(profiles.map(profile => {
            if (profile.id === userId) {
                return {
                    ...profile,
                    status: profile.status === 'Active' ? 'Deactive' : 'Active'
                };
            }
            return profile;
        }));
    };

    const handleConfirmBlock = () => {
        toggleUserStatus(selectedUserId);
        handleClose();
    };

    //Show profile 

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleShowProfileModal = (userId) => {
        const user = profiles.find(profile => profile.id === userId);
        setSelectedUser(user);
        setShowProfileModal(true);
    };

    const handleCloseProfileModal = () => setShowProfileModal(false);



    return (
        <>
            <Row style={{ width: "100%", padding: "10px" }}>
                <Col>
                    <Row>
                        <Col>
                            <Row style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid #ccc", padding: "10px" }}>
                                <Col xs={9}>
                                    <Row>
                                        <Col xs={8}>
                                            <InputGroup>

                                                <Form.Control
                                                    placeholder="Nhập tên"
                                                    aria-label="Nhập tên"
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearchChange}
                                                    value={searchText}
                                                />


                                            </InputGroup>
                                        </Col>

                                    </Row>

                                </Col>

                            </Row>
                            <Row style={{ padding: "10px 0" }}>
                                {currentTableData.map((profile, index) => (
                                    <Col key={index} sm={12} md={4} lg={3}>
                                        <ProfileCard {...profile} onViewProfile={handleShowProfileModal} onStatusChange={() => handleShow(profile.id)} />
                                    </Col>
                                ))}
                            </Row>
                            <Row style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                <Col xs={3}>
                                    <Pagination
                                        className="pagination-bar"
                                        currentPage={currentPage}
                                        totalCount={profiles.length}
                                        pageSize={PageSize}
                                        onPageChange={page => setCurrentPage(page)}

                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Modal Component */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: "#fd1e50", color: "white" }} closeButton>
                    <Modal.Title>{modalTilte}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button style={{ backgroundColor: "#fd1e50", color: "white", border: "none" }} onClick={handleConfirmBlock}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
                <Modal.Header style={{ backgroundColor: "#fd1e50", color: "white" }} closeButton>
                    <Modal.Title>User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display user information here, e.g., Name, Email, City */}
                    {selectedUser && (
                        <table style={{ textAlign: "left" }}>
                            <tr>
                                <td style={{ textAlign: "left" }}>Name:</td>
                                <td><input readOnly value={selectedUser.name} /></td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>UserName:</td>
                                <td><input readOnly value={selectedUser.userName} /></td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>Email:</td>
                                <td><input readOnly value={selectedUser.email} /></td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>Bio:</td>
                                <td><input readOnly value={selectedUser.bio} /></td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>Country:</td>
                                <td><input readOnly value={selectedUser.city} /></td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>Phone</td>
                                <td><input readOnly value={selectedUser.phone} /></td>
                            </tr>
                        </table>

                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProfileModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>;
        </>

    );
}
