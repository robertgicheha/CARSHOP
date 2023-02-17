

export class UserRegistrationType{

    constructor (public userId:string ,public userName:string ,public email:string ,public password:string,public address:string,
        public fullname:string,public phoneNo:string,public country:string){}
}

export class ProductType{
    constructor( public carId:string, public model :string, public bodyType:string , public brand:string,public prices:number,public isDeleted:string, public pictureUrl:string){}
}