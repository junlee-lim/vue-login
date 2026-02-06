<script setup>
import boardService from '@/services/boardService';
import { reactive } from 'vue';
const state = reactive({
    board:{
        title:'',
        contents:''
    }
})

const submit = async() => {
    const result = await boardService.postBoard(state.board);
    console.log("result: ", result);
}
</script>

<template>
<h3>write</h3>
<div><input type="text" placeholder="title" v-model="state.board.title"></div>
<div><textarea placeholder="contents" v-model="state.board.contents"></textarea></div>
<div><button @click="submit">enroll</button></div>
</template>

<style scoped>

</style>