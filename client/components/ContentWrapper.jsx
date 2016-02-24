import React        from 'react';
import classNames   from 'classnames';

export default class ContentWrapper extends React.Component {
    render() {
        let classes = classNames('content-wrapper');

        return (
            <div className={classes}>

            </div>
        );
    }
}