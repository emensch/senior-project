import React                from 'react';
import classNames           from 'classnames';
import { connect }          from 'react-redux';

class ErrorPopup extends React.Component {
    render() {
        let classes = classNames('error-popup', { show: this.props.show });

        return (
            <div className={classes} >
                An unexpected error has occurred. Try again or refresh the page.
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        show: state.errorPopup
    }
}

export default connect(mapStateToProps)(ErrorPopup);