import Router from 'koa-router'
import { query } from '../dbs/query'
import { QUERY_TABLE } from '../dbs/sql'
// import axios from './utils/axios'

const router = new Router({ prefix: '/api/sensor' })

router.get('/', async (ctx) => {
  // let result = await Categroy.findOne({city: ctx.query.city.replace('市', '') || '北京'})
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   }
  // }
  const data = await query(QUERY_TABLE('sensor'))
  ctx.body = {
    data,
  }
  // const {
  //   status,
  //   data: { areas, types },
  // } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
  //   params: {
  //     city: ctx.query.city.replace('市', '') || '北京',
  //     sign,
  //   },
  // })
  // ctx.body = {
  //   areas: status === 200 ? areas : [],
  //   types: status === 200 ? types : [],
  // }
})

export default router
