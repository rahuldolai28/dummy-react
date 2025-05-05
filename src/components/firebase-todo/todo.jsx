import React from "react";
import { List, ListItem, Button, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UndoIcon from '@mui/icons-material/Undo';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config/index.js";

function Todo({ todoItem, setInputValue, setCurrentEditedTodoId }) {
    const [isDone, setIsDone] = React.useState(false);

    function handleDelete(id) {
        deleteDoc(doc(db, "todo", id));
    }

    return (
        <div>
            <List>
                <ListItem className="list-item">
                    <ListItemText
                        className={isDone ? "success" : ""}
                        primary={todoItem?.todoItem?.todo}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={isDone ? <UndoIcon/> : <CheckCircleOutlineIcon />}
                        onClick={() => {
                            setIsDone(!isDone);
                        }}>
                        {isDone ? "Undo" : "Done"}
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={ <EditIcon />}
                       
                        onClick={() => {
                            setCurrentEditedTodoId(todoItem?.id);
                            setInputValue(todoItem?.todoItem?.todo);
                        }}>
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(todoItem?.id)}>
                        Delete
                    </Button>
                </ListItem>
            </List>
        </div>
    );
}

export default React.memo(Todo);
