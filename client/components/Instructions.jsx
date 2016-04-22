import React        from 'react';
import classNames   from 'classnames';

export default class Instructions extends React.Component {
    render() {
        return (
            <div>
                {(this.props.show === true)
                    ? this.renderContent()
                    : null
                }
            </div>
        );
    }

    renderContent() {
        let popupClass = classNames('info-popup');
        let popupContentClass = classNames('popup-content');
        let buttonClass = classNames('nice-button');

        return (
            <div className={popupClass}>
                <div className={popupContentClass}>
                    <h1> Instructions </h1>
                    <ol>
                        <li> Enter email (optional - only for reward qualification) </li>
                        <li> Press "Begin" to start the survey </li>
                        <li> Use the "Next" and "Previous" buttons at the top of the page to navigate between designs </li>
                        <li> After viewing all three designs, use the "Vote" button at the bottom of the page to vote
                            for your favorite design </li>
                        <li> Continue viewing & voting or close the page to end the survey (minimum 10 votes to
                        qualify for reward) </li>
                    </ol>
                    <p> Please note: Only Bard students (emails ending in @bard.edu) are eligible for the $50 Amazon
                        gift card. A minimum of 10 votes must be cast to enter the draw. The winner will be chosen
                        at random and announced upon conclusion of the study. </p>
                    <p> Additional information is available in the consent form. Any further questions can be directed
                        to Eli Mensch (em9337@bard.edu). </p>
                    <button className={buttonClass} onClick={this.props.onClick}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}