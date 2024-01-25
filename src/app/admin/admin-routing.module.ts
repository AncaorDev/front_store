import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { InventaryAddComponent } from './pages/inventary-add/inventary-add.component';
import { SCREEN_LOGIN, SCREEN_LOGOUT, SCREEN_PROFILE, SCREEN_SCHEDULING_FORM, SCREEN_SCHEDULING_LIST, SCREEN_SIGNUP } from '../shared/shared.variables';
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';
import { TypesProductComponent } from './pages/types-product/types-product.component';
import { TypesProductAddComponent } from './pages/types-product-add/types-product-add.component';
import { MarkProductComponent } from './pages/mark-product/mark-product.component';
import { MarkProductAddComponent } from './pages/mark-product-add/mark-product-add.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { ProgrammingComponent } from './pages/inventary/inventary.component';
import { MovementsAddComponent } from './pages/movements-add/movements-add.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ClasificationProductComponent } from './pages/clasification-product/clasification-product.component';
import { ClasificationProductAddComponent } from './pages/clasification-product-add/clasification-product-add.component';
import { StoreComponent } from './pages/store/store.component';
import { StoreAddComponent } from './pages/store-add/store-add.component';
import { RolComponent } from './pages/rol/rol.component';
import { RolAddComponent } from './pages/rol-add/rol-add.component';
@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', redirectTo: '/admin/login', pathMatch: 'full' },
		{ 	path: 'login',
			component: LoginComponent,
			canActivate : [AuthguardGuard],
			data : {
				islogin : true,
				no_template : true
			}
		},
		{
			path:'dashboard',
            redirectTo: 'v2/dashboard',
			canActivate:[
				AuthguardGuard
			]
		},
		{
			path:'v2/dashboard',
			component:Dashboard2Component,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'inventary',
			component:ProgrammingComponent,
			canActivate:[
				AuthguardGuard
			]
		},
		{
			path:'types',
			component:TypesProductComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'types/create',
			component:TypesProductAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'types/edit/:id',
			component:TypesProductAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'clasification',
			component:ClasificationProductComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'clasification/create',
			component:ClasificationProductAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'clasification/edit/:id',
			component:ClasificationProductAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'marks',
			component: MarkProductComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'marks/create',
			component:MarkProductAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'marks/edit/:id',
			component:MarkProductAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'movements',
			component: MovementsComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'movements/create',
			component:MovementsAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'movements/edit/:id',
			component:MovementsAddComponent,
			canActivate:[
				AuthguardGuard
			],
		},
		{
			path:'inventary/create',
			component : InventaryAddComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'inventary/edit/:id',
			component : InventaryAddComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'stores',
			component : StoreComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'stores/create',
			component : StoreAddComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'stores/edit/:id',
			component : StoreAddComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'rol',
			component : RolComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'rol/create',
			component : RolAddComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'rol/edit/:id',
			component : RolAddComponent,
			canActivate : [
				AuthguardGuard
			]
		},
		{
			path:'logout',
			component:LogoutComponent
		}
	])],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

