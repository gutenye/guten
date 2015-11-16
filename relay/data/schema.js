import {GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql"
import {connectionArgs, connectionDefinitions, connectionFromArray, fromGlobalId, globalIdField, mutationWithClientMutationId, nodeDefinitions} from "graphql-relay"
import {db} from "./database"
import {Todo} from "./todo"

class User {
}

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId)
    return db.find(type, id)
  },
  (obj) => {
    if (obj instanceof Todo) {
      return TodoType
    } else if (obj instanceof User) {
      return UserType
    } else {
      return null
    }
  }
)

var TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id        : globalIdField("todo"),
    title     : { type: GraphQLString },
    completed : { type: GraphQLBoolean },
  },
  interfaces: [nodeInterface],
})

var {connectionType: todoConnection} = connectionDefinitions({name: 'Todo', nodeType: TodoType})

var UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id    : globalIdField("user"),
    todos : { type: todoConnection, args: connectionArgs, resolve: (_, args) => connectionFromArray(db.find("todo"), args) }
  },
  interfaces: [nodeInterface],
})

export var Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      node : nodeField,
      todos: { type: new GraphQLList(TodoType), resolve: () => db.find("todo") },
      me   : { type: UserType, resolve: () => new User() }
    }
  }),

  /*
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
    }
  })
 */
})
