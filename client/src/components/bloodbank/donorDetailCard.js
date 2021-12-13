import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { requestDonor, totalRequest as totalReq } from "../redux/authSlice";

import moment from "moment";
import { useEffect, useState } from "react";
const DonorDetailCard = ({ donors, donorSearch }) => {
  const userData = useSelector((state) => state.authUser.userData[0]);

  const donorRequest = useSelector((state) => state.authUser.donorRequest);
  const [state, setState] = useState();
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const { userid } = userData;

  useEffect(() => {
    donors?.length > 0 && setState(donors);
    console.log(donors);
  }, [donors]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
      }}
    >
      {state?.map((donor) =>
        !donorSearch.includes(donor.donorid) ? (
          <Card style={{ width: 300 }}>
            <p>Username: {donor.donorname}</p>
            <p>Email: {donor.email}</p>
            <p>Date of Birth: {moment(donor.dob).format("d MMM, YYYY")}</p>
            {donor.reqstatus === "Approved" && <p>Phone: {donor.phone}</p>}
            <p>Gender: {donor.gender}</p>
            <p>Bloodtype: {donor.bloodtype}</p>
            <p>Address: {donor.address}</p>
            {console.log(donor.reqstatus)}

            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                dispatch(
                  requestDonor({ userid: userid, donorid: donor.donorid })
                );
                setDisable(true);
              }}
            >
              Request to Admin
            </Button>
          </Card>
        ) : null
      )}
    </div>
  );
};

export default DonorDetailCard;
