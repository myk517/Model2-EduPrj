import React from "react";
import styled from "styled-components";

const StMapNoticeDiv = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    height: 30vw;
    @media only screen and (max-width: 1024px) {
        height: 50vw;
    }
`;

const MapNoticeDiv = (data) => {
    return <StMapNoticeDiv>{data.children}</StMapNoticeDiv>;
};

export default MapNoticeDiv;
