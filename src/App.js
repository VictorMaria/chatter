import "./styles.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage, selectMessages } from "./redux/messagesSlice";
import { StyledMessages, Message, RightMessageBubble } from "./Messages";

export default function App() {
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [step, setStep] = useState(0);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const addUser = () => {
    sessionStorage.setItem("username", username);
    setStep(1);
  };

  const onChangeMessage = (e) => {
    setText(e.target.value);
  };

  const onSendMessage = () => {
    dispatch(sendMessage({ owner: sessionStorage.getItem('username'), text }));
  };

  return (
    <div className="App">
      <h1>Chat with friends</h1>
      <div>
        {step === 0 ? (
          <div>
            <input
              type="text"
              value={username}
              placeholder="Enter Username"
              name="username"
              onChange={onChangeUsername}
            />
            <button onClick={addUser}>Add</button>
          </div>
        ) : (
          <div>
            <StyledMessages>
              {messages && messages.length > 0
                ? messages.map((message, index) => {
                    return (
                      <Message isOwnMessage={message.owner === sessionStorage.getItem('username')} key={index}>
                        <div id='avatar'>{message.owner[0].toUpperCase()}</div>
                        <div id='text'><span>{message.text}</span></div>
                      </Message>
                    );
                  })
                : ""}
            </StyledMessages>
            <input
              type="text"
              value={text}
              name="message"
              onChange={onChangeMessage}
            />
            <button onClick={onSendMessage}>Send Message</button>
          </div>
        )}
      </div>
    </div>
  );
}
