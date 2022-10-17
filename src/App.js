import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from 'react-intersection-observer';
import { sendMessage, selectMessages, refreshMessages } from "./redux/messagesSlice";
import { StyledMessages, Message, LeftMessageBubble, RightMessageBubble } from "./components/Messages";
import { TypeMessageBox, TypeUsernameBox } from "./components/Boxes";

export default function App() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [pageSize, setPageSize] = useState(-26)
  let messages = useSelector(selectMessages).slice(pageSize);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [step, setStep] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.storageArea != localStorage) return;
      if (event.key === 'messages') {
        dispatch(refreshMessages())
      }
     });
  });

   useEffect(() => {
    if (inView) {
      const newPageSize = pageSize -26; 
      setPageSize(newPageSize)
      dispatch(refreshMessages())
    }
  
   }, [inView]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

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
    dispatch(sendMessage({ owner: sessionStorage.getItem("username"), text }));
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSendMessage()
    }
  }

  return (
    <div className="App">
      <h1>Chat with friends</h1>
      <div className="messaging">
        {step === 0 ? (
          <TypeUsernameBox>
            <input
            data-testid="username"
              type="text"
              value={username}
              placeholder="Enter Username"
              name="username"
              onChange={onChangeUsername}
            />
            <button data-testid="add-user" onClick={addUser} disabled={!username}>Add User</button>
          </TypeUsernameBox>
        ) : (
          <div className="messaging">
            <StyledMessages>
              {messages && messages.length > 0
                ? messages.map((message, index) => {
                    return (
                      <div ref={index === 0 ? ref : undefined} key={index}>
                        {message.owner ===
                        sessionStorage.getItem("username") ? (
                          <Message isOwnMessage={message.owner ===
                            sessionStorage.getItem("username")}>
                            <div className="avatar">{'You'}</div>
                          <RightMessageBubble ref={index === 0 ? ref : undefined}>
                            <div className="bubble triangle right-top">
                              <div className="text">
                                <p>
                                  {message.text}
                                </p>
                              </div>
                            </div>
                          </RightMessageBubble>
                          </Message>
                        ) : (
                          <Message isOwnMessage={message.owner ===
                            sessionStorage.getItem("username")}>
                            <div className="avatar">{message.owner[0]}</div>
                          <LeftMessageBubble ref={index === 0 ? ref : undefined}>
                            <div className="bubble triangle left-top">
                              <div className="text">
                                <p>
                                  {message.text}
                                </p>
                              </div>
                            </div>
                          </LeftMessageBubble>
                          </Message>
                        )}
                      </div>
                    );
                  })
                : ""}
                <div ref={bottomRef}></div>
            </StyledMessages>
            <TypeMessageBox>
            <input
              type="text"
              value={text}
              name="message"
              onKeyDown={handleKeyDown}
              placeholder="Leave a message"
              onChange={onChangeMessage}
            />
            <button onClick={onSendMessage} disabled={!text}>Send</button>
            </TypeMessageBox>
          </div>
        )}
      </div>
    </div>
  );
}
