import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function App() {
  const [data, setData] = useState();

  const loadData = () => {
    axios.get('http://localhost:3001/alko').then((response) => {
      setData(response.data);
    });
  };

  const emptyData = () => {
    setData([]);
    console.log(data);
  };

  const clearOrder = (index, id) => {
    const newData = { ...data };
    newData.order_amount[index] = 0;
    axios
      .put(`http://localhost:3001/alko/${id}`, newData)
      .then(() => {
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <Button variant="primary" onClick={loadData}>
          Load
        </Button>
        <Button variant="danger" onClick={emptyData}>
          Empty
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Nimi</th>
            <th>Pullokoko</th>
            <th>Hinta</th>
            <th>Order Amount</th>
          </tr>
        </thead>

        <tbody>
          {data?.id?.map((id, index) => (
            <tr key={index}>
              <td>{data.numero[index]}</td>
              <td>{data.nimi[index]}</td>
              <td>{data.pullo_koko[index]}</td>
              <td>{data.hinta[index]}</td>
              <td>{data.order_amount[index]}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => {
                    const newData = { ...data };
                    newData.order_amount[index] += 1;
                    console.log('newdata', newData);
                    axios
                      .put(`http://localhost:3001/alko/${id}`, newData)
                      .then(() => {
                        setData(newData);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Add
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => clearOrder(index, id)}>
                  Clear
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
