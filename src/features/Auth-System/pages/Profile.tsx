import { useQuery } from "@tanstack/react-query";
import privateApiClient from "../../../api/privateApiClient";

const Profile = () => {
  const profileData = async () => {
    const data = await privateApiClient("/profile", "GET", null);
    return data;
  };
  const query = useQuery({
    queryKey: ["profileData", 1],
    queryFn: profileData,
  });

  if (query.isFetching && query.isPending) {
    console.log("Loading Profile...");
  } else if (query.isFetching) {
    console.log("Background Refetch is happening");
  } else {
    console.log(query.data);
  }

  return (
    <main>
      <button
        onClick={() => {
          query.refetch();
        }}
      >
        Refresh
      </button>
      <p>{query.isPending ? "Fetching the data" : query.data.firstName}</p>
      <p>{query.isPending ? "Fetching the data" : query.data.lastName}</p>
      <p>{query.isPending ? "Fetching the data" : query.data.email}</p>
    </main>
  );
};

export default Profile;
