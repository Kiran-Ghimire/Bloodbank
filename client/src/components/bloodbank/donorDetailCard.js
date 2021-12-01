import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { requestDonor } from "../redux/authSlice";

import moment from "moment";
import { useEffect, useState } from "react";
const DonorDetailCard = ({ donors }) => {
  const userData = useSelector((state) => state.authUser.userData[0]);
  const totalRequest = useSelector((state) => state.authUser.totalRequest);
  const [state, setState] = useState();
  const dispatch = useDispatch();
  const { userid } = userData;

  useEffect(() => {
    donors?.length > 0 && setState(donors);
    console.log(donors);
  }, [donors]);

  useEffect(() => {
    totalRequest?.length > 0 &&
      setState(totalRequest.filter((i) => i.reqstatus === "Approved"));
  }, [totalRequest]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
      {state?.map((donor) => (
        <Card style={{ width: 300 }}>
          <p>Username: {donor.donorname}</p>
          <p>Email: {donor.email}</p>
          <p>Date of Birth: {moment(donor.dob).format("d MMM, YYYY")}</p>
          {donor.reqstatus === "Approved" && <p>Phone: {donor.phone}</p>}
          <p>Gender: {donor.gender}</p>
          <p>Bloodtype: {donor.bloodtype}</p>
          <p>Address: {donor.address}</p>
          {donor.reqstatus === "Approved" ||
            ("Requested" && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => dispatch(requestDonor({ userid: userid }))}
              >
                Request to Admin
              </Button>
            ))}
        </Card>
      ))}
    </div>
  );
};

export default DonorDetailCard;
