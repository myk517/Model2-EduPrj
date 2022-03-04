import React from "react";

import styled from "styled-components";
import Space from "./Space";

const StMenu = styled.div`
    font-size: 1.1rem;
    margin: 3px;
    padding: 5px;
    border: 2px solid #ef4746;
    background-color: white;
    border-radius: 4px;
    color: #ef4746;
    font-weight: bold;

    &:hover {
        border: 2px solid white;
        background-color: #ef4746;
        color: white;
        padding: 6px;
        margin: 2px;
    }
`;

const Menu = (data) => {
    return (
        <StMenu
            style={{
                ...data.style,
                ...(data.path_focus && {
                    border: "2px solid white",
                    backgroundColor: "#d32f2f",
                    color: "white",
                    padding: 8,
                    margin: 0,
                }),
            }}
            onClick={data.onClick}
        >
            <Space>{data.value}</Space>
        </StMenu>
    );
};
export default Menu;
