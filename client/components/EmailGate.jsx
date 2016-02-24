import React            from 'react';
import classNames       from 'classnames';
import { connect }      from 'react-redux';
import { submitEmail }  from '../actions';

class EmailGate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {email: '', submitted: false};
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.email);
    }

    handleChange(e) {
        this.setState({email: e.target.value});
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
        let classes = classNames('email-form');
        let buttonClass = classNames('nice-button');

        return (
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
            dispatch(submitEmail(email));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailGate);