<template>
  <div class="container">
    <div class="has-text-centered my-4">
      <h1 class="is-size-2">EMMS</h1>
      <p class="is-size-4">基于 EMQ 的环境监测存储系统</p>
    </div>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">配置</div>
      <el-form ref="configForm" hide-required-asterisk size="small" label-position="top" :model="connection">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="host" label="Host">
              <el-input v-model="connection.host"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="port" label="Port">
              <el-input v-model.number="connection.port" type="number" placeholder="8083/8084"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="endpoint" label="Mountpoint">
              <el-input v-model="connection.endpoint" placeholder="/mqtt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="clientId" label="Client ID">
              <el-input v-model="connection.clientId"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="username" label="Username">
              <el-input v-model="connection.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="Password">
              <el-input v-model="connection.password" type="password"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button
              type="success"
              size="small"
              class="conn-btn"
              style="margin-right: 20px"
              :disabled="client.connected"
              @click="createConnection"
            >
              {{ client.connected ? '已连接' : '连接' }}
            </el-button>

            <el-button v-if="client.connected" type="danger" size="small" class="conn-btn" @click="destroyConnection">
              断开连接
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">订阅</div>
      <el-form ref="subscription" hide-required-asterisk size="small" label-position="top" :model="subscription">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <el-input v-model="subscription.topic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="subscription.qos">
                <el-option
                  v-for="(item, index) in qosList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button
              :disabled="!client.connected"
              type="success"
              size="small"
              class="subscribe-btn"
              @click="doSubscribe"
            >
              {{ subscribeSuccess ? '已订阅' : '订阅' }}
            </el-button>
            <el-button
              :disabled="!client.connected"
              type="success"
              size="small"
              class="subscribe-btn"
              style="margin-left: 20px"
              @click="doUnSubscribe"
              v-if="subscribeSuccess"
            >
              取消订阅
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">发布</div>
      <el-form ref="publish" hide-required-asterisk size="small" label-position="top" :model="publish">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <el-input v-model="publish.topic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="payload" label="Payload">
              <el-input v-model="publish.payload" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="publish.qos">
                <el-option
                  v-for="(item, index) in qosList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24">
        <el-button :disabled="!client.connected" type="success" size="small" class="publish-btn" @click="doPublish">
          发布
        </el-button>
      </el-col>
    </el-card>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">接收</div>
      <el-col :span="24">
        <el-input type="textarea" :rows="3" style="margin-bottom: 15px" v-model="receiveNews"></el-input>
      </el-col>
    </el-card>
    <el-card shadow="always" style="margin-bottom: 30px">
      <div class="emq-title">终端 1 实时数据</div>
      <div class="columns is-multiline has-text-centered mb-6">
        <div class="currentData column is-3">
          <span class="sensor-data">{{ currentData.temp }}℃</span>
          <span class="sensor-type">当前温度</span>
        </div>
        <div class="currentData column is-3">
          <span class="sensor-data">{{ currentData.humi }}%</span>
          <span class="sensor-type">当前湿度</span>
        </div>
        <div class="currentData column is-3">
          <span class="sensor-data">{{ currentData.mq }}</span>
          <span class="sensor-type">当前空气质量</span>
        </div>
        <div class="currentData column is-3">
          <span class="sensor-data">{{ currentData.gz }}</span>
          <span class="sensor-type">当前光照强度</span>
        </div>
      </div>
      <client-only>
        <div class="columns is-multiline">
          <div class="column is-6">
            <line-chart class="wrapper" :chart-data="tempData"></line-chart>
          </div>
          <div class="column is-6">
            <line-chart class="wrapper" :chart-data="humiData"></line-chart>
          </div>
          <div class="column is-6">
            <line-chart class="wrapper" :chart-data="mqData"></line-chart>
          </div>
          <div class="column is-6">
            <line-chart class="wrapper" :chart-data="gzData"></line-chart>
          </div>
        </div>
      </client-only>
    </el-card>
  </div>
</template>

<script>
import mqtt from 'mqtt'

export default {
  name: 'Index',
  head: {
    title: '控制台',
  },
  data() {
    return {
      loaded: false,
      currentData: {},
      tempData: null,
      humiData: null,
      mqData: null,
      gzData: null,
      chartsData: {
        temp: {
          labels: [],
          datasets: [
            {
              label: '实时温度',
              backgroundColor: '#f87979',
              data: [],
            },
          ],
        },
        humi: {
          labels: [],
          datasets: [
            {
              label: '实时湿度',
              backgroundColor: '#b6af92',
              data: [],
            },
          ],
        },
        mq: {
          labels: [],
          datasets: [
            {
              label: '实时空气状况',
              backgroundColor: '#CC6699',
              data: [],
            },
          ],
        },
        gz: {
          labels: [],
          datasets: [
            {
              label: '实时光照强度',
              backgroundColor: '#CC99CC',
              data: [],
            },
          ],
        },
      },
      connection: {
        host: 'tce123e3.cn.emqx.cloud',
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_3be2c321',
        username: 'admin',
        password: 'public',
      },
      subscription: {
        topic: '/esp_upload',
        qos: 0,
      },
      publish: {
        topic: 'topic/browser',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
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
      this.loaded = false
      try {
        const { status, data } = await this.$axios.get('/sensor/')
        console.log(status, data)
        this.loaded = true
      } catch (error) {}
    },
    // 消息处理
    handlerMsg(topic, message) {
      const msgJson = JSON.parse(message)
      this.currentData = msgJson
      for (const i in msgJson) {
        this.upData(i, msgJson[i])
      }
    },
    upData(dataName, dataVal) {
      if (dataVal !== null) {
        if (this.chartsData[dataName].labels.length >= 5) {
          this.chartsData[dataName].labels.shift()
          this.chartsData[dataName].datasets[0].data.shift()
        }
        this.chartsData[dataName].labels.push(new Date().toLocaleString())
        this.chartsData[dataName].datasets[0].data.push(dataVal)
        const cloneDeep = require('lodash.clonedeep')
        this[`${dataName}Data`] = cloneDeep(this.chartsData[dataName])
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    // 创建连接
    createConnection() {
      // 连接字符串, 通过协议指定使用的连接方式
      // ws 未加密 WebSocket 连接
      // wss 加密 WebSocket 连接
      // mqtt 未加密 TCP 连接
      // mqtts 加密 TCP 连接
      // wxs 微信小程序连接
      // alis 支付宝小程序连接
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        this.$message.error('mqtt.connect error', error)
      }
      this.client.on('connect', () => {})
      this.client.on('error', (error) => {
        this.$message.error('Connection failed', error)
      })
      // this.client.on('message', (topic, message) => {
      //   this.receiveNews = this.receiveNews.concat(message)
      // })
      this.client.on('message', this.handlerMsg)
    },
    // 订阅主题
    doSubscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          this.$message.error('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        this.$message.success('Subscribe to topics res', res)
      })
    },
    // 取消订阅
    doUnSubscribe() {
      const { topic } = this.subscription
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          this.$message.error('Unsubscribe error', error)
        } else {
          this.$message.success('Unsubscribe success')
        }
      })
    },
    // 消息发布
    doPublish() {
      const { topic, qos, payload } = this.publication
      this.client.publish(topic, payload, qos, (error) => {
        if (error) {
          this.$message.error('Publish error', error)
        }
      })
    },
    // 断开连接
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end()
          this.client = {
            connected: false,
          }
          this.$message.success('Successfully disconnected!')
        } catch (error) {
          this.$message.error('Disconnect failed', error.toString())
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .el-card {
    background-color: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
  }
  .emq-title {
    color: #fff;
    margin-bottom: 16px;
  }
  .conn-btn {
    color: #fff;
    background-color: #00b173;
    font-size: 14px;
  }

  .publish-btn {
    margin-bottom: 20px;
    float: right;
  }

  .el-button--success {
    background-color: #34c388 !important;
    border-color: #34c388 !important;
    font-size: 14px !important;
  }

  .el-button--danger {
    background-color: #f5222d !important;
    border-color: #f5222d !important;
  }

  .el-form-item {
    &.is-error {
      .el-input__inner,
      .el-textarea__inner {
        box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
      }
    }
    &.is-success {
      .el-input__inner,
      .el-textarea__inner {
        border-color: #34c388 !important;
      }
    }
  }

  .currentData {
    .sensor-data {
      display: block;
      font-size: 32px;
      font-weight: 600;
      color: #fff;
      line-height: 33px;
    }
    .sensor-type {
      color: #8b949e;
      font-size: 14px;
    }
  }
}
</style>
