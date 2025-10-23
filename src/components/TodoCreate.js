import { useContext, useState } from "react";
import TodosContext from '../context/TodoContext';

const TodoCreate = () => {
    const [todo, setTodo] = useState('');
    const { createTodo } = useContext(TodosContext);

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // chặn reload lại trang
        createTodo(todo);
        setTodo('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-create">
            <input
                type="text"
                name="todo"
                id="todo"
                placeholder="Enter a todo"
                value={todo}
                onChange={handleChange}
            />
        </form>
    );
};
export default TodoCreate;