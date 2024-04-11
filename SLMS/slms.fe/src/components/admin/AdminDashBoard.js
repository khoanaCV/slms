import styles from "../../Assets/css/admin/admindashboard.css"
import classNames from "classnames/bind";
import { Container, Row, Col, Card, Button, Image, Dropdown, Form } from 'react-bootstrap';
import Header from "../common/Header";
import Footer from "../common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "../../Assets/images";
import SideBarAdmin from "./SideBarAdmin";
import RightPageAdmin from "./RightPageAdmin";
import { useState } from "react";
import UsersManagement from "./UsersManagement";
import TournamentsManagement from "./TournamentsManagement";

const cx = classNames.bind(styles);




export default function AdminDashBoard() {
    const [activeComponent, setActiveComponent] = useState('dashboard');


    const displayComponent = () => {
        if (activeComponent === 'usersManagement') return <UsersManagement />;
        if (activeComponent === 'tournamentsManagement') return <TournamentsManagement />;
        if (activeComponent === 'dashboard') return <RightPageAdmin />;
        return null; // Fallback if none of the above
    };

    return (
        <div>
            <Header />
            <Container fluid style={{ padding: "20px 0", }}>
                <Row >
                    <Col style={{ padding: "0" }}>
                        <Row >
                            <Col data-aos="fade-right" xs={2} style={{ padding: "0 0 0 10px", height: "100%", maxHeight: "100%" }}>
                                <SideBarAdmin onMenuItemClick={setActiveComponent} />
                            </Col>
                            <Col style={{ display: "flex", justifyContent: "center" }} xs={10}>
                                {displayComponent()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>

    );
}
