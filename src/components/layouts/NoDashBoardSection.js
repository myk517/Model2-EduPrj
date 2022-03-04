import React from "react";
import styled from "styled-components";

const StNoDashBoardSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const NoDashBoardSection = (data) => {
    return (
        <StNoDashBoardSection style={{ ...data.style }}>
            {data.children}
        </StNoDashBoardSection>
    );
};

export default NoDashBoardSection;
