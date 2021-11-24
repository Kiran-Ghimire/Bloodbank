import { Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BiDonateBlood } from "react-icons/bi";
import { logout } from "../redux/authSlice";

import { Link, useHistory } from "react-router-dom";
import { Input } from "antd";
import { becomeDonor } from "../redux/authSlice";
import { useSelector } from "react-redux";

const { Search } = Input;

const Bloodbank = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authUser.userData[0]);
  console.log("Blooddbank", userData);
  const { userid } = userData;
  console.log(userid);

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

  const onClick = () => {
    dispatch(logout());
    history.push("/login");
  };
  return (
    <>
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" onClick={onClick}>
            Logout
          </Button>
        </div>
        <div>
          <Search
            placeholder="Search for Donors"
            enterButton="Search"
            size="large"
          />
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button type="primary" onClick={showModal}>
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
              If you become a donor your data will be visible to other users.
            </p>
            <p>If you become a donor you can donate blood.</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Bloodbank;
