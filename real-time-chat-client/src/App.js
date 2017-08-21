import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddChatRoom from './components/AddChatRoom';
import {
    ApolloClient,
    gql,
    graphql,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
    networkInterface,
});

const ChatRoomsList = ({ data: {loading, error, chatRooms }}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return (
        <div className="Item-list">
            <AddChatRoom />
            { chatRooms.map( ch =>
                (<div key={ch.id} className="channel">{ch.title}</div>)
            )}
        </div>
    );
};

export const chatRoomsListQuery = gql`
   query ChatRoomsListQuery {
     chatRooms {
       id
       title
     }
   }
 `;
const ChatRoomsListWithData = graphql(chatRoomsListQuery)(ChatRoomsList);

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to Apollo</h2>
                    </div>
                    <ChatRoomsListWithData />
                </div>
            </ApolloProvider>
        );
    }
}
export default App;
