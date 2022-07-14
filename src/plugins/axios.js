import Vue from "vue";
import axios from "axios";

const axiosUnauthenticated = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 60 * 1000,
});

const requester = {
    get() {
        return {
            unauthenticated () {
                return axiosUnauthenticated;
            }
        }
    }
}

Vue.use({
    install(Vue) {
        Object.defineProperties(Vue.prototype, {
            $http: requester
        });
    }
});
