import React, { Component } from 'react';
import QuoteText from './QuoteTextComponent';
import QuoteAuthor from './QuoteAuthorComponent';
import TweetQuote from './TweetQuoteComponent';

class QuoteCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: false,
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    handleMouseOver() {
        this.setState({
            isHovering: true,
        });
    }
    handleMouseLeave() {
        this.setState({
            isHovering: false,
        });
    }
    render () {
        const modifier = this.state.isHovering == true ? "dark" : "light";
        return (
            <div className="quote-card"
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                >
                <QuoteText
                    className={"history-quote-" + modifier}
                    quote={this.props.quote}
                />
                <QuoteAuthor
                    className={"history-author-" + modifier}
                    author={this.props.author}
                />
                <div className="vertical-spacer"></div>
                <div className="button-row-container">
                    <TweetQuote
                        classes={"tweet-quote-button-" + modifier}
                        quote={this.props.quote}
                        author={this.props.author}
                    />
                </div>
            </div>
        );
    }

}

export default QuoteCard;
