import styles from "../../../Assets/css/user/league/leagues.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Form, FormControl, Dropdown, InputGroup, Badge } from 'react-bootstrap';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../../Assets/images";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { faCircleXmark, faEye, faSearch, faStar, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../common/Pagination";
import Popup from "../../common/Popup";
import { toast } from "react-toastify";
import { tippy } from "@tippyjs/react";
import Tippy from "@tippyjs/react";
import { getLeaguesByType, getLeaguesContainText, getPublicLeagues } from "../../../services/LeagueSevice";
import { useNavigate } from 'react-router-dom';



const cx = classNames.bind(styles);


const LeagueItem = ({ league, onBtnCircleClick }) => {
    const navigate = useNavigate();
    if (!league) {
        return null; // Add a check to handle when league is undefined
    }

    const { leagueName, competitionFormatName, numberOfPlayersPerTeamRange, organizerName, location, currentStatus, numberOfTeam, star, imageleague } = league;

    const handleCardClick = () => {
        // Navigate to the league dashboard page
        navigate(`/league/${league.organizerId}/dashboard/${league.id}`);
    };

    return (
        <Col xs={3} xl={3} lg={4} md={5} sm={12} className={cx('inner_item')}>
            <Card className={cx('item-container')} style={{ width: '18rem', cursor: "pointer", border: "none", boxShadow: "1px 1px 1px 2px #d8d8d8 " }} onClick={handleCardClick}>
                <Card.Img variant="top" className={cx('item_url')} src='https://upanh123.com/wp-content/uploads/2020/11/hinh-anh-con-meo-cute9.jpg' />
                <Badge pill bg={currentStatus === "Đang đăng ký" ? "primary" : currentStatus === "Hoạt động" ? "success" : "danger"} className="position-absolute" style={{ top: '0.5em', right: '0.5em' }}>
                    {currentStatus}
                </Badge>
                <Card.Body>
                    <Card.Title style={{ fontSize: "25px", fontWeight: "550", textAlign: "center", color: "#fd1e50" }}>{leagueName}</Card.Title>
                    <Card.Text style={{ fontSize: "16px", fontWeight: "300", color: "#8f8f8f" }}>
                        <div>{competitionFormatName || 'Không xác định'} || Bóng đá sân {numberOfPlayersPerTeamRange} || {organizerName} || {location}</div>
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "10px 0 0 0" }}>
                        <div className={cx('btn-circle')} onClick={onBtnCircleClick}>
                            <span className="ml-2" style={{ marginTop: "3px", marginRight: "2px", fontSize: "18px" }}>10</span>
                            <FontAwesomeIcon style={{ color: "yellow" }} icon={faStar} />
                        </div>
                        <div className="d-flex align-items-center " >

                            <FontAwesomeIcon icon={faUsers} />
                            <span className="ml-2">{numberOfTeam}</span>


                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

let PageSize = 8;
const Leagues = () => {

    const [keywordSearch, setKeywordSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedType, setSelectedType] = useState(0);

    //test data
    const [leagues, setLeagues] = useState([
       
    ]);



    //Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        if (keywordSearch === null) {
            setIsSearching(false);
        }
        const data = isSearching ? searchResults : leagues;
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, leagues, searchResults, isSearching, keywordSearch]);

    //search Leagues

    const [showPopup, setShowPopup] = useState(false);
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
    const [activeStarIndex, setActiveStarIndex] = useState(-1);

    const handleBtnCircleClick = (id) => {
        setShowPopup(true);
        setSelectedLeagueId(id);
    };

    const handleStarClick = (index) => {
        setActiveStarIndex(index);
    };

    const handleVoteButtonClick = () => {
        const updatedLeagues = leagues.map(league => {
            if (league.id === selectedLeagueId) {
                return {
                    ...league,
                    star: (parseInt(league.star) + (activeStarIndex + 1)).toString(),
                };
            }
            return league;
        });
        setLeagues(updatedLeagues);
        setShowPopup(false);
        setActiveStarIndex(-1);
        toast.success("Bình chọn thành công");
    };

    const closePopup = () => {
        setShowPopup(false);
        setActiveStarIndex(-1)
    };

    const handleFilter = () => {
        if (keywordSearch.trim() !== "") {
            setIsSearching(true);
            getLeaguesContainText(keywordSearch)
                .then(data => {
                    setSearchResults(data);
                    setCurrentPage(1);
                })
                .catch(error => {
                    console.error('Failed to fetch search results:', error);
                });
        } else {
            setIsSearching(false);
        }
    };

    // Xử lý khi loại giải đấu thay đổi
    const handleTypeChange = (tournamentTypeId) => {
        setSelectedType(tournamentTypeId);
        setIsSearching(false);

        if (tournamentTypeId === "Tất cả") {
            getPublicLeagues().then(data => {
                setLeagues(data);
                setCurrentPage(1);
            }).catch(error => {
                console.error('Failed to fetch all leagues:', error);
            });
        } else {
            getLeaguesByType(tournamentTypeId).then(data => {
                setLeagues(data);
                setCurrentPage(1);
            }).catch(error => {
                console.error('Failed to fetch leagues by type:', error);
            });
        }

    };

    //call api
    useEffect(() => {
        if (!isSearching) { // Chỉ gọi API khi không trong quá trình tìm kiếm
            getPublicLeagues()
                .then(data => {
                    setLeagues(data);
                })
                .catch(error => {
                    console.error('Failed to fetch leagues:', error);
                });
        }
    }, [isSearching]);

    // console.log(leagues);
    return (
        <Container fluid>
            <Header />
            <Container fluid style={{ padding: "0" }}>
                <Row className={cx('header-body')}>
                    <Col xs={4} style={{ padding: "0" }}>
                        <div className={cx('header_search')}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Nhập tên giải đấu hoặc tên người quản lý"
                                    aria-label="Nhập tên giải đấu hoặc tên người quản lý"
                                    aria-describedby="basic-addon2" className="mr-sm-2 custom-input"
                                    onChange={(e) => setKeywordSearch(e.target.value)}
                                />
                                <Button onClick={handleFilter} style={{ backgroundColor: "#fd1e50" }} id="basic-addon2">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col xs={1}>
                    </Col>
                    <Col xs={2} style={{ padding: "0", textAlign: "center" }}>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{
                                    backgroundColor: 'white', display: 'flex',
                                    justifyContent: 'space-between', alignItems: "center",
                                    width: "100%",
                                    borderColor: '#fd1e50',
                                    color: 'black'
                                }}
                                variant="outline-primary" id="dropdown-basic">
                                Hình thức
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ backgroundColor: 'white', width: "100%", borderColor: '#fd1e50', color: 'black' }}>
                                <Dropdown.Item onClick={() => handleTypeChange("Tất cả")}>Tất cả</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleTypeChange("Loại trực tiếp")}>Loại trực tiếp</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleTypeChange("Đấu vòng tròn")}>Đấu vòng tròn</Dropdown.Item>
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={2} style={{ padding: "0", textAlign: "center" }}>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ backgroundColor: 'white', borderColor: '#fd1e50', color: 'black' }}
                                variant="outline-primary" id="dropdown-basic">
                                Trạng Thái
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ backgroundColor: 'white', borderColor: '#fd1e50', color: 'black' }}>
                                <Dropdown.Item href="#/action-1">Đang đăng ký</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Hoạt động</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Kết thúc</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>


                </Row>
                <Row className={cx('body_wrapper')}>
                    <Row className={cx('body_inner')}>
                        {currentTableData.map((league, index) => (
                            <LeagueItem key={index} league={league} leagueId={league.organizerId} onBtnCircleClick={() => handleBtnCircleClick(league.id)} />
                        ))}

                    </Row>

                    <Row style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Col xs={3}>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={leagues.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}

                            />
                        </Col>
                    </Row>
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
        </Container>
    );
};
export default Leagues;
