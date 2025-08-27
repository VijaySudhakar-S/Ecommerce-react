import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div>
      <h2>Profile Page</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Profile;
