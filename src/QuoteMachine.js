import React, { Component } from 'react';
import QuoteBox from './QuoteBoxComponent';
import he from "he";

class QuoteMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            quoteIsLoaded: false,
            currentQuote: null,
            currentAuthor: null,
        };
        this.fetchQuote=this.fetchQuote.bind(this);
    }
    fetchQuote() {
        // NOTE: Fixed: 1) had to install the chrome allow cross origin plugin, 2) had to fetch with the {cache: "reload"} parameter
        const quoteApiUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
        fetch(quoteApiUrl, {cache: "reload"})
            .then(res => res.json())
            .then(
                result => {
                    result = result.shift();
                    let rawQuote = result.content.replace(/<(?:.|\n)*?>/gm, '').trim();
                    let quote = he.decode(rawQuote);
                    let rawAuthor = result.title;
                    let author = he.decode(rawAuthor);
                    this.setState({
                        quoteIsLoaded: true,
                        currentAuthor: author,
                        currentQuote: quote,
                    });
                },
                (error) => {
                    this.setState({
                        quoteIsLoaded: true,
                        error
                    });
                }
            )
    }
    componentDidMount() {
        this.fetchQuote()
    }
    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>
        } else if (!this.state.quoteIsLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="quote-machine">
                    <header className="header">
                        <h1 className="title">Quotes On Design</h1>
                    </header>
                    <main>
                        <QuoteBox
                            quote={this.state.currentQuote}
                            author={this.state.currentAuthor}
                            getQuote={this.fetchQuote}
                        />
                    </main>
                </div>
            );
        }

    }
}

export default QuoteMachine;
