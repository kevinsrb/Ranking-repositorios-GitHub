import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import  ranking  from "./data/csvjson.json"
import { CSVLink } from "react-csv";



function App() {
  const [inputValues, setInputValues] = useState({
    query: "",
    limit: 10
  });
  const [isLoading, setIsLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  const [error, setError] = useState(false);
  const [repos, setRepos]: any = useState([]);

  const search = (event:any) => {
    event.preventDefault()
    if (!inputValues.query  && !inputValues.limit) {
      return;
    }
    setIsLoading(true);
    const found = ranking.filter((element) => element.language.toLowerCase() == inputValues.query.toLowerCase());
    found.sort(function(a, b) {
      return b.stars - a.stars;
    });
    setIsLoading(false);
    setRepos(  found.slice(0, Number(inputValues.limit)))
       // const url = `https://api.github.com/search/repositories?q=${inputValue} created:2018-12-18`

  }

  const handleInputChange = (event: any) => {
    event.preventDefault()
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
   
  }


  return (
    <>
      <div className="container">
        <h1 className="mt-3">Ranking de repositorios de GitHub</h1>
        <form
          onSubmit={search}
        >
          <div className="mt-3 mb-3">
            <label className="form-label">Language</label>
            <input
              type="text"
              name="query"
              className="form-control"
              value={inputValues.query}
              placeholder="Search Github Repositories"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-3 mb-3">
            <label className="form-label">Limit</label>
            <input
              type="number"
              name="limit"
              value={inputValues.limit}
              className="form-control"
              placeholder="Limit Repositories"
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary float-end" type="submit">Buscar</button>
        </form>
        {isLoading && <div>Loading...</div>}
        {error && (
          <div>
            Unexpected Error Occurred fetching data. Please try again later!
          </div>
        )}
        <table className="table">
          <thead>
            <th>Rank</th>
            <th>Language</th>
            <th>Repository name</th>
            <th>Start ⭐</th>
            <th>username</th>
            <th>Date</th>
          </thead>
          <tbody>
          {repos.length !== 0 ? repos.map((repo: any) => {
            return (
              <tr>
                <td>{repo.rank}</td>
                <td>{repo.language}</td>
                <td>{repo.repo_name}</td>
                <td>{repo.stars}</td>
                <td>{repo.username}</td>
                <td>{repo.last_commit}</td>
              </tr>
            )
          }):
            <tr>
             No hay datos
            </tr>
          }
          </tbody>
          
        </table>
        <CSVLink data={repos} filename={inputValues.query + new Date()}>
        <button className="btn btn-success">Exportar a CSV</button>
        </CSVLink>
      </div>
    </> 
  );
}

export default App;
