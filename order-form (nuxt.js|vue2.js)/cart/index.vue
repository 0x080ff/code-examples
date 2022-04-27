<template>
  <v-container>
    <v-row v-if="!goods.length">
      <v-col cols="12">
        <v-breadcrumbs
          :items="breadcrumbs"
          class="pl-0 pb-8 pt-1"
        ></v-breadcrumbs>
        <span
          class="header font-weight-light text-uppercase grey--text text--darken-2"
          >Корзина</span
        >
      </v-col>

      <v-col cols="12">
        <span class="">В корзине ничего нет...</span>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-breadcrumbs
          :items="breadcrumbs"
          class="pl-0 pb-8 pt-1"
        ></v-breadcrumbs>
        <span
          class="header font-weight-light text-uppercase grey--text text--darken-2"
          >Корзина</span
        >
      </v-col>
      <v-col cols="12" md="8">
        <Product
          v-for="product in goods"
          :key="product.id"
          :product="product"
          ref="products"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            Итого:
          </v-card-title>
          <v-card-text>
            <span class="text-h6"
              >{{ goodsCount }} {{ declOfNum }} на сумму
              {{ totalPrice }} ₽</span
            ><br /><br />
            <span>Все скидки будут расчитаны в момент оплаты заказа</span>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mt-6 mx-2 mb-2" color="primary" @click="createOrder"
              >Оформить заказ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/ProductOrder'

const titles = ['товар', 'товара', 'товаров']

export default {
  components: {
    Product
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Главная',
          to: '/'
        },
        {
          text: 'Каталог',
          to: '/catalog'
        }
      ]
    }
  },

  mounted() {
    this.$store.dispatch('cart/getGoods')
  },

  computed: {
    goods() {
      return this.$store.state.cart.items
    },

    goodsCount() {
      return this.goods.length
    },

    declOfNum() {
      const number = this.goodsCount
      const cases = [2, 0, 1, 1, 1, 2]
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    },

    totalPrice() {
      return this.$store.state.cart.totalPrice.toFixed(2)
    }
  },

  methods: {
    async createOrder() {
      const valid = this.$refs.products.every(p => p.$v.$invalid === false)
      if (valid) {
        this.$router.push('/cart/order')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 1.6rem !important;
}
</style>
