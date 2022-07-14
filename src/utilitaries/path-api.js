import Vue from "vue";

const pathapi = {
    contact: {
        paged: () => "/contact/paged"
    }
};

Vue.use({
    install(Vue) {
        Vue.prototype.$pathapi = pathapi;
    }
});
