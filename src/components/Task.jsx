import { Button, Card, Col, Row } from "react-bootstrap";
import { deleteTask, getAllTask, updateTask } from "../axios/task";
import { useMutation, useQuery } from "react-query";
import { apiError, apiSuccess } from "../utils/errorHandler";
import Loader from "./Backdrop";
import { useEffect, useState } from "react";
import useSearchTag from "../context/SearchContext";

function Task() {
  const { tag } = useSearchTag();
  const [searchData, setSearchData] = useState([]);
  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery(
    "task",
    getAllTask
  );

  const mutateDelete = useMutation((id) => deleteTask(id), {
    onSuccess: () => {
      refetch();
    },
  });
  const mutateUpdate = useMutation((id) => updateTask(id), {
    onSuccess: () => {
      refetch();
    },
  });

  // Delete Task
  const deleteTaskHandler = async (id) => {
    try {
      mutateDelete.mutate(id);
    } catch (error) {
      apiError(error);
    }
  };

  // Update Task
  const updateStatusHanlder = async (id) => {
    try {
      mutateUpdate.mutate(id);
    } catch (error) {
      apiError(error);
    }
  };

  if (isError) {
    apiError(error);
  }
  if (mutateDelete.isError) {
    apiError(mutateDelete.error);
  }
  if (mutateUpdate.isError) {
    apiError(mutateUpdate.error);
  }

  useEffect(() => {
    if (mutateDelete.isSuccess) {
      apiSuccess("Task deleted successfully");
    }
  }, [mutateDelete.isSuccess]);

  useEffect(() => {
    if (mutateUpdate.isSuccess) {
      apiSuccess("Task updated successfully");
    }
  }, [mutateUpdate.isSuccess]);

  useEffect(() => {
    if (!tag) {
      setSearchData(data?.data);
    } else {
      const filterData = data?.data?.filter((task) =>
        task?.title?.includes(tag)
      );
      setSearchData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, mutateUpdate.isSuccess, mutateDelete.isSuccess, tag]);

  return (
    <>
      <Row className="mt-1">
        <h3>Task 🎯</h3>

        {isLoading ? (
          <Loader />
        ) : (
          searchData?.map((task, index) => {
            return (
              <Col className="my-2" col lg={4} md={6} sm={12} key={index}>
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: task?.completed ? "green" : "goldenrod",
                    }}
                  >
                    {index + 1} - {task?.completed ? "Completed" : "Pending"}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{task?.title}</Card.Title>
                    <Card.Text>{task?.description}</Card.Text>
                    <div className="d-flex align-items-center justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => updateStatusHanlder(task?.id)}
                        disabled={mutateUpdate.isLoading}
                      >
                        Complete
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteTaskHandler(task?.id)}
                        disabled={mutateDelete.isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
}

export default Task;
