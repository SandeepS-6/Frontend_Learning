import { useState } from "react";
import privateApiClient from "../../../api/privateApiClient";

const Profile = () => {
  const [profile, setProfileData] = useState();
  const profileData = async () => {
    const data = await privateApiClient("/profile", "GET", null);
    console.log(data);
  };

  return (
    <main>
      <button onClick={profileData}>Get Data</button>
      {/* {profile.email} */}
    </main>
  );
};

export default Profile;
