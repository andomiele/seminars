import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import AuthForm from './AuthForm';

const AuthPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" xxl="6" md="8">
          <Card className="card shadow-sm">
            <Card.Body className="card-body row p-5">
              <AuthForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <Card.Text className="text-center">
                <span>{t('authForm.dontHaveAccount')}</span>
                {' '}
                <a href="/signup">{t('authForm.registrationLink')}</a>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
