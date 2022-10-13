import { Chip, Container } from "@mui/material";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import MaterialTable from "material-table";
import React, { useState } from "react";
import { useEffect } from "react";
import CustomSnackBar from "../Components/CustomSnackBar/CustomSnackBar";
import { db } from "../Firebase/Firebase";
import { colorchange } from "../Utill/Utill";

export default function PurchaseOrders() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //customer snackbar props
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const statuses = {
    Pending: "Pending",
    Complete: "Complete",
    Approved: "Approved",
    Rejected: "Rejected",
  };
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setData((prev) => [
          ...prev,
          { id: doc.id, date: doc.data().orderDate.toDate(), ...doc.data() },
        ]);
      });
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const columns = [
    { title: "Order ID", field: "orderID" },
    { title: "Order By", field: "orderBY", search: false },
    { title: "Supplier", field: "supplierDetails.supplierName" },
    { title: "Order Date", field: "date", type: "date", search: false },
    {
      title: "Order Status",
      lookup: statuses,
      search: false,
      field: "orderStatus",
      render: (rowData) => (
        <Chip
          label={rowData.orderStatus}
          color={colorchange(rowData.orderStatus)}
          variant="outlined"
        />
      ),
    },
  ];
  return (
    <>
      <Container maxWidth="xl">
        <MaterialTable
          title="Purchase Orders"
          isLoading={loading}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          localization={{ toolbar: { searchPlaceholder: "Post title" } }}
          columns={columns}
          data={data}
        />
      </Container>
      {/* <CustomeDialog
      open={open}
      setOpen={setOpen}
      title="Post new eduational opportunity"
    >
      
    </CustomeDialog> */}
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </>
  );
}
