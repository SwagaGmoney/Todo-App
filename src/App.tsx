import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faEdit,
  faTrash,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import TaskFilter from "./TaskFilter";

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 84, 99, 1) 0%,
    rgba(22, 0, 33, 1) 100%
  );
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  position: relative;
`;

const Container = styled.div`
  width: 80%;
  height: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 7em;
  top: 20vh;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;

  @media (max-width: 768px) {
    left: 0.6rem;
  }
`;

const Heading = styled.h1`
  font-size: 30px;
  padding: 5px 0;
  color: white;
`;

const InputField = styled.input`
  width: 80%;
  height: 1vh;
  margin-top: 20px;
  align-items: center;
  border-radius: 20px;
  padding: 20px;
  font-size: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Button = styled.button`
  color: white;
  cursor: pointer;
  width: 4vh;
  height: 4vh;
  z-index: 999;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(0, 84, 99, 1) 0%,
    rgba(22, 0, 33, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 23em; 
  right: 18rem; 

  @media (max-width: 768px) {
    top: 22.7em; 
    right: 2.4rem; 
  }

  &:hover {
    background: rgb(90, 15, 144);
    background: linear-gradient(
      90deg,
      rgba(90, 15, 144, 1) 0%,
      rgba(94, 0, 79, 1) 100%
    );
    transform: scale(1.2);
  }
`;


const TaskList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 40px;
`;

const TaskItem = styled.li`
  flex: 0 0 68%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const TaskDescription = styled.span`
  flex-grow: 1;
  font-size: 25px;
  font-weight: bold;
`;

const IconContainer = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: flex-end;
  gap: 14px;
  cursor: pointer;
  margin-top: -20px;
`;

const OptionsContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 18.5em;
  left: 78.4%;
  transform: translateX(-50%);
  background-color: #3b415e;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;

  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  transition-duration: 0.3s;

  @media (max-width: 768px) {
    top: 19em;
    left: 83%;
  }
`;

const Option = styled.div`
  cursor: pointer;
  font-size: 17px;
  color: white;
  padding: 5px;
  &:hover {
    background-color: #160021;
  }
`;

interface Task {
  id: number;
  description: string;
  status: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [showOptions, setShowOptions] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  let hideTimeout: NodeJS.Timeout;

  const handleMouseEnter = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    taskId: number
  ) => {
    clearTimeout(hideTimeout);
    setShowOptions(taskId);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setShowOptions(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hideTimeout);
    };
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  const addTask = () => {
    if (taskDescription.trim() !== "") {
      const newTaskId = tasks.length + 1;
      const newTask: Task = {
        id: newTaskId,
        description: taskDescription,
        status: "pending",
      };
      setTasks([...tasks, newTask]);
      setTaskDescription("");
    }
  };

  const editTask = (taskId: number, newDescription: string | null) => {
    if (newDescription !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      );
      setTasks(updatedTasks);
    }
  };

  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const changeStatus = (taskId: number, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <Wrapper>
        <Heading>To-Do App</Heading>
      </Wrapper>

      <InputField
        placeholder="Add Todos"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <Button onClick={addTask}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <TaskFilter onFilterChange={handleFilterChange} />

      <TaskList>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id}>
            <TaskDescription>{task.description}</TaskDescription>
            <IconContainer>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() =>
                  editTask(task.id, prompt("Enter new task description:"))
                }
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => removeTask(task.id)}
              />
              {task.status === "completed" ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  onMouseEnter={(e) => handleMouseEnter(e, task.id)}
                  onMouseLeave={handleMouseLeave}
                  data-taskid={task.id}
                />
              )}
              {showOptions === task.id && task.status === "pending" && (
                <OptionsContainer isVisible={showOptions === task.id}>
                  <Option onClick={() => changeStatus(task.id, "inProgress")}>
                    In Progress
                  </Option>
                  <Option onClick={() => changeStatus(task.id, "completed")}>
                    Completed
                  </Option>
                </OptionsContainer>
              )}
              {showOptions === task.id && task.status === "inProgress" && (
                <OptionsContainer isVisible={showOptions === task.id}>
                  <Option onClick={() => changeStatus(task.id, "completed")}>
                    Completed
                  </Option>
                </OptionsContainer>
              )}
            </IconContainer>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

export default App;
