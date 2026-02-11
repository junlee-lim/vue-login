<script setup>
import boardService from '@/services/boardService';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    board:{
        title:'',
        contents:''
    }
})

const submit = async() => {
    const result = await (state.board.id ?
                        boardService.boardMod(state.board) :
                        boardService.postBoard(state.board));
    router.push(`/board/${result.resultData}`)
    console.log("result: ", result);
}

onMounted(() => {
    console.log("history.state.data: ", history.state.data);
    if(history.state.data){
        state.board = history.state.data;
    }
})
</script>

<template>
<h3>{{!state.board.id ? 'write' : 'modify'}}</h3>
<div><input type="text" placeholder="title" v-model="state.board.title"></div>
<div><textarea placeholder="contents" v-model="state.board.contents"></textarea></div>
<div><button @click="submit">{{!state.board.id ? 'enroll' : 'modify'}}</button></div>
</template>

<style scoped>

</style>