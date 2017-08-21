import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';
import { chatRoomsListQuery } from '../App';

class AddChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', userId: ''};
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    };

    handleUserIdChange(e) {
        this.setState({userId: e.target.value});
    };

    handleSubmit() {
        this.props.mutate({
            variables: {
                title: this.state.title,
                userId: Number.parseInt(this.state.userId, 10)
            },
            refetchQueries: [ { query: chatRoomsListQuery }]
        },).then(res => {
            console.log(res);
            this.state = {title: '', userId: ''};
        });
    };

    render() {
        return (
            <form>
                <input type="text" name="title" placeholder="Chat room title" value={this.state.title}
                       onChange={this.handleTitleChange} required/>
                <input type="number" name="userId" placeholder="User Id" value={this.state.userId}
                       onChange={this.handleUserIdChange} required/>
                <button type="button" onClick={this.handleSubmit}>Create</button>
            </form>
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