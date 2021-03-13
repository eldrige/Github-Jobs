import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';

function App() {
  const { loading, error, jobs } = useFetchJobs();
  return (
    <Container>
      {loading && <h2>loading.........</h2>}
      {error && <h2>Fatal error</h2>}
    </Container>
  );
}

export default App;
