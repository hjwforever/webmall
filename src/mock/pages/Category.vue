<template>
    <div>
      <h5>Category</h5>
      <q-btn @click="getGoods" >d</q-btn>
      <q-table
          v-if="mockTabData.length"
          :columns="columns"
          :data="mockTabData"
      ></q-table>
      <q-card v-else>
        <q-markup-table>
          <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="50px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="35px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="65px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </div>
</template>

<script>
import goods from '../../mixins/goods'
export default {
  name: 'Category',
  mixins: [goods],
  created() {

  }
}
</script>

<style scoped>

</style>
