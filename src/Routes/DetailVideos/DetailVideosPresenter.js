import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Container = styled.div`
    display: grid;
    gap: 10px 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 20px;
`;

const VideoWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const VideoTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin: 20px 0;
`;

const Iframe = styled.iframe`
    max-width: 400px;
    min-height: 200px;
`;

const NoVideoSpan = styled.span`
    font-size: 20px;
    color: #e74c3c;
`;

const DetailVideosPresenter = ({ videoList, loading, error }) => {
    return (
        loading ? (
            <Loader />
        ) : ( 
            <Container>
                { videoList && videoList.length > 0 ? 
                    videoList.map((video, index) => (
                        <VideoWrapper key={index}>
                            <VideoTitle>{video.name}</VideoTitle>
                            <Iframe title={video.name} src={`https://www.youtube.com/embed/${video.key}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picutre" allowFullScreen></Iframe>
                        </VideoWrapper>
                    ))
                    :
                    <NoVideoSpan>영상이 없습니다.</NoVideoSpan>
                }
            </Container>
        )
    );
};

DetailVideosPresenter.propTypes = {
    videoList: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default DetailVideosPresenter;