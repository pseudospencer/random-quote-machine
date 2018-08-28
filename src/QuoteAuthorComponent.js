import React from 'react';

// Presentational component.

function QuoteAuthor(props) {
    return (
        <div id="author">
            <h3>– {props.author}</h3>
        </div>
    );
}

export default QuoteAuthor;
