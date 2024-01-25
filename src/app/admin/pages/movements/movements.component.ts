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
import {
    CalendarEvent,
    DAYS_OF_WEEK,
    CalendarMonthViewBeforeRenderEvent,
} from "angular-calendar";
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
import { MovementsService } from "./movements";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import moment from "moment-timezone";

interface jsPDFWithPlugin extends jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
  }

@Component({
    selector: "app-movements",
    templateUrl: "./movements.component.pug",
    styleUrls: ["./movements.component.scss"],
})
export class MovementsComponent implements OnInit {
    // Tipos de vistas de los pedidos, se setean por un servicio
    view_list: boolean = false;
    view_cale: boolean = false;
    list_filter_works: any = [];
    view: string = "month";
    viewDate: Date = new Date();
    select_current: boolean = true;
    select_next: boolean = false;
    locale: string = "es-es";
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
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

    eventsPromise: Observable<CalendarEvent[]>;
    eventsFilter: BehaviorSubject<any> = new BehaviorSubject(null);

    worksPromise: Observable<any[]>;
    worksFilter: BehaviorSubject<any> = new BehaviorSubject(null);

    filter_text: any = { work_name: "Filtrar", work_code: 0 };

    // Media query
    queryListMd: MediaQueryList;
    queryListLg: MediaQueryList;
    showCloseBtn: boolean = false;
    calendar_detail: any;
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

	displayedColumns: string[] = ['id', 'guide_code', 'type_movement', 'product', 'mark', 'measure', 'state', 'situation', 'store', 'amount', 'unit', 'date', 'qr_code', 'edit'];
	ELEMENT_DATA: any[] = [];
	dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
    _movements:any;
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
        private movementsSrv: MovementsService,
        private cdr: ChangeDetectorRef
    ) {
        this.loading.changeStatus(true);
    }

    async ngOnInit() {
        this.loadDataList()
    }

    async loadDataList() {
        try {
            const movements = await this.movementsSrv.getAllMovements().toPromise();
            this._movements = movements;
            movements.map(row => {
                row.date = moment(row.created_at).tz('UTC').format('YYYY-MM-DD')
            });
            this.loading.changeStatus(false);
            this.dataSource = new MatTableDataSource<any>(movements);
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

    downloadPdf(element?) {
        const doc = new jsPDF('landscape', 'px', 'a4') as jsPDFWithPlugin;
        if(element) {
            let keys = ['Nro', 'Guía de Remisión.', 'Tipo de Movimiento', 'Producto', 'Marca', 'Medida', 'Estado', 'Situación', 'Ubicación', 'Cantidad', 'Fecha', 'Unidad'];
            let values = [];
            for (var x of this._movements.filter(row => row.guide_code == element.guide_code)){
                values.push([x.id_movement, x.guide_code, x.type_movement, x.product, x.mark, x.measure, x.state, x.situation, x.store, x.amount, x.date, x.unit]);
            }
            doc.autoTable({
                head: [keys],
                body: values,
              });
        } else {
            doc.autoTable({ html: '#movements' })
        }
        doc.save('movements'+ (element ? element?.guide_code : '') +'.pdf')
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
    }

    async remove(element) {
        console.log('element', element);
        this.loading.changeStatus(true);
        try {
            await this.movementsSrv.remove(element.guide_remition).toPromise();
            this.loadDataList();
            this.loading.changeStatus(false);
        } catch (err) {
            this.showError(err)
        }
    }

    create() {
        return this.router.navigate(["/admin/movements/create"]);
    }
}
