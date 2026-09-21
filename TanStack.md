**\*** SETUP \*\*\*

QueryClient is Created for React components need a way to access that client.
QueryClientProvider -> will use the QueryClient in every component .

The Tanstck query will help on server side

Client state vs Server state

Client state means the data belongs to UI/Application itself

server state means this data comes from the backend.

Tanstack query will resolve :

.fetching
.loading
.errors
.caching
.state data
.refetching
.synchornization

Mutation:- an Operation that changes data
In Tanstack changes are made in server so for that

HTTP methods only : CREATE, DELETE, UPDATE

**_ IMportant Points _**
1.fetch()
makes the http request

2.useMutation()
manages the server side chnages operation in react.
useMutation() manages the frontend lifecycle of an operation that changes server state.

useMutation() mutation object has this states these called as the states
│
├── pending
├── success
├── error
├── returned data
├── mutation data will returns the data
└── mutation function

useMutation() → sets up the mutation model()
mutationFn → defines the actual server operation . " it will tell to the tanstack"
mutate() → triggers that operation
** important **

1. mutationFn → What operation should TanStack execute?
2. mutate() → When/how do I tell TanStack to execute it?

3. mutate() will trigger the mutation and tanstack query execute the mutationFn();

4. The argument you pass to mutate() becomes the argument available to mutationFn.

code:

5. submittedData → input to the mutation
6. mutationFn return value → result of the mutation

\*\*\* tanstack needs Types
Result type
Error type
Variables type

7. Mutation hook of object config have the 3 properties are like mutationFn

   . onSuccess, onError, onSettled
   How the mutationFn is called a function same like that way we need call the funciton accordingly.

   . onSettled is used for mostly after the 'success' and 'error'. mostly using in
   . stop a loading indicator
   . reset something
   . refresh some UI
   . perform cleanup

8. setQueryData -> it will directly change the cachedata in tanstack query.
   it expects an queryKey and updater fn
   query key -> identify the cacheKey
   updater -> what should be the cache becomes

9. refetch -> it will refetch the api and store the cacheData same as the initaly cache data store process. it is works in Backgriund

10. optimistic updates which means direct update now then update in db and check if fails rollback to normal previous state.
    .update immediatley now
    . rollback method will rollback to previous state.

11. placeHolderData -> it is for only useQuery things beacuse get operation and also basicaly it used to take the previous data.

- automatically it wil call the previous data it handle by the tanstack query no need of implementation.

12. PreFetching Queries ->
