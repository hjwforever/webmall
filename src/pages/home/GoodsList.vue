<template>
  <q-page-container class="overflow-auto fit">
    <div class="q-mx-sm q-mt-sm q-pb-md text-grey-8 text-center no-scroll">
      <sc-page
          :items="goodsData"
          :per-number="size || 9"
          item-class="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-xs-6"
      >
        <template v-slot:item="props">
          <q-intersection
              transition="flip-right">
            <sc-shadow>
              <q-card flat class="no-border-radius q-pb-sm">
                <q-chip
                    outline
                    size="sm"
                    :label="props.item.labelData.label"
                    :color="props.item.labelData.color"
                    :class="props.item.labelData.bgColor"
                    :style="props.item.labelData.style"
                    class="q-ma-sm absolute-top-right"
                    square
                ></q-chip>
                <q-img
                    :src="props.item.imgUrl"
                    width="50%"
                    class="q-mt-md"
                />
                <q-card-section>
                  <q-item-label class="text-bold">{{ props.item.name }}</q-item-label>
                  <q-item-label class="text-grey q-py-sm">{{ props.item.description }}</q-item-label>
                  <q-item-label class="text-pink">¥ {{ props.item.price }} 元</q-item-label>
                </q-card-section>
              </q-card>
            </sc-shadow>
          </q-intersection>
        </template>
      </sc-page>
    </div>
  </q-page-container>
</template>

<script>
import ScShadow from 'components/shadow/ScShadow'
import ScPage from 'components/common/ScPage'
import GoodDataService from '../../services/GoodDataService'

export default {
  name: 'GoodsList',
  components: {
    ScPage,
    ScShadow
  },
  data() {
    return {
      goodsData: [],
      currentPage: 1,
      size: 9
    }
  },
  methods: {
    getData() {
      GoodDataService.getAll({ size: 'all' })
        .then(res => {
          // console.log(res.data)
          this.goodsData = res.data.goods.map(good => {
            return {
              name: good.name,
              labelData: good.labels[0],
              description: good.description,
              price: good.price,
              imgUrl: good.imgUrl
            }
          })
          this.$q.notify({
            message: '获取商品列表成功',
            timeout: 1000
          })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: err.toString()
          })
        })
    }
  },
  computed: {},
  created() {
    this.getData()
  }
}
</script>

<style lang="sass" scoped>
.my-content
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
// end my-content
.example-item
  height: 289px
  width: 100%
</style>
