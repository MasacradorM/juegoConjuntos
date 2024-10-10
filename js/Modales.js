document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('storeBtn').addEventListener('click', function() {
        $('#storeModal').modal('show');
    });

    document.getElementById('statsBtn').addEventListener('click', function() {
        $('#statsModal').modal('show');
    });

    document.getElementById('inventoryBtn').addEventListener('click', function() {
        $('#inventoryModal').modal('show');
    });

    document.getElementById('rankingBtn').addEventListener('click', function() {
        $('#rankingModal').modal('show');
    });
});