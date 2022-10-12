import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import MaterialTable from "material-table";
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  const Columns = [
    { title: "No", field: "id" },
    { title: "Name", field: "name" },
    { title: "Surname", field: "surname" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    },
  ];
  return (
    <Container maxWidth="lg">
      <Paper>
        <MaterialTable
          title="Simple Action Preview"
          columns={Columns}
          data={data}
          options={{
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise(async (resolve, reject) => {
                try {
                  setCount((prev) => prev + 1);
                  const response = {
                    id: count,
                    name: newData.name,
                    surname: newData.surname,
                    birthYear: newData.birthYear,
                    birthCity: newData.birthCity,
                  };
                  setData([...data, response]);
                  resolve();
                } catch (error) {
                  reject();
                }
              }),
            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                try {
                  setData(data.filter((item) => item.id !== oldData.id));
                  resolve();
                } catch (error) {
                  reject();
                }
              }),
            onRowUpdate: (newData, oldData) => {
              return new Promise(async (resolve, reject) => {
                try {
                  setData(data.filter((item) => item.id !== oldData.id));
                  setData((prev) => [...prev, newData]);
                  resolve();
                } catch (error) {
                  reject();
                }
              });
            },
          }}
        />
      </Paper>
    </Container>
  );
}
