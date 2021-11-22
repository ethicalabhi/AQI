import * as React from 'react';
import Table from 'react-bootstrap/Table';
import $, { timers } from 'jquery';
import moment from 'moment'


class AqiTable extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      AqqqI:[],
      Date:{}
    };
  }

  
  
  ws = new WebSocket('ws://city-ws.herokuapp.com/');
  test = []

  componentDidMount(){

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = (evt)=>{
      const streamData = JSON.parse(evt.data)
      this.setState({Date:Date.now()})
      


      //Checks if the city is stored previously or not 
      streamData.forEach((currentData)=>{

        if(currentData.aqi>=0 && currentData.aqi<=50){
          currentData.color = '#55a850';
        }else if(currentData.aqi>=51 && currentData.aqi<=100 ){
          currentData.color = '#a2c853';
        }else if(currentData.aqi>=101 && currentData.aqi<=200 ){
          currentData.color = '#FFF832';
        }else if(currentData.aqi>=201 && currentData.aqi<=300 ){
          currentData.color = '#F29C32';
        }else if(currentData.aqi>=301 && currentData.aqi<=400 ){
          currentData.color = '#E93E33';
        }else if(currentData.aqi>=401 && currentData.aqi<=500 ){
          currentData.color = '#AF2D24';
        }

        if(this.test.length === 0){
          this.test.push(currentData);
        }else{   
          var result = this.test.find(elem => elem.city === currentData.city)  
          if(result === undefined){
            this.test.push(currentData);
          }else{
            result.aqi = currentData.aqi;
          } 

        }
      })

        this.setState({AqqqI: (this.test)});

      
      console.log(this.state);
    }
  }

//   renderTableData() {
//     return this.state.AqiData.map((node, index) => {
//       console.log(node);
//        return (
//           <tr key={node.city}>
//              <td>{node.city}</td>
//              <td>{node.aqi}</td>
//              <td>{Date.now()}</td>
//           </tr>
//        )
//     })
//  }


  render(){
    return (
      <Table striped bordered hover>
    <thead>
      <tr>
        <th>City</th>
        <th>Current AQI</th>
        <th>Last Updated</th>
      </tr>
    </thead>
    <tbody id="content">
    {this.state.AqqqI.map((item) => (
        <tr key={item.city}>
          {/* {Object.values(item).map((val) => ( */}
            <td>{item.city}</td>
            <td style={{ color: item.color }}>{Math.round(item.aqi * 100) / 100}</td>

            {/* This will set the time in words like few seconds ago 24 hours ago */}
            <td>{moment(this.state.Date).fromNow()}</td>
          
        </tr>
      ))}

    </tbody>
  </Table>
    );
  }
}




export default AqiTable;



