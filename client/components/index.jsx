import React        from 'react';
import classNames   from 'classnames';

import TopBar           from './TopBar';
import ContentWrapper   from './ContentWrapper';
import VoteButtonFooter from './VoteButtonFooter';

export default class MainView extends React.Component {
    render() {
        let classes = classNames('main');

        return (
            <div className={classes}>
                <TopBar />
                <ContentWrapper />
                <VoteButtonFooter />
            </div>
        );
    }
}