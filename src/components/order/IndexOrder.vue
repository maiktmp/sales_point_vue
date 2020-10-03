<template>
    <div class="d-flex flex-wrap ">
        <v-card
                style="flex: 1 1 0; min-width: 280px"
                class="ma-3 "
                v-for="(order) in orders"
                v-bind:key="order.id"
                elevation="2">
            <v-card-text>
                <h4 class="text-center">{{`${order.client || "Orden"}`}}</h4>
                <h5 class="teal--text text-center">
                    {{`${order.quantity} - ${order.product.name} -${order.product.variant.name}`}}
                </h5>
                <p class="teal--text text-center">
                    {{`${order.comments || ""}`}}

                </p>
                <h6 class="orange--text text-center" v-if="order.status === CREATED">Orden Pendiente</h6>
                <h6 class="indigo--text text-center" v-if="order.status === DELIVERED">Orden Entregada</h6>
                <h6 class="green--text text-center" v-if="order.status === PAID">Orden Pagada</h6>
                <h6 class="red--text text-center" v-if="order.status === CANCELED">Orden Cancelada</h6>

                <div class="flex flex-wrap flex-column" style="align-items: center">

                    <v-btn block
                           v-if="order.status === CREATED"
                           @click="updateOrderStatus(order,DELIVERED)"
                           class="my-3"
                           color="primary">
                        Servido
                    </v-btn>

                    <v-btn block
                           v-if="order.status === CREATED"
                           @click="updateOrderStatus(order,CANCELED)"
                           class="my-3"
                           color="error">
                        Cancelar
                    </v-btn>

                    <v-btn block
                           v-if="order.status === DELIVERED"
                           @click="updateOrderStatus(order,PAID)"
                           class="my-3"
                           color="success">
                        Pagada
                    </v-btn>

                </div>
            </v-card-text>
        </v-card>
        <v-row>
            <v-col cols="12" style="position: fixed; right: 0px; top: 70px">
                <v-alert
                        :value="error"
                        transition="scale-transition"
                        type="error">
                    {{errorMessage}}
                </v-alert>
                <v-alert
                        :value="orderSuccess"
                        type="success">
                    Orden actualizada
                </v-alert>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {db} from "@/firebase/FirebaseConfig";
    // eslint-disable-next-line no-unused-vars
    import OrderStatus from '@/models/OrderStatus';

    export default {
        name: "IndexOrder",
        data() {
            return {
                orders: [],
                error: false,
                orderSuccess: false,
                errorMessage: "",
                ...OrderStatus
            }
        },
        beforeCreate() {
            db.collection("orders").orderBy("status")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.orders.push({id: doc.id, ...doc.data()})
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        },
        methods: {
            updateOrderStatus(order, newStatus) {
                db.collection("orders")
                    .doc(order.id)
                    .update({status: newStatus})
                    .then(() => {
                        this.orderSuccess = true
                        setTimeout(() => {
                            this.orderSuccess = false
                        })
                        order.status = newStatus
                        this.orders = this.orders.sort(function (a, b) {
                            return (a.status - b.status);
                        });
                    })
                    .catch(function (error) {
                        this.error = true
                        this.errorMessage = error
                        setTimeout(() => {
                            this.error = false
                        })
                    });

            },
        }
    }
</script>

<style scoped>

</style>