import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../components/product/Products'
import CreateOrder from '../components/order/CreateOrder'
import IndexOrder from "@/components/order/IndexOrder";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/product',
            component: Products
        },
        {
            path: '/create-order',
            component: CreateOrder
        },
        {
            path: '/orders',
            component: IndexOrder
        },
    ],
    linkActiveClass: "active",
    mode: "history"
})