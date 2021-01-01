Vue.component('eater-row', {
    template: `#eater-row-template`,
    props: {
        eater: Object,
        index: Number
    },
    methods: {
        delete_eater(index) {
            co_app.delete_eater(index);
        },
        toggle_eater_items_modal(bool) {
            co_app.selected_eater = this.eater;
            co_app.eater_items_modal = bool;
        }
    },
    computed: {
        eater_value() {
            return Object.values(this.eater.items).reduce((p, {price}) => p + price, 0);
        },
        total() {
            return this.eater_value + (this.eater.contributing ? co_app.shared_fee : 0);
        },
        fee() {
            if (this.eater.contributing) {
                return co_app.shared_fee;
            } else {
                return parseFloat('0,00').toFixed(2);
            }
        }
    }
});

const co_app = new Vue({
    el: '#app',
    data: {
        current_theme: 'Dark',
        fee: null,
        eater_items_modal: false,
        eaters: [],
        selected_eater: {}
    },
    methods: {
        to_currency_value: function (val) {
            return parseFloat(parseFloat(Math.round(val * 100) / 100).toFixed(2));
        },
        add_eater: function () {
            this.eaters.push({
                name: 'Eater' + (this.eaters.length + 1).toString(),
                items: [],
                contributing: false,
                paid: false,
            });
        },
        delete_eater(index) {
            this.eaters.splice(index, 1);
        },
        delete_item(index) {
            this.selected_eater.items.splice(index, 1);
        },
        create_eater_item() {
            this.selected_eater.items.push({
                name: 'Item' + (this.selected_eater.items.length + 1).toString(),
                price: 0
            })
        },
        light() {
            document.body.classList.remove('dark');
            document.body.classList.add('light');

            this.current_theme = 'Light';
        },
        dark() {
            document.body.classList.remove('light');
            document.body.classList.add('dark');

            this.current_theme = 'Dark';
        },
        switch_theme() {
            this.current_theme === 'Dark' ? this.light() : this.dark();
        }
    },
    computed: {
        amount_due() {
            return this.to_currency_value(this.eaters.reduce(function (amount_due, eater) {
                return amount_due + Object.values(eater.items).reduce((p, {price}) => p + price, 0);
            }, 0) + this.fee);
        },
        amount_paid() {
            return this.to_currency_value(this.eaters.reduce((amount_paid, eater) => {
                let eater_value = Object.values(eater.items).reduce((p, {price}) => p + price, 0);
                return amount_paid + (eater.paid && eater_value ? eater_value : 0) + (eater.contributing && eater.paid ? this.shared_fee : 0);
            }, 0));
        },
        percentage_paid() {
            if (this.amount_due !== 0) {
                let percentage = this.to_currency_value((this.amount_paid / this.amount_due) * 100);
                document.getElementById("shadow-pay-progress-wrapper").style.width = percentage + "%";
                return percentage;
            } else {
                return 0;
            }
        },
        fee_contributors() {
            return this.eaters.reduce(function (fee_contributors, eater) {
                return fee_contributors + (eater.contributing ? 1 : 0);
            }, 0);
        },
        eaters_paid() {
            return this.eaters.reduce(function (eaters_paid_count, eater) {
                return eaters_paid_count + (eater.paid ? 1 : 0);
            }, 0);
        },
        shared_fee() {
            if (this.fee_contributors <= 0) {
                return this.to_currency_value(this.fee);
            } else {
                return this.to_currency_value(this.fee / this.fee_contributors)
            }
        }
    }
});