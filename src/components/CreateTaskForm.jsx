import { Button, Col, Form, Row } from "react-bootstrap";
import { apiError, apiSuccess, customError } from "../utils/errorHandler";
import { useEffect, useState } from "react";
import { useMutation, QueryClient } from "react-query";
import { addTask } from "../axios/task";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();
function CreateTaskForm() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // mutate
  const { mutate, isSuccess, isLoading, isError, error } = useMutation(
    (data) => addTask(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("task");
      },
    }
  );

  const handleOnchange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTask({ ...task, [name]: value });
  };

  const createTaskHandler = async (e) => {
    e.preventDefault();

    const { title, description } = task;

    if (!title || !description) {
      customError("Please provide a title and description");
      return;
    }
    try {
      // mutate the task
      mutate(task);
    } catch (error) {
      apiError(error);
    }
  };

  if (isError) {
    apiError(error);
  }

  useEffect(() => {
    if (isSuccess) {
      apiSuccess("Task added successfully");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <Row className="h-100">
        <h3>Add Task</h3>
        <hr />
        <Col col lg={6} md={8} sm={12} className="mx-auto">
          <Form className="shadow p-3" onSubmit={createTaskHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={task.title}
                onChange={handleOnchange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={task.description}
                onChange={handleOnchange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? "creating" : "Add Task"}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CreateTaskForm;
