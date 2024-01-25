import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BimService } from '@root/app/admin/services/bim.service';
import { TYPE_SECTION } from '../../../shared/constants';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-modal-technical-information',
  templateUrl: './modal-technical-information.component.pug',
  styleUrls: ['./modal-technical-information.component.scss']
})
export class ModalTechnicalInformationComponent implements OnInit {
  dataProduct : any = null
  dataUses : any = [];
  load: boolean = false;
  disconnection: boolean = false;
  dataSheet : any = [];
  arrayField : Array<Number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  urlDataSheet : String = null;
  dataDownloadAll : String = "";
  showDownloadButton : boolean = false;
  demo1TabIndex : number = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalTechnicalInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public bimService: BimService,) { }

    ngOnInit(): void {
        this.initInfo();
        this.getDataSheet();
    }

    initInfo() {
        // let data0 = JSON.parse(JSON.stringify(this.data));
        // console.log('data0: ', data0);
        let options = JSON.parse(JSON.stringify(this.data.options));
        // console.log('options: ', options);

        let buttonGroup = this.data.group_buttons.filter(element => element.id == 1);
        // let buttonGroup0 = JSON.parse(JSON.stringify(buttonGroup));
        // console.log('buttonGroup0: ', buttonGroup0);

        this.urlDataSheet = buttonGroup.length>0 ? buttonGroup[0].buttons.pdf[0].file_url : null;
        // let urlDataSheet0 = JSON.parse(JSON.stringify(this.urlDataSheet));
        // console.log('urlDataSheet0: ', urlDataSheet0);

        // console.log('this.urlDataSheet :>> ', this.urlDataSheet);
        this.dataDownloadAll  = this.data.download_all ? this.data.download_all : "";
        // let dataDownloadAll0 = JSON.parse(JSON.stringify(this.dataDownloadAll));
        // console.log('dataDownloadAll0: ', dataDownloadAll0);
        // console.log('this.dataDownloadAll.length :>> ', this.dataDownloadAll.length);
        this.showDownloadButton = this.dataDownloadAll.length > 0 ? true : false;
        // console.log('this.showDownloadButton :>> ', this.showDownloadButton);

        this.dataProduct = this.data;
        // let dataProduct0 = JSON.parse(JSON.stringify(this.dataProduct));
        // console.log('dataProduct0: ', dataProduct0);

        // this.dataUses = this.data.options.filter(element => element.code === 'BENEFITS' || element.code === 'USES');
        this.dataUses = this.data.options.filter(element => element.code === TYPE_SECTION.USES);
        // let dataUses0 = JSON.parse(JSON.stringify(this.dataUses));
        // console.log('dataUses0: ', dataUses0);
    }

    getDataSheet(){
        this.bimService.getDataSheet(this.dataProduct.id).subscribe(info => {
        if(info.success){
            if(info.fichaTecnica){
                let data = info.fichaTecnica

                let dataModel = [];
                data.forEach(element => {
                    element.settings.forEach(elemSetting => {
                        elemSetting.fields.forEach(elementField => {
                        let json = {
                            model: elementField.model,
                            position: elementField.position,
                        }
                        dataModel.push(json)
                        });

                    });
                });

                let uniqueModel = Object.values(dataModel.reduce((acc,cur)=>Object.assign(acc,{[cur.position]:cur}),{}))

                data.forEach(element => {
                    uniqueModel.forEach((itemModel:any) => {
                        let json = {
                        model : itemModel.model,
                        setting : []
                        }
                        element.settings.forEach(elemSetting => {
                            let jsonSetting = {
                            setting : elemSetting.name,
                            field : null
                            }
                        elemSetting.fields.forEach(elementField => {
                            if(itemModel.position == elementField.position ){
                            jsonSetting.field = elementField.name
                            }
                        });
                        if(jsonSetting.field != null){
                            json.setting.push(jsonSetting)
                        }


                        });
                        this.dataSheet.push(json);
                    });
                });

                this.load = true;
            }
        } else{
            this.load = true;
            this.disconnection = true;
        }

        this.dataSheet = this.dataSheet.map((element, index) => {
            if(index === 0){
                element.activeCircle = 'ellipse_red_circle';
            } else {
                element.activeCircle = 'ellipse_gray_circle';
            }
            return element;
        });
        let dataSheet0 = JSON.parse(JSON.stringify(this.dataSheet));
        console.log('dataSheet0: ', dataSheet0);
        console.log('this.load :>> ', this.load);

    }, async (err) => {
        this.load = true;
        this.disconnection = true;
    })
    }

    // downloadAll(){
    //     window.open(this.dataDownloadAll, "_blank");
    // }

    closeModal() {
		this.dialogRef.close();
	}

    selectedTabChange(event:MatTabChangeEvent) {
        // Pasamos todo a gris
        this.dataSheet = this.dataSheet.map((element) => {
            element.activeCircle = 'ellipse_gray_circle';
            return element;
        });

        // Pasamos a rojo el seleccionado
        this.dataSheet[event.index].activeCircle = 'ellipse_red_circle';

        //Nos aseguramos de que el tab activo sea el que deseamos
        this.demo1TabIndex = event.index;
	}

    clickCircle(index: number) {
        this.demo1TabIndex = index;
    }
}
