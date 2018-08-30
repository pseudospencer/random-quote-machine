import React from 'react';

function QuoteText(props) {
    return (
        <div id="text">
            <p className={props.className}>{props.quote}</p>
        </div>
    );
}

export default QuoteText;
