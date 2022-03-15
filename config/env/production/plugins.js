module.exports = {
    graphql:{
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways : true,
        depthLimit: 8,
        amountLimit: 100,
        apolloServer:{
            tracing:false
        }
    }
}