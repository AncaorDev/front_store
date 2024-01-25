import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.pug',
  styleUrls: ['./carousel-home.component.scss']
})
export class CarouselHomeComponent implements OnInit {

  elementos = [];

  constructor(){}

  ngOnInit() {
    this.elementos = [
      {
        logo: "./assets/images/prog-icon.png",
        sub: "PROGRAMACION",
        text1: "Envía tu solicitud de programación desde la web o celular.",
        text2: "Podrás tener visibilidad del estado de tu programación en todo momento.",
        cel: "./assets/images/programacion.png"
      },
      {
        logo: "./assets/images/desp-icon.png",
        sub: "DESPACHOS",
        text1: "Visualiza en línea los estados de tus despachos: Activo, Programado o Fin.",
        text2: "Información histórica de tus despachos: Fecha y Volumen.",
        cel: "./assets/images/despachos.png"
      },
      {
        logo: "./assets/images/track-icon.png",
        sub: "TRACKING",
        text1: "Mantente informado en tiempo real de la ubicación del mixer y bomba (GPS).",
        text2: "Conoce las horas de llegada y salida de equipos de tu obra.",
        cel: "./assets/images/tracking.png"
      },
      {
        logo: "./assets/images/notif-icon.png",
        sub: "NOTIFICACIONES",
        text1: "Entérate en tiempo real cuando tu despacho haya iniciado y finalizado.",
        text2: "Ten conocimiento inmediato si tu programación ha tenido algún cambio.",
        cel: "./assets/images/notificaciones.png"
      }
    ]
  }

  ngOnChanges(): void {}

  selectSolution(){

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
