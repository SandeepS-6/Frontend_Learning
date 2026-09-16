import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import privateApiClient from "../../../api/privateApiClient";

const Profile = () => {
  const clientQuery = useQueryClient();

  let previousCacheValues: {
    firstName: string;
    lastName: string;
    likesCount: number;
    id: string;
  };

  function OnSucess(updateData: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    likesCount: number;
  }) {
    clientQuery.setQueryData(["profileQuery", 1], updateData);

    // clientQuery.invalidateQueries({
    //   // only use the backend message got instead of data
    //   //invalidate will refetch and stale the previous cache data
    //   queryKey: ["profileQuery", 1], //invalidatequeries expecting the filters with obj
    //   //when db changes then previous cache data will as the mark and refetches and update the cache with new data with identity
    // });
  }

  const updateProfile = async (values: {
    firstName: string;
    lastName: string;
    id: string;
  }) => {
    const update = await privateApiClient("/updateProfile", "PUT", values);
    return update;
  };

  const mutation = useMutation({
    onMutate: LikesCount,
    mutationFn: updateProfile,
    onSuccess: OnSucess,
    onError: OnError,
  });

  function OnError(variables: {
    firstName: string;
    lastName: string;
    id: string;
  }) {
    console.log(variables);
  }

  function LikesCount() {
    clientQuery.setQueryData(
      //directly chaging into the cacheData using the call back fun with new obj return
      ["profileQuery", 1],
      (exisitingData: {
        firstName: string;
        lastName: string;
        email: string;
        id: string;
        likesCount: number;
      }) => {
        const updatedCacheData = {
          firstName: exisitingData.firstName,
          lastName: exisitingData.lastName,
          email: exisitingData.email,
          id: exisitingData.id,
          likesCount: exisitingData.likesCount,
        };
        previousCacheValues = exisitingData;
        updatedCacheData.likesCount = updatedCacheData.likesCount + 1;
        return updatedCacheData;
      },
    );
  }

  const profileData = async () => {
    const data = await privateApiClient("/profile", "GET", null);
    return data;
  };

  const cacheQuery = useQuery({
    queryKey: ["profileQuery", 1], // identify the query .
    queryFn: profileData, // hold and execute by tanstack query
  });

  if (cacheQuery.isFetching && cacheQuery.isPending) {
    console.log("Loading Profile...");
  } else if (cacheQuery.isFetching) {
    console.log("Background Refetch is happening");
  } else {
    console.log(cacheQuery.data);
  }

  return (
    <main>
      <p>
        {cacheQuery.isPending ? "Fetching the data" : cacheQuery.data.firstName}
      </p>
      <p>
        {cacheQuery.isPending ? "Fetching the data" : cacheQuery.data.lastName}
      </p>
      <p>{cacheQuery.isPending ? "Fetching the data" : cacheQuery.data.id}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const firstName = formData.get("firstName");
          const lastName = formData.get("lastName");

          if (typeof firstName == "string" && typeof lastName == "string") {
            const updateValues = {
              firstName: firstName,
              lastName: lastName,
              id: cacheQuery.data.id,
            };
            mutation.mutate(updateValues);
          }
        }}
      >
        <label htmlFor="firstName">Update Profile FirstName</label>
        <input
          type="text"
          name="firstName"
          id="updateProfile"
          placeholder="Update Profile first Name"
        />
        <label htmlFor="lastName">Update Profile LastName</label>
        <input
          type="text"
          name="lastName"
          id="updateProfile"
          placeholder="Update last Name"
        />
        <button type="button" name="LikeValue" onClick={LikesCount}>
          Count :{" "}
          {cacheQuery.isPending ? "Getting Count" : cacheQuery.data.likesCount}
        </button>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Profile;
