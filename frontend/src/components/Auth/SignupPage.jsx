import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import SignupForm from './SignupForm';

const SignupPage = () => (
  <Container className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs="12" xxl="6" md="8">
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <SignupForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignupPage;
