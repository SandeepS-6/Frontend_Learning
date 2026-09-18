import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import privateApiClient from "../../../api/privateApiClient";

const Projects = () => {
  const queryClient = useQueryClient();

  const [page, setPgae] = useState(2);
  const [limit, setLimit] = useState(10);

  const cacheQuery = useQuery({
    queryKey: ["projects", page, limit],
    queryFn: GetProjects,
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
    console.log(projects);
    return projects;
  }

  return <main>Projects</main>;
};

export default Projects;
