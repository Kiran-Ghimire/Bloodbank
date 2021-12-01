import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { approveRequest } from "../redux/authSlice";
import { useSelector } from "react-redux";

const ApprovedCard = () => {
  const donorApproved = useSelector((state) => state.authUser.donorApproved);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
      {donorApproved.map((donor) => {
        <Card style={{ width: 300 }}>
          <p>Username: {donor.donorname}</p>
          <p>Email: {donor.email}</p>
          <p>Date of Birth: {moment(donor.dob).format("d MMM, YYYY")}</p>
          {donor.reqstatus === "Approved" && <p>Phone: {donor.phone}</p>}
          <p>Gender: {donor.gender}</p>
          <p>Bloodtype: {donor.bloodtype}</p>
          <p>Address: {donor.address}</p>
          {/* {donor.reqstatus === "Approved" ||
              ("Requested" && (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() =>
                    dispatch(
                      requestDonor({ donorid: donor.donorid, userid: userid })
                    )
                  }
                >
                  Request to Admin
                </Button>
              ))} */}
        </Card>;
      })}
    </div>
  );
};

export default ApprovedCard;
