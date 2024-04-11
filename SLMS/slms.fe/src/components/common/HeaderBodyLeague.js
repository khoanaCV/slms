import styles from "../../Assets/css/common/headerBodyLeague.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../Assets/images";
import { faCalendar, faEnvelope, faPhone, faStar, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getLeagueDetailByIdLeague } from "../../services/LeagueSevice";

const cx = classNames.bind(styles);

export default function HeaderBodyLeague({ onBtnCircleClick }) {

    const { id } = useParams();
    const { idLeague } = useParams();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('Chung'); // Mặc định item "Chung" được chọn


    const menuItems = useMemo(() => [
        {
            id: 1,
            title: "Chung",
            linknav: `/league/dashboard/${id}/${idLeague}`
        },
        {
            id: 2,
            title: "Lịch thi đấu",
            linknav: `/league/dashboard/${id}/${idLeague}/calendarleague`
        },
        {
            id: 3,
            title: "Bảng xếp hạng",
            linknav: `/league/dashboard/${id}/${idLeague}/ranking`
        },
        {
            id: 4,
            title: "Đội thi đấu",
            linknav: `/league/dashboard/${id}/${idLeague}/teams`
        },
        {
            id: 5,
            title: "Giải thưởng",
            linknav: `/league/dashboard/${id}/${idLeague}/prizes`
        },
        {
            id: 6,
            title: "Thống kê",
            linknav: `/league/dashboard/${id}/${idLeague}/statitics`
        },
        {
            id: 7,
            title: "Cấu hình giải",
            linknav: `/league/dashboard/${id}/${idLeague}/settingleague/`
        },
        {
            id: 8,
            title: "Tuỳ chỉnh",
            linknav: `/league/dashboard/${id}/${idLeague}/option`
        },
    ], [id, idLeague]);

    // 'Lịch thi đấu', 'Bảng xếp hạng', 'Đội thi đấu', 'Thống kê', 'Cấu hình giải', 'Tuỳ chỉnh'
    const handleClick = (item) => {
        setActiveItem(item); // Cập nhật item được chọn
    };


    useEffect(() => {
        // Xác định item dựa trên đường dẫn hiện tại và cập nhật activeItem
        const currentPath = location.pathname;

        const currentItem = menuItems.find(item => currentPath === item.linknav);
        if (currentItem) {
            setActiveItem(currentItem.title);
        } else {
            setActiveItem('Chung');
        }
    }, [location.pathname, menuItems]);

    const [leagueDetail, setLeagueDetail] = useState({});

    useEffect(() => {
        getLeagueDetailByIdLeague(idLeague)
            .then(data => {
                setLeagueDetail(data);
            })
            .catch(error => {
                console.error("Error fetching league statistics:", error);
            });
    }, [idLeague]);

    //console.log(leagueDetail);
    return (
        <Row className={cx("infomation-myleague_header")}>
            <Col style={{ padding: "0" }}>
                <Row >
                    <Col style={{ display: "flex", justifyContent: "center", padding: "0" }}>
                        <div>
                            {leagueDetail.avatarTournament === null && (
                                <img src={images.logoteam1} alt="Hình ảnh giải đấu" className={cx("user-image-preview")} />
                            )}
                            {leagueDetail.avatarTournament !== null && (
                                <img src={leagueDetail.avatarTournament} alt="Hình ảnh giải đấu" className={cx("user-image-preview")} />
                            )}

                        </div>
                        <div className={cx('user_info-inner')}>
                            <h4 className={cx('user_info-name mg-8px')}>{leagueDetail.name}</h4>
                            <div className={cx('user_info-item')}>
                                <p className="user_info mg-8px">{leagueDetail.competitionFormatName} || Bóng đá sân {leagueDetail.numberOfPlayersPerTeamRange}</p>
                            </div>
                            <div className={cx('user_info-item mg-8px')}>
                                <div className={cx('item_teams mg-8px')}>
                                    <FontAwesomeIcon icon={faUsers} />
                                    <p className="user_info1">{leagueDetail.numberOfTeams} đội</p>
                                </div>
                                <div onClick={onBtnCircleClick} style={{ cursor: "pointer" }} className={cx('item_star mg-8px')}>
                                    <p className="user_info1">9</p>
                                    <FontAwesomeIcon style={{ marginBottom: "3px" }} icon={faStar} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ padding: "0" }}>
                        <div className={cx("menu_header-inner")}>
                            {menuItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.linknav}
                                    className={cx("menu_header-item", { 'active-color-white': item.title === activeItem, 'active-color-xam': item.title !== activeItem })}
                                    onClick={() => handleClick(item)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </Col>

                </Row>
            </Col>
        </Row>


    );
}
