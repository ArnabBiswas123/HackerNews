// import './App.css';
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("science");
  const [text, setText] = useState("");
  const [largeTitle, setLargeTitle] = useState([]);
  const [loading, setloading] = useState(true);
  // const [isvalid, setisvalid] = useState(true);

  useEffect(() => {
    setloading(true);
    const fetchArticles = async () => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      const data = await res.json();
      console.log(data.hits);
      if(data.hits.length===0){
        // setisvalid(false)
        console.log('running')
        toast("No such news")
        setloading(false)
        // setQuery("science")
        return;
      }
      else{

        setItems(data.hits);
        // console.log(items)
        setLargeTitle(data.hits[0]);
        setloading(false);
      }
    };

    fetchArticles();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      toast("Input is Empty");
    } else {
      setQuery(text);
      setText("");
    }
  };

  return (
    <section className="section">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for something"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Search</button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {" "}
          <article className="title">
            <h1>{largeTitle.title}</h1>
            <a href={largeTitle.url} target="_blank" rel="noreferrer">
              Read full article
            </a>
          </article>
          <p className="category">
            Category:<span> {query}</span>{" "}
          </p>
          <article className="cards">
            {items.map((item) => {
              return (
                <div key={item.objectId}>
                  <h2>{item.title}</h2>
                  <ul>
                    <li>By {item.author} </li>
                    <li>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        Read More
                      </a>
                    </li>
                  </ul>
                  <p>{format(new Date(item.created_at), "dd MMMM yyyy")}</p>
                </div>
              );
            })}
          </article>
        </>
      )}
    </section>
  );
}

export default App;
