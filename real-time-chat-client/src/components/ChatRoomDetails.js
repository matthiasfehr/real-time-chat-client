import React, {Component} from 'react';
import MessageList from './MessageList';
import ChatRoomPreview from './ChatRoomPreview';
import NotFound from './NotFound';

import {
    gql,
    graphql,
} from 'react-apollo';

class ChatRoomDetails extends Component {

    render() {
        if (this.props.data.loading) {
            return <ChatRoomPreview chatRoomId={this.props.match.params.chatRoomId}/>;
        }
        if (this.props.data.error) {
            return <p>{this.props.data.error.message}</p>;
        }
        if(this.props.data.chatRoom === null){
            return <NotFound />
        }
        return (
            <div>
                <div className="chatRoomName">
                    {this.props.data.chatRoom.title}
                </div>
                <MessageList messages={this.props.data.chatRoom.messages}/>
            </div>);
    }
}

export const chatRoomDetailsQuery = gql`
  query ChatRoomDetailsQuery($chatRoomId : ID!) {
    chatRoom(id: $chatRoomId) {
      id
      title
      messages {
        id
        body
      }
    }
  }
`;
const ChatRoomDetailsWithData = (graphql(chatRoomDetailsQuery, {
    options: (props) => ({
        variables: { chatRoomId: props.match.params.chatRoomId },
    }),
})(ChatRoomDetails));

export default ChatRoomDetailsWithData;