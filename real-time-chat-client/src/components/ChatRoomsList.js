import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';
import AddChatRoom from './AddChatRoom';
import {Link} from 'react-router-dom'

class ChatRoomsList extends Component {

    render() {
        if (this.props.data.loading) {
            return <p>Loading ...</p>;
        }
        if (this.props.data.error) {
            return <p>{this.props.data.error.message}</p>;
        }
        return (
            <div className="Item-list">
                <AddChatRoom />
                { this.props.data.chatRooms.map( ch =>
                    (<div key={ch.id} className={'chatRoom ' + (ch.id < 0 ? 'optimistic' : '')}>
                        <Link to={ch.id < 0 ? `/` : `chatRoom/${ch.id}`}>
                            {ch.title}
                        </Link>
                    </div>)
                )}
            </div>
        );
    }
}

export const chatRoomsListQuery = gql`
   query ChatRoomsListQuery {
     chatRooms {
       id
       title
     }
   }
 `;
const ChatRoomsListWithData = graphql(chatRoomsListQuery)(ChatRoomsList);

export default ChatRoomsListWithData;