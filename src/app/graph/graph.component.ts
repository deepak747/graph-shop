import { Component, OnInit } from '@angular/core';
import { GraphdataService } from '../Service/graphdata.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
      // ctx:any;
          country:any;
          countryName:any[]=[];
          countryPercentage:any[]=[]
          color:any=[]
          width:any;
          dummy:any;
          per:any;
  constructor(private graphService:GraphdataService) { }

  ngOnInit(): void {
        
    this.graphService.getData().subscribe((res:any)=>{
          this.country=res;
           
             if(this.country!=null)
             {
                for(let i=0;i<this.country.length;i++){
                  
                    this.countryName.push(this.country[i].name);
                    this.countryPercentage.push(this.country[i].percentage)
                    this.color.push(this.country[i].colorCode)
                      this.per=this.country[i].percentage
                      console.log('percentage is:',this.per)
                      console.log("Graph data is:",this.country[i])
                  
                }
                this.graph(this.countryName,this.countryPercentage,this.color,'bar','myChart');
               // this.graph(this.countryName,this.countryPercentage,this.color,'pie','pieChart');
                this.graph(this.countryName,this.countryPercentage,this.color,'doughnut','doChart')  
             }
             
      })
      //  this.width=this.per;  
             console.log("progrress bar is111111:",this.per)
        
  }
       graph(countryNameData:any,countryPerData:any,colorName:any,type:any,id:any){
  new Chart(id, {
    type: type,
    data: {
      labels: countryNameData,
      datasets: [{
        label: '# of Votes',
        data: countryPerData,
        backgroundColor:colorName,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
       }


}
