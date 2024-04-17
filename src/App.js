// import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"

// container
const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: "monospace", "微軟正黑體";
  box-shadow: 0px 0px 16px rgb(199, 197, 197);
  border-radius: 8px;
  padding: 12px 28px;
  color: #6c6c6c;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
`;

// form block
const MessageForm = styled.form`
  margin-top: 16px;
  font-size: 18px;
`;
const MessageLabel = styled.div``;

const MessageTextArea = styled.textarea`
  display: block;
  margin-top: 8px;
  width: 95%;
  border-color: rgba(0, 0, 0, 0.125);
`;
const SubmitButton = styled.button`
  margin-top: 8px;
  color: #ddd;
  background-color: #F77737;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  padding: 6px 12px;
`;

// 顯示留言區塊
const MessageList = styled.div`
  margin-top: 16px;
`;
const MessageContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 16px;
  border-radius: 4px;
`;

const MessageHead = styled.div`
  display: flex;
`;

const MessageAuthor = styled.div`
  margin-right: 12px;
  color: #232323;
`;

const MessageTime = styled.div``;

const MessageBody = styled.div`
  margin-top: 8px;
  word-break: break-all;
  white-space: pre-line;
`;

const ErrorMessage = styled.div`
  margin-top: 16px;
  color: #a83a32;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node,
};

function Message({ author, time, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

const API_ENDPOINT = "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageMessageApiError, setMessageApiError] = useState(null);
  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  }, []);
  // 
  const [value, setValue] = useState();
  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };

  // 阻止預設的表單發送行為
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Page>
      <Title>React Message Board</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageLabel>Context</MessageLabel>
        <MessageTextArea
          value={value}
          onChange={handleTextareaChange}
          rows={8} />
        <SubmitButton>Send</SubmitButton>
      </MessageForm>
      {messageMessageApiError && (
        <ErrorMessage>
          Something went wrong. {messageMessageApiError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <div>No Message</div>}
      <MessageList>
        {messages.map((message) => (
          <Message
            key={message.id}
            author={message.nickname}
            time={new Date(message.createdAt).toLocaleString()}
          >
            {message.body}
          </Message>
        ))}
      </MessageList>
    </Page>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
