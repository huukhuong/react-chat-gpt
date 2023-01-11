import React, {useState} from 'react';
import {getResponseChat} from "../api/Services";
import './App.css'
import {Chat} from "../types/Chat";
import {nanoid} from "nanoid";
import ChatItem from "../components/ChatItem";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [listChats, setListChats] = useState<Chat[]>([]);

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      onPressSend().then(r => {
      });
    }
  }
  const onPressSend = async () => {
    let tmp = [...listChats]
    updateChatList(tmp, message, true);
    setMessage("");

    setLoading(true)
    const result = await getResponseChat(message);
    setLoading(false);

    updateChatList(tmp, result, false)
  }

  const updateChatList = (rootList: Chat[], message: string, isMe: boolean) => {
    const item = ({
      id: nanoid(),
      message: message,
      createdAt: new Date(),
      isMe: isMe,
    })
    rootList.push(item)
    setListChats([...rootList]);
  }


  return (
    <div className={'container'}>
      <div className={'chatContainer'} style={{flex: 1}}>
        {
          listChats.map(item => <ChatItem key={item.id} item={item}/>)
        }
      </div>

      {
        loading &&
          <div className={'containerLoading'}>
              <div className="lds-ripple">
                  <div></div>
                  <div></div>
              </div>
          </div>
      }

      <input
        className={'inputMessage'}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}/>
    </div>
  );
}

export default App;
