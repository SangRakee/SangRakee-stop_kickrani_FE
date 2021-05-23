/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState} from 'react';
import axios from 'axios';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [dataList,setDataList]=useState([]);


  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  // console.log(dataList);
  useEffect(() => {
    const take = async () => {
      await axios.get('http://localhost:8000/kickrani/',
          {
          }
      ).then((response)=> {
        setDataList(response.data);
      });
    };
    take();
  }, []);
  console.log(dataList);

  return (
    <>
      <div className="content">
        <Row>
          {/* variables/charts.js의 chartExample1 데이터 넣기 */}
          <Col>
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">전체 </h5>
                    <CardTitle tag="h2">2021년</CardTitle>
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">20210511</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  12번
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* variables/charts.js의 chartExample3 데이터 넣기 */}
                  <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>

          {/*<Col lg="4">*/}
          {/*  <Card className="card-chart">*/}
          {/*    <CardHeader>*/}
          {/*      <h5 className="card-category">Completed Tasks</h5>*/}
          {/*      <CardTitle tag="h3">*/}
          {/*        <i className="tim-icons icon-send text-success" /> 12,100K*/}
          {/*      </CardTitle>*/}
          {/*    </CardHeader>*/}
          {/*    <CardBody>*/}
          {/*      <div className="chart-area">*/}
          {/*        <Line*/}
          {/*          data={chartExample4.data}*/}
          {/*          options={chartExample4.options}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </CardBody>*/}
          {/*  </Card>*/}
          {/*</Col>*/}
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">20210511</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                  <tr>
                    <th>no</th>
                    <th>업체명</th>
                    <th>장소</th>
                    <th>위반사항</th>
                    <th className="text-center">시간</th>
                  </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(dataList) && dataList.length ? (
                        dataList.map((kickrani) => {
                          return (
                              <tr>
                                <td>{kickrani.kickId}</td>
                                <td>{kickrani.brand}</td>
                                <td>{kickrani.location}</td>
                                <td>
                                  {
                                    (function(){
                                      if(kickrani.violation===1){
                                        return ("헬멧미착용")
                                      }else if(kickrani.violation===2){
                                        return ("2인이상 탑승")
                                      }else if(kickrani.violation===3){
                                        return ("헬멧 미착용 및 2인이상 탑승")
                                      }
                                    })()


                                  }
                                </td>


                                <td className="text-center">{kickrani.datetime}</td>
                              </tr>
                          );
                        })
                    ) : (
                        <td>Empty</td>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
