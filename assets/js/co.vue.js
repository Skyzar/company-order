Vue.component('eater-row', {
    template: `#eater-row-template`,
    props: {
        eater: Object,
        index: Number
    },
    methods: {
        delete_eater(index) {
            co_app.delete_eater(index);
        }
    },
    computed: {
        total() {
            return this.eater.value + (this.eater.contributing ? co_app.shared_fee : 0);
        },
        fee() {
            if(this.eater.contributing){
                return co_app.shared_fee;
            }
            else {
                return parseFloat('0,00').toFixed(2);
            }
        }
    }
});

const co_app = new Vue({
    el: '#app',
    data: {
        fee: 0,
        eaters: [],
    },
    methods: {
        to_currency_value: function (val) {
            return parseFloat(parseFloat(Math.round(val * 100) / 100).toFixed(2));
        },
        add_eater: function () {
            this.eaters.push({
                name: '',
                items: [],
                value: null,
                contributing: false,
                total: null,
                paid: false,
            });
        },
        delete_eater: function (index) {
            this.eaters.splice(index, 1);
        }
    },
    computed: {
        amount_due() {
            return this.to_currency_value(this.eaters.reduce(function (amount_due, eater) {
                return amount_due + (eater.value ? eater.value : 0);
            }, 0) + this.fee);
        },
        amount_paid() {
            return this.to_currency_value(this.eaters.reduce(function (amount_paid, eater) {
                return amount_paid + (eater.paid && eater.value ? eater.value : 0) + (eater.contributing && eater.paid ? this.shared_fee : 0);
            }, 0));
        },
        percentage_paid() {
            if (this.amount_due !== 0) {
                let percentage = this.to_currency_value((this.amount_paid / this.amount_due) * 100);
                document.getElementById("pay-progress-bar").style.width = percentage + "%";
                return percentage;
            }
            else {
                return 0;
            }
        },
        fee_contributors() {
            return this.eaters.reduce(function (fee_contributors, eater) {
                return fee_contributors + (eater.contributing ? 1 : 0);
            }, 0);
        },
        eaters_paid() {
            return this.eaters.reduce(function (eaters_paid, eater) {
                return eaters_paid + (eater.paid ? 1 : 0);
            }, 0);
        },
        shared_fee() {
            if (this.fee_contributors <= 0) {
                return this.to_currency_value(this.fee);
            }
            else {
                return this.to_currency_value(this.fee / this.fee_contributors)
            }
        }
    }
});