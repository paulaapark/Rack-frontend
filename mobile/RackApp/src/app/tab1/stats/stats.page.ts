import { Component, OnInit, AfterViewInit  } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { RackService } from 'src/app/services/rack.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit   {

  userRack!:any;
  //is there a way to condense this?

  sumSpring!: number;
  sumSummer!: number;
  sumFall!: number;
  sumWinter!: number;
  
  sumTops!:number;
  sumBottoms!:number;

  itemS: string = "items";
  itemSu: string = "items";
  itemF: string = "items";
  itemW: string = "items";
  topsG: string = "tops";
  bottomsG: string = "bottoms";


  public doughnutChartLabels!: string[];

  public barChartData!: ChartConfiguration<'bar'>['data']; 
  public doughnutChartData!: ChartConfiguration<'doughnut'>['data']['datasets'];


  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor(public userService: UserService, public rackService: RackService) {
  
  }


  ngOnInit() {
    this.rackService.getUserRack().subscribe(res => {
      this.userRack = Object.values(res);
    });

    this.rackService.getUserSpring().subscribe(res => {
      this.sumSpring = Object.values(res).length;
      if (this.sumSpring == 1) {
        this.itemS = "item"
      };
    });

    this.rackService.getUserSummer().subscribe(res => {
      this.sumSummer = Object.values(res).length;
      if (this.sumSummer == 1) {
        this.itemSu = "item"
      };
    });

    this.rackService.getUserFall().subscribe(res => {
      this.sumFall = Object.values(res).length;
      if (this.sumFall == 1) {
        this.itemF = "item"
      };
    });

    this.rackService.getUserWinter().subscribe(res => {
      this.sumWinter = Object.values(res).length;
      if (this.sumWinter == 1) {
        this.itemW = "item"
      };
    });

    this.rackService.getUserTops().subscribe(res => {
      this.sumTops = Object.values(res).length;
      if (this.sumTops == 1) {
        this.topsG = "top"
      };
    });

    this.rackService.getUserBottoms().subscribe(res => {
      this.sumBottoms = Object.values(res).length;
      if (this.sumBottoms == 1) {
        this.bottomsG = "bottom"
      };
    });

  
  }

  ionViewDidEnter(){
    this.barChartData = {
      labels: [ 'Spring', 'Summer', 'Fall', 'Winter'],
      datasets: [
        { data: [ this.sumSpring, this.sumSummer, this.sumFall, this.sumWinter ], label: 'Current Seasonal Clothing Spread' }
      ]
    };
    this.doughnutChartLabels = ['Tops', 'Bottoms'];

    this.doughnutChartData = [
      { data: [ this.sumTops, this.sumBottoms ], label: 'Current Proportion of Tops vs Bottoms' }
    ];
  }
  

}