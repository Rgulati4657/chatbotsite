import React from 'react';
import styles from './LeverageChat.module.css';

const MainContent = () => {
  return (
    <div className={styles["main-content"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["text-section"]}>
          <h1>Leverage a chatbot API to build an AI Chatbot</h1>
          <p>
            Want to go deeper than the usual chatbot platform? Modern solutions like Mediator
            let you craft AI-native workflows using a dedicated chatbot API. Available in 5
            different API libraries, we’ve made it easier for you to connect your data to our
            customer service platform. Simply connect a third-party LLM tool such as
            Dialogflow, OpenAI, Llama or Claude to bring AI to your customer experience!
          </p>
          <button className={styles["learn-more-btn"]}>Learn More</button>
        </div>
        <div className={styles["code-section"]}>
          <div className={styles["code-block"]}>
            <div className={styles["code-circle"]}>
              <span className={styles.circle}></span>
              <span className={styles.circle}></span>
              <span className={styles.circle}></span>
              <hr className={styles.hello}></hr>
            </div>
            <pre>
              <code>
{`// Receive a message from a visitor
crispClient.on("message:send", async (message) => {
  const sessionId = message.session_id;
  const userMessage = message.content;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [ { role: "user", content: userMessage } ]
  });

  const aiReply = response.choices[0].message.content;

  crispClient.website.sendMessageInConversation(
    message.website_id,
    sessionId,
    {
      type: "text",
      content: aiReply,
      from: "operator",
      origin: "chat"
    }
  );
});
`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;