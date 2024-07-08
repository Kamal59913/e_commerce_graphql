import { GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const getColorInput = new GraphQLInputObjectType({
    name: 'getColorInput',  
    fields: () => ({
        products_color : { type: new GraphQLList(GraphQLString)}
    })
})


export const getSizeInput = new GraphQLInputObjectType({
    name: 'getSizeInput',  
    fields: () => ({
        products_size : { type: new GraphQLList(GraphQLString)}
    })
})



export const getColorOutput = new GraphQLObjectType({
    name: 'getColorOutput',  
    fields: () => ({
        color_name : { type: GraphQLString }
    })
})


export const getSizeOutput = new GraphQLObjectType({
    name: 'getSizeOutput',  
    fields: () => ({
        size_name : { type: GraphQLString}
    })
})