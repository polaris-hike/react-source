function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }
  const {type,props} = vdom;
  const dom = document.createElement(type);

  updateProps(dom,props)

  if(props.children) {
    if(typeof props.children === 'string' || typeof props.children === 'number') {
      dom.textContent = props.children
    }else if(typeof props.children === 'object' && props.children.type) {
      render(props.children,dom)
    }else if(Array.isArray(props.children)) {
      reconcileChildren(props.children,dom)
    }else {
      document.textContent = props.children ? props.children.toString() : ""
    }


    /*if(Array.isArray(props.children)) {
      props.children.forEach(child=>{
        dom.appendChild(createDOM(child))
      })
    }else {
      dom.textContent = props.children
    }*/

  }
  vdom.dom = dom;
  return dom

}

function reconcileChildren(children,dom) {
  children.forEach(child=>{
    render(child,dom)
  })
}

function updateProps(dom,props) {
  for(let key in props) {
    if(key === 'children') continue
    if(key === 'className') {
      dom[key] = props[key]

    }
    if(key === 'style') {
      const styleObj = props.style;
      console.log(styleObj);
      for(let attr in styleObj) {
        dom.style[attr] = styleObj[attr]
      }
    }
  }
}

const ReactDOM = {render};


export default ReactDOM;