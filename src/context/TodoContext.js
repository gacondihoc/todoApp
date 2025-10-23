import { createContext, useState } from 'react';

const TodosContext = createContext();

const Provider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        const url = 'http://localhost:5000/todos';
        try {

            //fetch() = gửi yêu cầu (request) đến URL, rồi nhận phản hồi (response) từ server.
            const response = await fetch(url, {
                //Kiểu hành động muốn làm với server.
                method: 'GET',
                //Gửi thêm thông tin cho server biết kiểu dữ liệu mình gửi.
                //- 'Content-Type': 'application/json' nghĩa là “tao gửi dữ liệu dạng JSON”
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const storedTodos = await response.json();
            // Update the state
            if (storedTodos) setTodos(storedTodos);
        } catch (error) {
            console.error('Error during GET request:', error);
        }
    };


    const createTodo = async (title) => {
        const newTodo = {
            title: title,
            completed: false,
        };

        const url = 'http://localhost:5000/todos';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //Phần nội dung thật sự gửi đi (payload).
                //Vì server chỉ hiểu JSON, nên ta chuyển object thành chuỗi bằng JSON.stringify()
                body: JSON.stringify(newTodo),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const storedTodo = await response.json();

            const updatedTodos = [...todos, storedTodo];
            // nếu dùng push thì mảng todos chỉ thay đổi giá trị mảng nhưng giá trị tham chiếu không đổi dẫn đến react tưởng giống array cũ => không re render
            setTodos(updatedTodos);

        } catch (error) {
            console.error('Error creating a todo:', error);
        }

    };

    const removeTodo = async (id) => {

        const url = `http://localhost:5000/todos/${id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error during DELETE request:', error);
            throw error;
        }
    };

    const changeTodo = async (id, newTitle, completed = false) => {

        const url = `http://localhost:5000/todos/${id}`;

        const data = { title: newTitle, completed };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            const updatedTodos = todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, ...responseData };
                    // { ...todo, title, completed }; là tạo một bản sao nông todo nếu trong todo có title và completed thì sẽ ghi đè giá trị nếu chưa có thì sẽ thêm mới

                }
                return todo;
            });
            setTodos(updatedTodos)
        } catch (error) {
            console.error('Error during PUT request:', error);
            throw error;
        }


    };


    const shared = { todos, getTodos, createTodo, removeTodo, changeTodo };

    return (
        <TodosContext.Provider value={shared}>{children}</TodosContext.Provider>
    );
};

export default TodosContext;

export { Provider };
