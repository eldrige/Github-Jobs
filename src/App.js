import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';

function App() {
  const {} = useFetchJobs();
  return (
    <Container>
      <h1>Hello</h1>
    </Container>
  );
}

export default App;
