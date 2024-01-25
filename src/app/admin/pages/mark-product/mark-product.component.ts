import { MediaMatcher } from "@angular/cdk/layout";
import {
    Overlay,
} from "@angular/cdk/overlay";
import { Router } from "@angular/router";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";
import {
    MESSAGE_ERROR,
} from "@root/app/shared/shared.variables";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MarkProductService } from "./mark-product";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: "app-mark-product",
    templateUrl: "./mark-product.component.pug",
    styleUrls: ["./mark-product.component.scss"],
})
export class MarkProductComponent implements OnInit {
    load_success: boolean = false;
    error_load: boolean = false;
    is_empty: boolean = false;
	displayedColumns: string[] = ['id', 'name', 'description','edit'];
	ELEMENT_DATA: any[] = [{
        id : 1,
        description : 'LLAVE MIXTA',
    }];
	dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort, {static: false}) sort: MatSort;
    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        public media: MediaMatcher,
        public changeDetectorRef: ChangeDetectorRef,
        public overlay: Overlay,
        public router: Router,
        private loading: LoadingService,
        public dialog: MatDialog,
        public _bottomSheet: MatBottomSheet,
        public appSrv: AppService,
        public markProductSrv: MarkProductService,
        private cdr: ChangeDetectorRef
    ) {
        this.loading.changeStatus(true);
    }

    async ngOnInit() {
        this.loadDataList();
    }

    async loadDataList() {
        try {
            this.loading.changeStatus(false);
            const data = await this.markProductSrv.getAll().toPromise();
            console.log('data', data);
            this.dataSource = new MatTableDataSource<any>(data);
            setTimeout(() => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, 100);
            this.load_success = true;
        } catch (err) {

        }
    }

    create() {
        return this.router.navigate(["/admin/marks/create"]);
    }

    edit(element) {
        return this.router.navigate(["/admin/marks/edit/"+element.id_mark_product]);
    }

    async remove(element) {
        this.loading.changeStatus(true);
        try {
            await this.markProductSrv.remove(element.id_mark_product).toPromise();
            this.loadDataList();
            this.loading.changeStatus(false);
        } catch (err) {
            this.showError(err)
        }
    }

    showError(err) {
        this.loading.changeStatus(false);
        this.appSrv.showSnackBar.next({
            message: err.error.message || err.error.errors || MESSAGE_ERROR,
        });
    }
}
