import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import CustomSnackBar from "../Components/CustomSnackBar/CustomSnackBar";
import { db } from "../Firebase/Firebase";
import { idGenarator } from "../Utill/Utill";

const initialValues = {
  supplierDetails: "",
  orderedItems: [],
  orderDate: new Date(),
  orderStatus: "",
  orderID: idGenarator("ORD"),
  depotDetails: "",
  workSiteDetails: "",
  comments: "",
};

export default function Home() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [itemData, setItemData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [depotData, setDepotData] = useState([]);
  const [workSiteData, setWorkSiteData] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(initialValues);
  const [btnLoading, setBtnLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function validate() {
    console.log("lengeth", data.length);
    let temp = {};
    temp.orderedItems =
      data?.length > 0
        ? ""
        : setNotify({
            isOpen: true,
            message: "Please add items to the order",
            type: "error",
          });
    temp.supplierDetails = values.supplierDetails
      ? ""
      : "Please Select Supplier";
    temp.depotDetails = values.depotDetails ? "" : "Please Select Depot";
    temp.workSiteDetails = values.workSiteDetails
      ? ""
      : "Please Select Work Site";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setBtnLoading(true);
    if (validate()) {
      const dataObj = {
        supplierDetails: values.supplierDetails,
        orderedItems: data,
        orderDate: values.orderDate,
        orderStatus: "Pending",
        orderID: values.orderID,
        depotDetails: values.depotDetails,
        workSiteDetails: values.workSiteDetails,
      };
      try {
        await addDoc(collection(db, "orders"), dataObj);
        setNotify({
          isOpen: true,
          message: "Order Added Successfully",
          type: "success",
        });
        setBtnLoading(false);
      } catch (e) {
        setBtnLoading(false);
        setNotify({
          isOpen: true,
          message: "Error adding document: " + e,
          type: "error",
        });
      }
    } else {
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const q = query(collection(db, "supplier"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let supplier = {
          id: doc.id,
          supplierName: doc.data().supplierName,
          supplierContact: doc.data().contactNo,
          supplierEmail: doc.data().Email,
        };

        let item = {
          id: doc.id,
          suppliItems: doc.data().supplyItems,
        };

        let depot = {
          id: doc.id,
          depots: doc.data().supplierDepot,
        };

        setItemData((prev) => [...prev, item]);
        setSupplierData((prev) => [...prev, supplier]);
        setDepotData((prev) => [...prev, depot]);
      });
    };
    const getSitesData = async () => {
      const q = query(collection(db, "workSites"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let site = {
          id: doc.id,
          siteName: doc.data().workSiteName,
          siteAddress: doc.data().workSiteAddress,
          sitePhoneNo: doc.data().phoneNo,
          siteSupervisor: doc.data().Supivisor,
        };
        setWorkSiteData((prev) => [...prev, site]);
      });
    };

    Promise.all([getData(), getSitesData()]).then(() => {
      setLoading(false);
    });
  }, []);

  const Columns = [
    { title: "No", field: "id", editable: "never" },
    {
      title: "Item",
      field: "item",
      validate: (rowData) => {
        if (rowData.item === undefined || rowData.item === "") {
          return "Required";
        }
        return true;
      },
      editComponent: (props) => (
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Select Item</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="item"
            value={props.value}
            label="Select item"
            onChange={(option) => props.onChange(option.target.value)}
          >
            {itemData
              ?.filter((item) => item.id === values.supplierDetails?.id)
              .map((option) =>
                option.suppliItems.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.itemName}
                  </MenuItem>
                ))
              )}
          </Select>
        </FormControl>
      ),
    },
    {
      title: "Quantity",
      field: "quantity",
      type: "numeric",
      validate: (rowData) => {
        if (
          rowData.quantity === undefined ||
          rowData.quantity === "" ||
          rowData.quantity <= 0
        ) {
          return "Required";
        }
        return true;
      },
    },
    { title: "Price", field: "price", type: "numeric", editable: "never" },
  ];
  return (
    <Container maxWidth="md" disableGutters>
      {!loading && (
        <Paper sx={{ p: 5 }}>
          <form onSubmit={onSubmit}>
            <FormControl
              sx={{ mb: 1 }}
              fullWidth
              error={errors.supplierDetails !== "" ? true : false}
            >
              <InputLabel id="demo-simple-select-label">
                Select Supplier
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="supplierDetails"
                value={values.supplierDetails}
                onChange={handleChanges}
              >
                {supplierData.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.supplierName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.supplierDetails}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              disabled={values.supplierDetails !== "" ? false : true}
              sx={{ mt: 1, mb: 1 }}
              error={errors.depotDetails !== "" ? true : false}
            >
              <InputLabel id="demo-simple-select-label">
                {" "}
                Select Supplier Depot
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="depotDetails"
                value={values.depotDetails}
                onChange={handleChanges}
              >
                {depotData
                  ?.filter((item) => item.id === values.supplierDetails?.id)
                  .map((option) =>
                    option.depots.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.depotName}
                      </MenuItem>
                    ))
                  )}
              </Select>
              <FormHelperText>{errors.depotDetails}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              error={errors.workSiteDetails !== "" ? true : false}
            >
              <InputLabel id="demo-simple-select-label">
                {" "}
                Select Work Site
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="workSiteDetails"
                value={values.workSiteDetails}
                onChange={handleChanges}
              >
                {workSiteData.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.siteName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.workSiteDetails}</FormHelperText>
            </FormControl>

            <MaterialTable
              columns={Columns}
              data={data}
              icons={{
                Add: (props) => (
                  <Button
                    variant="contained"
                    disabled={values.supplierDetails !== "" ? false : true}
                  >
                    Add New Item
                  </Button>
                ),
              }}
              options={{
                actionsColumnIndex: -1,
                showTitle: false,
                search: false,
                paging: false,
                draggable: false,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise(async (resolve) => {
                    console.log(newData);
                    setCount((prev) => prev + 1);
                    const response = {
                      id: count,
                      item: newData.item.itemName,
                      quantity: newData.quantity,
                      price: newData.item.itemPrice,
                      total: newData.quantity * newData.item.itemPrice,
                    };
                    setData([...data, response]);
                    resolve();
                  }),
                onRowDelete: (oldData) =>
                  new Promise(async (resolve) => {
                    setData(data.filter((item) => item.id !== oldData.id));
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) => {
                  return new Promise(async (resolve) => {
                    setData(data.filter((item) => item.id !== oldData.id));
                    console.log(newData);
                    const response = {
                      id: count,
                      item: newData.item.itemName,
                      quantity: newData.quantity,
                      price: newData.item.itemPrice,
                      total: newData.quantity * newData.item.itemPrice,
                    };
                    setData((prev) => [...prev, response]);
                    resolve();
                  });
                },
              }}
            />
            <TextField
              sx={{ mt: 4, mb: 1 }}
              id="standard-multiline-static"
              label="Comments"
              name="comments"
              fullWidth
              multiline
              rows={4}
              onChange={handleChanges}
              variant="standard"
            />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 4, mb: 2 }}
            >
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                loading={btnLoading}
                size="large"
                loadingPosition="center"
              >
                Place Order
              </LoadingButton>
            </Stack>
          </form>
        </Paper>
      )}

      {loading && (
        <Stack
          height={"50vh"}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Stack>
      )}
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
