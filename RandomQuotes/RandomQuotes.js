'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <div  id="quote-box">Neal Homan
        <div id="text">
        Quote Text
        </div>
    </div>;
  }
}
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
  
class DisplayText extends React.Component {
    constructor(props) {
        super(props);
        
      }
    
      render() {
        return (
            
        )
    }
}
const quoteBox = document.querySelector("#quote-box")
//root.render(e(DisplayText));


