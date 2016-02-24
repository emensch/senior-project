import React        from 'react';
import classNames   from 'classnames';

export default class VoteButtonFooter extends React.Component {
    render() {
        let classes = classNames('vote-footer');
        let buttonClass = classNames('nice-button')

        return (
            <div className={classes}>
                <button className={buttonClass} disabled> Vote </button>
            </div>
        );
    }
}