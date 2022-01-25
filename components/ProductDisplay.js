app.component('product-display',{
    props: {
      premium: {
          type: Boolean,
          required: true
      }
    },
    template:
    `<div>
        <button
                class="button"
                :class="{ disabledButton: !inStock }"
                :disabled="!inStock"
                v-on:click="addToCart"
                >Add to Cart</button>
        <button
         class="button" 
        v-on:click="delToCart"
        >Del to Cart</button>
        
    </div>
<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <a :href="url"><img :src="image" alt=""></a>

            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>

                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>

                <p v-show="onSale" style="background-color: orange"> {{ title }} is on Sale</p>

                <p>{{description}}</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                    <li v-for="size in sizes" class="sizes" >Sizes {{ size }}</li>

                    <li v-for="(variant, index) in variants"
                        :key="variant.id"
                        @mouseover="updateVariant(index)"
                        class="color-circle"
                        :style="{ backgroundColor: variant.color }">{{ variant.color }}</li>
                </ul>
            </div>
            
        </div>
            
        <review-form @review-submitted="addReview"></review-form>
            <review-list :reviews="reviews"></review-list>

    </div>`,
    data() {
        return {

            product: 'Gelik',
            brand: 'Mercedes',
            description: 'This is the best socks ever in the world',

            url: 'https://clipart-best.com/img/mercedes/mercedes-clip-art-15.png',
            inventory: 12,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester' ],
            sizes: ['29', '30', '32', '34', '36'],
            selectedVariant: 0,
            variants:[
                {id:2021, color:'black', image: './images/m1.png', quantity:50 },
                {id:2022, color:'red', image: './images/m2.png', quantity: 0}
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        delToCart() {
            this.$emit('del-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index){
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        onSale() {
            return this.brand + ' ' + this.product
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
                return 2.99
             }
    }

})