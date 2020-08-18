const tableKey = 'cms-table';

let cmsTable;
let cmsTableDemo = {
    'JohnBob': {
        'firstName': 'John',
        'lastName': 'Bob',
        'phone': '111111',
        'address': '4444 SankPeter'
    },
    'JohnBob': {
        'firstName': 'Rupert',
        'lastName': 'Gimm',
        'phone': '448484',
        'address': 'st Barbara street'
    }
};

// let enableDisableNameInput = (option)=>{
//     let newPersonNumber = document.getElementById('newPersonName');
//     if(option === 'enable'){
//         newPersonName.disabled = false;
//     } else if(option === 'disable'){
//         newPersonName.disabled = true;
//     }
// }

let refreshDOMTable = () => {
    let cmsTableKeys = Object.keys(cmsTable); // ['Giggle Kible', 'Merry Jingles']
    let tableContainer = document.getElementById("cmsTableContainer");
    let oldTableBody = document.getElementById('tableBody');
    tableContainer.removeChild(oldTableBody);

    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);
//change number to id ctrlf pls
    for(let i =0; i< cmsTableKeys.length; i++){
        let currentRow = document.createElement('div');
        let currentNumberCol = document.createElement('div');
        let currentFirstNameCol = document.createElement('div');
        let currentLastNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');

        currentRow.className = 'cms-table-row';
        currentNumberCol.className = 'cms-table-column cms-number';
        currentFirstNameCol.className = 'cms-table-column cms-first-name';
        currentLastNameCol.className = 'cms-table-column cms-last-name';
        currentPhoneCol.className = 'cms-table-column cms-phone';
        currentAddressCol.className = 'cms-table-column cms-address';
        currentEditBtn.className ='cms-table-column cms-edit';
        currentDeleteBtn.className = 'cms-table-column cms-delete';

        currentNumberCol.innerHTML = cmsTableKeys[i];
        currentFirstNameCol.innerHTML = cmsTable[cmsTableKeys[i]].firstName;
        currentLastNameCol.innerHTML = cmsTable[cmsTableKeys[i]].lastName;
        currentPhoneCol.innerHTML = cmsTable[cmsTableKeys[i]].phone;
        currentAddressCol.innerHTML = cmsTable[cmsTableKeys[i]].address;

        currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';

        currentRow.appendChild(currentNumberCol);
        currentRow.appendChild(currentFirstNameCol);
        currentRow.appendChild(currentLastNameCol);
        currentRow.appendChild(currentPhoneCol);
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
        let newPersonPhone = document.getElementById('newPersonPhone');
        newPersonPhone.value = '';
        let newPersonAddress = document.getElementById('newPersonAddress');
        newPersonAddress.value = '';
        
        let newPersonModal = document.getElementById('newPersonModal');
        newPersonModal.className = `${option}-modal`;

        let backdrop = document.getElementById('backdrop');
        backdrop.className = `${option}-modal`
    }

    let checkIfEmpty = (value) => {
        if(value === ''){
            value.className = 'input-err';
        } else {
            value.className = '';
        }
    }

    let addNewEntryBtn = document.getElementById('cmsAddNewEntry');
    let editBtns = document.getElementsByClassName('cms-edit');
    let deleteBtns = document.getElementsByClassName('cms-delete');

    let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
    let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');


    //ADD
    newPersonSubmitBtn.addEventListener('click', () => {
        
        let newPersonFirstName = document.getElementById('newPersonFirstName').value.trim();
        let newPersonLastName = document.getElementById('newPersonLastName').value.trim();
        let newPersonNumber = newPersonFirstName + newPersonLastName;
        let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
        let newPersonAddress = document.getElementById('newPersonAddress').value.trim();

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

        if(newPersonPhone === ''){
            document.getElementById('newPersonPhone').className = 'input-err';
        } else {
            document.getElementById('newPersonPhone').className = '';
        }

        if(newPersonAddress === ''){
            document.getElementById('newPersonAddress').className = 'input-err';
        } else {
            document.getElementById('newPersonAddress').className = '';
        }

        if(newPersonFirstName !== '' && newPersonLastName !== '' && newPersonPhone !== '' && newPersonAddress !== ''){
            let newPerson = {};
            cmsTable[newPersonNumber] = {
                'firstName': newPersonFirstName,
                'lastName': newPersonLastName,
                'phone': newPersonPhone,
                'address': newPersonAddress
            }
            localStorage.setItem(tableKey, JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshDOMTable();
        }
    });

    newPersonCancelBtn.addEventListener('click', () => {
        enableDisableNewUserModal('disable');
    })

    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
    });


    //EDIT
    for(let i = 0; i < editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event)=>{
            let numberToEdit = $event.target.parentElement.children[0].innerText;
            console.log(numberToEdit);
            let personToEdit = cmsTable[numberToEdit];
            enableDisableNewUserModal('enable'); 

            let newPersonFirstName = document.getElementById('newPersonFirstName'); 
            newPersonFirstName.value = personToEdit.firstName;

            let newPersonLastName = document.getElementById('newPersonLastName'); 
            newPersonLastName.value = personToEdit.lastName;

            let newPersonPhone = document.getElementById('newPersonPhone');
            newPersonPhone.value = personToEdit.phone;

            let newPersonAddress = document.getElementById('newPersonAddress');
            newPersonAddress.value = personToEdit.address;
           
            // enableDisableNameInput('disable');
        })
    }

    //DELETE
    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event)=>{
            let numberToDelete = $event.target.parentElement.children[0].innerText;
            console.log(numberToDelete);
            let firstNameToDelete = $event.target.parentElement.children[1].innerText;
            let lastNameToDelete = $event.target.parentElement.children[2].innerText;
            let isSure = window.confirm('Are you sure you want to delete '
             + firstNameToDelete + ' ' + lastNameToDelete + '?');

            if(isSure){
                deleteUserFromTable(numberToDelete);
            }
        });
    }

    let deleteUserFromTable = (userNumber) => {
        let tempTable = {};
        let cmsTableKeys = Object.keys(cmsTable);
        for(let i = 0; i < cmsTableKeys.length; i++){
            if(userNumber !== cmsTableKeys[i]){
                tempTable[cmsTableKeys[i]] = cmsTable[cmsTableKeys[i]];
            }
    }
    cmsTable = tempTable;
    localStorage.setItem(tableKey, JSON.stringify(cmsTable));
    refreshDOMTable();
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