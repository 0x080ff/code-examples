<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs
          :items="breadcrumbs"
          class="pl-0 pb-8 pt-1"
        ></v-breadcrumbs>
        <span
          class="header font-weight-light text-uppercase grey--text text--darken-2"
          >Оформить заказ</span
        >
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pt-7">
          <v-chip color="white" class="ml-3 mb-3">
            <v-avatar left class="primary white--text">1</v-avatar
            ><span class="subtitle-2">Данные покупателя</span></v-chip
          >
          <v-card class="sp-order-card mb-3" flat>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Имя"
                    outlined
                    v-model="$v.form.name.$model"
                    :error-messages="nameErrors"
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Телефон"
                    outlined
                    v-model="$v.form.phone.$model"
                    :error-messages="phoneErrors"
                    v-mask="'(###) ### - ####'"
                    prefix="+7"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="E-mail"
                    outlined
                    v-model="$v.form.email.$model"
                    :error-messages="emailErrors"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-chip color="white" class="ml-3 mb-3">
            <v-avatar left class="primary white--text">2</v-avatar
            ><span class="subtitle-2">Способ получения</span></v-chip
          >
          <v-card class="sp-order-card mb-3" flat>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-radio-group v-model="delivery" mandatory row>
                    <v-radio
                      label="Самовывоз"
                      :value="0"
                      :off-icon="mdiRadioboxBlank"
                      :on-icon="mdiRadioboxMarked"
                      @change="payment = 0"
                    ></v-radio>
                    <v-radio
                      label="Доставка"
                      :value="1"
                      :off-icon="mdiRadioboxBlank"
                      :on-icon="mdiRadioboxMarked"
                      @change="payment = 1"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" v-if="delivery">
                  <v-combobox
                    outlined
                    label="Адрес доставки"
                    v-model="$v.form.address.$model"
                    :error-messages="addressErrors"
                    :items="suggestionsAddress"
                    :search-input.sync="searchAddress"
                    :no-filter="true"
                    attach
                    :menu-props="{ bottom: true, offsetY: true }"
                    @input="
                      form.address.city === localCity
                        ? ((deliveryWay = 0), (payment = 0))
                        : ((deliveryWay = 1), (payment = 1))
                    "
                  ></v-combobox>
                  <v-radio-group v-model="deliveryWay" mandatory>
                    <v-card outlined class="mb-1">
                      <v-card-text>
                        <v-radio
                          label="Курьером по городу"
                          :value="0"
                          :off-icon="mdiTruckDeliveryOutline"
                          :on-icon="mdiTruckDelivery"
                          :disabled="form.address.city !== localCity"
                        >
                        </v-radio>
                      </v-card-text>
                      <v-card-text v-if="deliveryWay === 0" class="pt-0">
                        Стоимость доставки: 200 ₽
                      </v-card-text>
                    </v-card>
                    <v-card outlined class="mb-1">
                      <v-card-text>
                        <v-radio
                          label="СДЭК"
                          :value="1"
                          :off-icon="mdiTruckDeliveryOutline"
                          :on-icon="mdiTruckDelivery"
                        ></v-radio>
                        <v-btn
                          href="https://www.cdek.ru/ru/calculate"
                          target="_blank"
                          color="primary"
                          class="mt-2"
                          small
                          outlined
                          v-if="deliveryWay === 1"
                          >Рассчитать стоимость</v-btn
                        >
                      </v-card-text>
                      <v-card-text v-if="deliveryWay === 1" class="pt-0">
                        Оплата доставки при получении
                      </v-card-text>
                    </v-card>
                    <v-card outlined class="mb-1">
                      <v-card-text>
                        <v-radio
                          label="Почта России"
                          :value="2"
                          :off-icon="mdiTruckDeliveryOutline"
                          :on-icon="mdiTruckDelivery"
                        ></v-radio>
                        <v-btn
                          href="https://www.pochta.ru/parcels"
                          target="_blank"
                          color="primary"
                          class="mt-2"
                          small
                          outlined
                          v-if="deliveryWay === 2"
                          >Рассчитать стоимость</v-btn
                        >
                      </v-card-text>
                      <v-card-text v-if="deliveryWay === 2" class="pt-0">
                        Оплата доставки онлайн на сайте Почты России
                      </v-card-text>
                    </v-card>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" v-else>
                  <v-radio-group mandatory class="mt-0 pt-0">
                    <v-card outlined>
                      <v-card-text>
                        <v-radio
                          label="г. Барнаул, проспект Космонавтов, 8/2"
                          :value="0"
                          :off-icon="mdiMapMarkerRadiusOutline"
                          :on-icon="mdiMapMarkerRadius"
                        ></v-radio>
                        <v-btn
                          href="/info/contacts"
                          target="_blank"
                          color="primary"
                          class="mt-2"
                          small
                          outlined
                          >Подробнее</v-btn
                        >
                      </v-card-text>
                    </v-card>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-chip color="white" class="ml-3 mb-3">
            <v-avatar left class="primary white--text">3</v-avatar
            ><span class="subtitle-2">Способ оплаты</span></v-chip
          >
          <v-card class="sp-order-card mb-3" flat>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-radio-group v-model="payment" mandatory>
                    <v-card outlined class="mb-1">
                      <v-card-text>
                        <v-radio
                          label="Оплата при получении"
                          :value="0"
                          :off-icon="mdiCash100"
                          :on-icon="mdiCash100"
                          :disabled="
                            delivery !== 0 && form.address.city !== localCity
                          "
                        ></v-radio>
                      </v-card-text>
                      <v-card-text
                        v-if="payment === 0 && delivery === 0"
                        class="pt-0"
                      >
                        Наличные, банковская карта, QR-код
                      </v-card-text>
                      <v-card-text
                        v-if="payment === 0 && delivery === 1"
                        class="pt-0"
                      >
                        Наличные, QR-код
                      </v-card-text>
                    </v-card>
                    <v-card outlined class="mb-1">
                      <v-card-text>
                        <v-radio
                          label="Оплата по QR-коду"
                          :value="1"
                          :off-icon="mdiCash100"
                          :on-icon="mdiCash100"
                          :disabled="delivery !== 1"
                        ></v-radio>
                      </v-card-text>
                      <v-card-text v-if="payment === 1" class="pt-0">
                        Через систему быстрых платежей
                      </v-card-text>
                    </v-card>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-chip color="white" class="ml-3 mb-3 pl-1">
            <v-icon color="primary" size="30" class="mr-1">{{
              mdiTextBox
            }}</v-icon
            ><span class="subtitle-2">Комментарий к заказу</span></v-chip
          >
          <v-col cols="12">
            <v-textarea
              outlined
              label="Комментарий"
              v-model="$v.form.comment.$model"
              class="ml-9"
            ></v-textarea>
          </v-col>
        </v-card>
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
            ><br />
            <span class="subtitle-2" v-if="delivery && deliveryWay === 0"
              >+ доставка 200 ₽</span
            >
            <span class="subtitle-2" v-if="delivery && deliveryWay !== 0"
              >+ доставка по тарифам перевозчика</span
            >
          </v-card-text>
          <v-card-text>
            <div v-if="!delivery">
              Самовывоз из магазина по адресу:
              <span class="subtitle-2"
                >г. Барнаул, проспект Космонавтов, 8/2</span
              >
            </div>
            <div v-if="delivery">
              Адрес доставки:
              <span class="subtitle-2">{{
                form.address ? form.address.text : 'Укажите адрес доставки'
              }}</span
              ><br />
              <div v-if="form.address" class="pt-3">
                Способ доставки:
                <span class="subtitle-2">{{
                  deliveryWayName[deliveryWay]
                }}</span>
              </div>
            </div>
            <div class="pt-3">
              Способ оплаты:
              <span class="subtitle-2">{{ paymentName[payment] }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mt-6 mx-2 mb-2" color="primary" @click="sendOrder"
              >Подтвердить заказ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>

      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-text class="pt-4 text-h6">{{ message.title }}</v-card-text>

          <v-card-text>
            <span v-html="message.text"></span>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import md5 from 'md5'
import { validationMixin } from 'vuelidate'
import {
  required,
  requiredIf,
  email,
  minLength
} from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'

import {
  mdiRadioboxBlank,
  mdiRadioboxMarked,
  mdiTruckDelivery,
  mdiTruckDeliveryOutline,
  mdiCash100,
  mdiMapMarkerCheck,
  mdiMapMarkerRadius,
  mdiMapMarkerRadiusOutline,
  mdiTextBox
} from '@mdi/js'

const titles = ['товар', 'товара', 'товаров']

export default {
  mixins: [validationMixin],

  data() {
    return {
      dialog: false,
      localCity: 'Барнаул',
      delivery: 0,
      deliveryWay: 0,
      deliveryWayName: ['Курьером', 'СДЭК', 'Почта России'],
      payment: 0,
      paymentName: ['Оплата при получении', 'Оплата по QR-коду'],
      message: {
        title: '',
        text: ''
      },
      form: {
        name: '',
        phone: '',
        email: '',
        comment: '',
        address: ''
      },
      searchAddress: '',
      suggestionsAddress: [],

      mdiRadioboxBlank,
      mdiRadioboxMarked,
      mdiTruckDelivery,
      mdiTruckDeliveryOutline,
      mdiCash100,
      mdiMapMarkerCheck,
      mdiMapMarkerRadius,
      mdiMapMarkerRadiusOutline,
      mdiTextBox,

      breadcrumbs: [
        {
          text: 'Главная',
          to: '/'
        },
        {
          text: 'Каталог',
          to: '/catalog'
        },
        {
          text: 'Корзина',
          to: '/cart',
          exact: true
        }
      ]
    }
  },
  watch: {
    async searchAddress() {
      await this.$store.dispatch('suggestions/fetchAddress', this.searchAddress)
      const suggestions = this.$store.state.suggestions.itemsAddress.map(s => ({
        text: s.unrestricted_value,
        city: s.data.city
      }))
      this.suggestionsAddress = suggestions
    }
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
    },

    nameErrors() {
      const value = this.$v.form.name

      if (!value.$dirty) return ''
      else if (!value.required) return 'Введите имя.'
      else return ''
    },

    phoneErrors() {
      const value = this.$v.form.phone

      if (!value.$dirty) return ''
      else if (!value.required) return 'Введите номер телефона.'
      else if (!value.minLength) return 'Неверная длина номера.'
      else return ''
    },

    emailErrors() {
      const value = this.$v.form.email

      if (!value.$dirty) return ''
      else if (!value.required) return 'Введите адрес электронной почты.'
      else if (!value.email)
        return 'Адрес должен соответствовать формату e-mail.'
      else return ''
    },

    addressErrors() {
      const value = this.$v.form.address

      if (!value.$dirty) return ''
      else if (!value.required) return 'Введите адрес доставки.'
      else return ''
    }
  },

  methods: {
    async sendOrder() {
      this.$v.$touch()

      if (this.$v.$invalid) return

      const data = Object.assign({}, this.form)
      data.date = new Date()
      data.phone = data.phone.replace(/\(|\)|-|\s/g, '')
      data.address = this.delivery ? this.form.address.text : ''
      data.cost = this.totalPrice
      data.slug = md5(data.date)
      data.productsList = this.goods.map(p => {
        return {
          product: { id: p.id },
          count: p.count,
          price: p.price.promo ? p.price.promo : p.price.retail
        }
      })
      data.delivery = this.delivery
        ? this.deliveryWayName[this.deliveryWay]
        : ''
      data.payment = this.paymentName[this.payment]

      let response
      try {
        response = await this.$store.dispatch('cart/createOrder', data)
      } catch (error) {
        console.error(error)
        this.dialog = true
        this.message = {
          title: 'Произошла ошибка при создании заказа.',
          text: 'Пожалуйста, попробуйте повторить позднее или позвоните нам!'
        }
        return
      }

      this.dialog = true
      this.message = {
        title: 'Ваш заказ успешно создан!',
        text:
          'Дождитесь уведомления о готовности заказа.<br />Если что-то пошло не так, то позвоните нам.'
      }

      const slug = response.data.slug
      setTimeout(() => this.$router.push('/order/' + slug), 3000)

      this.$store.dispatch('cart/deleteGoodsItems')
    }
  },

  validations: {
    form: {
      name: {
        required
      },
      phone: {
        required,
        minLength: minLength(16)
      },
      email: {
        required,
        email
      },
      comment: {},
      address: {
        required: requiredIf(function() {
          return this.delivery
        })
      }
    }
  },

  directives: {
    mask
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 1.6rem !important;
}

.sp-order-card {
  border-left: 1px solid #aaa;
  border-radius: 0 !important;
  margin-left: 30px;
}
</style>
