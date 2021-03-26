<template>
  <section id="auth-form" class="right-body column is-7-desktop">
    <client-only>
      <div>
        <h2>登录</h2>
        <el-form ref="signInForm" label-width="90px" label-position="top" label-suffix=":" :model="user" :rules="rules">
          <el-form-item label="账户" prop="account">
            <el-input v-model="user.account"> </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" type="password" @keyup.enter.native="signin('signInForm')"></el-input>
          </el-form-item>
          <el-button type="primary" class="btn-oper" style="margin: 26px 0 12px" @click="signin('signInForm')">
            登录
          </el-button>
        </el-form>
      </div>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'Index',
  layout: 'signinLayout',
  data() {
    return {
      user: {
        account: 'admin',
        password: 'public',
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入账户',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
          },
        ],
      },
    }
  },

  mounted() {
    const isSignin = window.localStorage.getItem('signin')
    if (isSignin) {
      this.$router.push('/')
    }
  },

  methods: {
    signin(formName) {
      const form = this.$refs[formName]
      form.validate((valid) => {
        if (valid && this.user.account === 'admin' && this.user.password === 'public') {
          window.localStorage.setItem('signin', true)
          this.$message.success('登录成功')
          this.$router.push('/')
        } else {
          this.$message.error('账户或密码错误，请重新输入')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
