/**
 * TODOアイテムコンポーネント
 */
export const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
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
