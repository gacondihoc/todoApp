import { useState } from "react";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
const App = () => {
    const [todos, setTodos] = useState([]);

    const createTodo = (title) => {
        const newTodo = { id: crypto.randomUUID(), title: title, completed: false };
        const updatedTodos = [...todos, newTodo];
        // nếu dùng push thì mảng todos chỉ thay đổi giá trị mảng nhưng giá trị tham chiếu không đổi dẫn đến react tưởng giống array cũ => không re render
        setTodos(updatedTodos);
    };

    const removeTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const changeTodo = (id, title, completed = false) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, title, completed };
                // { ...todo, title, completed }; là tạo một bản sao nông todo nếu trong todo có title và completed thì sẽ ghi đè giá trị nếu chưa có thì sẽ thêm mới

            }
            return todo;
        })
    };

    return (
        <main className="main">
            <h1>
                React Todo <span>Streamline Your Day, the React Way!</span>
            </h1>
            <TodoList
                todos={todos}
                removeTodo={removeTodo}
                changeTOdo={changeTodo}
            />
            <TodoCreate
                createTodo={createTodo}
            />
        </main>
    );
};
export default App;