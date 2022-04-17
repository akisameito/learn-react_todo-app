import { useEffect, useState } from "react";
import axios from "axios";
const todoDataUrl = "http://localhost:3100/todos";

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
            <h1>進捗管理</h1>
            <textarea />
            <button>+ TODO追加</button>
            <h2>未完了TODOリスト</h2>
            {inCompletedList.map((todo) => (
                <li key={todo.id}>
                    {todo.content}
                    <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
                    <button>削除</button>
                </li>
            ))}
            <h2>完了TODOリスト</h2>
            {completedList.map((todo) => (
                <li key={todo.id}>
                    {todo.content}
                    <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
                    <button>削除</button>
                </li>
            ))}
        </>
    );
}

export default App;
