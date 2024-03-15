import React, { useState } from "react";
import "./index.scss";

type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodo, setNewTodo] = useState<string>("");

	const addTodo = () => {
		if (newTodo.trim() === "") return;
		const newTodoItem: Todo = {
			id: todos.length + 1,
			text: newTodo,
			completed: false,
		};
		setTodos([...todos, newTodoItem]);
		setNewTodo("");
	};

	const toggleTodo = (id: number) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id: number) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="App">
			<h1>Todo List</h1>
			<div>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<button className="button" onClick={addTodo}>
					Add Todo
				</button>
			</div>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleTodo(todo.id)}
						/>
						<span
							style={{
								textDecoration: todo.completed ? "line-through" : "none",
							}}>
							{todo.text}
						</span>
						<button className="button" onClick={() => deleteTodo(todo.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
export default App;
