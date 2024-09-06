'use strict';
const getQuote = document.getElementById("new-quote");
const e = React.createElement;

function newQuote(){

}

class DisplayText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <div  id="quote-box">Neal Homan
                <div id="text">
                    Quote Text
                </div>
                <button id="search-button" >New Quote</button>
                <div id="author">
                    by Author
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

getQuote.addEventListener("click", newQuote);
