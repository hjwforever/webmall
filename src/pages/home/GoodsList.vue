<template>
  <q-page-container class="overflow-auto">
<!--    <div class="row q-col-gutter-x-md q-col-gutter-y-sm justify-start">-->
<!--      <div class="col-sm-3 col-md-2 col-6" v-for="n in 10" :key="`none-${n}`">-->
<!--        <q-card>ssss</q-card>-->
<!--      </div>-->
<!--    </div>-->
    <div class="q-mx-sm q-mt-sm q-pb-md text-grey-8 text-center">
      <sc-page
          :items="goodsListData.goodsListDatas"
          :per-number="12"
          item-class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12"
      >
        <template v-slot:item="props">
          <q-intersection
              once
              transition="scale">
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
                    :src="props.item.imgSrc"
                    width="50%"
                    class="q-mt-md"
                />
                <q-card-section>
                  <q-item-label class="text-bold">{{ props.item.name }}</q-item-label>
                  <q-item-label class="text-grey q-py-sm">{{ props.item.desc }}
                  </q-item-label>
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
import GOODS_LIST_DATA from '../../mock/data/list/goodsListData'

export default {
  name: 'GoodsList',
  components: {
    ScPage,
    ScShadow
  },
  data () {
    return {
      goodsListData: GOODS_LIST_DATA
    }
  },
  computed: {}
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
