import { useEffect, useState } from "react";
import axios from "axios";
const todoDataUrl = "http://localhost:3100/todos";

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
const TodoItem = ({ todo }) => {
    return (
        <li>
            {todo.content}
            <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
            <button>削除</button>
        </li>
    );
}

/**
 * TODOリストコンポーネント
 */
const TodoList = ({ todoList }) => {
    return (
        <ul>
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </ul>
    );
}

function App() {
    /** 現在のTODOの状態 */
    const [todoList, setTodoList] = useState([]);

    // useEffect()利用することで、コンポーネントマウント後に処理を実行
    useEffect(() => {
        const fetchData = async () => {
            // TODO情報取得
            const response = await axios.get(todoDataUrl);
            // TODO情報設定
            setTodoList(response.data);
        }
        fetchData();
    }, []);

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
            <textarea />
            <button>+ TODO追加</button>
            <TodoTitle title="未完了TODOリスト" as="h2" />
            <TodoList todoList={inCompletedList} />

            <TodoTitle title="完了TODOリスト" as="h2" />
            <TodoList todoList={completedList} />
        </>
    );
}

export default App;
