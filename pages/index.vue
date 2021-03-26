<template>
  <div class="container">
    <div>
      <h1 class="title" @click="getDate()">EMMS</h1>
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
