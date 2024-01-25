import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Inject, Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LocalStorageService } from '@root/app/shared/providers/storage/local-storage.service';
import { SHARED } from '../../../../../shared/shared.variables';

@Component({
	selector: 'bottom-sheet-orders',
	templateUrl: './bottom-sheet-orders.pug',
	styleUrls : ['./bottom-sheet-orders.scss']
})
export class BottomSheetOrders {
    arrayPath: any;
    arrayOrders: any;
    arrayFinalized: any;
    actualTab: number = 0;

    //Combos
    selectedWorks: any[] = [];

    // Iconos
    green_mixer: any = SHARED.icons.green_concrete_mixer;
    pin: any = SHARED.icons.pin;

    // Informacion general
    arrayActive: any;
    // arrayPath: any;
    arrayPathSelected: any;
    arrayPathOthers: any;
    // arrayOrders: any;
    arrayOrdersSelected: any;
    arrayOrdersOthers: any;
    // arrayFinalized: any;
    arrayFinalizedSelected: any;
    arrayFinalizedOthers: any;
    showErrorPath: boolean = false;
    showErrorPathSelected: boolean = false;
    showErrorOrders: boolean = false;
    showErrorOrdersSelected: boolean = false;
    showErrorFinalized: boolean = false;
    showErrorFinalizedSelected: boolean = false;
    errorMessagePath: string = "";
    errorMessagePathSelected: string = "";
    errorMessageOrders: string = "";
    errorMessageOrdersSelected: string = "";
    errorMessageFinalized: string = "";
    errorMessageFinalizedSelected: string = "";
    showPathIntermediate: boolean = true;
    showOrdersIntermediate: boolean = true;
    showFinalizedIntermediate: boolean = true;
    intermediatePathText: string = "Ver más pedidos de esta obra";
    intermediateOrdersText: string = "Ver más pedidos de esta obra";
    intermediateFinalizedText: string = "Ver más pedidos de esta obra";
    showMorePathInfo: boolean = false;
    showMoreOrdersInfo: boolean = false;
    showMoreFinalizedInfo: boolean = false;

    // Mapa
    map_initial_x: any;
    map_initial_y: any;
    latlngBounds: any = false;
    allCoordinates: any[] = [];
    activeCoordinates: any[] = [];
    allPostions: any[];

    allPostionsNoFinalized: any[];
    isClickedMarker: boolean;

	constructor(
        private _bottomSheetRef: MatBottomSheetRef<BottomSheetOrders>,
        public _bottomSheet: MatBottomSheet,
        private storageSrv: LocalStorageService,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
    ) {

	}

    ngOnInit() {
        // Revisamos si habia un tab ya seleccionado
        let tem = this.storageSrv.getItemObj("actualTab");
        if(this.storageSrv.getItemObj("actualTab")) {
            this.actualTab = tem.index;
        } else {
            this.actualTab = 0;
        }

        let data = JSON.parse(JSON.stringify(this.data));
        // console.log('data orders :>> ', data);

        this.allCoordinates = this.storageSrv.getItemObj("allCoordinates");
        this.activeCoordinates = this.storageSrv.getItemObj("activeCoordinates");
        this.selectedWorks = this.storageSrv.getItemObj("selectedWorks");

        this.arrayActive = this.data.arrayActive;
        this.allPostionsNoFinalized = this.data.allPostionsNoFinalized;
        this.allPostions = this.data.allPostions;
        this.isClickedMarker = this.data.isClickedMarker;
        this.arrayPath = this.data.arrayPath;
        this.arrayPathSelected = this.data.arrayPathSelected;
        this.arrayPathOthers = this.data.arrayPathOthers;
        this.arrayOrders = this.data.arrayOrders;
        this.arrayOrdersSelected = this.data.arrayOrdersSelected;
        this.arrayOrdersOthers = this.data.arrayOrdersOthers;
        this.arrayFinalized = this.data.arrayFinalized;
        this.arrayFinalizedSelected = this.data.arrayFinalizedSelected;
        this.arrayFinalizedOthers = this.data.arrayFinalizedOthers;
        this.showErrorPath = this.data.showErrorPath;
        this.showErrorPathSelected = this.data.showErrorPathSelected;
        this.showErrorOrders = this.data.showErrorOrders;
        this.showErrorOrdersSelected = this.data.showErrorOrdersSelected;
        this.showErrorFinalized = this.data.showErrorFinalized;
        this.showErrorFinalizedSelected = this.data.showErrorFinalizedSelected;
        this.errorMessagePath = this.data.errorMessagePath;
        this.errorMessagePathSelected = this.data.errorMessagePathSelected;
        this.errorMessageOrders = this.data.errorMessageOrders;
        this.errorMessageOrdersSelected = this.data.errorMessageOrdersSelected;
        this.errorMessageFinalized = this.data.errorMessageFinalized;
        this.errorMessageFinalizedSelected = this.data.errorMessageFinalizedSelected;
        this.showPathIntermediate = this.data.showPathIntermediate;
        this.showOrdersIntermediate = this.data.showOrdersIntermediate;

        //Seteamos la data original en el localStorage
        this.storageSrv.setItemObj("arrayPathSelected", this.arrayPathSelected);
        this.storageSrv.setItemObj("arrayPathOthers", this.arrayPathOthers);

        this.storageSrv.setItemObj("allCoordinates", this.allCoordinates);
        this.storageSrv.setItemObj("activeCoordinates", this.activeCoordinates);

        this.storageSrv.setItemObj("isClickedMarker", this.isClickedMarker);
        this.storageSrv.setItemObj("allPostionsNoFinalized", this.allPostionsNoFinalized);

        this.storageSrv.setItemObj("sheetOrigin", 'nothing');

        // Buscamos la informacion inicial del mapa
        // console.log('this.arrayActive :>> ', this.arrayActive);
        // console.log('this.selectedWorks :>> ', this.selectedWorks);
        if(this.arrayActive.work_code === this.selectedWorks[0].work_code){
            // console.log('this.arrayActive.work_code :>> ', this.arrayActive.work_code);
            // console.log('this.selectedWorks[0].work_code :>> ', this.selectedWorks[0].work_code);

            this.map_initial_x = +this.arrayActive.work_latitud;
            this.map_initial_y = +this.arrayActive.work_longitud;

            // this.selectedWorkInfo = this.arrayActive;
        }

        // Centramos el mapa
        // setTimeout(() => {
        //     this.centerMap();
        // }, 1000);
	}

    closeFilter() {
        this._bottomSheet.dismiss();
    }

    onTab(event: any){
        this.actualTab = event.index;
        this.storageSrv.setItemObj("actualTab", { index: this.actualTab });
    }

    onPath(indexOrder, indexPath: number, fromArray: string = null, type: string = null, checked: boolean) {
        // console.log('indexOrder :>> ', indexOrder);
        // console.log('indexPath :>> ', indexPath);

        this.actualTab = 0;

        // Si el check no esta seleccionado no permitiremos al usuario realizar ninguna accion en ese mixer
        if(checked){
            let from: any = [];

            if (type === 'selected') {
                from = this.arrayPathSelected;
            } else {
                from = this.arrayPathOthers;
            }

            let actualDropColor = from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath].color;

            //Pasamos todas las imagenes de la gota a negro en todos los arrays
            if(this.arrayPathSelected) {
                this.arrayPathSelected.order_items.map(a => {
                    if (a && a.order_items_id) {
                        a.order_items_id.map(b => {
                            if (b && b.id_data) {
                                b.id_data.map(c => {
                                    if (c && c.tracking) {
                                        c.tracking.map(d => {
                                            d.color = 'black';
                                            d.img = 'reverse_drop_black';
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            }

            if(this.arrayPathOthers) {
                this.arrayPathOthers.order_items.map(a => {
                    if (a && a.order_items_id) {
                        a.order_items_id.map(b => {
                            if (b && b.id_data) {
                                b.id_data.map(c => {
                                    if (c && c.tracking) {
                                        c.tracking.map(d => {
                                            d.color = 'black';
                                            d.img = 'reverse_drop_black';
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            }

            if(this.arrayOrdersSelected) {
                this.arrayOrdersSelected.order_items.map(a => {
                    if (a && a.order_items_id) {
                        a.order_items_id.map(b => {
                            if (b && b.id_data) {
                                b.id_data.map(c => {
                                    if (c && c.tracking) {
                                        c.tracking.map(d => {
                                            d.color = 'black';
                                            d.img = 'reverse_drop_black';
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            }

            if(this.arrayOrdersOthers) {
                this.arrayOrdersOthers.order_items.map(a => {
                    if (a && a.order_items_id) {
                        a.order_items_id.map(b => {
                            if (b && b.id_data) {
                                b.id_data.map(c => {
                                    if (c && c.tracking) {
                                        c.tracking.map(d => {
                                            d.color = 'black';
                                            d.img = 'reverse_drop_black';
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            }

            if (actualDropColor === 'black') {
                // Pasamos todos a negro excepto el actual que debe ser verde
                for (let index = 0; index < from.order_items[0].order_items_id[indexOrder].id_data[0].tracking.length; index++) {
                    const element = from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[index];
                    element.color = 'black';
                    element.img = 'reverse_drop_black';
                }

                from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath].color = 'green';
                from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath].img = 'reverse_drop_green';
                const [position] = this.allPostionsNoFinalized.filter(a => a.order == from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath].order);
                // console.log("🚀 ~ file: orders-details.component.ts ~ class: OrdersDetailsComponent ~ func: setTimeout ~ var: position", position)
                // console.log('this.arrayPath :>> ', this.arrayPath);
                if (position) {
                    if(this.isClickedMarker) {
                        this.isClickedMarker = false;
                    }

                    this.changeMarker(position);

                    this.latlngBounds = new window['google'].maps.LatLngBounds();
                    this.latlngBounds.extend(new window['google'].maps.LatLng((+position.lat) - 0.001, (+position.lng) - 0.001));
                    this.latlngBounds.extend(new window['google'].maps.LatLng(+position.lat, +position.lng));
                    this.latlngBounds.extend(new window['google'].maps.LatLng((+position.lat) + 0.001, (+position.lng) + 0.001));
                }
            } else {
                this.isClickedMarker = false;

                this.allPostionsNoFinalized && this.allPostionsNoFinalized.map(a => {
                    if (a.order == from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath].order) {
                        let position = a;
                        let typeLower = position.type.toLowerCase();
                        typeLower = (typeLower == 'pavimento') ? 'concreto' : typeLower;
                        typeLower = (typeLower == 'mortero') ? 'rapimix' : typeLower;
                        typeLower = (typeLower == 'prefabricados livianos') ? 'prefabricados' : typeLower;

                        if (this.isClickedMarker) {
                            position.isOpen = true;
                            position.iconUrl = `./assets/images/svg/mixers/${typeLower}/green-${position.order}-${typeLower}.png`;
                        } else {
                            position.isOpen = false;
                            position.iconUrl = `./assets/images/svg/mixers/${typeLower}/black-${position.order}-${typeLower}.png`;
                        }
                    }
                })
                // Pasamos a negro ya que se esta deseleccionando
                from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath].color = 'black';
                from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath].img = 'reverse_drop_black';
            }
            // console.log('from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath] :>> ', from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexPath]);

            // Guardamos los cambios para ser leido en el dismiss
            this.storageSrv.setItemObj("arrayPathSelected", this.arrayPathSelected);
            this.storageSrv.setItemObj("arrayPathOthers", this.arrayPathOthers);
            this.storageSrv.setItemObj("arrayOrdersSelected", this.arrayOrdersSelected);
            this.storageSrv.setItemObj("arrayOrdersOthers", this.arrayOrdersOthers);

            this.storageSrv.setItemObj("isClickedMarker", this.isClickedMarker);
            this.storageSrv.setItemObj("allPostionsNoFinalized", this.allPostionsNoFinalized);

            this.storageSrv.setItemObj("sheetOrigin", 'onPath');
        }
    }

    onTracking(indexOrder, indexTracking: number, fromArray: string = null, type: string = null) {
        // console.log('indexOrder, indexTracking', indexOrder, indexTracking);

        this.actualTab = 1;

        let from: any = []

        if (type === 'selected') {
            from = this.arrayOrdersSelected;
        } else {
            from = this.arrayOrdersOthers;
        }

        let actualDropColor = from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexTracking].color;

        //Pasamos todas las imagenes de la gota a negro en todos los arrays
        if(this.arrayPathSelected) {
            this.arrayPathSelected.order_items.map(a => {
                if (a && a.order_items_id) {
                    a.order_items_id.map(b => {
                        if (b && b.id_data) {
                            b.id_data.map(c => {
                                if (c && c.tracking) {
                                    c.tracking.map(d => {
                                        d.color = 'black';
                                        d.img = 'reverse_drop_black';
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }

        if(this.arrayPathOthers) {
            this.arrayPathOthers.order_items.map(a => {
                if (a && a.order_items_id) {
                    a.order_items_id.map(b => {
                        if (b && b.id_data) {
                            b.id_data.map(c => {
                                if (c && c.tracking) {
                                    c.tracking.map(d => {
                                        d.color = 'black';
                                        d.img = 'reverse_drop_black';
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }

        if(this.arrayOrdersSelected) {
            this.arrayOrdersSelected.order_items.map(a => {
                if (a && a.order_items_id) {
                    a.order_items_id.map(b => {
                        if (b && b.id_data) {
                            b.id_data.map(c => {
                                if (c && c.tracking) {
                                    c.tracking.map(d => {
                                        d.color = 'black';
                                        d.img = 'reverse_drop_black';
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }

        if(this.arrayOrdersOthers) {
            this.arrayOrdersOthers.order_items.map(a => {
                if (a && a.order_items_id) {
                    a.order_items_id.map(b => {
                        if (b && b.id_data) {
                            b.id_data.map(c => {
                                if (c && c.tracking) {
                                    c.tracking.map(d => {
                                        d.color = 'black';
                                        d.img = 'reverse_drop_black';
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }

        if(actualDropColor === 'black'){
            // Pasamos todos a negro excepto el actual que debe ser verde
            for (let index = 0; index < from.order_items[0].order_items_id[indexOrder].id_data[0].tracking.length; index++) {
                const element = from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[index];

                element.color = 'black';
                element.img = 'reverse_drop_black';
            }

            from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexTracking].color = 'green';
            from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexTracking].img = 'reverse_drop_green';

            const [position] = this.allPostions.filter(a => a.order == from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexTracking].order);
            // console.log("🚀 ~ file: orders-details.component.ts ~ class: OrdersDetailsComponent ~ func: setTimeout ~ var: position", position)

            if (position) {
                if(this.isClickedMarker) {
                    this.isClickedMarker = false;
                }

                this.changeMarker(position);

                this.latlngBounds = new window['google'].maps.LatLngBounds();
                this.latlngBounds.extend(new window['google'].maps.LatLng((+position.lat) - 0.001, (+position.lng) - 0.001));
                this.latlngBounds.extend(new window['google'].maps.LatLng(+position.lat, +position.lng));
                this.latlngBounds.extend(new window['google'].maps.LatLng((+position.lat) + 0.001, (+position.lng) + 0.001));
            }
        } else {
            this.isClickedMarker = false;

            this.allPostionsNoFinalized && this.allPostionsNoFinalized.map(a => {
                if (a.order == from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexTracking].order) {
                    let position = a;
                    let typeLower = position.type.toLowerCase();
                    typeLower = (typeLower == 'pavimento') ? 'concreto' : typeLower;
                    typeLower = (typeLower == 'mortero') ? 'rapimix' : typeLower;
                    typeLower = (typeLower == 'prefabricados livianos') ? 'prefabricados' : typeLower;

                    if (this.isClickedMarker) {
                        position.isOpen = true;
                        position.iconUrl = `./assets/images/svg/mixers/${typeLower}/green-${position.order}-${typeLower}.png`;
                    } else {
                        position.isOpen = false;
                        position.iconUrl = `./assets/images/svg/mixers/${typeLower}/black-${position.order}-${typeLower}.png`;
                    }
                }
            })

            // Pasamos a negro ya que se esta deseleccionando
            from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexTracking].color = 'black';
            from.order_items[0].order_items_id[indexOrder].id_data[0].tracking[indexTracking].img = 'reverse_drop_black';
        }

        // Guardamos los cambios para ser leido en el dismiss
        this.storageSrv.setItemObj("arrayPathSelected", this.arrayPathSelected);
        this.storageSrv.setItemObj("arrayPathOthers", this.arrayPathOthers);
        this.storageSrv.setItemObj("arrayOrdersSelected", this.arrayOrdersSelected);
        this.storageSrv.setItemObj("arrayOrdersOthers", this.arrayOrdersOthers);

        this.storageSrv.setItemObj("isClickedMarker", this.isClickedMarker);
        this.storageSrv.setItemObj("allPostionsNoFinalized", this.allPostionsNoFinalized);

        this.storageSrv.setItemObj("sheetOrigin", 'onTracking');
    }

    changeMarker(position) {
        // console.log('position', position);
        this.isClickedMarker = this.isClickedMarker ? false : true;
        if(![1, 999999].includes(position.zIndex)) {

            let typeLower = position.type.toLowerCase();
            typeLower = (typeLower == 'pavimento') ? 'concreto' : typeLower;
            typeLower = (typeLower == 'mortero') ? 'rapimix' : typeLower;
            typeLower = (typeLower == 'prefabricados livianos') ? 'prefabricados' : typeLower;

            this.allPostionsNoFinalized.forEach((item, idx) => {
                if (item.nro_material != position.nro_material) {
                    item.isOpen = false
                    item.iconUrl = item.iconUrl.replace('green', 'black');
                }

                if (item.type !== undefined) {
                    if (item.type.toUpperCase() === 'CONCRETO') {
                       item.greenIcon = 'green_concrete_mixer';
                    } else if (item.type.toUpperCase() === 'PREFABRICADOS LIVIANOS') {
                        item.greenIcon = 'green_prefabricado_mixer';
                    } else {
                        item.greenIcon = 'green_cemento_rapimix_mixer';
                    }
                }
            })

            if(this.isClickedMarker) {
                position.isOpen = true;
                position.iconUrl = `./assets/images/svg/mixers/${typeLower}/green-${position.order}-${typeLower}.png`;
            } else {
                position.isOpen = false;
                position.iconUrl = `./assets/images/svg/mixers/${typeLower}/black-${position.order}-${typeLower}.png`;
            }
        }

        // Actualizamos el array con la informacion de position
        for (let index = 0; index < this.allPostionsNoFinalized.length; index++) {
            const element = this.allPostionsNoFinalized[index];

            if(element.order === position.order){
                element.isOpen = position.isOpen;
                element.iconUrl = position.iconUrl;
            }
        }
        // console.log('this.allPostionsNoFinalized :>> ', this.allPostionsNoFinalized);
    }

    onCheck(indexItemId: number, indexDataId: number, indexTracking: number, selectedCoordinate: boolean) {
        // console.log('indexItemId :>> ', indexItemId);
        // console.log('indexDataId :>> ', indexDataId);
        // console.log('indexTracking :>> ', indexTracking);
        // console.log('selectedCoordinate :>> ', selectedCoordinate);

        let actualNroMaterial = '';
        if(selectedCoordinate){
            let actualCheck = this.arrayPathSelected.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].checked;
            actualNroMaterial = this.arrayPathSelected.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].nro_material;

            // Actualizamos el check del array original
            if(actualCheck){
                this.arrayPathSelected.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].checked = false;
                this.arrayPathSelected.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].img = "reverse_drop_black";
            } else {
                this.arrayPathSelected.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].checked = true;
            }
        } else {
            let actualCheck = this.arrayPathOthers.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].checked;
            actualNroMaterial = this.arrayPathOthers.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].nro_material;

            // Actualizamos el check del array original
            if(actualCheck){
                this.arrayPathOthers.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].checked = false;
                this.arrayPathOthers.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].img = "reverse_drop_black";
            } else {
                this.arrayPathOthers.order_items[0].order_items_id[indexItemId].id_data[indexDataId].tracking[indexTracking].checked = true;
            }
        }

        // Actualizamos el check del array de posiciones
        for (let index = 0; index < this.allCoordinates.length; index++) {
            let element = this.allCoordinates[index];

            if(element.indexTracking === indexTracking && element.nro_material === actualNroMaterial && element.selectedCoordinate === selectedCoordinate) {
                if(element.checked){
                    element.checked = false;
                } else {
                    element.checked = true;
                }
            }
        }

        // Agregamos datos dependiendo del check
        this.activeCoordinates = [];
        for (let index = 0; index < this.allCoordinates.length; index++) {
            let element = this.allCoordinates[index];

            if(element.checked) {
                this.activeCoordinates = [
                    ...this.activeCoordinates,
                    element
                ]
            }
        }

        // Guardamos los cambios para ser leidos en el dismiss
        this.storageSrv.setItemObj("arrayPathSelected", this.arrayPathSelected);
        this.storageSrv.setItemObj("arrayPathOthers", this.arrayPathOthers);

        this.storageSrv.setItemObj("allCoordinates", this.allCoordinates);
        this.storageSrv.setItemObj("activeCoordinates", this.activeCoordinates);

        this.storageSrv.setItemObj("sheetOrigin", 'onCheck');

        // this.centerMap();
    }

    onDestroy(){
    }

    changePathInfo(){
        if(this.showMorePathInfo){
            this.intermediatePathText = "Ver más pedidos de esta obra";
            this.showMorePathInfo = false;
        } else {
            this.intermediatePathText = "Ver menos pedidos de esta obra";
            this.showMorePathInfo = true;
        }
    }
    changeOrdersInfo(){
        if(this.showMoreOrdersInfo){
            this.intermediateOrdersText = "Aquí puedes ver tus otros pedidos";
            this.showMoreOrdersInfo = false;
        } else {
            this.intermediateOrdersText = "Ver menos pedidos de esta obra";
            this.showMoreOrdersInfo = true;
        }
    }
    changeFinalizedInfo(){
        if(this.showMoreFinalizedInfo){
            this.intermediateFinalizedText = "Aquí puedes ver tus otros pedidos";
            this.showMoreFinalizedInfo = false;
        } else {
            this.intermediateFinalizedText = "Ver menos pedidos de esta obra";
            this.showMoreFinalizedInfo = true;
        }
    }
}
