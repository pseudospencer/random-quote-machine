import React from 'react';
import QuoteText from './QuoteTextComponent';
import QuoteAuthor from './QuoteAuthorComponent';
import NewQuote from './NewQuoteComponent';
import TweetQuote from './TweetQuoteComponent';

// Presentational component. Used for Current Quote in the hero

function QuoteBox(props) {
    return (
        <div id="quote-box">
            <QuoteText className="current-quote" quote={props.quote}/>
            <QuoteAuthor className="current-author" author={props.author}/>
            <div className="button-row-container">
                <TweetQuote
                    classes="tweet-quote-button dark"
                    quote={props.quote}
                    author={props.author}
                />
                <NewQuote getQuote={props.getQuote}/>
            </div>
        </div>
    );
}

export default QuoteBox;
