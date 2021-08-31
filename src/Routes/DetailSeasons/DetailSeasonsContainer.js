import React from "react";
import { tvApi } from '../../api';
import DetailSeasonsPresenter from "./DetailSeasonsPresenter";

class DetailSeasons extends React.Component {
    state = {
        seasonList: null,
        loading: true,
        error: ""
    };

    async componentDidMount() {
        const { 
            match: { 
                params: { id } 
            },
            history: { push }
        } = this.props;

        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push("/");
        }

        let result = null;
        try {
            result = await tvApi.showDetail(parsedId);
        } catch (err) {
            this.setState({
                error: "시즌 정보를 찾을 수 없습니다."
            })
        } finally {
            this.setState({
                loading: false,
                seasonList: result.data.seasons
            })
        }
    };

    render() {
        const { seasonList, loading, error } = this.state;
        return (
            <DetailSeasonsPresenter seasonList={seasonList} loading={loading} error={error}></DetailSeasonsPresenter>
        );
    }
};

export default DetailSeasons;