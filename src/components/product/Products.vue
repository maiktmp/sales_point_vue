<template>
    <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    </vue-bootstrap4-table>
</template>

<script>
    import {db} from '@/firebase/FirebaseConfig';
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: "Products",
        components: {
            VueBootstrap4Table
        },
        data() {
            return {
                products: [],
                rows: [{
                    "id": 1,
                    "name": {
                        "first_name": "Vladimir",
                        "last_name": "Nitzsche"
                    },
                    "address": {
                        "country": "Mayotte"
                    },
                    "email": "franecki.anastasia@gmail.com",
                },
                    {
                        "id": 2,
                        "name": {
                            "first_name": "Irwin",
                            "last_name": "Bayer"
                        },
                        "age": 23,
                        "address": {
                            "country": "Guernsey"
                        },
                        "email": "rlittle@macejkovic.biz",
                    },
                    {
                        "id": 3,
                        "name": {
                            "first_name": "Don",
                            "last_name": "Herman"
                        },
                        "address": {
                            "country": "Papua New Guinea"
                        },
                        "email": "delia.becker@cormier.com",
                    }],
                columns: [{
                    label: "id",
                    name: "id",
                    filter: {
                        type: "simple",
                        placeholder: "id"
                    },
                    sort: true,
                },
                    {
                        label: "First Name",
                        name: "name.first_name",
                        filter: {
                            type: "simple",
                            placeholder: "Enter first name"
                        },
                        sort: true,
                    },
                    {
                        label: "Email",
                        name: "email",
                        sort: true,
                    },
                    {
                        label: "Country",
                        name: "address.country",
                        filter: {
                            type: "simple",
                            placeholder: "Enter country"
                        },
                    }],
                config: {
                    card_mode: false,
                    selected_rows_info: false,
                    pagination: true,
                    pagination_info: false,
                    num_of_visibile_pagination_buttons: 7,
                    per_page: 5,
                    checkbox_rows: false,
                    highlight_row_hover: false,
                    rows_selectable: false,
                    multi_column_sort: false,
                    highlight_row_hover_color: "grey",
                    card_title: "Productos",
                    global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: false,
                        case_sensitive: false
                    },
                    per_page_options: [5, 10, 20, 30],
                    show_refresh_button: false,
                    show_reset_button: false,
                    server_mode: false,
                    preservePageOnDataChange: false
                }
            }
        },
        beforeCreate() {
            db.collection("products").onSnapshot((event) => {
                event.forEach((doc) => {
                    console.log(doc.data())
                })
            })
        }
    }
</script>

<style scoped>

</style>