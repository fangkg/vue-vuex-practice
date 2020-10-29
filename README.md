# vue-vuex-practice

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Vuex集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以可预测的方式发生变化
// 概念

1、state状态、数据

    export default new Vuex.Store({

        state: { counter: 0 }

    })

    派生状态 getters 类似计算属性

    export default new Vuex.Store({

        getters: {

            doubleCounter(state) {

                return state.counter * 2;

            }

        }

    })

2、mutations 更改状态的函数

    export default new Vuex.Store({

        mutations: {

            add(state) {

                state.counter ++

            }

        }

    })

3、actions 异步操作

    export default new Vuex.Store({
        
        actions: {

            add({ commit }) {

                setTimeout(() => {

                    commit('add');

                }, 1000);

            }

        }

    })

4、store包含以上概念的容器


// 原理分析

1、实现一个插件，声明Store类，挂载$store

2、Store具体实现

    创建响应式state,保存mutations、actions和getters

    实现commit根据用户传入type执行对应的mutation

    实现dispatch根据用户传入type执行对应的action,同时传递上下文
    
    实现getters,按照getters定义对state做派生
