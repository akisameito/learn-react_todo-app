import React, { useRef } from "react";
// カスタムフック
import { useTodo } from "../hooks/useTodo";
// コンポーネント
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

function App() {
    const {
        todoList,
        addTodoListItem,
        toggleTodoListItemStatus,
        deleteTodoListItem
    } = useTodo();

    /** TODO入力フォーム */
    const inputEl = useRef(null);

    /** TODO追加 */
    const handleAddTodoListItem = () => {
        if (inputEl.current.value === "") return;
        addTodoListItem(inputEl.current.value);
        inputEl.current.value = "";
    }

    /** 未完了 */
    const inCompletedList = todoList.filter((todo) => {
        return !todo.done;
    })
    /** 完了 */
    const completedList = todoList.filter((todo) => {
        return todo.done;
    })

    return (
        <>
            <TodoTitle title="進捗管理" as="h1" />
            <TodoAdd
                buttonText="+ TODOを追加"
                inputEl={inputEl}
                handleAddTodoListItem={handleAddTodoListItem}
            />
            <TodoList
                todoList={inCompletedList}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
                title="未完了TODOリスト"
                as="h2"
            />
            <TodoList
                todoList={completedList}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
                title="完了TODOリスト"
                as="h2"
            />
        </>
    );
}

export default App;
