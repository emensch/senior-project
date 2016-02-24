import React        from 'react';
import classNames   from 'classnames';

export default class EmailGate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {email: '', submitted: false};
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
    }

    handleChange(e) {
        this.setState({email: e.target.value});
    }

    render() {
        return (
            <div {...this.props}>
                {(this.state.submitted === true)
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