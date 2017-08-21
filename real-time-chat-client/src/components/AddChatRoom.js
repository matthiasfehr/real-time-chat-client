import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';
import {chatRoomsListQuery} from './ChatRoomsList';

class AddChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', userId: ''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        if (event.keyCode === 13) {
            this.props.mutate({
                variables: {
                    title: this.state.title,
                    userId: Number.parseInt(this.state.userId, 10)
                },
                optimisticResponse: {
                    createChatRoom: {
                        title: this.state.title,
                        id: Math.round(Math.random() * -1000000),
                        __typename: 'ChatRoom',
                    },
                },
                update: (store, {data: {createChatRoom}}) => {
                    // Read the data from the cache for this query.
                    const data = store.readQuery({query: chatRoomsListQuery});
                    // Add our channel from the mutation to the end.
                    data.chatRooms.push(createChatRoom);
                    // Write the data back to the cache.
                    store.writeQuery({query: chatRoomsListQuery, data});
                }
            });
            this.setState({title: '', userId: ''});
        }
    };

    render() {
        return (
            <div className="messageInput">
                <input
                    type="text"
                    placeholder="Chat room title"
                    onKeyUp={this.handleSubmit}
                    value={this.state.title}
                    onChange={e => this.setState({title: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Userid"
                    onKeyUp={this.handleSubmit}
                    value={this.state.userId}
                    onChange={e => this.setState({userId: e.target.value})}
                />
            </div>
        );
    }
}

const addChatRoomMutation = gql`
  mutation CreateChatRoom($title: String!, $userId: ID!) {
    createChatRoom(title: $title, userId: $userId) {
      id
      title
    }
  }
`;

const AddChatRoomWithMutation = graphql(
    addChatRoomMutation
)(AddChatRoom);

export default AddChatRoomWithMutation;