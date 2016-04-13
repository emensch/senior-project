import React        from 'react';
import classNames   from 'classnames';

import EmailGate        from './EmailGate';
import TopBar           from './TopBar';
import ContentWrapper   from './ContentWrapper';
import VoteButtonFooter from './VoteButtonFooter';
import ErrorPopup       from './ErrorPopup';

export default class MainView extends React.Component {
    render() {
        let classes = classNames('main');

        return (
            <div>
                <ErrorPopup />
                <EmailGate className={classes}>
                    <TopBar />
                    <ContentWrapper />
                    <VoteButtonFooter />
                </EmailGate>
            </div>
        );
    }
}