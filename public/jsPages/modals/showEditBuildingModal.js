function showEditBuildingModal(id, name, location) {
   const modalID = `editBuildingModal-${id}`;
   return `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#${modalID}">
    Edit
    </button>
    <!-- Modal -->
    <div class="modal fade" id="${modalID}"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" style="color:black" id="exampleModalLabel">Edit Building</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" style="color:black">
        <div class="form-group">
            <input type="hidden" value="${id}">
            <input type="text" value="${name}" class="form-control modal-input" placeholder="Enter new value">
            </div>
            <div class="form-group">
                <input type="text" value="${location}" class="form-control modal-input" placeholder="Enter new value">
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" onclick="EditBuilding(this)" class="btn btn-primary" data-dismiss="modal">Save changes</button>
        </div>
        </div>
    </div>
    </div>
    `;
}
