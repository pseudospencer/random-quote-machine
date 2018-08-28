import React from 'react';

function NewQuote(props) {
    return (
        <button id="new-quote"
                onClick={props.getQuote}
                className="new-quote-button button"
        >New Quote</button>
    );
}

export default NewQuote;
