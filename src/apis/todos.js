import axios from "axios";
const todoDataUrl = "http://localhost:3100/todos";

/**
 * TODO取得
 */
export const getAllTodosData = async () => {
    const response = await axios.get(todoDataUrl);
    return response.data;
}

/**
 * TODO追加
 */
export const addTodoData = async (todo) => {
    const response = await axios.post(todoDataUrl, todo);
    return response.data;
}

/**
 * TODO削除
 */
export const deleteTodoData = async (id) => {
    await axios.delete(`${todoDataUrl}/${id}`);
    return id;
}
/**
 * TODO更新
 */
export const updateTodoData = async (id, todo) => {
    const response = await axios.put(`${todoDataUrl}/${id}`, todo);
    return response.data;
}