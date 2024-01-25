import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChildren,
    QueryList,
    ElementRef,
    ViewChild,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { InventaryService } from "./inventary.service";
import { TypeViewSchedule } from "../../admin.model";
import {
    Overlay,
    PositionStrategy,
    OverlayRef,
} from "@angular/cdk/overlay";
import { Portal, TemplatePortalDirective } from "@angular/cdk/portal";
import { Router } from "@angular/router";
import {
    Observable,
    BehaviorSubject,
    Subject,
    Subscription,
    timer,
} from "rxjs";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";

import { MESSAGE_ERROR } from "@root/app/shared/shared.variables";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: "app-inventary",
    templateUrl: "./inventary.component.pug",
    styleUrls: ["./inventary.component.scss"],
})
export class ProgrammingComponent implements OnInit {
    // Tipos de vistas de los pedidos, se setean por un servicio
    list_filter_works: any = [];
    view: string = "month";
    viewDate: Date = new Date();
    select_current: boolean = true;
    select_next: boolean = false;
    locale: string = "es-es";
    firstDay = 1;
    overlay_modal: any = { width: 498, height: 391 };
    overlayPosition: PositionStrategy;
    class_top: string;
    clsPortal: any;
    overlayRef: OverlayRef;
    refresh: Subject<any> = new Subject();
    @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<
        Portal<any>
    >;
    @ViewChild("calendar") calendar: ElementRef;
    @ViewChild("calendar_view") calendar_view: any;

    class_overlay: string = "";

    worksPromise: Observable<any[]>;
    worksFilter: BehaviorSubject<any> = new BehaviorSubject(null);

    filter_text: any = { work_name: "Filtrar", work_code: 0 };
    TypeViewSchedule: any = TypeViewSchedule;

    // Media query
    queryListMd: MediaQueryList;
    queryListLg: MediaQueryList;

    showCloseBtn: boolean = false;
    calendar_detail: any;

    private _mobileQueryListener: () => void;

    subFilter: Subscription = new Subscription();

    source = timer(1000, 1000);

    sub_source = new Subscription();

    minDate: Date = new Date();
    maxDate: Date = new Date();

    disabledDays: any = [];

    error_load: boolean = false;
    is_empty: boolean = false;

    load_success: boolean = false;
    notif_exists: boolean = false;

    origenActual: string = "";

	displayedColumns: string[] = ['item', 'code', 'type', 'clasification', 'description', 'mark', 'measure', 'state', 'situation', 'store', 'amount', 'unit', 'qr_code', 'edit'];
	ELEMENT_DATA: any[] = [];
	dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
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
        private inventarySrv: InventaryService,
        private cdr: ChangeDetectorRef
    ) {
        this.loading.changeStatus(true);
    }

    async ngOnInit() {
        this.loadDataList();
    }

    async loadDataList() {
        try {
            const products = await this.inventarySrv.getAllProduct().toPromise();
            this.loading.changeStatus(false);
            this.dataSource = new MatTableDataSource<any>(products);
            setTimeout(() => {
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, 100);
            this.load_success = true;
        } catch (err) {
            this.showError(err);
        }
    }

    ngOnDestroy() {
    }

    parse(text): object {
        return JSON.parse(text);
    }
    btn_create: boolean = false;
    showError(err: any, only_msj: boolean = false) {
        let n_err =
            err && err.error && err.error.message ? err.error.message : null;
        this.loading.changeStatus(false);
        if (only_msj)
            return this.appSrv.showSnackBar.next({
                message: n_err || MESSAGE_ERROR,
            });
        this.load_success = false;
        this.error_load = true;
        this.appSrv.showSnackBar.next({ message: n_err || MESSAGE_ERROR });
    }

    create() {
        return this.router.navigate(["/admin/inventary/create"]);
    }

    edit(element) {
        return this.router.navigate(["/admin/inventary/edit/"+element.id_product]);
    }

    async remove(element) {
        this.loading.changeStatus(true);
        try {
            await this.inventarySrv.removeProduct(element.id_product).toPromise();
            this.loadDataList();
            this.loading.changeStatus(false);
        } catch (err) {
            this.showError(err)
        }
    }
}
