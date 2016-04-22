import React            from 'react';
import classNames       from 'classnames';
import ConsentForm      from './ConsentForm'
import { connect }      from 'react-redux';
import { sendFormData } from '../actions';

class EmailGate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConsent = this.toggleConsent.bind(this);
        this.state = {email: '', submitted: false, showConsent: false};
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.email);
    }

    handleChange(e) {
        this.setState({email: e.target.value});
    }

    toggleConsent(e) {
        e.preventDefault();
        //this.setState({ showConsent: true });
        this.setState((prev) => {
            return {showConsent: !prev.showConsent};
        })
    }

    render() {
        return (
            <div {...this.props}>
                {(this.props.submitted === true)
                    ? this.props.children
                    : this.renderForm()
                }
            </div>
        );
    }

    renderForm() {
        let containerClass = classNames('email-form-container');
        let classes = classNames('email-form');
        let buttonClass = classNames('nice-button');
        let showConsentClass = classNames('show-consent');

        return (
            <div>
                <div className={containerClass}>
                    <div className={classes}>
                        <form onSubmit={this.handleSubmit}>
                            <label> Email (optional): </label>
                            <input
                                type='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <button className={buttonClass}>
                                Submit
                            </button>
                        </form>
                        <button className={showConsentClass} onClick={this.toggleConsent}>
                            Consent Information
                        </button>
                    </div>
                </div>
                <ConsentForm show={this.state.showConsent} onClick={this.toggleConsent}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        submitted: state.submitted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFormSubmit: (email) => {
            dispatch(sendFormData(email));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailGate);