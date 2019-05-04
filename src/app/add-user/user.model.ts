export class UserModel {
    id?: number;
    first_name?: string;
    last_name?: string;
    contact?: string;
    email?: string;
    gender?: number;
    clear() {
        this.id=null;
        this.first_name = '';
        this.last_name = '';
        this.contact = '';
        this.email = '';
        this.gender = null;
    }
}
