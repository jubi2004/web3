document.getElementById('verificationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const licenseNumber = document.getElementById('licenseNumber').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const licenseFront = document.getElementById('licenseFront').files[0];
    const licenseBack = document.getElementById('licenseBack').files[0];

    // Check if files are selected
    if (!licenseFront || !licenseBack) {
        alert('Please upload all required images.');
        return;
    }

    // Simulate an API call or backend verification process
    verifyLicense(licenseNumber, name, phone, licenseFront, licenseBack);
});

function verifyLicense(licenseNumber, name, phone, licenseFront, licenseBack) {
    // Example simulation of license verification process
    setTimeout(function() {
        // Random success or failure for simulation purposes
        const isVerified = Math.random() > 0.5;  // Random success/failure

        if (isVerified) {
            Swal.fire({
                title: 'Verification Successful',
                text: 'All details match. You can download your proof.',
                icon: 'success',
                confirmButtonText: 'Download Proof',
                preConfirm: () => {
                    window.location.href = '/download-proof'; // You can replace this with the actual URL where proof is available
                }
            });
        } else {
            Swal.fire({
                title: 'Verification Failed',
                text: 'The details do not match. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    }, 2000); // Simulate an API response delay
}

// OTP Verification for Phone Number
document.getElementById('verifyOtpBtn').addEventListener('click', function() {
    const phoneNumber = document.getElementById('phone').value;

    if (!phoneNumber) {
        alert('Please enter your phone number first.');
        return;
    }

    Swal.fire({
        title: 'Enter OTP',
        input: 'text',
        inputPlaceholder: 'Enter OTP sent to your phone number',
        showCancelButton: true,
        confirmButtonText: 'Verify OTP',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value) {
                return 'Please enter the OTP';
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate OTP verification
            const isOtpValid = Math.random() > 0.5;  // Random success/failure for OTP verification

            if (isOtpValid) {
                Swal.fire('OTP Verified', 'Phone number has been verified successfully!', 'success');
            } else {
                Swal.fire('OTP Failed', 'Incorrect OTP. Please try again.', 'error');
            }
        }
    });

    
});
