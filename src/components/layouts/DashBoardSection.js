import React from "react";
import styled from "styled-components";

const StDashBoardSection = styled.div`
    left: 220px;
    position: fixed;
    height: 100vh;
    z-index: 1;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    width: calc(100% - 220px);
    @media only screen and (max-width: 1024px) {
        left: 0px;
        width: 100%;
    }
`;
const DashBoardSection = (data) => {
    return (
        <StDashBoardSection style={{ ...data.style }}>
            {data.children}
        </StDashBoardSection>
    );
};

export default DashBoardSection;
