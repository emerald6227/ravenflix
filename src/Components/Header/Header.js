import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from 'styled-components';

const Header = styled.header`
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: rgba(20, 20, 20, 1);
    z-index: 10;
    box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const HomeTitle = styled.span`
    display: inline-block;
    margin: 0 20px;
    font-size: 20px;
    font-weight: 700;
    color: red;
`;

const List = styled.ul`
    display: flex;
`;

const Item = styled.li`
    width: 80px;
    height: 50px;
    text-align: center;
    border-bottom: 3px solid ${(props) => (props.current ? "red" : "transparent")};
    transition: border-bottom .2s ease-out;
`;

const SLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center; 
    justify-content: center;
    font-size: 16px;
`;

const header = ({location: {pathname}}) => {
    return (
        <Header>
                <SLink to="/">
                    <HomeTitle>Ravenflix</HomeTitle>
                </SLink>
                <List>
                    <Item current={pathname === "/"}>
                        <SLink to="/">Movies</SLink>
                    </Item>
                    <Item current={pathname === "/tv"}>
                        <SLink to="/tv">TV</SLink>
                    </Item>
                    <Item current={pathname === "/search"}>
                        <SLink to="/search">Search</SLink>
                    </Item>
                </List>
        </Header>
    );
};

export default withRouter(header);