<template>
<div class="inputBox shadow">
  <!-- v-model : input에 입력된 텍스트값을 동적으로 vue 인스턴스에 맵핑 : data와 연결 -->
  <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
  <!-- <button v-on:click="addTodo">add</button>  -->
  <span class="addContainer" v-on:click="addTodo">
    <!-- awesome font 아이콘에서 가져오기 -->
    <!-- https://fontawesome.com/v5.15/icons/plus?style=solid 참고 -->
    <i class="fas fa-plus addBtn"></i>
  </span>

  <Modal v-if="showModal" @close="showModal = false">
    <!--slot : 특정 컴포넌트의 일부분을 재사용 할 수 있음 -->
        <h3 slot="header">
          경고! 
          <!-- v-on:click = @click -->
          <i class="closemoalBtn fas fa-times" @click="showModal = false"></i>
        </h3>

        <div slot="body">
          내용이 입력되지 않았습니다. <br>다시 입력해주세요.
        </div>
  </Modal>
</div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
  data(){
    return {
      newTodoItem: "",
      //모달의 기본값
      showModal: false
    }
  },
  methods: {
    //입력값(할 일)을 저장하는 메소드 
    addTodo(){
      if(this.newTodoItem !==''){
      //this.$emit('addTodoItem', this.newTodoItem)
      this.$store.commit('addOneItem', this.newTodoItem);
      //메소드 호출
      this.clearInput();
      }else{
        this.showModal = !this.showModal
      }
    },
    ////add버튼을 누르면 input 값 초기화하는 메소드
    clearInput(){
      this.newTodoItem=''; 
    }
  },
  //TodoInput의 하위 컴포넌트 : Model.vue / 상위 컴포넌트 : App.vue
  components:{
    Modal
  } 
}
</script>

<style scoped>
  input:focus{
    outline: none;
  }
  .inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input {
    border-style: none;
    font-size: 0.9rem;
  }
  .addContainer {
    float: right;
    background: linear-gradient(to right, #6478f8, #8763fb);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }

  .addBtn {
    color: white;
    vertical-align: middle;
  }
  .closemoalBtn{
    color: #42b893;
  }
</style>