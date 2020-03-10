<template>
    <div id="app">
        <div class="main-title">
            Company Order
        </div>

        <div class="company-order-settings">

            <div class="co-settings-btn co-setting-green clickable" @click="add_eater()">
                <i class="fas fa-user-plus"></i> Add Eater
            </div>

            <div class="co-settings-btn">
                Total Eaters: <strong>{{$store.getters.eaters_count}}</strong>
            </div>

            <div class="co-settings-btn">
                Fee Contributors: <strong>1337</strong>
            </div>
            <div class="co-settings-btn">
                Eaters Paid: <strong>1337 / {{$store.getters.eaters_count}}</strong>
            </div>

        </div>

        <div class="pad-10">
            <div class="pay-progress" style="padding: 10px;">
                <div id="pay-progress-bar"></div>
                <div id="pay-progress-percentage"><strong>1337€ / 1337€ (1337%)</strong></div>
            </div>
        </div>

        <div id="delivery-fee">
            <div class="controls controls-currency">
                <input placeholder="__" type="number" v-model.number="$store.state.fee">
                <label>Delivery Fee</label>
                <div class="bar"></div>
            </div>
        </div>

        <div class="table-scroll">
            <table class="table eater-table">
                <colgroup>
                    <col style="width: 20%;">
                    <col style="width: 15%;">
                    <col style="width: 10%;">
                    <col style="width: 15%;">
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                    <col style="width: 5%;">
                </colgroup>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Sharing Fee</th>
                    <th>Fee</th>
                    <th>Paid</th>
                    <th>Total</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <tr is="Eater" v-for="(eater, index) in $store.state.eaters" :index="index" :eater="eater" :key="index"></tr>
                </tbody>
            </table>
        </div>

        <div id="no-eaters-info" v-if="$store.getters.eaters_count === 0">
            No Eaters
        </div>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import Eater from './components/Eater';

    export default {
        name: 'App',
        components: {
            Eater
        },
        methods: {
            add_eater() {
                this.$store.commit('ADD_EATER');
            },
        }
    }
</script>

<style>

</style>
