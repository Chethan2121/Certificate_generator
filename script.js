document.getElementById('certificate-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipientName = document.getElementById('recipient-name').value;
    const eventName = document.getElementById('event-name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const template = document.getElementById('template').value;

    document.getElementById('cert-recipient-name').innerText = recipientName;
    document.getElementById('cert-event-name').innerText = eventName;
    document.getElementById('cert-date').innerText = date;
    document.getElementById('cert-description').innerText = description;

    const certificate = document.getElementById('certificate');
    certificate.className = template; // Update template class

    document.getElementById('certificate-preview').style.display = 'flex';
});

document.getElementById('download-btn').addEventListener('click', function() {
    const recipientName = document.getElementById('cert-recipient-name').innerText;
    const eventName = document.getElementById('cert-event-name').innerText;
    const date = document.getElementById('cert-date').innerText;
    const description = document.getElementById('cert-description').innerText;
    const template = document.getElementById('template').value;

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [600, 400]  // Adjust as needed for your certificate size
    });

    const img = new Image();
    img.src = `${template}.jpg`;  // Use the selected template image
    img.crossOrigin = "anonymous";  // Ensure the image is loaded correctly from another domain
    img.onload = function() {
        // Draw the image first
        pdf.addImage(img, 'JPEG', 0, 0, 600, 400);  // Adjust the position and size as needed

        // Function to draw text with shadow
        function drawTextWithShadow(text, x, y, fontSize, shadowColor, textColor) {
            const shadowOffset = 2;
            pdf.setFontSize(fontSize);
            pdf.setTextColor(shadowColor);
            pdf.text(text, x + shadowOffset, y + shadowOffset, { align: "center" });
            pdf.setTextColor(textColor);
            pdf.text(text, x, y, { align: "center" });
        }

        // Define text and shadow colors
        const shadowColor = "gray";
        const textColor = "black";

        // Draw the "Certificate of Achievement" text with shadow
        drawTextWithShadow("Certificate of Achievement", 300, 60, 24, shadowColor, textColor);

        // Draw the rest of the text without shadow
        pdf.setTextColor(textColor);
        pdf.setFontSize(16);
        pdf.text("This is to certify that", 300, 120, { align: "center" });

        pdf.setFontSize(32);
        pdf.text(recipientName, 300, 160, { align: "center" });

        pdf.setFontSize(16);
        pdf.text("has successfully completed the", 300, 200, { align: "center" });

        pdf.setFontSize(24);
        pdf.text(eventName, 300, 240, { align: "center" });

        pdf.setFontSize(16);
        const descriptionX = 300 - (pdf.getStringUnitWidth(description) * 16 / 2);
        pdf.text(description, 300, 280, { align: "center", maxWidth: 420 });

        pdf.setFontSize(16);
        pdf.text(date, 300, 320, { align: "center" });

        pdf.save('certificate.pdf');
    };

    img.onerror = function() {
        console.error('Error loading image');
        alert('Failed to load the background image.');
    };
});
