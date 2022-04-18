import { useState, useEffect } from "react";
import { ulid } from "ulid";
import * as todoData from "../apis/todos";

/**
 * カスタムフック
 */
export const useTodo = () => {
    /** 現在のTODOリスト */
    const [todoList, setTodoList] = useState([]);

    // useEffect()利用することで、コンポーネントマウント後に処理を実行
    useEffect(() => {
        // TODOリスト取得
        todoData.getAllTodosData().then((todo) => {
            setTodoList([...todo].reverse()); // 追加した順に上から表示
        });
    }, []);

    /**
     * TODOdone(完了/未完了)更新
     */
    const toggleTodoListItemStatus = (id, done) => {
        // 検索
        const todoItem = todoList.find((item) => item.id === id)
        // 更新データ作成
        const newTodoItem = { ...todoItem, done: !done }

        // 更新
        todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
            const newTodoList = todoList.map((item) =>
                item.id !== updatedTodo.id ? item : updatedTodo
            );
            setTodoList(newTodoList);
        });
    };

    /**
     * TODO追加
     * @param {*} todoContent todoの内容
     */
    const addTodoListItem = (todoContent) => {
        // 追加データ作成
        const newTodoItem = {
            content: todoContent,
            id: ulid(),
            done: false // 未完了
        };

        // 追加
        return todoData.addTodoData(newTodoItem).then((addTodo) => {
            setTodoList([addTodo, ...todoList]);
        });
    };

    /**
     * TODO削除
     * @param {*} id 
     */
    const deleteTodoListItem = (id) => {
        // 削除
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(
                (item) => item.id !== deleteListItemId
            );
            setTodoList(newTodoList);
        });
    };

    // 作成した関数を返す
    return {
        /** 現在のTODOリスト */
        todoList,
        toggleTodoListItemStatus,
        addTodoListItem,
        deleteTodoListItem
    }
}