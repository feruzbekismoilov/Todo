import { useRef, useState } from "react";
import Modal from "react-modal";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const usernameRef = useRef();
  const checkboxRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newTodo = {
      id: todos.length + 1,
      username: usernameRef.current.value.trim(),
      completed: false,
    };

    if (selectedIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[selectedIndex] = newTodo;
      setTodos(updatedTodos);
      setSelectedIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }

    usernameRef.current.value = "";
  };

  const handleDelete = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== selectedTodo.id);
    setTodos(updatedTodos);
    closeModal();
  };

  const handleUpdate = (index) => {
    setSelectedIndex(index);
    usernameRef.current.value = todos[index].username;
  };

  const openModal = (todo) => {
    setSelectedTodo(todo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setIsOpen(false);
  };

  const filteredTodos = (type = "all") => {
    if (type === "completed") {
      return todos.filter((item) => item.completed);
    } else if (type === "uncompleted") {
      return todos.filter((item) => !item.completed);
    } else {
      return todos;
    }
  };

  const handleCheckbox = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-5 m-auto mt-5">
          <div className="card">
            <div className="card-header">
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between mb-3">
                  <input
                    className="w-100 form-input"
                    type="text"
                    name="todo_name"
                    defaultValue={
                      selectedIndex !== null
                        ? todos[selectedIndex].username
                        : ""
                    }
                    placeholder="Username"
                    ref={usernameRef}
                  />
                  <button className="btn btn-success" type="submit">
                    Add
                  </button>
                </div>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-warning w-50"
                    type="button"
                    onClick={() => filteredTodos("all")}
                  >
                    All
                  </button>
                  <button
                    className="btn btn-warning w-50"
                    type="button"
                    onClick={() => filteredTodos("completed")}
                  >
                    Completed
                  </button>
                  <button
                    className="btn btn-warning w-50"
                    type="button"
                    onClick={() => filteredTodos("uncompleted")}
                  >
                    Uncompleted
                  </button>
                </div>
              </form>
            </div>
            <div className="card-body">
              <ul className="m-0 p-0">
                {todos.length > 0 &&
                  filteredTodos()?.map((todo, index) => (
                    <li
                      className="d-flex align-items-center mb-2 item"
                      key={todo.id}
                    >
                      <div className="d-flex gap-2">
                        <b>{index + 1}</b>
                        <input
                          className="form-check-input ms-4"
                          type="checkbox"
                          name="todo_check"
                          ref={checkboxRef}
                          checked={todo.completed}
                          onChange={() => handleCheckbox(todo.id)}
                        />
                        <strong className={todo.completed ? "line" : ""}>
                          {todo.username}
                        </strong>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => openModal(todo)}
                        >
                          <AiFillDelete />
                        </button>
                        <button
                          className="btn btn-primary ms-3"
                          onClick={() => handleUpdate(index)}
                        >
                          <BsFillPenFill />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="w-50 bg-light m-auto p-5"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        ariaHideApp={false}
      >
        <h2 className="text-center mb-5">Are you sure you want to delete?</h2>
        <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary me-5" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
