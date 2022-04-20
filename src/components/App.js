import React, { useRef } from "react";
// スタイル
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
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
        <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
            <TodoTitle
                title="進捗管理"
                as="h1"
                fontSize={{ base: "2xl", md: "3xl" }}
            />
            <TodoAdd
                placeholder="ADD TODO"
                leftIcon={<AddIcon />}
                buttonText="TODOを追加"
                inputEl={inputEl}
                handleAddTodoListItem={handleAddTodoListItem}
            />
            <TodoList
                todoList={inCompletedList}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
                title="未完了TODOリスト"
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
            />
            <TodoList
                todoList={completedList}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
                title="完了TODOリスト"
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
            />
        </Container>
    );
}

export default App;
