import { Component,OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-outwardexcelreport',
  templateUrl: './outwardexcelreport.component.html',
  styleUrl: './outwardexcelreport.component.scss'
})
export class OutwardexcelreportComponent implements OnInit{
  data: any[] = []; 
  depot:any;
    isLoading: boolean = false;
    @ViewChild('dt1') dataTable!: Table;
   constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      const userInfoString = sessionStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        this.depot = userInfo.Depot;
        this.fetchData(this.depot);
      }
    }
    
    fetchData(depot: string): void {
        this.isLoading = true;
      const apiUrl = `https://www.swatpro.co/exceloutwardreportshowdepowise.php?depot=${depot}`;
      this.http.get<any[]>(apiUrl).subscribe(
        (data) => {
          this.data = data;
             this.isLoading = false;
        },
  
        (error) => {
          console.error('Error fetching data:', error);
             this.isLoading = false;
        }
      );
    }

    printTable(): void {
      const printContents = this.dataTable.el.nativeElement.outerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
     clear(table: Table): void {
      table.clear();
    }
  }
  