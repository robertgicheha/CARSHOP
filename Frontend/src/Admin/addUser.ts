const AddUser = document.getElementById('UserForm') as HTMLFormElement;
const delUserbtn = document.getElementById('delbtn') as HTMLInputElement;
const addUserbtn = document.getElementById('addbtn') as HTMLInputElement;
const updateUserbtn = document.getElementById('updatebtn') as HTMLInputElement;

AddUser.addEventListener('click', async (e) => {
    e.preventDefault();

    const Username = document.getElementById('username') as HTMLInputElement;
    const PhoneNumber = document.getElementById('phone') as HTMLInputElement;
    const Pass = document.getElementById('pass') as HTMLInputElement;
    const Address = document.getElementById('address') as HTMLInputElement;
    const Fullname = document.getElementById('fullname') as HTMLInputElement;
    const EmailAddress = document.getElementById('emailAddress') as HTMLInputElement;
    const Cpass = document.getElementById('cpass') as HTMLInputElement;
    const Country = document.getElementById('country') as HTMLInputElement;
    const IsDeleted = document.getElementById('isDeleted') as HTMLInputElement;

    const Users = await addUsers(Username.value,PhoneNumber.value,Pass.value,Address.value,Fullname.value,EmailAddress.value,Cpass.value,Country.value, IsDeleted)
    if(Users){
        window.location.href= 'admin.html'
        console.log(Users);
        
    }
})

const addUsers = async(Username:string,PhoneNumber:string,Pass:string,Address:string,Fullname:string,EmailAddress:string,Cpass:string,Country:string,IsDeleted:HTMLInputElement) => {
    console.log(Username,PhoneNumber,Pass,Address,Fullname,EmailAddress,Cpass,Country,IsDeleted);
    let response = await fetch("",{
        method:"POST",
        body: JSON.stringify({
            Username,
            PhoneNumber,
            Pass,
            Address,
            Fullname,
            EmailAddress,
            Cpass,
            Country,
            IsDeleted: IsDeleted.checked?"1":"0"
        })
        
    })
    if(response.status === 200){
        let Users = await response.json();
        return Users;
    } else{
        console.log("error");
        
    }
    
}
const getUsers = async () => {
    let response = await fetch("");
    if (response.status === 200) {
        let Users = await response.json();
        return Users;
    } else {
        console.log("error");
    }
}

const getOrders = async () => {
    let response = await fetch("");
    if (response.status === 200) {
        let orders = await response.json();
        return orders;
    } else {
        console.log("error");
    }
}




