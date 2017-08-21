import React, { Component } from 'react';
import {
    BrowserRouter,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import './App.css';
import ChatRoomsListWithData from './components/ChatRoomsList';
import NotFound from './components/NotFound';
import ChatRoomDetailsWithData from './components/ChatRoomDetails';

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
    toIdValue,
} from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });

function dataIdFromObject (result) {
    if (result.__typename) {
        if (result.id !== undefined) {
            return `${result.__typename}:${result.id}`;
        }
    }
    return null;
}

const client = new ApolloClient({
    networkInterface,
    customResolvers: {
        Query: {
            chatRoom: (_, args) => {
                return toIdValue(dataIdFromObject({ __typename: 'ChatRoom', id: args['id'] }))
            },
        },
    },
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <div className="App">
                        <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
                        <Switch>
                            <Route exact path="/" component={ChatRoomsListWithData}/>
                            <Route path="/chatRoom/:chatRoomId" component={ChatRoomDetailsWithData}/>
                            <Route component={ NotFound }/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}
export default App;
