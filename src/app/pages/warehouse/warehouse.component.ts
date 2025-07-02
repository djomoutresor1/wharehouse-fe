import { Component, Injector, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
  imports: [RouterModule],
  standalone: true
})
export class WarehouseComponent extends WarehouseBaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    document.title = "Warehouse home"
  }
}
