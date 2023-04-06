let cancelElement = document.querySelector(".btn-cancel");
let saveElement = document.querySelector(".btn-save");
let notifications = document.querySelector('.notifications');


function createToast(type, icon, title, text){
    let newToast = document.createElement('div');
    newToast.innerHTML = `
        <div class="toast ${type}">
            <i class="${icon}"></i>
            <div class="content">
                <div class="title">${title}</div>
                <span>${text}</span>
            </div>
            <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
        </div>`;
        
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(
        ()=>newToast.remove(), 5000
    )
}

saveElement.onclick = function(e)
{
    // Chua viet Event de submit du lieu
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Success';
    let text = 'Message thanh cong viet vo day de';
    createToast(type, icon, title, text);
    e.preventDefault();
}
cancelElement.onclick = function(e)
{
    let type = 'error';
    let icon = 'fa-solid fa-circle-exclamation';
    let title = 'Error';
    let text = 'Message that bai viet vo day de';
    createToast(type, icon, title, text);
    e.preventDefault();
}
