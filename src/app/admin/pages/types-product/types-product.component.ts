import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import {
    Overlay,
} from "@angular/cdk/overlay";
import { ActivatedRoute, Router } from "@angular/router";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";
import {
    MESSAGE_ERROR,
} from "@root/app/shared/shared.variables";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TypesProductService } from "./types-product";

@Component({
    selector: "app-types-product",
    templateUrl: "./types-product.component.pug",
    styleUrls: ["./types-product.component.scss"],
})
export class TypesProductComponent implements OnInit {
    load_success: boolean = false;
    error_load: boolean = false;
    is_empty: boolean = false;
	displayedColumns: string[] = ['id', 'description','edit'];
	ELEMENT_DATA: any[] = [];
    btn_create: boolean = false;
	dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    id_type_product: number;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        public media: MediaMatcher,
        public changeDetectorRef: ChangeDetectorRef,
        public overlay: Overlay,
        public router: Router,
        private route: ActivatedRoute,
        private loading: LoadingService,
        public dialog: MatDialog,
        public _bottomSheet: MatBottomSheet,
        public appSrv: AppService,
        public typesProductSrv: TypesProductService,
    ) {
        this.loading.changeStatus(true);
    }

    async ngOnInit() {
        this.loadDataList();
    }

    async loadDataList() {
        try {
            this.loading.changeStatus(false);
            const data = await this.typesProductSrv.getAll().toPromise();
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
        return this.router.navigate(["/admin/types/create"]);
    }

    edit(element) {
        return this.router.navigate(["/admin/types/edit/"+element.id_type_product]);
    }

    async remove(element) {
        this.loading.changeStatus(true);
        try {
            await this.typesProductSrv.remove(element.id_type_product).toPromise();
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
