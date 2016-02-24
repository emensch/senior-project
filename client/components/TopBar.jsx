import React            from 'react';
import classNames       from 'classnames';
import { connect }      from 'react-redux';
import { changePage }   from '../actions';

class TopBar extends React.Component {
    render() {
        let classes = classNames('top-bar');
        let buttonClass = classNames('nice-button');
        let labelClass = classNames('label');

        let prevDisabled = (this.props.currentPage <= 1);
        let nextDisabled = (this.props.currentPage >= 3);

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
        currentPage: state.currentPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onPageClick: (direction) => {
            console.log(direction);
            dispatch(changePage(direction));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);