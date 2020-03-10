<template>
    <tr>
        <td>
            <div class="controls">
                <input type="text" placeholder="__" v-model="eater.name">
                <div class="bar"></div>
            </div>
        </td>

        <td>
            <div class="controls controls-currency">
                <input placeholder="__" type="number" v-model.number="eater.value">
                <div class="bar"></div>
            </div>
        </td>

        <td>
            <label class="label-cbx label-cbx-td">
                <input v-model="eater.contributing" type="checkbox" class="invisible">
                <div class="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                        <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                </div>
            </label>
        </td>

        <td class="ta-right">
            <strong>{{$store.state.fee}}€</strong>
        </td>

        <td>
            <label class="label-cbx label-cbx-td">
                <input v-model="eater.paid" type="checkbox" class="invisible">
                <div class="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                        <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                </div>
            </label>
        </td>

        <td class="ta-right">
            <strong>{{$store.state.total}}€</strong>
        </td>

        <td>
            <div class="co-setting-delete-eater">
                <i class="fas fa-user-minus"></i>
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "Eater",
        props: {
            eater: Object,
            index: Number
        },
        methods: {
            // delete eater
        },
        computed: {
            // total
            // fee
        }
    }
</script>

<style scoped>

</style>