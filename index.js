const generateButton = document.getElementById('generate-button');
const textInput = document.getElementById('text-input');
const qrCodeContainer = document.getElementById('qr-code-container');
const downloadLink = document.getElementById('download-link');
const whatsappShareLink = document.getElementById('whatsapp-share-link'); // Add this line

generateButton.addEventListener('click', async () => {
    const text = textInput.value;
    if (text.trim() !== '') {
        const apiEndpoint = `https://api.qr-code.io/v1/create?data=${encodeURIComponent(
            text
        )}&size=128x128`;

        try {
            const response = await fetch(apiEndpoint);
            if (response.ok) {
                const data = await response.blob();

                // Display QR code image
                const qrCodeImage = document.createElement('img');
                qrCodeImage.src = URL.createObjectURL(data);
                qrCodeContainer.innerHTML = '';
                qrCodeContainer.appendChild(qrCodeImage);

                // Show download link
                downloadLink.style.display = 'inline-block';
                downloadLink.href = qrCodeImage.src;
                downloadLink.download = 'qrcode.png';

                // Show WhatsApp share link with image
                whatsappShareLink.style.display = 'inline-block';
                const imageUrl = qrCodeImage.src;
                const shareMessage = 'Check out this QR Code:';
                whatsappShareLink.href = `whatsapp://send?text=${encodeURIComponent(
                    shareMessage
                )}&image=${encodeURIComponent(imageUrl)}`;
            } else {
                throw new Error('Failed to generate QR code');
            }
        } catch (error) {
            console.error(error);
        }
    }
});
