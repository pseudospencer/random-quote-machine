import React from 'react';

function NewQuote(props) {
    return (
        <button id="new-quote" onClick={props.getQuote}>New Quote</button>
    );
}

export default NewQuote;
