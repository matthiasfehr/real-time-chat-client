
import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';


const ChatRoomPreview = ({ data: {loading, error, chatRoom } }) => {
    return (
        <div>
            <div className="chatRoomName">
                {chatRoom ? chatRoom.title : 'Loading...'}
            </div>
            <div>Loading Messages</div>
        </div>
    );
};
export const chatRoomQuery = gql`
  query ChatRoomQuery($chatRoomId : ID!) {
    chatRoom(id: $chatRoomId) {
      id
      title
    }
  }
`;
export default (graphql(chatRoomQuery, {
    options: (props) => ({
        variables: { chatRoomId: props.chatRoomId },
    }),
})(ChatRoomPreview));