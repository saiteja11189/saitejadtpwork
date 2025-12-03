from PIL import Image, ImageEnhance
import os

# Mapping of source image filenames to desired output PDF filenames
image_map = {
    "uploaded_image_0_1764741548013.jpg": "certified_copy_form.pdf",
    "uploaded_image_1_1764741548013.jpg": "market_value_form.pdf",
    "uploaded_image_2_1764741548013.jpg": "encumbrance_certificate_form.pdf"
}

source_dir = r"C:\Users\DELL\.gemini\antigravity\brain\3c3b7cbd-84e4-4dfb-9c5e-f7f77b3e0806"
dest_dir = r"c:\Users\DELL\Documents\sai teja dtp work centre\knraju-ap\forms"

for img_name, pdf_name in image_map.items():
    img_path = os.path.join(source_dir, img_name)
    pdf_path = os.path.join(dest_dir, pdf_name)
    
    try:
        if os.path.exists(img_path):
            image = Image.open(img_path)
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Enhance Image Quality
            # Increase Contrast slightly to make text darker
            enhancer = ImageEnhance.Contrast(image)
            image = enhancer.enhance(1.3)
            # Increase Sharpness to reduce blur
            enhancer = ImageEnhance.Sharpness(image)
            image = enhancer.enhance(2.0)

            # A4 dimensions at 600 DPI: 4960 x 7016 pixels
            a4_width = 4960
            a4_height = 7016
            a4_size = (a4_width, a4_height)
            
            # Calculate target size to fit within A4 while maintaining aspect ratio
            img_ratio = image.width / image.height
            a4_ratio = a4_width / a4_height
            
            if img_ratio > a4_ratio:
                # Image is wider than A4 relative to height
                new_width = a4_width
                new_height = int(a4_width / img_ratio)
            else:
                # Image is taller than A4 relative to width
                new_height = a4_height
                new_width = int(a4_height * img_ratio)
                
            # Resize image with high quality (LANCZOS)
            resized_image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Create new white A4 image
            final_image = Image.new('RGB', a4_size, (255, 255, 255))
            
            # Paste resized image in the center
            paste_x = (a4_width - new_width) // 2
            paste_y = (a4_height - new_height) // 2
            final_image.paste(resized_image, (paste_x, paste_y))
            
            # Save with 600 DPI resolution
            final_image.save(pdf_path, "PDF", resolution=600.0, quality=100)
            print(f"Successfully converted {img_name} to {pdf_name} (High-Res A4)")
        else:
            print(f"Error: Source image {img_name} not found at {img_path}")
    except Exception as e:
        print(f"Failed to convert {img_name}: {e}")
