let app = Vue.createApp({
  data() {
    return {
      showSidebar: false,
      inventory: [],
      cart: {},
    };
  },
  methods: {
    showInvAndCart() {
      console.log("inventory: ", this.inventory);
      console.log("cart: ", this.cart);
    },
    addToCart(name, index) {
      this.cart[name]
        ? (this.cart[name] += this.inventory[index].quantity)
        : (this.cart[name] = this.inventory[index].quantity);
      console.log(
        "this.inventory[index].quantity;:",
        this.inventory[index].quantity
      );
      console.log(`this.cart[${name}]`, this.cart[name]);
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
  async mounted() {
    const response = await fetch("./food.json");
    const data = await response.json();
    this.inventory = data;
    console.log("this.inventory", this.inventory);
  },
});

app.component("sidebar", {
  props: ["toggle", "cart"],
  // computed property is used to organize expressions that'd be too long to put in {{}} and turn them into reactive functions
  computed: {
    // cartTotal: this.cart.carrots * 4.82,
    cartTotal() {
      return (this.cart.carrots * 4.82).toFixed(2);
    },
  },
  template: `
    <aside class="cart-container">
      <div class="cart">
        <h1 class="cart-title spread">
          <span>
            Cart
            <i class="icofont-cart-alt icofont-1x"></i>
          </span>
          <button class="cart-close" @click="toggle">&times;</button>
        </h1>

        <div class="cart-body">
          <table class="cart-table">
            <thead>
              <tr>
                <th><span class="sr-only">Product Image</span></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i class="icofont-carrot icofont-3x"></i></td>
                <td>Carrot</td>
                <td>$4.82</td>
                <td class="center">{{ cart.carrots }}</td>
                <td>\${{ (cart.carrots * 4.82).toFixed(2) }}.00</td>
                <td class="center">
                  <button class="btn btn-light cart-remove">
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p class="center"><em>No items in cart</em></p>
          <div class="spread">
            <span><strong>Total:</strong> \${{cartTotal}}</span>
            <button class="btn btn-light">Checkout</button>
          </div>
        </div>
      </div>
    </aside>
  `,
});
