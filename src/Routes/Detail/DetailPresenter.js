import React from "react";
import PropTypes from "prop-types";
import { Route, Link, withRouter } from 'react-router-dom';
import DetailVideos from "../DetailVideos";
import DetailMaker from "../DetailMaker";
import DetailSeasons from "../DetailSeasons";
import styled from "styled-components";
import Helmet from "react-helmet"
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(2px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    padding-left: 20px;
`;

const PrimaryInfoContainer = styled.div`
    height: 40%;
    margin-left: 10px;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Title = styled.h3`
    font-size: 32px;
    margin-right: 15px;
`;

const HomepageA = styled.a`
    all: unset;    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 30px;
    background-color: orange;
    border-radius: 10px;
    cursor: pointer;
    color: black;
    font-weight: 700;
    font-size: 16px;
`;

const ItemWrapper = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`
    font-size: 15px;
`;

const Divider = styled.span`
    margin: 0 5px;
`;

const OverView = styled.p`
    font-size: 18px;
    opacity: 0.7;
    line-height: 1.5;
`;

// menu
const InsideMenu = styled.div`
    margin-left: 10px;
    height: 60%;
`;

const InsideMenuNav = styled.div`
    display: flex;
    margin-top: 20px;
`;

const InsideMenuNavBtn = styled(Link)`
    all: unset;
    width: 33%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.selected ? "#811005" : "rgba(0, 0, 0, 0.5)")};
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin-right: 5px;
    border-radius: 10px;

    :hover {
        background-color: ${(props) => (!props.selected ? "rgba(129,16,5, 0.7)" : "#811005")};
    }
`;

const InsideMenuContent = styled.div``;

const DetailPresenter = withRouter(({ location: { pathname }, result, error, loading}) => {
    return (
        loading ? (
            <>
                <Helmet>
                    <title>Loading | Ravenflix</title>
                </Helmet>
                <Loader/>
            </>
        ) : (
            error ? <Message /> : 
                <Container>
                    <Helmet>
                        <title>{result.original_title ? result.original_title : result.original_name} | Ravenflix</title>
                    </Helmet>
                    <Backdrop bgImage={result.backdrop_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : ""} />
                    <Content>
                        <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png").default} />
                        <InfoContainer>
                            <PrimaryInfoContainer>
                                <TitleWrapper>
                                    <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                                    {result.imdb_id ? <HomepageA href={`https://imdb.com/title/${result.imdb_id}`} target="_blank">IMDB</HomepageA> : <HomepageA href={result.homepage} target="_blank">Official</HomepageA> }
                                </TitleWrapper>
                                <ItemWrapper>
                                    <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                                    <Divider>???</Divider>
                                    <Item>{result.runtime || result.runtime === 0 ? result.runtime : result.episode_run_time[0]}min</Item>
                                    <Divider>???</Divider>
                                    <Item>{result.genres && result.genres.map((genre, index) => index === (result.genres.length - 1) ? genre.name : `${genre.name} / `)}</Item>
                                </ItemWrapper>
                                <OverView>{result.overview}</OverView>
                            </PrimaryInfoContainer>

                            <InsideMenu>
                                <InsideMenuNav>
                                    {pathname.includes("/movie/") ? 
                                        <>
                                            <InsideMenuNavBtn to={`/movie/${result.id}/videos`} selected={pathname.includes("movie") && pathname.includes("videos")}>Videos</InsideMenuNavBtn>
                                            <InsideMenuNavBtn to={`/movie/${result.id}/maker`} selected={pathname.includes("movie") && pathname.includes("maker")}>Maker</InsideMenuNavBtn>
                                        </>
                                        :
                                        <>
                                            <InsideMenuNavBtn to={`/show/${result.id}/videos`} selected={pathname.includes("show") && pathname.includes("videos")}>Videos</InsideMenuNavBtn>
                                            <InsideMenuNavBtn to={`/show/${result.id}/maker`} selected={pathname.includes("show") && pathname.includes("maker")}>Maker</InsideMenuNavBtn>
                                            <InsideMenuNavBtn to={`/show/${result.id}/seasons`} selected={pathname.includes("show") && pathname.includes("seasons")}>Seasons</InsideMenuNavBtn>
                                        </>
                                    }
                                </InsideMenuNav>
                                <Route path="/movie/:id/videos" component={DetailVideos}></Route>
                                <Route path="/movie/:id/maker" component={DetailMaker}></Route>
                                <Route path="/show/:id/videos" component={DetailVideos}></Route>
                                <Route path="/show/:id/maker" component={DetailMaker}></Route>
                                <Route path="/show/:id/seasons" component={DetailSeasons}></Route>
                            </InsideMenu>
                        </InfoContainer>
                    </Content>
                </Container>
        )
    )
});

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default DetailPresenter;