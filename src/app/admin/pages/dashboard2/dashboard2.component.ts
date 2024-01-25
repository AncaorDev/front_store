import { Component } from "@angular/core";
import { GoogleChartInterface, GoogleChartType } from "ng2-google-charts";
import { MovementsService } from "../movements/movements";

@Component({
    selector: "app-dashboard2",
    templateUrl: "./dashboard2.component.pug",
    styleUrls: ["./dashboard2.component.scss"],
})
export class Dashboard2Component {
    title: string = "Dashboard";
    selected_estatus: String = "a,b";
    load_dispatches: boolean = true;
    public lineChart: GoogleChartInterface = {
      chartType: GoogleChartType.LineChart,
      dataTable: [],
      options: {title: 'Entradas y Salidas 2023'}
    };
    public barChart: GoogleChartInterface = {
      chartType: GoogleChartType.BarChart,
      dataTable: [],
      options: {
        chart: {
          title: 'Entradas y Salidas 2023',
          subtitle: ''
        }
      }
    };
    public columnChart: GoogleChartInterface = {
      chartType: GoogleChartType.ColumnChart,
      dataTable: [],
      options: {
        title: 'Entradas y Salidas',
        animation: {
          duration: 1000,
          easing: 'out',
          startup: true
        }
      }
    };
    public columnChart2: GoogleChartInterface = {
      chartType: GoogleChartType.ColumnChart,
      dataTable: [],
      options: {
        title: 'Registros',
        animation: {
          duration: 1000,
          easing: 'out',
          startup: true
        }
      }
    };

    loadData:boolean = false;
    constructor(private movementsSrv: MovementsService) {}

    async ngOnInit() {
      const data = await this.movementsSrv.dashboard().toPromise();
      const data2 = await this.movementsSrv.dashboard2().toPromise();
      const updateData = [['Semana', 'Entradas', 'Salidas']];
      const updateData2 = [['Semana', 'Registros']];
      data.map(row => {
        updateData.push([(row.to_char || '-'), +row.ingresos, +row.salidas])
      });
      data2.map(row => {
        updateData2.push([(row.to_char || '-'), +row.cantidad])
      });
      this.columnChart.dataTable = updateData;
      this.columnChart2.dataTable = updateData2;
      this.loadData = true;
    }

    ngOnDestroy(): void {}
}
