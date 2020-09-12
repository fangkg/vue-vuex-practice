// 单向数据流 响应式state属性
// 插件 $store 

let FVue
// 实现Store类
class Store {
    constructor(options) {
        // 响应式的state
        // this.state = new FVue({
        //     data: options.state
        // })
        // 框架保护state
        this._vm = new FVue({
            // data: options.state
            data: {
                $$state: options.state
            }
        })
        
        // 保存mutations
        this._mutations = options.mutations

        // 保存actions
        this._actions = options.actions
        // 绑定this到store实例
        const store = this
        // this.commit = this.commit.bind(store)
        // 绑定this到store实例 方式二
        const { commit, action } = store
        this.commit = function boundCommit(type, payload) {
            commit.call(store, type, payload)
        }
        this.action = function boundAction(type, payload) {
            return action.call(store, type, payload)
        }
    }
    get state() {
        return this._vm._data.$$state
    }
    set state(v) {
        console.log('please use replaceState to reset state')
    }

    // commit(type, payload) 执行mutation，修改状态
    commit(type, payload) {
        // 根据type获取对应的mutation
        const entry = this._mutations[type]
        if (!entry) {
            console.error('unknown mutation type')
            return
        }

        entry(this.state, payload)
    }

    // dispatch(type, payload)
    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.error('unknown action type')
            return
        }

        // this 希望传进的是store实例
        return entry(this, payload)
    }
}

// 实现插件
function install(_Vue) {
    FVue = _Vue

    // 混入
    FVue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                FVue.prototype.$store = this.$options.store
            }
        }
    })
}

// 导出对象为vuex
export default { Store, install}