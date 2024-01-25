import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";
import {
    MESSAGE_ERROR,
} from "@root/app/shared/shared.variables";
import { MovementsService } from "../movements/movements";
import { Component, OnInit } from "@angular/core";
import { InventaryService } from "../inventary/inventary.service";
import { filter } from "rxjs/operators";
import { format } from "date-fns";

@Component({
    selector: "movements-add",
    templateUrl: "./movements-add.component.pug",
    styleUrls: ["./movements-add.component.scss"],
})
export class MovementsAddComponent implements OnInit {
    is_edit: boolean = false;
    id: number;
    data_edit:any;
    products:any;
    formList:any = [1];
    formData:any =[];
    constructor(
        private router: Router,
        private loading: LoadingService,
        public appSrv: AppService,
        public movementsSrv: MovementsService,
        private inventarySrv: InventaryService,
        // Importante para analitycs
        private route: ActivatedRoute,
    ) {
        this.loading.changeStatus(true);
        this.route.params.subscribe((params) => {
            this.id = +params["id"];
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        this.products = await this.inventarySrv.getAllProduct().toPromise();
        this.loading.changeStatus(false);
        this.movementsSrv.updateForm.pipe(filter(row => row != null)).subscribe(data => {
            const [info] = this.formData.filter(row => {
                return data.form_code == row.form_code
            })
            if(info) {
                this.formData.map(form => {
                    if(data.form_code == form.form_code) {
                        form.row = data.row
                    }
                })
            } else {
                this.formData.push(data)
            }
        })
    }

    load_save: boolean = false;
    async saveData(): Promise<any> {
        try {
            const movements = [];
            this.formData.map(data => {
                console.log('data', data);
                movements.push(data.row.value);
            });
            await this.movementsSrv.create({form: movements}).toPromise();
            this.appSrv.showSnackBar.next({
                message:'Creado',
            });
            this.router.navigate(["/admin/movements"]);
        } catch (error) {
            console.log('error', error);
        }
    }

    listenerForm() {

    }

    cancelForm() {
        this.router.navigate(["/admin/movements"]);
    }

    removeForm(event, form) {
        this.formList = this.formList.filter(row => row != event);
        this.formData = this.formData.filter(row => row.form_code != event);
    }

    addForm() {
        this.formList.push(Math.max(...this.formList)+1)
    }

    showError(err) {
        this.loading.changeStatus(false);
        this.appSrv.showSnackBar.next({
            message: err.error.message || err.error.errors || MESSAGE_ERROR,
        });
    }
}
