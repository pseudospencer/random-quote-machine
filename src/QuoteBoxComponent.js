import React from 'react';
import QuoteText from './QuoteTextComponent';
import QuoteAuthor from './QuoteAuthorComponent';
import NewQuote from './NewQuoteComponent';
import TweetQuote from './TweetQuoteComponent';

// Presentational component.

function QuoteBox(props) {
    return (
        <div id="quote-box">
            <QuoteText quote={props.quote}/>
            <QuoteAuthor author={props.author}/>
            <NewQuote getQuote={props.getQuote}/>
            <TweetQuote quote={props.quote}/>
        </div>
    );
}

export default QuoteBox;
