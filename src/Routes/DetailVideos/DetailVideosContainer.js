import React from "react";
import { moviesApi, tvApi } from '../../api';
import DetailVideosPresenter from "./DetailVideosPresenter";

class DetailVideos extends React.Component {
    constructor(props) {
        super(props);
        const { location: { pathname }} = props;
        this.state = {
            videoList: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    };

    async componentDidMount() {
        const { 
            match: { 
                params: { id } 
            },
            history: { push },
        } = this.props;

        const { isMovie } = this.state;
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push("/");
        }

        let result;
        try {
            if (isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
            }
        } catch {
            this.setState({
                error: "영상 정보를 찾을 수 없습니다."
            })
        } finally {
            this.setState({
                loading: false,
                videoList: result.videos.results
            })
        }
    };

    render() {
        const { videoList, loading, error } = this.state;
        return (
            <DetailVideosPresenter videoList={videoList} loading={loading} error={error}></DetailVideosPresenter>
        );
    }
};

export default DetailVideos;