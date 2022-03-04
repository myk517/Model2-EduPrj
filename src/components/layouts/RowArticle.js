import React from "react";
import styled from "styled-components";

const StRowArticle = styled.div`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    display: flex;
`;
const RowArticle = (data) => {
    return (
        <StRowArticle style={{ ...data.style }}>{data.children}</StRowArticle>
    );
};

export default RowArticle;
