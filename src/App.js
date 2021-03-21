import { useState } from 'react';
import useFetchJobs from './Hooks/useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './components/Job';
import Pagination from './components/jobPagination';
import Loader from './components/Loader';
import SearchForm from './components/SearchForm';
import './index.css';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { loading, error, jobs, hasNextPage } = useFetchJobs(params, page);
  // the event comes from the input
  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // search from the first page
    setPage(1);
    setParams((prevParams) => {
      return {
        ...prevParams,
        [param]: value,
        // ! take ur prev params, and set the new params to the current value in the input field
      };
    });
  };

  return (
    <Container className="my-3">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <Pagination page={page} setPage={setPage} hasNextPage={true} />
      {loading && <Loader />}
      {error && <h2>Please check your internet</h2>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
