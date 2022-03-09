let app = Vue.createApp({
  data() {
    return {
      showSidebar: false,
      inventory: {
        carrots: 0,
        pineapples: 0,
        cherries: 0,
      },
      cart: {
        carrots: 0,
        pineapples: 0,
        cherries: 0,
      },
    };
  },
  methods: {
    showInvAndCart() {
      console.log("inventory: ", this.inventory);
      console.log("cart: ", this.cart);
    },
    addToCart(type, quantity) {
      console.log("quantity", quantity);
      this.cart[type] += quantity;
      console.log("carrots:", this.cart.carrots);
    },
    addToCart2(type) {
      console.log("this.inventory[cherries]", this.inventory[type]);
      this.cart[type] += this.inventory[type];
      console.log("cherries: ", this.cart.cherries);
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
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
