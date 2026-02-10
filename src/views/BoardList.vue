<script setup>
import boardService from '@/services/boardService';
import { reactive, onMounted, computed } from 'vue';

const state = reactive({
    list: [],
    searchText: '',
    size: 50,
    currentPage: 1,
    maxPage: 0
})

onMounted(() => {
    doSearch();
})

const getBoardMaxPage = async() => {
    const params = {
        size: state.size
    }
    if(state.searchText){
        params.search_text = state.searchText
    }
    const result = await boardService.getBoardMaxPage(params);
    state.maxPage = result.resultData;
}

const goToPage = async(page) => {
    state.currentPage = page;
    getBoardNowPage();
}
const getBoardNowPage = async() => {
    const params = {
        page: state.currentPage,
        size: state.size
    }
    if(state.searchText){
        params.search_text = state.searchText
    }
    const result = await boardService.getBoardList(params);
    state.list = result.resultData;
}

const doSearch = () => {
    state.currentPage = 1;
    getBoardMaxPage();
    getBoardNowPage();
}

const pageGroupSize = 10;
const currentGroup = computed(() => Math.ceil(state.currentPage/pageGroupSize));
const startPage = computed(() => ((currentGroup.value -1)*pageGroupSize + 1));
const endPage = computed(() => Math.min(currentGroup.value * pageGroupSize, state.maxPage))
const displayedPages = computed(() => {
    const pages = [];
    for(let i = startPage.value; i<=endPage.value; i++){
        pages.push(i)
    }
    return pages;
})
const nextPage = () => {
    const nextPage = endPage.value < state.maxPage  ? endPage.value + 1 : endPage.value;
    goToPage(nextPage);
}
const previousPage = () => {
    const previousPage = startPage.value > 1 ? startPage.value - 1 : startPage.value;
    goToPage(previousPage);
}
const lastPage = () => {
    goToPage(state.maxPage);
}
const firstPage = () => {
    goToPage(1);
}
</script>

<template>
    <h3>list</h3>
    <div><input type="search" v-model="state.searchText" @keyup.enter="doSearch">
        <button @click="doSearch">search</button>
    </div>
    <p v-if="state.list.length === 0">nothing..</p>
    <table v-else>
        <thead>
            <tr>
                <th>no</th>
                <th>title</th>
                <th>writer</th>
                <th>created at</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="itme in state.list" :key="itme.id">
                <td>{{ itme.id }}</td>
                <td>{{ itme.title }}</td>
                <td>{{ itme.nm }}</td>
                <td>{{ itme.createdAt }}</td>
            </tr>
        </tbody>
    </table>
    <div>{{ startPage }} {{ currentGroup }} {{ endPage }}</div>
    <div>
        <button @click="firstPage" v-show="currentGroup != 1">&lt;&lt;</button>
        <button @click="previousPage" v-show="currentGroup != 1">&lt;</button>
        <span class="page" :class="{selected: item == state.currentPage}" 
                v-for="item in displayedPages" :key="item" @click="goToPage(item)">
            {{ item }}
        </span>
        <button @click="nextPage" v-show="endPage < state.maxPage">&gt;</button>
        <button @click="lastPage" v-show="endPage < state.maxPage">&gt;&gt;</button>
    </div>
</template>

<style scoped>
table{border-collapse: collapse;}
th, td{border: 1px solid black; padding: 10px;}
tbody tr:hover{cursor: pointer; background-color: azure;}
.page{cursor: pointer;}
.page:not(:first-child){margin-left: 8px;}
.selected{color: red; font-weight: bold;}
</style>