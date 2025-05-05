import { TextField, Button } from "@mui/material";
import {
    doc,
    addDoc,
    collection,
    orderBy,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config/index.js";
import Todo from "./todo.jsx";
import "./firebase-todo.css";

export default function FirebaseTodo() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [currentEditedTodoId, setCurrentEditedTodoId] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "todo"), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) => {
            console.log(snapshot);
            setTodos(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    todoItem: doc.data(),
                }))
            );
        });
    }, []);

    function handleAddOrEditTodo(e) {
        e.preventDefault();
        if (inputValue.trim() === "") {
            alert("Please enter a todo item.");
            return;
        }
        if (currentEditedTodoId) {
            // Update existing todo
            const todoRef = doc(db, "todo", currentEditedTodoId);
            console.log(todoRef);
            updateDoc(todoRef, {
                todo: inputValue,
                timestamp: serverTimestamp(),
            });
        }
        else{
            addDoc(collection(db, "todo"), {
                todo: inputValue,
                timestamp: serverTimestamp(),
            });
        }
        setInputValue("");
        setCurrentEditedTodoId(null);
    }

    return (
        <div className="firebase-todo-wrapper">
            <h1 className="title" >12. Firebase Todo</h1>
            <form action="" onSubmit={handleAddOrEditTodo}>
                <TextField
                    id="todo"
                    label="Create todo"
                    variant="outlined"
                    size="small"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <br />
                <br />
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit">
                    {currentEditedTodoId ? "Update Todo" : "Add Todo"}
                </Button>
            </form>
            <ul>
                {todos && todos.length > 0 ?
                    todos.map((todo) => (
                        // <li key={todo.id}>{todo.todoItem.todo}</li>
                        <Todo
                            key={todo.id}
                            todoItem={todo}
                            setInputValue={setInputValue}
                            setCurrentEditedTodoId={setCurrentEditedTodoId}
                        />
                    ))
                    : <h2>No todos available ! Please add some</h2>}
            </ul>
        </div>
    );
}
