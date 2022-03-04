import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPowerOff, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router";

const StHeader = styled.div`
    position: fixed;
    width: 100%;
    height: 40px;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ef4746;
    .lead,
    .logout {
        width: 40px;
        color: white;
        padding: 0px 6px 0px 6px;
    }
`;

const StLogo = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    visibility: visible;

    @media only screen and (max-width: 1024px) {
        visibility: hidden;
    }
`;

const Header = (data) => {
    const navigate = useNavigate();
    // lead
    const lead = () => {
        console.log("lead");
        data.setIsSider(!data.is_sider);
    };

    // 로그아웃
    const logout = () => {
        data.setNowPath("/");
        navigate("/");
        window.sessionStorage.setItem("token", "");
        data.setIsLogin(false);
    };

    return (
        <StHeader>
            <FontAwesomeIcon
                className="lead"
                size="lg"
                visibility={data.is_w1024_down ? "visible" : "hidden"}
                icon={!data.is_sider ? faBars : faTimes}
                onClick={() => lead()}
            />
            <StLogo>E4.Pay Service</StLogo>
            <FontAwesomeIcon
                className="logout"
                size="lg"
                icon={faPowerOff}
                onClick={() => logout()}
            ></FontAwesomeIcon>
        </StHeader>
    );
};

export default Header;
