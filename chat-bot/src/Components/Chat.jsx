import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
const Chat = () => {
  const OPENROUTER_API_KEY =
    "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";
  const [message, setMessage] = useState([]);
  const [responseMessage, setResponseMessage] = useState([]);
  const [conversation, setConversation] = useState([]);
  const sendMessage = async () => {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gryphe/mythomist-7b",
            messages: [{ role: "user", content: message }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data.choices[0].message.content);
      const newConversation = [
        ...conversation,
        { role: "user", content: message },
        { role: "bot", content: data.choices[0].message.content },
      ];
      setConversation(newConversation);
      setMessage("");
    } catch (error) {
      //   setError(error);
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-8">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`mb-4 ${
                item.role === "user" ? "self-end" : "self-start"
              }`}
            >
              <div
                className={`rounded-lg p-2  ${
                  item.role === "user"
                    ? "bg-slate-600 text-white float-right mt-3"
                    : "bg-pink-500 text-white float-left mr-52 mt-5 "
                }`}
              >
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="fixed bottom-0 left-72 right-0 p-4 rounded-lg flex justify-center">
       

        <input
          type="text"
          placeholder="Type your message here....."
          className="w-1/2 py-2 px-2 rounded-md bg-black text-white  border-red-600  border-2 focus:outline-none focus:border-red-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex items-center bg-black rounded-full p-3 ">
          <BsFillSendFill
            className="text-white cursor-pointer"
            onClick={sendMessage}
          />
        </div>
        {responseMessage && (
          <div className="mt-4">
            <p className="text-gray-800">{responseMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
