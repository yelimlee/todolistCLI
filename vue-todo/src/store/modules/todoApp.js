const storage = {
    fetch() {
        const arr = [];
        if(localStorage.length > 0){
            for(let i=0; i<localStorage.length; i++){
            if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
            }
        }
        return arr;
    },
}
const state = {
    todoItems: storage.fetch()
};

const getters = {
    storedTodoItems(state){
    return state.todoItems
    }
};

const mutations ={
    addOneItem(state, todoItem){
        //completed: checkbox가 체크되었는지 진위여부
        const obj= {completed: false, item: todoItem}
        //console.log(this.newTodoItem);
        //storage.setItem(keyName, keyValue) : 입력값을 저장하는 로직 
        //개발자도구 >> Application >> Local Storage에서 확인 가능 
        //JOSN.stringfy : 자바스크립트 객체를 string으로 보여주는 api
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    
    removeOneItem(state, payload){
        localStorage.removeItem(payload.todoItem.item);
        //splice: index번째 요소부터 1개의 요소를 삭제 
        state.todoItems.splice(payload.index,1);
    },
    
    toggleOneItem(state, payload) {
        //todoItem.completed =!todoItem.completed;
        //상위 컴포넌트에서 선언한 data는 하위 컴포넌트에서 변경하지 말아야함
        //TodoList 라는 컴포넌트의 데이터를 다른 컴포넌트에서 다루는 경우 데이터 변경이 
        //필요할 때 TodoList 컴포넌트에 요청해서 바꾸는 방식으로 설계
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
        //로컬스토리지의 데이터 갱신
        localStorage.removeItem(payload.todoItem.item);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAllItems(state){
        localStorage.clear();
        state.todoItems = [];
    }
};

export default{
    state,
    getters,
    mutations
}