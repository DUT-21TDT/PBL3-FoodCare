let messageElement_One = document.querySelector(".notifcation_form-body.one");
let messageElement_Two = document.querySelector(".notifcation_form-body.two");
let messageElement_Three = document.querySelector(".notifcation_form-body.three");
let success = document.getElementById("success");
let error = document.getElementById("error");
let warning = document.getElementById("warning");
let info = document.getElementById("info");

// message tràn là xoá cái cuối
// function createToast(type, icon, title, text){
//     if(messageElement_Two.innerHTML != "") messageElement_Three.innerHTML = messageElement_Two.innerHTML;
//     if(messageElement_One.innerHTML != "") messageElement_Two.innerHTML = messageElement_One.innerHTML;
//     messageElement_One.innerHTML = `
//         <div class="toast ${type}">
//             <i class="${icon}"></i>
//             <div class="content">
//                 <div class="title">${title}</div>
//                 <span>${text}</span>
//             </div>
//         </div>`;
// }

// massage tràn thì tạo thanh cuộn
function createToast(type, icon, title, text){
    let newToast = document.createElement('div');
    
    newToast.innerHTML = `
        <div class="toast ${type}">
            <i class="${icon}"></i>
            <div class="content">
                <div class="title">${title}</div>
                <span>${text}</span>
            </div>
           
        </div>`;
    if(messageElement_One.innerHTML != "")  messageElement_One.insertBefore(newToast,messageElement_One.firstChild);
    else messageElement_One.appendChild(newToast);
    // messageElement_One.appendChild(newToast);
   
}


// message thành công
success.onclick = function(){
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Success Message';
    let text = 'You can insert a description for the message here. The text relates to the action that has been performed';
    createToast(type, icon, title, text);
}

// message lỗi
error.onclick = function(){
    let type = 'error';
    let icon = 'fa-solid fa-circle-exclamation';
    let title = 'Error Message';
    let text = 'You can insert a description for the message here. The text relates to the action that has been performed';
    createToast(type, icon, title, text);
}

// message warning
warning.onclick = function(){
    let type = 'warning';
    let icon = 'fa-solid fa-triangle-exclamation';
    let title = 'Warning Message';
    let text = 'You can insert a description for the message here. The text relates to the action that has been performed';
    createToast(type, icon, title, text);
}

// message infomation
info.onclick = function(){
    let type = 'info';
    let icon = 'fa-solid fa-circle-info';
    let title = 'Infomation Message';
    let text = 'You can insert a description for the message here. The text relates to the action that has been performed';
    createToast(type, icon, title, text);
}