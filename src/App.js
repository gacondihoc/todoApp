import { useContext, useEffect } from "react";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
import TodosContext from './context/TodoContext';

const App = () => {
    const { getTodos } = useContext(TodosContext);

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <main className="main">
            <h1>
                React Todo <span>Streamline Your Day, the React Way!</span>
            </h1>
            <TodoList />
            <TodoCreate />
        </main>
    );
};
export default App;