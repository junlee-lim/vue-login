<script setup>
import boardService from '@/services/boardService';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication';

const route = useRoute();
const router = useRouter();
const authentication = useAuthenticationStore();

const state = reactive({
    data:{
        id: 0,
        title:'',
        contents:'',
        createdAt:'',
        nm:'',
        userId: 0
    }
})

onMounted(async() => {
    const result = await boardService.getBoardById(route.params.id);
    state.data = result.resultData;
    console.log(state.data.userId);
    console.log(authentication.state.signedUser.signedUserId);
})

const boardDel = async() => {
    if(!confirm("really delete?")){
        return;
    }
    const params = {
        id: route.params.id
    }
    const res = await boardService.boardDel(params)
    if(res.resultData){
        router.push('/board/list');
    }
}

const boardMod = async() => {
    router.push({
        path: '/board/write',
        state: {
            data:{
                id: route.params.id,
                title: state.data.title,
                contents: state.data.contents
            }
        }
    })
}
</script>

<template>
<h3>detail</h3>
<div>{{ state.data.title }}</div>
<div>{{ state.data.nm }}</div>
<div>{{ state.data.contents }}</div>
<div>{{ state.data.createdAt }}</div>
<div v-show="authentication.state.signedUser.signedUserId === state.data.userId">
    <button @click="boardDel">delete</button>
    <button @click="boardMod">modify</button>
</div>
</template>

<style scoped>

</style>