import React from "react";
import "./Product.css";

const products = [
  {
    name: "ice-cream",
    price: 5,
  },
  {
    name: "donuts",
    price: 10,
  },
  {
    name: "juice",
    price: 20,
  },
];
/**
 * state is an object.
 * state is a special property that controls the rendering of the page.
 * when you change the state , react knows component is out of date and will automatically rerender
 * when a component rerenders, it modifies the rendered output to include up to date information in state.
 * component will rerender when you add a product to the cart and remove it from the cart
 * we can add other properties to react class but they wont have the same ability to trigger re-rendering. - like class variables
 * state property is a standard class property, which means that it is accessible in other methods, not just the render method
 *
 */
class Product extends React.Component {
  /**
   * add a property called state to the class then add two values to the state object: cart and total
   * cart will be an array since it may eventually hold many items
   * total will be a number
   * after assigning, change the references to the values.
   * to reference javascript inside of jsx, need to wrap it in curly braces.
   */
//   state = {
//     cart: [],
//     total: 0,
//   };
state = {
    cart: [],
}
  /**
   *
   * @returns instead of dispalying price as static value, convert it to string using tolocalestring method
   * converts number to string which matches browsers region
   * replace reference to state with method call
   */
  /**
   * set the properties in state only when they are expected to change
   */
  currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  // this in arrow function refers to the object it is defind in
  getTotal = () => {

    //uses the cart
    // reduce function initially takes total cost as 0 then adds item(object of cart array) value to it.
    const total = this.state.cart.reduce((totalCost, item) => totalCost + item.price, 0);
    return total.toLocaleString(undefined, this.currencyOptions);
  };

  add = (product) => {
    // set state either can take object or function as the first argument
    // it si best to pass object with new values since it is easier to read
    // if you need to reference the current state, you pass a function to avoid any references to out of date state
    // setting the state using static value like passing object with values or with current state value

    // this.setState({
    //   cart: ["ice-cream"],
    //   total: 5,
    // });

    // instead of passing an object to setState(), pass the function that takes state as an argument and return object 
    // with updated cart 
    // this.setState(state => ({
    //     cart: [...state.cart, product.name],
    //     total:state.total + product.price
    // }))
    // to make it anonymous function wrap it in () and its call is also called via () = > this.varname()
    this.setState(state => ({
        cart: [...state.cart, product],
    }))
  };

  remove = (product) => {
    // if only want to update some properties then pass those properties only, remaining propereties will remains same.
    // this.setState({
    //   cart: [],
    // });

    // convert setState to take function, update the values without mutating and update the onchange() prop
    // splice method add or removes array elements
    // splice() overwrite the original array
    // this.setState(state => {
    //     const cart = [...state.cart];
    //     console.log(state.cart)
    //     // remove element from this index
    //     cart.splice(cart.indexOf(product.name))
    //     console.log(cart)
    //     return (
    //         {
    //             cart,
    //             total:state.total - product.price
    //         }
    //     )
    // })

    //removes the whole object from cart array
    this.setState(state => {
        const cart = [...state.cart];
        const productIndex = cart.findIndex(p=> p.name === product.name);
        if(productIndex<0){
            return;
        }
        // removes one element from the specified index
        cart.splice(productIndex, 1)

        return({
            cart
        })
    })
  };
  render() {
    return (
      <div className="wrapper">
        <div>ShoppingCart: {this.state.cart.length} total Items.</div>
        <div>total: {this.getTotal()}</div>
        <div>
          {products.map((product) => (
            <div key={product.name}>
              <div className="product">
                <span role="img" aria-label={product.name}>
                  {product.name}
                </span>
              </div>
              {/* <button onClick={this.add}>Add</button> */}
              <button onClick={() => this.add(product)}>Add</button>

              {/* <button onClick={this.remove}>Remove</button> */}
              <button onClick={() => this.remove(product)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Product;
