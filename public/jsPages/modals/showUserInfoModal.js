function showUserInfoModal(info_obj) {
   return `
        <!-- Button trigger modal -->
        <button type="button" data-toggle="modal" data-target="#${info_obj.modalId}"
        class="btn btn-outline-danger mr-3 mb-3 timeBtn" title="${info_obj.reservatorName}"> 
        ${info_obj.time}
        </button>
        <!-- Modal -->
        <div class="modal fade" id="${info_obj.modalId}" tabindex="-1" aria-labelledby="${info_obj.modalLabelId}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="${info_obj.modalLabelId}" style="color:black">Rezervácia ${info_obj.time}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body" style="color:black">
                <span><b>Rezervátor:</b> ${info_obj.reservatorName}</span> <br>
                <span><b>Email:</b> ${info_obj.reservatorEmail}</span> <br>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary" 
                onclick="window.location.href='tel:${info_obj.reservatiorPhone}'">
                Kontaktuj ${info_obj.reservatiorPhone}</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Zavrieť</button>
                </div>
            </div>
        </div>
        </div>
    `;
}
