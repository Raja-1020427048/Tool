document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const compressionRange = document.getElementById('compressionRange');
    const compressionValue = document.getElementById('compressionValue');
    const imagePreview = document.getElementById('imagePreview');
    const downloadBtn = document.getElementById('downloadBtn');
  
    let compressedImage = null;
  
    // Update compression level value
    compressionRange.addEventListener('input', () => {
      compressionValue.textContent = `${Math.round(compressionRange.value * 100)}%`;
    });
  
    // Handle image upload
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            compressImage(img);
          };
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Compress image
    function compressImage(img) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;
  
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
  
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
  
      const quality = compressionRange.value;
      canvas.toBlob(
        (blob) => {
          compressedImage = URL.createObjectURL(blob);
          imagePreview.innerHTML = `<img src="${compressedImage}" alt="Compressed Image">`;
          downloadBtn.disabled = false;
        },
        'image/jpeg',
        quality
      );
    }
  
    // Download compressed image
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = compressedImage;
      link.download = 'compressed-image.jpg';
      link.click();
    });
  });