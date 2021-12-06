import { Card, Button } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { approveRequest } from "../redux/authSlice";
import { useEffect, useState } from "react";

const ApprovedCard = ({ totalRequest }) => {
  const [state, setState] = useState();
  useEffect(() => {
    totalRequest?.length > 0 && setState(totalRequest);
  }, [totalRequest]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
      }}
    >
      {state
        ?.filter((i) => i.reqstatus === "Approved")
        .map((donor) => (
          <Card style={{ width: 300 }}>
            <p>Username: {donor.donorname}</p>
            <p>Email: {donor.email}</p>
            <p>Date of Birth: {moment(donor.dob).format("d MMM, YYYY")}</p>
            {donor.reqstatus === "Approved" && <p>Phone: {donor.phone}</p>}
            <p>Gender: {donor.gender}</p>
            <p>Bloodtype: {donor.bloodtype}</p>
            <p>Address: {donor.address}</p>
            {console.log(donor.reqstatus)}
            {/* {donor.reqstatus !== "Requested" || donor.reqstatus !== "Approved" ? ( */}
            <Button
              type="primary"
              htmlType="submit"
              // onClick={() => {
              //   dispatch(
              //     requestDonor({ userid: userid, donorid: donor.donorid })
              //   );
              //   dispatch(totalReq({ userid: userid }));
              // }}
              disabled={
                donor.reqstatus == "Approved" || "Requested" ? true : false
              }
            >
              Request to Admin
            </Button>
            {/* // ) : (
          //   ""
          // )} */}
          </Card>
        ))}
    </div>
  );
};

export default ApprovedCard;
