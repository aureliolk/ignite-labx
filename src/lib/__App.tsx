import { gql, useQuery } from "@apollo/client"



const GET_LESSONS_QUERY = gql`
  query{
    lessons(orderBy: availableAt_ASC) {
      id
      title
    }      
  }
`
type LessonsProps = {
  id: string;
  title: string
}

function App() {
  // Buscando dados  GRAPHQL usando o USEEFFECT
  // useEffect(()=>{
  //   client.query({
  //     query: GET_LESSONS_QUERY
  //   }).then((res)=>{
  //     console.log(res.data)
  //   })
  // },[])

  // Buscando dados  GRAPHQL usando o USEQUERY
  const { data } = useQuery<{lessons:LessonsProps[]}>(GET_LESSONS_QUERY)
  console.log(data)

  return (
   <>
   <h1>You is Developerx</h1>
   <ul>
    {data?.lessons.map(lessons => {
      return(
        <li key={lessons.id}>{lessons.title}</li>
      )
    })}
   </ul>
   </>
  )
}

export default App
