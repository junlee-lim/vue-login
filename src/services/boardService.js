import axios from "axios";

class BoardService{
    #url = "/board"

    async postBoard(params){
        const res = await axios.post(this.#url, params)
        return res.data;
    }

    async getBoardList(params){
        const res = await axios.get(this.#url, {params})
        return res.data;
    }

    async getBoardMaxPage(params){
        const res = await axios.get(`${this.#url}/max_page`, {params})
        return res.data;
    }
    async getBoardById(id){
        const res = await axios.get(`${this.#url}/${id}`)
        return res.data;
    }
    async boardDel(params){
        const res = await axios.delete(this.#url, {params})
        return res.data;
    }
    async boardMod(params){
        const res = await axios.put(this.#url, params)
        return res.data;
    }
    async getBoardRelatedTitles(params){
        const res = await axios.get(`${this.#url}/related_search`, {params})
        return res.data;
    }
}

export default new BoardService();