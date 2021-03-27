import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import { Form, FormItem, Input, Button, Row, Col, Select, Option, Checkbox, Message, Alert, Card } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Alert)
Vue.use(Card)

Vue.prototype.$message = Message
