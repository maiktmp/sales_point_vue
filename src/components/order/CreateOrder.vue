<template>
    <v-item-group>
        <v-container fluid class="">
            <h5>Paso 1: </h5>
            <v-row>
                <v-col
                        v-for="product in products"
                        :key="product.id"
                        cols="6"
                >
                    <v-item v-slot:default="{ active, toggle }">
                        <v-card
                                :color="active ? 'primary' : ''"
                                class="d-flex align-center"
                                dark
                                height="80"
                                @click="getVariants(product,toggle)">
                            <v-scroll-y-transition>
                                <div v-if="active" class="display-1 flex-grow-1 text-center">
                                    {{product.name}}
                                </div>
                                <div v-if="!active" class="display-1 flex-grow-1 text-center">
                                    {{product.name}}
                                </div>
                            </v-scroll-y-transition>
                        </v-card>
                    </v-item>
                </v-col>
            </v-row>
            <h5>Paso 2: </h5>

            <v-item-group multiple>
                <div class="d-flex flex-wrap">
                    <div
                            v-for="variant in variants"
                            :key="variant.id"
                            class="m-2"
                            style="flex: 1 1 0 "
                    >
                        <v-item v-slot:default="{ active, toggle }">
                            <v-card
                                    :color="active ? 'primary' : ''"
                                    class="d-flex align-center"
                                    dark
                                    height="100"
                                    @click="selectVariant(variant,toggle)">
                                <v-scroll-y-transition>
                                    <div v-if="active" class="display-1 flex-grow-1 text-center">
                                        {{variant.name}}
                                    </div>
                                    <div v-if="!active" class="display-1 flex-grow-1 text-center">
                                        {{variant.name}}
                                    </div>
                                </v-scroll-y-transition>
                            </v-card>
                        </v-item>
                    </div>
                </div>
            </v-item-group>

            <h5>Paso 3: </h5>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                            v-model="quantity"
                            @click:append-outer="quantity++"
                            @click:prepend="()=>{if(quantity > 1) quantity--}"
                            :append-outer-icon="'mdi-plus-circle-outline'"
                            :prepend-icon="'mdi-minus-circle-outline'"
                            outlined
                            clear-icon="mdi-close-circle"
                            label="Cantidad"
                            type="number">

                    </v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-text-field
                            v-model="name"
                            label="Nombre"
                            outlined
                            clearable
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                            v-model="comments"
                            outlined
                            name="input-7-4"
                            label="Comentarios"
                            value=""
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12">
                    <v-btn
                            color="primary"
                            block
                            depressed
                            v-on:click="createOrder"
                            elevation="2"
                            large>Ordenar
                    </v-btn>
                </v-col>
            </v-row>

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
                        Orden creada
                    </v-alert>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
</template>
<script>
    import {db} from "@/firebase/FirebaseConfig";
    import * as firebase from 'firebase/app'
    import OrderStatus from '@/models/OrderStatus'

    export default {
        name: "CreateOrder",
        data() {
            return {
                products: [],
                variants: [],
                productSelected: null,
                variantSelected: null,
                comments: "",
                name: "",
                errorMessage: "",
                error: false,
                orderSuccess: false,
                quantity: 1,
                order: {}
            }
        },
        beforeCreate() {
            db.collection("products").onSnapshot((event) => {
                event.forEach((doc) => {
                    this.products.push({...doc.data(), ...{id: doc.id}})
                })
            })
        },
        methods: {
            selectVariant: function (variant, toggle) {
                toggle()
                this.variantSelected = variant
            },
            getVariants: function (product, toggle) {
                toggle()
                this.productSelected = product
                db.collection(`products/${product.id}/variants`)
                    .get()
                    .then((evt) => {
                        this.variants = []
                        evt.forEach((doc) => {
                            this.variants.push({...doc.data(), ...{id: doc.id}})
                        })
                    })
            },
            createOrder: function () {
                this.error = false

                if (this.productSelected === null) {
                    this.errorMessage = "Llene el paso 1"
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 2000);
                    return
                }

                if (this.variantSelected === null) {
                    this.errorMessage = "Llene el paso 2"
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 2000);
                    return
                }

                let _newOrder = {
                    created_at: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
                    comments: this.comments,
                    quantity: this.quantity,
                    client: this.name,
                    status: OrderStatus.CREATED,
                    product: {
                        ...this.productSelected,
                        variant: this.variantSelected,
                    }
                }

                db.collection("orders").doc(new Date().toISOString()).set(_newOrder)
                    .then(() => {

                        this.orderSuccess = true
                        this.productSelected = null
                        this.variantSelected = null
                        this.comments = ""
                        this.name = ""
                        this.quantity = 0
                        setTimeout(() => {
                            this.orderSuccess = false
                        }, 2000);

                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>