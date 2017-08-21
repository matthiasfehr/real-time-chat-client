import React from 'react';

import AddMessageWithMutation from './AddMessage';

const MessageList = ({ messages }) => {
    return (
        <div className="messagesList">
            { messages.map( message =>
                (<div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
                    {message.body}
                </div>)
            )}
            <AddMessageWithMutation />
        </div>
    );
};
export default (MessageList);