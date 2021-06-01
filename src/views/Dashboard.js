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

let global;

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [dataList,setDataList]=useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);  //모달 state
  const [selectKick,setSelectKick]=useState([])
  const [brandCnt, setBrandCnt]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [alphaca,setAlphaca]=useState(0);
  const [lime,setLime]=useState(0);
  const [beam,setBeam]=useState(0);
  const [xingxing,setXingXing]=useState(0);
  const [kickgoing,setKickgoing]=useState(0);
  const [totalcnt,setTotalcnt]=useState(0);


  useEffect(() => {
    const take = async () => {
      await axios.get('http://127.0.0.1:8000/kickrani/',
          {
          }
      ).then((response)=> {
        setDataList(response.data);
      });
    };
    take();
  }, []);

  // console.log(brandCnt);
  useEffect(() => {
    const daily = async () => {
      await axios.get('http://127.0.0.1:8000/kickrani/dailychart/',
          {
          }
      ).then((response)=> {
        setBrandCnt(response.data)
        setAlphaca(response.data[0]["num_brand"]);
        setLime(response.data[3]["num_brand"]);
        setBeam(response.data[1]["num_brand"]);
        setXingXing(response.data[4]["num_brand"]);
        setKickgoing(response.data[2]["num_brand"]);
        setTotalcnt(response.data[0]["num_brand"]+response.data[1]["num_brand"]+response.data[2]["num_brand"]+response.data[3]["num_brand"]+response.data[4]["num_brand"])
      });
    };
    daily();
  }, []);

  console.log(brandCnt);
  console.log(dataList);

  // const total=alphaca+lime+beam+xingxing+kickgoing;

  const chartExample3 = {

    // brand=chart3Bound(dataList);

    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {


        labels: ["알파카", "라임", "빔", "씽씽", "킥고잉"],
        datasets: [
          {
            label: "Company",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [alphaca, lime, beam, xingxing, kickgoing],
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    },
  };
  // console.log(selectKick);

  return (
    <>
      <div className="content">
        <Row>
          {/* variables/charts.js의 chartExample1 데이터 넣기 */}
          <Col>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">image</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> {selectKick.kickId}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/*<img src={''}/>*/}
                  <img src={"https://team03-s3.s3.ap-northeast-3.amazonaws.com/image/" + selectKick.image + ".png"}/>
                  {/*<img src={process.env.PUBLIC_URL +"/images/"+selectKick.image+".png"}/>*/}

                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">업체별</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  총 {totalcnt} 번
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
          {/* 이미지 화면 */}
          {/*<Col lg="4">*/}
          {/*  <Card className="card-chart">*/}
          {/*    <CardHeader>*/}
          {/*      <h5 className="card-category">image</h5>*/}
          {/*      <CardTitle tag="h3">*/}
          {/*        <i className="tim-icons icon-send text-success" /> {selectKick.kickId}*/}
          {/*      </CardTitle>*/}
          {/*    </CardHeader>*/}
          {/*    <CardBody>*/}
          {/*      <div className="chart-area">*/}
          {/*        /!*<img src={''}/>*!/*/}
          {/*        <img src={process.env.PUBLIC_URL +"/images/"+selectKick.image+".png"} />*/}
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
                        dataList.slice(0).reverse().map((kickrani) => {
                          return (
                              <tr>
                                <td onClick={()=>setSelectKick(kickrani)}>{kickrani.kickId}</td>
                                <td onClick={()=>setSelectKick(kickrani)}>
                                  {kickrani.brand}
                                  {/*{*/}
                                  {/*  (function(){*/}
                                  {/*    if(kickrani.brand==="board_1"){*/}
                                  {/*      return ("알파카")*/}
                                  {/*    }else if(kickrani.brand==="board_2"){*/}
                                  {/*      return ("라임")*/}
                                  {/*    }else if(kickrani.brand==="board_3"){*/}
                                  {/*      return ("빔")*/}
                                  {/*    }else if(kickrani.brand==="board_4"){*/}
                                  {/*      return ("씽씽")*/}
                                  {/*    }else if(kickrani.brand==="board_5"){*/}
                                  {/*      return ("킥고잉")*/}
                                  {/*    }*/}
                                  {/*  })()*/}
                                  {/*}*/}
                                </td>
                                <td onClick={()=>setSelectKick(kickrani)}>{kickrani.location}</td>
                                <td onClick={()=>setSelectKick(kickrani)}>
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
                                <td className="text-center" onClick={()=>setSelectKick(kickrani)}>{kickrani.datetime}</td>
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
