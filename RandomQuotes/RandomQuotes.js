'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return e(
        <div id="quote-box">Neal Homan
        
        </div>
    );
  }
}
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
  
/*class DisplayText extends React.Component {
    constructor(props) {
        super(props);
        
      }
    
      render() {
        return (
            <div id="text">is working on it
            
            </div>
        )
    }
}
const quoteBox = document.querySelector("#quote-box")
root.render(e(DisplayText));*/


