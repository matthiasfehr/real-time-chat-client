export const typeDefs = `
type ChatRoom {
   id: ID!
   title: String
   messages: [Message]
   user: User
}

type Message {
   id: ID!
   body: String
   user: User
}

input MessageInput{
  userId: ID!
  chatRoomId: ID!
  body: String
}

type User {
   id: ID!
   name: String
   email: String
   messages: [Message]
   chatRooms: [ChatRoom]
}

type Query {
   chatRooms: [ChatRoom]
}
`;