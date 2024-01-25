import {
    Component,
    OnInit
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
    FormGroup,
    FormBuilder,
    Validators,
} from "@angular/forms";
import { Overlay } from "@angular/cdk/overlay";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";
import { TypesProductService } from "../types-product/types-product";
import { MESSAGE_ERROR } from "@root/app/shared/shared.variables";

@Component({
    selector: "types-product-add",
    templateUrl: "./types-product-add.component.pug",
    styleUrls: ["./types-product-add.component.scss"],
})
export class TypesProductAddComponent implements OnInit {
    formAdd: FormGroup;
    is_edit: boolean = false;
    disabledCombo: boolean = false;
    data_edit: any;
    id_mark_product: number;

    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        private loading: LoadingService,
        public appSrv: AppService,
        public typesProductSrv: TypesProductService,
        // Importante para analitycs
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe((params) => {
            this.id_mark_product = +params["id"]
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        this.loading.changeStatus(true);
        if(this.id_mark_product) {
            const [data] = await this.typesProductSrv.getById(this.id_mark_product).toPromise();
            this.formAdd = this.__buildForm(data);
        } else {
            this.formAdd = this.__buildForm();
        }
        this.loading.changeStatus(false);
    }

    __buildForm(valueDefault?: any): FormGroup {
        const description = valueDefault?.description || null;
        const id_mark_product = valueDefault?.id_mark_product || null;
        let form = this.formBuilder.group({
            id_mark_product: [id_mark_product],
            description: [description, [Validators.required]],
        });
        return form;
    }

    async saveData(): Promise<any> {
        try {
            if(this.id_mark_product) {
                const data = await this.typesProductSrv.edit(this.id_mark_product, this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Editado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/types"]);
            } else {
                const data = await this.typesProductSrv.create(this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Creado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/types"]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    showError(err) {
        this.loading.changeStatus(false);
        this.appSrv.showSnackBar.next({
            message: err.error.message || err.error.errors || MESSAGE_ERROR,
        });
    }

    cancelForm() {
        return this.router.navigate(["/admin/types"]);
    }

    get description() {
        return this.formAdd.controls.description
    }
}
