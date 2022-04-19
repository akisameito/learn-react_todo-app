import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";

/**
 * titleコンポーネント
 */
const TodoTitle = ({ title, as }) => {
    if (as === "h1") {
        return <h1>{title}</h1>;
    } else if (as === "h2") {
        return <h2>{title}</h2>;
    } else {
        return <p>{title}</p>;
    }
}

/**
 * TODOアイテムコンポーネント
 */
const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
    /** TODO状態変更 */
    const handleToggleTodoListItemStatus = () => toggleTodoListItemStatus(todo.id, todo.done);
    /** TODO削除 */
    const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

    return (
        <li>
            {todo.content}
            <button onClick={handleToggleTodoListItemStatus}>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
            <button onClick={handleDeleteTodoListItem}>削除</button>
        </li>
    );
}

/**
 * TODOリストコンポーネント
 */
const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem }) => {
    return (
        <ul>
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} />
            ))}
        </ul>
    );
}

/**
 * TODO追加コンポーネント
 */
const TodoAdd = ({ inputEl, handleAddTodoListItem }) => {
    return (
        <>
            <textarea ref={inputEl} />
            <button onClick={handleAddTodoListItem}>+ TODOを追加</button>
        </>
    );
};

function App() {
    const { todoList, addTodoListItem, toggleTodoListItemStatus, deleteTodoListItem } = useTodo();
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

    console.log("TODOリスト:", todoList);
    console.log("未完了リスト:", inCompletedList);
    console.log("完了リスト:", completedList);

    return (
        <>
            <TodoTitle title="進捗管理" as="h1" />
            <TodoAdd inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} />
            
            <TodoTitle title="未完了TODOリスト" as="h2" />
            <TodoList todoList={inCompletedList} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} />

            <TodoTitle title="完了TODOリスト" as="h2" />
            <TodoList todoList={completedList} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} />
        </>
    );
}

export default App;
