<template>
          <q-select
              ref="search" dark dense use-input hide-selected
              class="mobile-hide GL__toolbar-select"
              color="black" :stack-label="false" label="Search or jump to..."
              v-model="text" :options="filteredOptions" @filter="filter"
              style="width: 300px"
          >

            <template v-slot:append>
              <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
            </template>

            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  <div class="text-center">
                    <q-spinner-pie
                        color="grey-5"
                        size="24px"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:option="scope">
              <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                  class="GL__select-GL__menu-link"
              >
                <q-item-section side>
                  <q-icon name="collections_bookmark" />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                </q-item-section>
                <q-item-section side :class="{ 'default-type': !scope.opt.type }">
                  <q-btn outline dense no-caps text-color="blue-grey-5" size="12px" class="bg-grey-1 q-px-sm">
                    {{ scope.opt.type || 'Jump to' }}
                    <q-icon name="subdirectory_arrow_left" size="14px" />
                  </q-btn>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      toTop: true,
      text: '',
      options: null,
      filteredOptions: [],
      stringOptions: [
        'quasarframework/quasar',
        'quasarframework/quasar-awesome'
      ]
    }
  },
  methods: {
    filter (val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.options = this.stringOptions
          this.$refs.search.filter('')
        }, 2000)
        update()
        return
      }
      if (val === '') {
        update(() => {
          this.filteredOptions = this.options.map(op => ({ label: op }))
        })
        return
      }
      update(() => {
        this.filteredOptions = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...this.options
              .filter(op => op.toLowerCase().includes(val.toLowerCase()))
              .map(op => ({ label: op }))
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
