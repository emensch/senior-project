import React        from 'react';
import classNames   from 'classnames';
import { connect }  from 'react-redux';

class VoteButtonFooter extends React.Component {
    render() {
        let classes = classNames('vote-footer');
        let buttonClass = classNames('nice-button')

        return (
            <div className={classes}>
                <button 
                    className={buttonClass} 
                    disabled={!this.props.btnEnabled}
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

export default connect(mapStateToProps)(VoteButtonFooter);