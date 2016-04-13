import React            from 'react';
import classNames       from 'classnames';
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
        let popupClass = classNames('consent-popup', {show: this.state.showConsent});
        let popupContentClass = classNames('popup-content');

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
                <div className={popupClass}>
                    <div className={popupContentClass}>
                        <h1>Consent Form</h1>
                        <p> You are being asked to take part in an online experiment intended to determine the efficacy
                            of genetic algorithms when applied to the design of a webpage. In essence, is it possible to
                            programmatically “evolve” a webpage to fit the preferences of its visitors? </p>
                        <p> Research is being conducted by Elijah Mensch, a senior in the Computer Science department. </p>
                        <h2> Purpose of the study </h2>
                        <p> This study investigates the application of genetic algorithms to webpage design. The
                            algorithm attempts to create progressively better designs by repeatedly combining elements
                            of the current best designs, judged by user voting. Upon conclusion, the final designs will
                            be compared with the initial designs to determine if overall quality increased over the
                            course of the study. </p>
                        <h2> Why you have been invited to participate </h2>
                        <p> Y​ou have been invited to participate in this study in the interest of furthering knowledge
                            of computer science and the field of machine learning. Your votes are important for the
                            function of the underlying algorithm; the quality of a design is judged by the votes it
                            accrues. </p>
                        <h2> What will be asked of you </h2>
                        <p> If you agree to participate in this study, you will be given the option to submit an email
                            address as an identifier. This is strictly optional, and only necessary if you wish to be
                            eligible for the random reward draw. Your email will remain confidential and no additional
                            data concerning your usage will be recorded. You will then be presented with a series of
                            three webpage designs and asked to vote on a favorite. Use the “Previous” and “Next” buttons
                            to navigate between designs. Once all three designs have been viewed, the “Vote” button will
                            enable, allowing the submission of a vote for the currently selected page. At the point a
                            vote is cast, you are considered to have completed the study. If you wish, you may continue
                            to vote; new pages are generated and displayed each time a vote is cast. At minimum, the
                            survey is expected to take no more than one minute. </p>
                        <h2> Risks and benefits: </h2>
                        <p> There are no risks associated with taking this study beyond those arising from normal computer
                            usage. There are no flashing lights or rapidly changing colors present on the site at any time.
                            However, the website contains static content pulled from past news. Though care has been taken
                            to avoid objectionable content, this cannot be guaranteed. There are no benefits other than
                            the satisfaction of contributing to the field of computer science. </p>
                        <h2> Reward ​</h2>
                        <p> If you decide to submit an email address, you will be automatically entered in a random
                            prize draw for a $50 Amazon Gift Card. Submitting a single vote is the only other
                            requirement for eligibility; further votes do not increase your chances of winning. </p>
                        <h2> Confidentiality </h2>
                        <p> All collected data is confidential. N​o information specific to you beyond an optional email
                            address is collected. If you choose to submit an email, your data will be sent over a secure
                            HTTPS connection to a secure server. Email information will only be accessed upon conclusion
                            of the study to randomly select a prize winner. Once this is done, all data will be
                            completely purged. </p>
                        <h2> Further Questions </h2>
                        <p>​ Please direct any further questions you have to Elijah Mensch (primary researcher),
                            reachable at e​m9337@bard.edu.​ If you have questions concerning your rights as a research
                            participant, you are free to contact the chair of the Institutional Review Board: Pavlina
                            Tcherneva (tchernev@bard.edu). </p>
                        <p> Upon conclusion, this project will be made permanently and publicly available in the Bard
                            College library. </p>
                        <p> By continuing with this survey, I affirm my consent to participate and I acknowledge that I
                            am 18 years of age or older. </p>

                        <button className={buttonClass} onClick={this.toggleConsent}>
                            I Agree
                        </button>
                    </div>
                </div>
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