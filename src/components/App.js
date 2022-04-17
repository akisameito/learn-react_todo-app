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


    return (
        <>
            <h1>進捗管理</h1>
            <textarea />
            <button>+ TODO追加</button>
            <h2>TODOリスト</h2>
            {todoList.map((todo) => (
                <li key={todo.id}>
                    {todo.content}({todo.done ? "完了" : "未完了"})
                </li>
            ))}
        </>
    );
}

export default App;
