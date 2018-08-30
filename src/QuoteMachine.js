import React, { Component } from 'react';
import QuoteBox from './QuoteBoxComponent';
import QuoteCard from './QuoteCardComponent';
import he from "he";

class QuoteMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            quoteIsLoaded: false,
            currentQuote: null,
            currentAuthor: null,
            history: [],
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
                    const rawQuote = result.content.replace(/<(?:.|\n)*?>/gm, '').trim();
                    const quote = he.decode(rawQuote);
                    const rawAuthor = result.title;
                    const author = he.decode(rawAuthor);

                    if (this.state.currentQuote && this.state.currentAuthor) {
                        const oldQuote = this.state.currentQuote;
                        const oldAuthor = this.state.currentAuthor;
                        const history = this.state.history;
                        this.setState({
                            quoteIsLoaded: true,
                            currentAuthor: author,
                            currentQuote: quote,
                            history: [...history, {
                                quote: oldQuote,
                                author: oldAuthor,
                            }],
                        });
                    } else {
                        this.setState({
                            quoteIsLoaded: true,
                            currentAuthor: author,
                            currentQuote: quote,
                        });
                    }

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
            
            const reverseHistory = this.state.history.slice().reverse();
            const historyQuotes = reverseHistory.map( item => {
                return(
                    <QuoteCard
                        key={item}
                        quote={item.quote}
                        author={item.author}
                    />
                )
            });

            return (
                <div className="quote-machine">
                    <main>
                        <section id="hero">
                            <div className="hero-container">
                                <h1 className="title">Quotes On Design</h1>
                                <QuoteBox
                                    quote={this.state.currentQuote}
                                    author={this.state.currentAuthor}
                                    getQuote={this.fetchQuote}
                                />
                            </div>
                        </section>
                        <section id="history">
                            <div className="history-container">
                                {historyQuotes}
                            </div>
                        </section>
                    </main>
                    <footer id="footer">
                        <div className="footer-container">
                            <div className="footer-row-container">
                                <p>Designed and built by Spencer James in 2018.</p>
                            </div>
                            <div className="footer-row-container">
                                <p><a href="https://github.com/pseudospencer" target="_blank">GitHub</a>
                                <a href="https://spencerleejames.com" target="_blank">UX Portfolio</a>
                                <a href="https://www.linkedin.com/in/spencerleejames/" target="_blank">LinkedIn</a></p>
                            </div>
                        </div>
                    </footer>
                </div>
            );
        }

    }
}

export default QuoteMachine;
