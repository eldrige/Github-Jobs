import { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';
import Pagination from './jobPagination';
import Loader from './Loader';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { loading, error, jobs, hasNextPage } = useFetchJobs(params, page);
  return (
    <Container className="my-3">
      <h1 className="mb-4">Github Jobs</h1>
      <Pagination page={page} setPage={setPage} hasNextPage={true} />
      {loading && <Loader />}
      {error && <h2>Fatal error</h2>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
