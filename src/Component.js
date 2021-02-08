import {createDOM} from './react-dom';

export const updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set()
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
    this.cbs = [];
  }

  addState(partialState, cb) {
    this.pendingStates.push(partialState);
    if(typeof cb === 'function') {
      this.cbs.push(cb);
    }
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateClassComponent(); // 更新组件
    }
  }

  updateClassComponent() {
    const {classInstance, pendingStates, cbs} = this;
    if (pendingStates.length > 0) {
      classInstance.state = this.getState();
      classInstance.forceUpdate();
      cbs.forEach(cb=>cb());
    }
  }

  getState() {
    const {classInstance, pendingStates} = this;
    let {state} = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === 'function') { // state 有可能是个函数
        nextState = nextState.call(classInstance, state);
      }
      state = {...state, ...nextState};
    });
    pendingStates.length = 0;
    return state;
  }
}


class Component {
  static isReactComponent = true;

  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  setState(partialState, cb) {
    this.updater.addState(partialState, cb);
  }
  forceUpdate() {
    const newVdom = this.render();
    updateClassComponent(this,newVdom);
  }
  render() {
    throw new Error('此方法为抽象方法，需要子类实现');
  }
}

function updateClassComponent(classInstance, newVdom) {
  let oldDOM = classInstance.dom;
  const newDOM = createDOM(newVdom);
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  classInstance.dom = newDOM;
}

export default Component;