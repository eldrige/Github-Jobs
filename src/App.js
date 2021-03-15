import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import Job from './Job';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { loading, error, jobs } = useFetchJobs(params, page);
  return (
    <Container>
      {loading && <h2>loading.........</h2>}
      {error && <h2>Fatal error</h2>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
