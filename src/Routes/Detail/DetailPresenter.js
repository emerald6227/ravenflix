import React from "react";
import PropTypes from "prop-types";
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

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const TitleContainer = styled.div`
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

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 5px;
`;

const OverView = styled.p`
    font-size: 16px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const DetailPresenter = ({result, error, loading}) => {
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
                    <Data>
                        <TitleContainer>
                            <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                            {result.imdb_id ? <HomepageA href={`https://imdb.com/title/${result.imdb_id}`} target="_blank">IMDB</HomepageA> : <HomepageA href={result.homepage} target="_blank">Official</HomepageA> }
                        </TitleContainer>
                        <ItemContainer>
                            <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                            <Divider>∙</Divider>
                            <Item>{result.runtime || result.runtime === 0 ? result.runtime : result.episode_run_time[0]}min</Item>
                            <Divider>∙</Divider>
                            <Item>{result.genres && result.genres.map((genre, index) => index === (result.genres.length - 1) ? genre.name : `${genre.name} / `)}</Item>
                        </ItemContainer>
                        <OverView>{result.overview}</OverView>
                    </Data>
                </Content>
            </Container>
        )
    )
};

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default DetailPresenter;