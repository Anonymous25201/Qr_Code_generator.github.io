
        async function generateQRCode() {
            const textInput = document.getElementById('text-input').value;
            const qrCodeContainer = document.getElementById('qr-code-container');
            const downloadLink = document.getElementById('download-link');
            const whatsappShareLink = document.getElementById('whatsapp-share-link');

            if (textInput.trim() !== '') {
                const apiUrl = ` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example${encodeURIComponent(
                    textInput
                )}`;

                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const qrCodeImageUrl = await response.json();

                        // Display QR code image
                        qrCodeContainer.innerHTML = `<img src="${qrCodeImageUrl}" alt="QR Code">`;

                        // Show download link
                        downloadLink.style.display = 'inline-block';
                        downloadLink.href = qrCodeImageUrl;
                        downloadLink.download = 'qrcode.png';

                        // Show WhatsApp share link
                        whatsappShareLink.style.display = 'inline-block';
                        whatsappShareLink.href = `whatsapp://send?text=Check out this QR Code&image=${encodeURIComponent(
                            qrCodeImageUrl
                        )}`;
                    } else {
                        throw new Error('Failed to generate QR code');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }

        document.getElementById('generate-button').addEventListener('click', generateQRCode);

