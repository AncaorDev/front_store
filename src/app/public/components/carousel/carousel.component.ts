import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { LocalStorageService } from '@root/app/shared/providers/storage/local-storage.service';
import { URL_SOLUTIONS } from '@root/app/app.constants';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.pug',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input('seleccion') seleccion:any;
  @Input('card') card:boolean;

  @Input('categoria') categoria:any;
  @Input('segmentos') segmentos:any;

  public elementos = [];
  public productos = [];
  public cardArray = [];
  public counter: number = 0;

  origenActual: string = "";

  constructor(
    private router: Router,
    private localSrv: LocalStorageService,
    private storageSrv: LocalStorageService
  ){}

  ngOnInit() {
  }

  ngOnChanges(): void {
      if(!this.card){
        this.elementos = this.seleccion.id == 3 ? this.categoria : this.segmentos;
      } else {
        this.cardArray = [...this.seleccion];
        this.cardArray.map(data => {
          let arrayFechas = data.fecha.split("-");
          data.dia = arrayFechas[2];
          if(arrayFechas[1] == "01"){
            data.mes = "Ene"
          } else if(arrayFechas[1] == "02"){
            data.mes = "Feb"
          } else if(arrayFechas[1] == "03"){
            data.mes = "Mar"
          } else if(arrayFechas[1] == "04"){
            data.mes = "Abr"
          } else if(arrayFechas[1] == "05"){
            data.mes = "May"
          } else if(arrayFechas[1] == "06"){
            data.mes = "Jun"
          } else if(arrayFechas[1] == "07"){
            data.mes = "Jul"
          } else if(arrayFechas[1] == "08"){
            data.mes = "Ago"
          } else if(arrayFechas[1] == "09"){
            data.mes = "Sep"
          } else if(arrayFechas[1] == "10"){
            data.mes = "Oct"
          } else if(arrayFechas[1] == "11"){
            data.mes = "Nov"
          } else if(arrayFechas[1] == "12"){
            data.mes = "Dic"
          }
          data.ano = arrayFechas[0];
        })
      }
  }

  selectSolution(card){
    let newCard = {
      ...card,
      detail: null,
      open: false
    }
    this.storageSrv.set('origen', 'dashboard empresa');
    this.localSrv.setItemObj("eventObject", newCard);
    if(this.seleccion.id == 3) {
      this.router.navigate(['admin/'+URL_SOLUTIONS], { queryParams: { category: card.id }})
    } else if (this.seleccion.id == 1) {
      this.router.navigate(['admin/'+URL_SOLUTIONS], { queryParams: { type: card.id }})
    }
	}

  selectEvent(card){
    let newCard = {
      ...card,
      detail: null,
      open: false
    }
    this.storageSrv.set('origen', 'dashboard empresa');
    this.localSrv.setItemObj("eventObject", newCard);
    this.router.navigate(['/admin/eventos/']);
  }

  config: SwiperOptions = {
    // pagination: { el: '.swiper-pagination', clickable: true },
    slidesPerView: 3,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 1
  };

  configCard: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    slidesPerView: 1,
    spaceBetween: 1
  };

}
