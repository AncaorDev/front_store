import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class DialogService {
    // Comunicacion entre componentes(lectura y escritura) para mas logica si se necesita
    sendData: BehaviorSubject<dialogSendData> = new BehaviorSubject<dialogSendData>(null);
    trackingData: BehaviorSubject<dialogTrackingData> = new BehaviorSubject<dialogTrackingData>(null);
    reloadDashboard: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);

    // Data storage para reseteo de data, sin mas logica de por medio para las actualizaciones
    trackingDataObject: dialogTrackingData = {
        actualTab: { index: 0 },
        onboardingEnCaminoMoreDetails: false,
        onboardingEnObraMoreDetails: false,
        onboardingFinalizadosMoreDetails: false,
        onboardingNoMixerSelected: false,
        onboardingEnObraMixerSelected: false
    }

	constructor(){}
}

export interface dialogSendData {
    onboardingHistoryMoreDetails?:boolean;
}
export interface dialogTrackingData {
    actualTab?:any;
    onboardingEnCaminoMoreDetails?:boolean;
    onboardingEnObraMoreDetails?:boolean;
    onboardingFinalizadosMoreDetails?:boolean;
    onboardingEnObraMixerSelected?:boolean;
    onboardingNoMixerSelected?:boolean;
}
