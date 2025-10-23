import TodoShow from "./TodoShow";
import TodosContext from '../context/TodoContext';
import { useContext } from 'react';

const TodoList = () => {
    const { todos } = useContext(TodosContext);

    //thay vì vẽ map trong return tổng thì tạo 1 function để vẽ map ở ngoài rồi chỉ việc ghép lại trong return tổng
    const renderedTodos = todos.map((todo) => {
        return (
            <TodoShow
                key={todo.id}
                todo={todo}
            />
            // todoshow là component vẽ 1 phần tử
        )
    });


    return (
        <ul className="todo-list">{renderedTodos}</ul>
    );
};
export default TodoList;