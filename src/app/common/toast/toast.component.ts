import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Toast } from '../models/toast.model';


@Component({
    selector: 'toast-app',
    standalone: true,
    templateUrl: './toast.component.html',
    styleUrls: ['toast.component.scss'],
    imports: [CommonModule]
})
export class ToastComponent {
    toast: Toast = {
        type: 'info',
        message: '',
        status: 0,
        erro: '',
    }

    constructor(
        public dialogRef: MatDialogRef<ToastComponent>,
        @Inject(MAT_DIALOG_DATA) public toastData: Toast
    ) {
    }

    ngOnInit() {
        this.toast = this.toastData;
        if (this.toast.message == '') {
          this.toast.message = 'Houve um problema de conexão. Tente novamente!'
        }
        setTimeout(()=>{
          this.dialogRef.close()
        },3000)
    }

    getTitle(type: string | undefined) {
        switch (type) {
            case 'error': return 'Erro';
            case 'info': return 'Informativo';
            case 'success': return 'Informativo';
            default: return 'Informativo';
        }
    }


}