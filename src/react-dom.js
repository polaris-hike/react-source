function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }
  const {type, props} = vdom;
  let dom;
  if (typeof type === 'function') {// 函数式组件
    return mountFunctionComponent(vdom);
  } else { // 原生组件
    dom = document.createElement(type);
  }

  updateProps(dom, props);

  if (props.children) {
    if (typeof props.children === 'string' || typeof props.children === 'number') {
      dom.textContent = props.children;
    } else if (typeof props.children === 'object' && props.children.type) {
      render(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    } else {
      document.textContent = props.children ? props.children.toString() : '';
    }
  }
  if (dom) {
    vdom.dom = dom;

  }
  return dom;

}

// 把一个函数式组件的 虚拟 dom 转化为一个真实 dom 并返回
function mountFunctionComponent(vdom) {
  const {type: FunctionComponent, props} = vdom;
  const renderVdom = FunctionComponent(props);
  return createDOM(renderVdom);
}

function reconcileChildren(children, dom) {
  children.forEach(child => {
    render(child, dom);
  });
}

function updateProps(dom, props) {
  for (let key in props) {
    if (key === 'children') continue;
    if (key === 'className') {
      dom[key] = props[key];

    }
    if (key === 'style') {
      const styleObj = props.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    }
  }
}

const ReactDOM = {render};


export default ReactDOM;