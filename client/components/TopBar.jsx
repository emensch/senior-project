import React        from 'react';
import classNames   from 'classnames';

export default class VoteButtonFooter extends React.Component {
    render() {
        let classes = classNames('top-bar');
        let buttonClass = classNames('nice-button');
        let labelClass = classNames('label');

        return (
            <div className={classes}>
                <button className={buttonClass}> Previous </button>
                <span className={labelClass}> 1/3 </span>
                <button className={buttonClass}> Next </button>
            </div>
        );
    }
}