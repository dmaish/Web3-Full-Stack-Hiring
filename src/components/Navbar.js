import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Crypto Checker</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;