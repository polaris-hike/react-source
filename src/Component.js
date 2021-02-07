import {createDOM} from './react-dom';

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {}
  }
  setState(partialState) {
    const state = this.state;
    this.state = {...state,...partialState};
    const newVdom = this.render();
    updateClassComponent(this,newVdom);
  }
  render() {
    throw new Error('此方法为抽象方法，需要子类实现');
  }
}

function updateClassComponent(classInstance,newVdom) {
  let oldDOM = classInstance.dom;
  const newDOM = createDOM(newVdom);
  oldDOM.parentNode.replaceChild(newDOM,oldDOM);
  classInstance.dom = newDOM;
}

export default Component