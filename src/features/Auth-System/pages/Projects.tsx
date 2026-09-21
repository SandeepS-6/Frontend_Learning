import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import privateApiClient from "../../../api/privateApiClient";

const Projects = () => {
  const [page, setPgae] = useState(1);
  const [limit, setLimit] = useState(10);

  const previousData = (data: any) => {
    return data;
  };

  const cacheQuery = useQuery({
    queryKey: ["projects", page, limit],
    queryFn: GetProjects,
    placeholderData: previousData, //onlu useQuery hook availible
  });

  if (cacheQuery.isFetching && cacheQuery.isPending) {
    console.log("Loading Profile...");
  } else if (cacheQuery.isFetching) {
    console.log("Background Refetch is happening");
  } else {
    console.log(cacheQuery.data);
  }

  async function GetProjects() {
    const projects = await privateApiClient(
      `/projects?page=${page}&limit=${limit}`,
      "GET",
      null,
    );
    return projects;
  }

  return (
    <main>
      <div style={{ display: "flex" }}>
        {cacheQuery.isPending
          ? "Loading Data"
          : cacheQuery.isError
            ? cacheQuery.error.message
            : cacheQuery.isSuccess
              ? cacheQuery.data.response.length > 0
                ? cacheQuery.data.response.map(
                    (e: {
                      id: string;
                      name: string;
                      description: string;
                      created_At: string;
                      updated_At: string;
                    }) => {
                      return (
                        <div key={e.id}>
                          <p>Id : {e.id}</p>
                          <p>name : {e.name}</p>
                          <p>description : {e.description}</p>
                          <p>create_at : {e.created_At}</p>
                          <p>update_at : {e.updated_At}</p>
                        </div>
                      );
                    },
                  )
                : "No projects found"
              : null}
      </div>

      <div style={{ display: "flex", gap: "5rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>
            Total :
            {cacheQuery.isPending ? "Fetching data" : cacheQuery.data.total}
          </p>
          <p>
            TotalPages :
            {cacheQuery.isPending
              ? "Fetching data"
              : cacheQuery.data.totalPages}
          </p>
          <p>CuurentPage :{page}</p>
        </div>

        <button
          disabled={cacheQuery.isPending ? true : page === 1 ? true : false}
          onClick={() => {
            setPgae(page - 1);
          }}
        >
          Previous
        </button>
        <button
          disabled={
            cacheQuery.isPending
              ? true
              : page === cacheQuery.data.totalPages
                ? true
                : false
          }
          onClick={() => {
            setPgae(page + 1);
          }}
        >
          Next Page
        </button>
        <input type="text" name="" id="" placeholder="limit Value" />
      </div>
    </main>
  );
};

export default Projects;
