import React        from 'react';
import classNames   from 'classnames';
import { connect }  from 'react-redux';
import { sendVote } from '../actions';

class VoteButtonFooter extends React.Component {
    render() {
        let classes = classNames('vote-footer');
        let buttonClass = classNames('nice-button')

        return (
            <div className={classes}>
                <button 
                    className={buttonClass} 
                    disabled={!this.props.btnEnabled}
                    onClick={this.props.onVote}
                > 
                    Vote 
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        btnEnabled: state.voteEnabled
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onVote: () => {
            dispatch(sendVote());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteButtonFooter);