import React            from 'react';
import classNames       from 'classnames';
import ConsentForm      from './ConsentForm';
import Instructions     from './Instructions';
import { connect }      from 'react-redux';
import { sendFormData } from '../actions';

class EmailGate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConsent = this.toggleConsent.bind(this);
        this.toggleInstructions = this.toggleInstructions.bind(this);
        this.state = {email: '', submitted: false, showConsent: false, showInstructions: false};
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.email);
        this.setState(() => {
            return {showConsent: false, showInstructions: false};
        })
    }

    handleChange(e) {
        this.setState({email: e.target.value});
    }

    toggleConsent(e) {
        e.preventDefault();
        this.setState((prev) => {
            return {showConsent: !prev.showConsent, showInstructions: false};
        })
    }

    toggleInstructions(e) {
        e.preventDefault();
        this.setState((prev) => {
            return {showInstructions: !prev.showInstructions, showConsent: false}
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
        let secondaryButtonClass = classNames('secondary-button');

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
                                Begin
                            </button>
                        </form>
                        <button className={secondaryButtonClass} onClick={this.toggleInstructions}>
                            Instructions
                        </button>
                        <button className={secondaryButtonClass} onClick={this.toggleConsent}>
                            Consent Information
                        </button>
                    </div>
                </div>
                <Instructions show={this.state.showInstructions} onClick={this.toggleInstructions}/>
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