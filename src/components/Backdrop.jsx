import { Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <Row className="d-flex justify-content-center align-items-center h-100 w-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Row>
  );
}

export default Loader;
