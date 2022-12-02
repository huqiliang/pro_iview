const pro = {
  isFn: true,
  acceptStatement: true,
  inserted(el, binding, vnode) {
    const { value, expression } = binding;
    // const { context } = vnode;
    // const input = el.getElementsByTagName("input");
    console.log(vnode, expression);
    // input.forEach(element => {
    //   console.log(element);
    //   element.value = value.value;
    //   element.oninput = e => {
    //     // console.log(value.input);
    //     const value2 = e.target.value;
    //     context[expression] = value2;
    //     value.input(value2);
    //   };
    // });
    el.value = value.value;
    console.log(vnode.parent);
    // vnode.elm.dispatchEvent(new CustomEvent("input"));
    vnode.parent.elm.oninput = e => {
      const value2 = e.target.value;
      console.log("value2", value);
      vnode.parent.componentInstance.$emit("input", value2);
    };
    // vnode.data.on = {
    //   input: e => {
    //     console.log(e);
    //     // console.log(value.input);
    //     const value2 = e.target.value;
    //     context[expression] = value2;
    //     value.input(value2);
    //   }
    // };
  }
};
export default pro;
