import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import { collection, getDocs, query } from "firebase/firestore";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import CustomSelect from "../Components/CustomSelect/CustomSelect";
import { db } from "../Firebase/Firebase";

const initialValues = {
  supplierDetails: "",
  orderedItems: [],
  orderDate: new Date(),
  orderStatus: "",
  orderID: "",
  depotName: "",
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
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const q = query(collection(db, "supplier"));
      const itemList = [];
      const supplierList = [];
      const depotList = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let supplier = {
          id: doc.id,
          supplierName: doc.data().supplierName,
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
        // itemList.push(item);
        // supplierList.push(supplier);
        // depotList.push(depot);
      });
      //   setItemData(itemList);
      //   setSupplierData(supplierList);
      //   setDepotData(depotList);
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
          <form>
            <FormControl sx={{ mb: 1 }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Supplier
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="supplierDetails"
                value={values.supplierDetails}
                label="Age"
                onChange={handleChanges}
              >
                {supplierData.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.supplierName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              disabled={values.supplierDetails !== "" ? false : true}
              sx={{ mt: 1, mb: 1 }}
            >
              <InputLabel id="demo-simple-select-label">
                {" "}
                Select Supplier Depot
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="depotName"
                value={values.depotName}
                label="    Select Supplier Depot"
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
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
              <InputLabel id="demo-simple-select-label">
                {" "}
                Select Work Site
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="depotName"
                value={values.depotName}
                label="Age"
                onChange={handleChanges}
              >
                {workSiteData.map((option) => (
                  <MenuItem key={option.id} value={option.siteName}>
                    {option.siteName}
                  </MenuItem>
                ))}
              </Select>
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
                    };
                    setData((prev) => [...prev, response]);
                    resolve();
                  });
                },
              }}
            />

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 4, mb: 4 }}
            >
              <Button variant="contained" type="submit">
                Place Order
              </Button>
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
    </Container>
  );
}
