'use strict';
//const getQuote = document.getElementById("new-quote");

const quotes = [
    {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
    },
    {
        quote: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
        author: "Steve Jobs"
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        quote: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
        author: "Oprah Winfrey"
    },
    {
        quote: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
        author: "James Cameron"
    },
    {
        quote: "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.",
        author: "John Lennon"
    },
]
const e = React.createElement;

function pickQuote(){
    const randNum = Math.floor(Math.random() * 6);
    console.log(randNum);
    return quotes[randNum];
}

class DisplayText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quote: quotes[0].quote,
        author: quotes[0].author
     };
     this.getQuote = this.getQuote.bind(this);

  }
  getQuote(){
    const newQuote = pickQuote();
  
    this.setState({
      quote: newQuote.quote,
        author: newQuote.author
      
    });
  
}

  render() {
    return <div  id="quote-box">Daily Quote
                <div id="text">
                    {this.state.quote}
                </div>
                <button id="search-button" onClick={this.getQuote}>New Quote</button>
                <div id="author">
                    - {this.state.author}
                </div>
            </div>;
  }
}
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(DisplayText));
  
/*class DisplayText extends React.Component {
    constructor(props) {
        super(props);
        
      }
    
      render() {
        return (
            
        )
    }
}
const quoteBox = document.querySelector("#quote-box")*/
//root.render(e(DisplayText));

