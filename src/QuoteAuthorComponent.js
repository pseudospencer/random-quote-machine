import React from 'react';

// Presentational component.

function QuoteAuthor(props) {
    return (
        <div id="author">
            <p>– {props.author}</p>
        </div>
    );
}

export default QuoteAuthor;
