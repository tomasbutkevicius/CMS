const tableKey = 'cms-table';

let cmsTable;
let cmsTableDemo = {
    'AlgirdasKuzminskas': {
        'firstName': 'Algirdas',
        'lastName': 'Kuzminskas',
        'phone': '864599877',
        'email': 'algis@gmail.com',
        'birthDate': '1999-07-18',
        'address': 'Saint Petersburg'
    },
    'RupertGimm': {
        'firstName': 'Rupert',
        'lastName': 'Gimm',
        'birthDate': '1999-05-05',
        'phone': '448484',
        'email': 'rup@gmail.com',
        'address': 'st Barbara street'
    }
};

let enableDisableNameInput = (option)=>{
    personFirstName = document.getElementById("newPersonFirstName");
    personLastName = document.getElementById("newPersonLastName");
    if(option === 'enable'){
        personFirstName.disabled = false;
        personLastName.disabled = false;
    } else if(option === 'disable'){
        personFirstName.disabled = true;
        personLastName.disabled = true;
    }
}

let refreshDOMTable = () => {
    let editingEnabled = false;
    let cmsTableKeys = Object.keys(cmsTable);
    let tableContainer = document.getElementById("cmsTableContainer");
    let oldTableBody = document.getElementById('tableBody');
    tableContainer.removeChild(oldTableBody);

    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);

    for(let i =0; i< cmsTableKeys.length; i++){
        let currentRow = document.createElement('div');
        let currentKeyCol = document.createElement('div');
        let currentFirstNameCol = document.createElement('div');
        let currentLastNameCol = document.createElement('div');
        let currentBirthDateCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentEmailCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');

        currentRow.className = 'cms-table-row';
        currentKeyCol.className = 'cms-table-column cms-key';
        currentFirstNameCol.className = 'cms-table-column cms-first-name';
        currentLastNameCol.className = 'cms-table-column cms-last-name';
        currentBirthDateCol.className = 'cms-table-column cms-birth-date';
        currentPhoneCol.className = 'cms-table-column cms-phone';
        currentEmailCol.className = 'cms-table-column cms-email'
        currentAddressCol.className = 'cms-table-column cms-address';
        currentEditBtn.className ='cms-table-column cms-edit';
        currentDeleteBtn.className = 'cms-table-column cms-delete';

        currentKeyCol.innerHTML = cmsTableKeys[i];
        currentFirstNameCol.innerHTML = cmsTable[cmsTableKeys[i]].firstName;
        currentLastNameCol.innerHTML = cmsTable[cmsTableKeys[i]].lastName;
        currentBirthDateCol.innerHTML = cmsTable[cmsTableKeys[i]].birthDate;

        currentPhoneCol.innerHTML = cmsTable[cmsTableKeys[i]].phone;
        currentEmailCol.innerHTML = cmsTable[cmsTableKeys[i]].email;
        currentAddressCol.innerHTML = cmsTable[cmsTableKeys[i]].address;
        

        currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';

        currentRow.appendChild(currentKeyCol);
        currentRow.appendChild(currentFirstNameCol);
        currentRow.appendChild(currentLastNameCol);
        currentRow.appendChild(currentBirthDateCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentEmailCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);

        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewUserModal = (option) => {
        let newPersonFirstName = document.getElementById('newPersonFirstName'); 
        newPersonFirstName.value = '';
        let newPersonLastName = document.getElementById('newPersonLastName'); 
        newPersonLastName.value = '';
        let newPersonBirthDate = document.getElementById('newPersonBirthDate'); 
        newPersonBirthDate.value = '';
        let newPersonPhone = document.getElementById('newPersonPhone');
        newPersonPhone.value = '';
        let newPersonEmail = document.getElementById('newPersonEmail');
        newPersonEmail.value = '';
        let newPersonAddress = document.getElementById('newPersonAddress');
        newPersonAddress.value = '';
        
        let newPersonModal = document.getElementById('newPersonModal');
        newPersonModal.className = `${option}-modal`;

        let backdrop = document.getElementById('backdrop');
        backdrop.className = `${option}-modal`
    }


    let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
    //ADD
    newPersonSubmitBtn.addEventListener('click', () => {
        let newPersonFirstName  = document.getElementById('newPersonFirstName').value.trim();
        let newPersonLastName   = document.getElementById('newPersonLastName').value.trim();
        let newPersonKey        = newPersonFirstName + newPersonLastName;
        let newPersonBirthDate  = document.getElementById('newPersonBirthDate').value.trim();
        let newPersonPhone      = document.getElementById('newPersonPhone').value.trim();
        let newPersonEmail      = document.getElementById('newPersonEmail').value.trim();
        let newPersonAddress    = document.getElementById('newPersonAddress').value.trim();
        let errorMessage        = document.getElementById("errorMessage");
        let isValidEmail = false;
        let isValidPhone = false;
        let isValidKey   = true;

        if(newPersonFirstName === ''){
            document.getElementById('newPersonFirstName').className = 'input-err';
        } else {
            document.getElementById('newPersonFirstName').className = '';
        }

        if(newPersonLastName === ''){
            document.getElementById('newPersonLastName').className = 'input-err';
        } else {
            document.getElementById('newPersonLastName').className = '';
        }
        
        if(newPersonBirthDate === ''){
            document.getElementById('newPersonBirthDate').className = 'input-err';
        } else {
            document.getElementById('newPersonBirthDate').className = '';
        }

        if(newPersonPhone === ''){
            document.getElementById('newPersonPhone').className = 'input-err';
        } else {
            document.getElementById('newPersonPhone').className = '';
        }

        if(newPersonEmail === ''){
            document.getElementById('newPersonEmail').className = 'input-err';
        } else {
            document.getElementById('newPersonEmail').className = '';
        }

        if (validateEmail(newPersonEmail)) {
            isValidEmail = true;
            errorMessage.textContent = '';
            document.getElementById('newPersonEmail').className = ''; 
            if (!editingEnabled && isEmailAlreadyUsed(newPersonEmail)){
                    isValidEmail = false;
                    errorMessage.textContent = 'Email is already used';
                    document.getElementById('newPersonEmail').className = 'input-err';
            } 

             else   if (validatePhone(newPersonPhone)) {
                            isValidPhone = true;
                            errorMessage.textContent = '';
                            document.getElementById('newPersonPhone').className = ''; 
                            if (!editingEnabled && isPhoneAlreadyUsed(newPersonPhone)){
                                    isValidPhone = false;
                                    errorMessage.textContent = 'Phone is already used';
                                    document.getElementById('newPersonPhone').className = 'input-err';
                            }

                        } else {
                            errorMessage.textContent += ' Phone is not valid';
                            document.getElementById('newPersonPhone').className = 'input-err';
                        }

        } else {
            errorMessage.textContent = 'Email is not valid';
            document.getElementById('newPersonEmail').className = 'input-err';
        }

        if(!editingEnabled && isValidEmail && isValidPhone){
            if(isKeyAlreadyUsed(newPersonKey)){
                isValidKey = false;
                errorMessage.textContent = 'Contact Name is already taken';
                document.getElementById('newPersonFirstName').className = 'input-err';
                document.getElementById('newPersonLastName').className  = 'input-err';
            } else {
                errorMessage.textContent = '';
            }
        }

        if(newPersonFirstName !== '' && newPersonLastName !== '' && newPersonPhone !== ''
         && newPersonEmail !== '' && newPersonBirthDate !== ''
         && isValidEmail && isValidPhone && isValidKey){
            cmsTable[newPersonKey] = {
                'firstName': newPersonFirstName,
                'lastName': newPersonLastName,
                'birthDate': newPersonBirthDate,
                'phone': newPersonPhone,
                'email': newPersonEmail,
                'address': newPersonAddress
            }
            localStorage.setItem(tableKey, JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshDOMTable();
        }
    });

    let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');

    newPersonCancelBtn.addEventListener('click', () => {
        enableDisableNewUserModal('disable');
        refreshDOMTable();
    })

    let addNewEntryBtn = document.getElementById('cmsAddNewEntry');

    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNameInput('enable');
        enableDisableNewUserModal('enable');
        editingEnabled = false;
    });

    let editBtns = document.getElementsByClassName('cms-edit');
    //EDIT
    for(let i = 0; i < editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event)=>{

            editingEnabled = true;

            let headerText = document.getElementById("newPersonModalHeader");
            headerText.textContent = "Edit contact";

            let keyToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmsTable[keyToEdit];
            enableDisableNewUserModal('enable'); 

            let newPersonFirstName = document.getElementById('newPersonFirstName'); 
            newPersonFirstName.value = personToEdit.firstName;

            let newPersonLastName = document.getElementById('newPersonLastName'); 
            newPersonLastName.value = personToEdit.lastName;

            let newPersonBirthDate = document.getElementById('newPersonBirthDate'); 
            newPersonBirthDate.value = personToEdit.birthDate;

            let newPersonPhone = document.getElementById('newPersonPhone');
            newPersonPhone.value = personToEdit.phone;

            let newPersonEmail = document.getElementById('newPersonEmail');
            newPersonEmail.value = personToEdit.email;

            let newPersonAddress = document.getElementById('newPersonAddress');
            newPersonAddress.value = personToEdit.address;
           
            enableDisableNameInput('disable');
        })
    }

    let deleteBtns = document.getElementsByClassName('cms-delete');

    //DELETE
    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event)=>{
            let keyToDelete = $event.target.parentElement.children[0].innerText;
            let firstNameToDelete = $event.target.parentElement.children[1].innerText;
            let lastNameToDelete = $event.target.parentElement.children[2].innerText;
            let isSure = window.confirm('Are you sure you want to delete '
             + firstNameToDelete + ' ' + lastNameToDelete + '?');

            if(isSure){
                deleteUserFromTable(keyToDelete);
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone)
    {
        const re = /^[0-9]+$/;
        return re.test(String(phone).toLowerCase());
    }

    let deleteUserFromTable = (userKey) => {
        let tempTable = {};
        let cmsTableKeys = Object.keys(cmsTable);
        for(let i = 0; i < cmsTableKeys.length; i++){
            if(userKey !== cmsTableKeys[i]){
                tempTable[cmsTableKeys[i]] = cmsTable[cmsTableKeys[i]];
            }
        }
        cmsTable = tempTable;
        localStorage.setItem(tableKey, JSON.stringify(cmsTable));
        refreshDOMTable();
    }

    let isPhoneAlreadyUsed = (phoneNumber) => {
        let cmsTableKeys = Object.keys(cmsTable);
        
        for(let i = 0; i < cmsTableKeys.length; i++){
            if(phoneNumber === cmsTable[cmsTableKeys[i]].phone){
                return true;
            }
        }
        return false;
    }

    let isKeyAlreadyUsed = (personKey) => {
        let cmsTableKeys = Object.keys(cmsTable);
        for(let i = 0; i < cmsTableKeys.length; i++){
            if(personKey === cmsTableKeys[i]){
                return true;
            }
        }
        return false;
    }

    function isEmailAlreadyUsed(email) {
        let tempTable = {};
        let cmsTableKeys = Object.keys(cmsTable);

        for(let i = 0; i < cmsTableKeys.length; i++){
            if(email === cmsTable[cmsTableKeys[i]].email){
                return true;
            }
        }   

        return false;
    }
}

let init = () => {
    cmsTable = cmsTableDemo;
    localStorage.setItem(tableKey, JSON.stringify(cmsTable));

    if(localStorage.getItem(tableKey)){
        cmsTable = JSON.parse(localStorage.getItem(tableKey));
    } else {
        cmsTable = cmsTableDemo;
        localStorage.setItem(tableKey, JSON.stringify(cmsTable));
    }

    refreshDOMTable();
}

init();