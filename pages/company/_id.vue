<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="flex w-full  flex-col gap-10 col-span-1">
      <a-dealer-info :dealer_info="dealer" class="" />
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        <a-dealer-services
          v-if="dealer.attributes.farms.data.length"
          title="Комплектующие"
          :data_service="dealer.attributes.farms"
        />
        <a-dealer-services
          v-if="dealer.attributes.repairs.data.length"
          title="Ремонт фермы"
          :data_service="dealer.attributes.repairs"
        />
        <a-dealer-services
          v-if="dealer.attributes.services.data.length"
          title="Обслуживание"
          :data_service="dealer.attributes.services"
        />
        <a-dealer-services
          v-if="dealer.attributes.modernizations.data.length"
          title="Модернизация"
          :data_service="dealer.attributes.modernizations"
        />

        <a-dealer-services
          v-if="dealer.attributes.asics.data.length"
          title="Комплектующие ASIC"
          :data_service="dealer.attributes.asics"
        />
        <a-dealer-services
          v-if="dealer.attributes.razmechenie_mestos.data.length"
          title="Размещение"
          :data_service="dealer.attributes.razmechenie_mestos"
        />
        <a-dealer-services
          v-if="dealer.attributes.farms.data.length"
          title="Фермы"
          :data_service="dealer.attributes.farms"
        />
        <a-dealer-services
          v-if="dealer.attributes.manufacturers.data.length"
          title="Производители"
          :data_service="dealer.attributes.manufacturers"
        />
      </div>
    </div>

    <a-ymap-dealer
      :ymap_data="dealer.attributes"
      :titleCompany="dealer.attributes.CompanyName"
      class="sm:col-span-1 rounded-md overflow-hidden bg-[#FFFFFF]/25 p-3 border-[1px] border-[#242424]/5 shadow"
    />
    <form @submit.prevent="createReview" class="flex flex-col gap-4">
      <div class="flex gap-1 items-center">
        <a-star @starNum="starNum" />
      </div>
      <div class="flex flex-col gap-2 w-full max-w-[200px]">
        <label for="name" class="text-sm">Ваше имя</label>
        <input
          v-model="formReview.name"
          type="text"
          id="name"
          class="p-3 border border-gray-300 rounded-lg shadow-sm overflow-hidden "
        />
      </div>
      <div class="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <label for="comment" class="sr-only">Оставьте отзыв...</label>
        <textarea
          rows="3"
          name="comment"
          id="comment"
          v-model="formReview.comment"
          class="block w-full p-3 border-0 resize-none focus:ring-0 sm:text-sm"
          placeholder="Оставьте отзыв..."
        />
      </div>
      <button
        v-if="formReview.comment.length >= 2"
        class="bg-[#7854F7] text-white px-4 py-3 rounded-full w-[220px] cursor-pointer"
      >
        Отправить
      </button>
      <div
        type="submit"
        v-else
        class="bg-[#7854F7]/50 text-white px-4 py-3 rounded-full w-[220px] cursor-not-allowed flex justify-center"
      >
        Отправить
      </div>
      <div class="text-sm">
        <span v-if="formReview.complite">Спасибо ! <br>Ваш отзыв отправлен на модерацию</span>
        <span v-else-if="formReview.errors !== null && !formReview.complite"
          >Что то пошло не так , попробуйте еще раз</span
        >
      </div>
    </form>
    <div v-if="rewiewsFilters.length" class="flex flex-col gap-4">
      <a-dealer-review v-for="review in rewiewsFilters" :key="review.attributes.UID" :data_review="review"/>
    </div>
    <div v-else>Отзывов пока что нет, Вы будете первым</div>
  </div>
</template>

<script>
import aDealerInfo from '../../components/dealer/a-dealer-info.vue'
import ADealerReview from '../../components/dealer/a-dealer-review.vue'
import ADealerServices from '../../components/dealer/a-dealer-services.vue'
import AStar from '../../components/dealer/a-star.vue'

import AYmapDealer from '../../components/dealer/a-ymap-dealer.vue'
export default {
  components: { aDealerInfo, ADealerServices, AYmapDealer, AStar, ADealerReview },
  layout: 'main',
  data () {
    return {
      company: [],
      formReview: {
        comment: '',
        star: null,
        name: '',
        errors: null,
        complite: false
      },
      companyIdQ: null
    }
  },
  computed: {
    rewiewsFilters () {
      return this.dealer.attributes.reviews.data.filter(
        e => e.attributes.Moderate == true
      )
    }
  },
  methods: {
    starNum (e) {
      this.formReview.star = e
    },
    createReview () {
      function randomInteger (min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
      }
      let date = new Date()
      let preOutput =
        String(date.getDate()).padStart(2, '0') +
        '/' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '/' +
        date.getFullYear()
      let Hour = date.getHours()
      let Minutes = date.getMinutes()
      const output =
        (preOutput + 'q' + Hour + 'w' + Minutes)
          .toString()
          .replaceAll('/', '-') +
        'r' +
        randomInteger(1, 10).toString()
      const data = {
        data: {
          Info: this.formReview.comment,
          User: this.formReview.name,
          Points: this.formReview.star,
          UID: output,
          Moderate: false,
          dealer: {
            id: this.companyIdQ
          }
        }
      }
      this.$axios
        .$post('http://admin.996661-cn43153.tmweb.ru:1337/api/reviews', data)
        .then(response => {
          console.log(response)
          this.formReview.complite = true
        })
        .catch(error => {
          this.formReview.complite = false
          this.formReview.errors = error
          console.log(error)
        })
    }
  },
  mounted () {
    this.companyIdQ = this.$route.params.id
  },
  async asyncData ({ $axios, params }) {
    const companyId = params.id
    const config = {
      params: {
        populate: '*'
      }
    }
    let res = await $axios.$get(
      `http://admin.996661-cn43153.tmweb.ru:1337/api/dealers/` + companyId,
      config
    )
    const dealer = res.data

    return { dealer }
  }
}
</script>

<style></style>
