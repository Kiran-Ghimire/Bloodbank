import { Card, Button } from "antd";
import moment from "moment";
const DonorDetailCard = ({ donors }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
      {donors?.map((donor) => (
        <Card style={{ width: 300 }}>
          <p>Username: {donor.username}</p>
          <p>Email: {donor.email}</p>
          <p>Date of Birth: {moment(donor.dob).format("d MMM, YYYY")}</p>
          {/* <p>Phone: {donor.phone}</p> */}
          <p>Gender: {donor.gender}</p>
          <p>Bloodtype: {donor.bloodtype}</p>
          <p>Address: {donor.address}</p>
          <Button type="primary" htmlType="submit">
            Request to Admin
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default DonorDetailCard;
