<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon medium>add_box</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <router-link to="/create-order">Nueva Orden</router-link>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon medium>list_alt</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <router-link to="/orders">Resumen de Órdenes</router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Administracíon</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row
                        align="center"
                        justify="center">
                    <v-col>
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer
                class="d-flex  justify-center"
                color="indigo"
                app>
            <span class="white--text">Fecha: {{ date.toLocaleDateString("es-ES") }}</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: false,
            date: new Date
        }),
    }
</script>