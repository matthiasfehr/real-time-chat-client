import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';
import {chatRoomDetailsQuery} from './ChatRoomDetails';
import {withRouter} from 'react-router';

class AddMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {message: '', userId: ''};
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(evt) {
        if (evt.keyCode === 13) {
            this.props.mutate({
                variables: {
                    message_input: {
                        body: this.state.message,
                        userId: Number.parseInt(this.state.userId, 10),
                        chatRoomId: this.props.match.params.chatRoomId
                    }
                },
                optimisticResponse: {
                    createMessage: {
                        body: this.state.message,
                        id: Math.round(Math.random() * -1000000),
                        __typename: 'Message',
                    },
                },
                update: (store, {data: {createMessage}}) => {
                    // Read the data from the cache for this query.
                    const data = store.readQuery({
                        query: chatRoomDetailsQuery,
                        variables: {
                            chatRoomId: this.props.match.params.chatRoomId,
                        }
                    });
                    if (!data.chatRoom.messages.find((msg) => msg.id === createMessage.id))
                    {
                        // Add our Message from the mutation to the end.
                        data.chatRoom.messages.push(createMessage);
                    }
                    // Write the data back to the cache.
                    store.writeQuery({
                        query: chatRoomDetailsQuery,
                        variables: {
                            chatRoomId: this.props.match.params.chatRoomId,
                        }, data
                    });
                }
            });
            this.setState({message: '', userId: ''});
        }
    };

    render() {
        return (
            <div className="messageInput">
                <input
                    type="text"
                    placeholder="New message"
                    onKeyUp={this.handleKeyUp}
                    value={this.state.message}
                    onChange={e => this.setState({message: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Userid"
                    onKeyUp={this.handleKeyUp}
                    value={this.state.userId}
                    onChange={e => this.setState({userId: e.target.value})}
                />
            </div>
        );
    }
}

const createMessageMutation = gql`
  mutation createMessage($message_input: MessageInput!) {
    createMessage(message_input: $message_input) {
      id
      body
    }
  }
`;
const AddMessageWithMutation = graphql(createMessageMutation)(withRouter(AddMessage));

export default AddMessageWithMutation;