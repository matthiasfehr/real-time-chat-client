import React, {Component} from 'react';
import MessageList from './MessageList';
import ChatRoomPreview from './ChatRoomPreview';
import NotFound from './NotFound';

import {
    gql,
    graphql,
} from 'react-apollo';

class ChatRoomDetails extends Component {

    componentWillMount() {
        this.props.data.subscribeToMore({
            document: messagesSubscription,
            variables: {
                chatRoomId: this.props.match.params.chatRoomId,
            },
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const newMessage = subscriptionData.data.messageAdded;
                // don't double add the message
                if (!prev.chatRoom.messages.find((msg) => msg.id === newMessage.id)) {
                    return Object.assign({}, prev, {
                        chatRoom: Object.assign({}, prev.chatRoom, {
                            messages: [...prev.chatRoom.messages, newMessage],
                        })
                    });
                } else {
                    return prev;
                }
            }
        });
    }

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

const messagesSubscription = gql`
  subscription messageAdded($chatRoomId: ID!) {
    messageAdded(chatRoomId: $chatRoomId) {
      id
      body
    }
  }
`;
const ChatRoomDetailsWithData = (graphql(chatRoomDetailsQuery, {
    options: (props) => ({
        variables: { chatRoomId: props.match.params.chatRoomId },
    }),
})(ChatRoomDetails));

export default ChatRoomDetailsWithData;