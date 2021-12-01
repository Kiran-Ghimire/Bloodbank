import { Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BiDonateBlood } from "react-icons/bi";
import { logout } from "../redux/authSlice";
import { totalRequest } from "../redux/authSlice";
import { Link, useHistory } from "react-router-dom";
import { Input } from "antd";
import { becomeDonor } from "../redux/authSlice";
import { useSelector } from "react-redux";
import SearchDonor from "./searchDonor";

const { Search } = Input;

const Bloodbank = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authUser.userData[0]);
  console.log("Blooddbank", userData);
  const { userid, role } = userData;
  console.log(userid);

  useEffect(() => {
    dispatch(totalRequest({ userid: userid }));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(becomeDonor(userid));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const history = useHistory();

  //   const userData = useSelector((state) => state.authUser.userData);
  //   useEffect(() => {
  //     userData ? navigate("/home") : navigate("/login");
  //   }, [userData]);

  const logOut = () => {
    dispatch(logout());
    history.push("/login");
  };

  const userProfile = () => {
    history.push("/profile");
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          padding: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <BiDonateBlood size={80} color="red" />
            <h1 style={{ margin: 0 }}>Blood Bank</h1>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <Button type="primary" onClick={userProfile}>
                User Profile
              </Button>

              <Button type="primary" onClick={logOut}>
                Logout
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                onClick={showModal}
                disabled={role === "Donor" ? true : false}
              >
                {" "}
                Become a donor
              </Button>
              <Modal
                title="Become a Donor"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Are you sure you want to become a donor?</p>
                <p>
                  If you become a donor your data will be visible to other
                  users.
                </p>
                <p>If you become a donor you can donate blood.</p>
              </Modal>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SearchDonor />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bloodbank;
