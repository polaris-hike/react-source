import React from './react';
import ReactDOM from './react-dom';
import './index.css';

// const element = <div className="title" style={{color: 'red'}}><span>hello</span> world</div>;
// console.log(JSON.stringify(element,null,2));

/*const element1 = React.createElement('div', {
  'className': 'title',
  'style':{
    'color':'red'
  }},
  React.createElement('span',null,'hello'),'world'
  );*/


/*function FunctionComponent(props) {
  return (
    <div className="title" style={{backgroundColor:'green',color:'red'}}>
      <span style={{color:'red'}}>{props.name}</span>
      {props.children}
    </div>
  )
}*/

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        number: this.state.number + 1
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        {this.state.number}
        <button class="title" onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter name="wxw">
    <span>world</span>
  </Counter>,
  document.getElementById('root')
);