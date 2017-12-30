import Vue from 'vue';
import app from './vue/app.vue';
import io from 'socket.io-client';

new Vue({
    el: '#app',
    render: h => h(app, {
        ref: 'app'
    }),
    created: function () {
        // io();
    }
});