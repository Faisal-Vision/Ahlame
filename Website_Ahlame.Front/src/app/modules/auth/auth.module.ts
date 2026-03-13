import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";


@NgModule({
  declarations: [
   LoginComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, AuthRoutingModule],
  exports: [
 
  ]
})
export class AuthModule {}
