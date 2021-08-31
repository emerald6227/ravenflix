import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import noPosterSmall from "../../assets/noPosterSmall.png";

const Container = styled.div`
    display: grid;
    gap: 10px 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 20px;
`;

const SeasonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const SeasonImage = styled.img`
    max-width: 200px;
    min-height: 150px;
    max-height: 150px;
`;

const SeasonTitle = styled.span`
    margin-top: 10px;
    font-size: 16px;
`;

const NoInfoSpan = styled.span`
    font-size: 20px;
    color: #e74c3c;
`;

const DetailSeasonsPresenter = ({ seasonList, loading, error }) => {
    return (
        loading ? (
            <Loader />
        ) : ( 
            <Container>
                { seasonList && seasonList.length > 0 ?
                    seasonList.map((season, index) => (
                        <SeasonWrapper key={index}>
                            { season.poster_path && season.poster_path !== "" ? <SeasonImage src={`https://image.tmdb.org/t/p/original${season.poster_path}`}></SeasonImage> 
                                : <SeasonImage src={noPosterSmall}></SeasonImage>
                            }
                            <SeasonTitle>{season.name}</SeasonTitle>
                        </SeasonWrapper>
                    ))
                    : <NoInfoSpan>시즌 정보가 없습니다.</NoInfoSpan>
                }
            </Container>
        )
    );
};

DetailSeasonsPresenter.propTypes = {
    seasonList: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default DetailSeasonsPresenter;