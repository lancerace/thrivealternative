import express from 'express';
import './config';
import cors from 'cors';
import logger from './utils/logger';
import { typeDefs, resolvers } from './schema';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import DataSource from './utils/datasource';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
//import { graphqlUploadExpress } from 'graphql-upload';

const app = express();

async function startApolloServer() {
    app.use(cors());
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true,
        context: ({ req }) => {
            return { req };
        },
        formatError: (err: GraphQLError) => {
            return new Error(err.message);
        },
        debug: false,
        plugins: [
            process.env.NODE_ENV === 'production' ?
                ApolloServerPluginLandingPageLocalDefault({ footer: false }) :
                ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ]
    })
    await server.start();
    // This middleware should be added before calling `applyMiddleware`.
    //app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });
};
startApolloServer();

app.listen(process.env.PORT, async () => {
    logger.info(`Server started at PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);

    DataSource.initialize()
        .then(() => {
            logger.info("Data Source has been initialized!")
        })
        .catch((err) => {
            logger.error("Error during Data Source initialization", err)
        })
});


//error handling middleware
app.use(function (err, req, res, next) {
    //logger.error(err.stack)
    res.status(500).send('Something broke!')
})
