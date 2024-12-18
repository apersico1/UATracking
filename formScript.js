let barcodeCount = 1;

function addBarcodeField() {
    if (barcodeCount < 10) {
        barcodeCount++;
        const additionalBarcodes = document.getElementById('additionalBarcodes');
        const newBarcodeField = document.createElement('div');
        newBarcodeField.innerHTML = `
            <label for="barcode${barcodeCount}">Barcode ${barcodeCount}:</label>
            <input type="text" id="barcode${barcodeCount}" name="barcode${barcodeCount}"><br><br>
        `;
        additionalBarcodes.appendChild(newBarcodeField);
    }
}

document.getElementById('dataEntryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const destinationLibrary = formData.get('destinationLibrary');
    const address = getAddressForLibrary(destinationLibrary);
    generateAddressLabel(address);
});

function getAddressForLibrary(library) {
    const addresses = {
        'Library A': '123 Library St, City, Country',
        'Library B': '456 Book Rd, City, Country',
        // Add more libraries and their addresses here
    };
    return addresses[library] || 'Unknown Address';
}

function generateAddressLabel(address) {
    alert(`Address Label:\n${address}`);
}
