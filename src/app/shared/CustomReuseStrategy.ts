import {
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
    RouteReuseStrategy,
  } from '@angular/router';

export class CustomRouterReuseStrategy extends RouteReuseStrategy {
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
      return false;
    }
    store(
      route: ActivatedRouteSnapshot,
      handle: DetachedRouteHandle | null
    ): void {}

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      return false;
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
      return null;
    }

    shouldReuseRoute(
      future: ActivatedRouteSnapshot,
      curr: ActivatedRouteSnapshot
    ): boolean {

        if(curr.routeConfig?.data?.['doNotReuse']){
            return false
        }
      return curr.routeConfig === future.routeConfig;
    }
  }
