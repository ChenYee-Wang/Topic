import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./chatgpt.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";

const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a Customer Service Specialist of Social Platforms with 10 years of experience. 會在句尾加上'喵<3'",
};

function ChatGpt() {
  const [notifys, setNotifys] = useState([]);

  const [messages, setMessages] = useState([
    {
      message: "你好，我是智能客服，請問需要什麼幫助嗎?",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  useEffect(() => {
    async function getNotify() {
      try {
        const response = await axios.get("api/notify");
        console.log(response.data);
        setNotifys(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getNotify();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="content">
          <input
            className="radio"
            type="radio"
            defaultChecked=""
            id="home"
            name="slider"
          />
          <input className="radio" type="radio" id="chat" name="slider" />
          <input className="radio" type="radio" id="user" name="slider" />
          <input className="radio" type="radio" id="info" name="slider" />
          <input className="radio" type="radio" id="settings" name="slider" />
          <div className="list">
            <label htmlFor="home" className="home-btn">
              <span className="title maintitle">ChatGPT客服</span>
            </label>
            <div className="space" />
            <label htmlFor="chat" className="chat-btn notify-btn" tabindex="1">
              <span className="title">活動通知</span>
            </label>
            <label htmlFor="user" className="user-btn notify-btn" tabindex="1">
              <span className="title">帳號通知</span>
            </label>
            <label htmlFor="info" className="info-btn notify-btn" tabindex="1">
              <span className="title">系統通知</span>
            </label>
            <div className="slider" />
          </div>
          <div className="text-content">
            <div className="home text chatgpt">
              <div className="title">ChatGPT客服</div>
              <div className="message">
                <MainContainer>
                  <ChatContainer>
                    <MessageList
                      scrollBehavior="smooth"
                      typingIndicator={
                        isTyping ? (
                          <TypingIndicator content="客服回應中" />
                        ) : null
                      }
                    >
                      {messages.map((message, i) => {
                        console.log(message);
                        return <Message key={i} model={message} />;
                      })}
                    </MessageList>
                    <MessageInput
                      placeholder="請輸入問題"
                      onSend={handleSend}
                    />
                  </ChatContainer>
                </MainContainer>
              </div>
            </div>
            <div className="chat text bulletin">
              <div className="title">活動通知</div>
              <ul className="bulletin_ul">
              {notifys.map((notify) => {
                  return (
                    <li className="bulletin_li">
                      {notify.notify_state}
                    </li>
                  );
                })}
              </ul>
              <div className="bulletin_btn">
                <button className="next_btn">
                  <i className="uil uil-step-forward" />
                </button>
              </div>
            </div>
            <div className="user text bulletin">
              <div className="title">帳號通知</div>
              <ul className="bulletin_ul">
                <li className="bulletin_li">
                  我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥
                </li>
                <div className="bulletin_btn">
                  <button className="next_btn">
                    <i className="uil uil-step-forward" />
                  </button>
                </div>
              </ul>
            </div>
            <div className="info text bulletin">
              <div className="title">系統通知</div>
              <ul className="bulletin_ul">
                <li className="bulletin_li">
                  我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥我好帥
                </li>
                <div className="bulletin_btn">
                  <button className="next_btn">
                    <i className="uil uil-step-forward" />
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChatGpt;
