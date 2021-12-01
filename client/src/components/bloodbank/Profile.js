import { Card, Button } from "antd";
import { BiDonateBlood } from "react-icons/bi";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const userData = useSelector((state) => state.authUser.userData[0]);
  const { username, email, dob, gender, address, bloodtype, phone, role } =
    userData;
  const editProfile = () => {
    history.push("/editprofile");
  };
  const changePassword = () => {
    history.push("/changepassword");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <div>
        <BiDonateBlood size={120} color="red" />
        <h1>Blood Bank</h1>
      </div>
      <div className="site-card-border-less-wrapper">
        <Card title="User Profile" bordered={false} style={{ width: 900 }}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <p>Date of Birth: {moment(dob).format("d MMM, YYYY")}</p>
          <p>Gender: {gender}</p>
          <p>Address: {address}</p>
          <p>Bloodtype: {bloodtype}</p>
          <p>Phone: {phone}</p>
        </Card>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          type="primary"
          onClick={editProfile}
          style={{ marginRight: "20px" }}
        >
          Edit Profile
        </Button>
        <Button
          type="primary"
          onClick={changePassword}
          style={{ marginRight: "20px" }}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default Profile;
