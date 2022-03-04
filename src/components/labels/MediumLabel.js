import React from "react";
import styled from "styled-components";

const StMediumLabel = styled.label`
    text-align: left;
    padding: 8px 8px 8px 8px;
    // font-weight: bold;
    font-size: 1.2rem;
`;

const MediumLabel = (data) => {
    return <StMediumLabel style={data.style}>{data.value}: </StMediumLabel>;
};

export default MediumLabel;
