import React        from 'react';
import classNames   from 'classnames';
import { connect }  from 'react-redux';

class ContentWrapper extends React.Component {
    render() {
        let classes = classNames('content-wrapper');

        return (
            <div className={classes} dangerouslySetInnerHTML={this.renderMarkup()} />
        );
    }

    renderMarkup() {
        return {__html: this.props.html[this.props.currentPage - 1]};
    }
}

function mapStateToProps(state) {
    return {
        html: state.html,
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps)(ContentWrapper);