import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'dashboard-angular';
  public status:String;
  public isConnected=true;
  public horizontalPosition: MatSnackBarHorizontalPosition='center';
  public verticalPosition: MatSnackBarVerticalPosition='bottom';

  constructor(
    private _connectionService: ConnectionService,
    public _snackBar: MatSnackBar
  ){
    this._connectionService.monitor().subscribe(isConnected => {
      this.isConnected=isConnected;
      if(this.isConnected){
        this.status="Online";
      }else{
        this.status="Offline";
      }
      this._snackBar.open('You are '+this.status, 'Ok', {
        duration: 3000,
        panelClass: ['black-snackbar']
      });
    });
  }
}
