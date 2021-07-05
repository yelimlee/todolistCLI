import Vue from 'vue'
import Vuex from 'vuex'
import todoApp from './modules/todoApp'

//use : vue의 플러그인 기능 뷰를 사용하는 전역에 특정기능을 주고 싶을 때 사용
Vue.use(Vuex);

export const store= new Vuex.Store({
    modules: {
        todoApp
    }
});