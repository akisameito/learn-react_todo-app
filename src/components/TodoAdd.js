/**
 * TODO追加コンポーネント
 * 
 * textareaにテキストを入力し、ボタン押下で新規TODO追加
 */
export const TodoAdd = ({ buttonText, inputEl, handleAddTodoListItem }) => {
    return (
        <>
            <textarea ref={inputEl} />
            <button onClick={handleAddTodoListItem}>{buttonText}</button>
        </>
    );
};