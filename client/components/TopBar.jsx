import React                from 'react';
import classNames           from 'classnames';
import { connect }          from 'react-redux';
import { beginPageChange }  from '../actions';

class TopBar extends React.Component {
    render() {
        let classes = classNames('top-bar');
        let buttonClass = classNames('nice-button');
        let labelClass = classNames('label');

        let prevDisabled = (!this.props.readyToChangePrev);
        let nextDisabled = (!this.props.readyToChangeNext);

        return (
            <div className={classes}>
                <button 
                    className={buttonClass} 
                    onClick={() => this.props.onPageClick(false)}
                    disabled={prevDisabled}
                > 
                    Previous 
                </button>
                <span className={labelClass}> {this.props.currentPage}/3 </span>
                <button 
                    className={buttonClass} 
                    onClick={() => this.props.onPageClick(true)}
                    disabled={nextDisabled}
                > 
                    Next 
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPage: state.currentPage,
        readyToChangePrev: state.readyToChangePrev,
        readyToChangeNext: state.readyToChangeNext
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onPageClick: (direction) => {
            dispatch(beginPageChange(direction));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);