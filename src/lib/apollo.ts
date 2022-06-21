import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri:"https://api-sa-east-1.graphcms.com/v2/cl4o37r190bgr01xi4sd27gs6/master",
    cache: new InMemoryCache()
})