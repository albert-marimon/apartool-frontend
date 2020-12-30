import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  public displayedColumns: string[] = ['id', 'firstname', 'email', 'actions'];
  public dataSource: any;
  public success: boolean;
  public users: User[] = [];
  public user: User;
  public page_title: string;
  public desactivated_users: User[] = [];
  public identity: {};
  public token: string;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.loadUser();
    if (!this.token) {
		  this.router.navigate(['/login']);
		}
    this.page_title = "Listado de Usuarios";
    this.user = new User('', '', '', '', '', '', 0);
  }

  ngOnInit(){
    //Reinicio datos
    this.desactivated_users = [];
    this.users = [];
    this._userService.getUsers()
      .subscribe(
        (val) => {
          //Rellenar usuarios desactivados
          for(let i = 0; i<val.users.length; i++){
            if(val.users[i].active == 0){
              this.desactivated_users.push(val.users[i]);
            } else {
              this.users.push(val.users[i]);
            }
          }
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        }
      );

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action: string, selected) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '650px';
    dialogConfig.data = {
        id: selected.id,
        firstname: selected.firstname,
        email: selected.email,
        lastname: selected.lastname,
        phone_number: selected.phone_number,
        default_lang: selected.default_lang,
        created_at: selected.created_at,
        action: action,
    };

    const dialogRef = this.dialog.open(DataDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Añadir'){
        this.addRowData(result);
      }else if(result.event == 'Actualizar'){
        this.updateRowData(result);
      }else if(result.event == 'Eliminar'){
        this.deleteRowData(result);
      }
    });
  }

  addRowData(row_obj){
    this.user = {
      firstname:row_obj.firstname.value,
      lastname:row_obj.lastname.value,
      email:row_obj.email.value,
      password:row_obj.password.value,
      phone_number:row_obj.phone_number.value,
      default_lang:row_obj.default_lang.value,
      active: 1
    }

    this._userService.register(this.user).subscribe(
      response => {
				if(response.status == 'success'){
          this.dataSource.data.push(response.user);
          this.showToastInfo('Usuario creado correctamente', 'X');
          this.ngOnInit();
				} else {
          this.success = false;
          this.showToastInfo('Error al recibir los datos del servidor', 'X');
				}
  		}, error => {
          this.success = false;
          console.log();
          this.showToastInfo(<any>error.message, 'X');
  			}
    );
  }

  updateRowData(row_obj){
    let user_update = {
      firstname:row_obj.firstname.value,
      lastname:row_obj.lastname.value,
      email:row_obj.email.value,
      phone_number:row_obj.phone_number.value,
      default_lang:row_obj.default_lang.value,
      active: 1
    }

    this._userService.update(user_update, row_obj.id).subscribe(
      response => {
				if(response.status=='success'){
          this.success = response.success;
          this.dataSource.data.filter((value,key)=>{
            if(value.id == response.user.id){
              value.firstname = response.changes.firstname;
              value.lastname = response.changes.lastname;
              value.email = response.changes.email;
              value.phone_number = response.changes.phone_number;
              value.default_lang = response.changes.default_lang;
              value.active = response.changes.active;
            }
            return true;
          });
          this.showToastInfo(response.changes.firstname+' actualizado', 'X');
				} else {
          this.success = false;
          this.showToastInfo(JSON.stringify(response.errors), 'X');
				}
  		}, error => {
          this.success = false;
          this.showToastInfo(<any>error.errors, 'X');
  			}
    );
  }

  deleteRowData(row_obj){
    this._userService.delete(row_obj.id).subscribe(
      response => {
				if(response.status == 'success'){
          this.success = response.success;
          this.dataSource.data.filter((value,key)=>{
            return value.id != row_obj.id;
          });
          this.showToastInfo('Usuario desactivado correctamente', 'X');
          this.ngOnInit();
				} else {
          this.success = false;
          this.showToastInfo('Error al recibir los datos del servidor', 'X');
				}
  		}, error => {
          this.success = false;
          this.showToastInfo(<any>error.message, 'X');
  		}
    );
  }

  showToastInfo(message, action){
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  loadUser(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

}