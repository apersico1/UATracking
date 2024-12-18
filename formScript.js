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

    // Load addresses from JSON file
    let addresses = {};
    fetch('addresses.json')
        .then(response => response.json())
        .then(data => {
            addresses = data;
        })
        .catch(error => console.error('Error loading addresses:', error));

    // Function to get the address for the selected library
    function getAddressForLibrary(symbol) {
        return addresses[symbol] || 'Unknown Address';
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
        fetch('https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbxydkxhqTtHQ6bL3xLwvuvgtbszzHC6JCnUR5XU_fiCeenq8O8lTNR3jtxFaOmIjKms/exec/exec', {
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
