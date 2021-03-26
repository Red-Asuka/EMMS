<template>
  <div class="container">
    <div>
      <h1 @click="getDate()">EMMS</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    async getDate() {
      // const { status, data } = await this.$axios.get('/nodes', {
      //   auth: {
      //     username: 'y2a218e2',
      //     password: 'oba7fabc2278f3d2',
      //   },
      // })
      // console.log(status, data)

      const { status, data } = await this.$axios.get('/sensor/')
      console.log(status, data)
    },
  },
}
</script>

<style></style>
