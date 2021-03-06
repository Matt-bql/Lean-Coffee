import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// Styles
import "./Styles/App.scss";
import "./Styles/Reset.css";
import "./Styles/Header.scss";
import "./Styles/ContentBody.scss";
// Components/Functions/StateManagement
import Header from "./components/Header.js";
import ContentBodyParent from "./components/ContentBodyParent.js";
import DiscussionSession from "./components/DiscussionSession.js";
import { TopicContext } from "./components/Contexts/TopicContext";

export default function App() {
  // State
  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTopics();
  }, []);

  // Functions
  // Fetching data
  async function getTopics() {
    try {
      await axios
        .get("http://localhost:8000/api/topics")
        .then(response => response.data)
        .then(res => setTopics(res.Items));
    } catch (err) {
      console.log("Did not fetch topics: ", err);
    } finally {
    }
  }

  // Grabs input data to eventually use when 'add topic' button is clicked.
  function topicInputHandler(e) {
    setTopicInput(e.target.value);
  }
  // make post -- gives me response. I update ui using react
  // this function makes use of optimistic ui concepts..
  async function createTopic() {
    if (topicInput === "") {
      alert("Topic cannot be empty.");
    } else {
      try {
        setIsLoading(true);
        const newTopic = {
          id: uuidv4().toString(),
          topicTitle: topicInput,
        };
        setTopicInput("");
        await axios
          .post("http://localhost:8000/api", newTopic)
          .then(res => {
            setIsLoading(false);
            return res;
          })
          .then(res => {
            // make sure update happened. Only update the ui if the
            // DB has been updated. if not, show error.
            console.log("foobar", res);
            const updatedTopics = [...topics, newTopic];
            setTopics(updatedTopics);
          });
      } catch (err) {
        console.log("error with 'createTopic()': ", err);
      }
    }
  }

  return (
    // Using React-Router for Home/Session Pages
    <>
      <Router>
        <Header className='Header' />
        <div className='App-Body'>
          <Switch>
            <TopicContext.Provider
              value={{
                topics,
                isLoading,
                getTopics,
                setIsLoading,
                setTopics,
              }}
            >
              <Route exact path='/'>
                <div>
                  <ContentBodyParent
                    className='Topic-Child-Container'
                    createTopic={createTopic}
                    input={topicInput}
                    topicInputHandler={topicInputHandler}
                  />
                </div>
              </Route>
              <Route exact path='/discussion'>
                <DiscussionSession />
              </Route>
            </TopicContext.Provider>
          </Switch>
        </div>
      </Router>
    </>
  );
}
