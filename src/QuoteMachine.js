import React, { Component } from 'react';
import QuoteBox from './QuoteBoxComponent';
import QuoteCard from './QuoteCardComponent';
import Footer from './FooterComponent';
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
            return (
                <div className="quote-machine">
                    <main>
                        <section id="hero">
                            <div className="hero-container">
                                <h1 className="title">Quotes On Design</h1>
                                <div className="current-quote">Failed to fetch pithy quote... Are you connected to the internet?</div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            )
        } else if (this.state.quoteIsLoaded == false) {
            return (
                <div className="quote-machine">
                    <main>
                        <section id="hero">
                            <div className="hero-container">
                                <h1 className="title">Quotes On Design</h1>
                                <div className="current-quote">Fetching pithy quote...</div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            )
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
                        { reverseHistory.length > 0 &&
                            <section id="history">
                            <div className="history-container">
                                {historyQuotes}
                            </div>
                        </section>
                        }
                    </main>
                    <Footer />
                </div>
            );
        }

    }
}

export default QuoteMachine;
