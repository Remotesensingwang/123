<template>
  <div>
    <AddName/>
  </div>
</template>

<script>
import AddName from '../05组件的自定义事件/components/AddName.vue'
export default {
  name:'App',
  components:{Student,
    School,AddName},
    data() {
      return {
        msg:'你好'
      }
    },
    methods: {

    },
}
</script>

<style>

</style>