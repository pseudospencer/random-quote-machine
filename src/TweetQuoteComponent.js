import React from 'react';

function TweetQuote(props) {
    return (
        <a
            id="tweet-quote"
            className={props.classes + " button"}
            href={"https://www.twitter.com/intent/tweet?text=" + encodeURIComponent(props.quote)}
            target="_blank"
        >Tweet quote</a>
    );
}

export default TweetQuote;
