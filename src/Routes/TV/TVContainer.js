import React from "react";
import { tvApi } from '../../api';
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        try {
            const { data: { results: topRated }} = await tvApi.topRated();
            const { data: { results: popular }} = await tvApi.popular();
            const { data: { results: airingToday }} = await tvApi.airingToday();

            this.setState({
                topRated,
                popular,
                airingToday
            });
        } catch {
            this.setState({
                error: "영화 정보를 찾을 수 없습니다."
            });
        } finally {
            this.setState({
                loading: false
            })
        }
    };

    render() {
        const { topRated, popular, airingToday, error, loading } = this.state;
        console.log("TV상태",this.state);
        return (
            <TVPresenter topRated={topRated} popular={popular} airingToday={airingToday} error={error} loading={loading} handleSubmit={this.handleSubmit} />
        );
    }
}