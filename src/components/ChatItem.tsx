import React from 'react';
import {Chat} from "../types/Chat";

type props = {
  item: Chat
}
const ChatItem = ({item}: props) => {
  return (
    <div className={'chatWrapper'} style={{background: item.isMe ? '#343641' : '#444654'}}>
      <img
        src={item.isMe ?
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyz-77X11MoGE22xVjjPhbpW6lPj6I0SkcTQ&usqp=CAU' :
          'https://stories.techncyber.com/wp-content/uploads/2022/12/chat-gpt-logo.jpg'}
        className={'avatar'}
        alt={'avatar'} />
      <div className={'chatMessage'} dangerouslySetInnerHTML={{__html: item.message}}/>
    </div>
  );
}

export default ChatItem;
