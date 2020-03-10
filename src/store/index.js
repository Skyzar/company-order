import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        fee: 0,
        eaters: [],
    },
    mutations: {
        ADD_EATER: state => {
            state.eaters.push({
                name: '',
                value: 0,
                order: [],
                contributing: false,
                total: 0,
                paid: false,
            });
        },
    },
    actions: {},
    getters: {
        eaters_count: state => {
            return state.eaters.length;
        },
    }
});

export default store;