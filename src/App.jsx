import './App.css'
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div>
        <h2>Paginated Table</h2>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}>
            {pageNumbers.map((number) => (
              <li key={number} style={{ margin: '0 5px' }}>
                <button
                  onClick={() => paginate(number)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: currentPage === number ? 'blue' : 'gray',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
