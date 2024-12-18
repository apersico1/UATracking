document.addEventListener('DOMContentLoaded', (event) => {
    // Automatically set the current date and time
    const dateTimeField = document.getElementById('dateTime');
    const now = new Date();
    dateTimeField.value = now.toISOString().slice(0, 16);

    // Handle number of items input to generate barcode fields
    const numberOfItemsField = document.getElementById('numberOfItems');
    const barcodeFieldsContainer = document.getElementById('barcodeFields');

    numberOfItemsField.addEventListener('input', () => {
        const numberOfItems = parseInt(numberOfItemsField.value);
        barcodeFieldsContainer.innerHTML = ''; // Clear existing fields

        for (let i = 1; i <= numberOfItems; i++) {
            const barcodeField = document.createElement('div');
            barcodeField.innerHTML = `
                <label for="barcode${i}">Barcode ${i}:</label>
                <input type="text" id="barcode${i}" name="barcode${i}" ${i === 1 ? 'required' : ''}><br><br>
            `;
            barcodeFieldsContainer.appendChild(barcodeField);
        }
    });

    // Function to get the address for the selected library
    function getAddressForLibrary(library) {
        const addresses = {
            'Library A': '123 Library St, City, Country',
            'Library B': '456 Book Rd, City, Country',
            // Add more libraries and their addresses here
        };
        return addresses[library] || 'Unknown Address';
    }

    // Function to generate an address label
    function generateAddressLabel(address) {
        alert(`Address Label:\n${address}`);
    }

    // Handle form submission
    document.getElementById('dataEntryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const destinationLibrary = formData.get('destinationLibrary');
        const address = getAddressForLibrary(destinationLibrary);
        generateAddressLabel(address);

        // Prepare data for Google Sheets
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send data to Google Sheets
        fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .then(data => {
              console.log('Success:', data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    });
});
