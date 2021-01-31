import React from './react';
import ReactDOM from './react-dom';
import './index.css';

// const element = <div className="title" style={{color: 'red'}}><span>hello</span> world</div>;
// console.log(JSON.stringify(element,null,2));

const element1 = React.createElement('div', {
  'className': 'title',
  'style':{
    'color':'red'
  }},
  React.createElement('span',null,'hello'),'world'
  );
/*
{"type":"div",
  "props":{
    "className":"title",
    "style":{"color":"red"},
    "children":"hello world"
  }
}
* */

ReactDOM.render(
  element1,
  document.getElementById('root')
);

