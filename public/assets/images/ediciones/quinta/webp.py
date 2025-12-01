import os
from PIL import Image

# Carpeta donde están las imágenes
INPUT_DIR = "./imagenes"
# Carpeta donde se guardarán las webp
OUTPUT_DIR = "./imagenes_webp"

# Crear carpeta de salida si no existe
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Máximos
MAX_WIDTH = 1280
MAX_HEIGHT = 720

def resize_image(img):
    img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.LANCZOS)
    return img

def convert_images():
    supported_ext = (".jpg", ".jpeg", ".png", ".bmp", ".tiff")

    for filename in os.listdir(INPUT_DIR):
        if filename.lower().endswith(supported_ext):
            input_path = os.path.join(INPUT_DIR, filename)

            # Nombre sin extensión
            name, _ = os.path.splitext(filename)
            output_path = os.path.join(OUTPUT_DIR, f"{name}.webp")

            try:
                img = Image.open(input_path)
                img = resize_image(img)

                img.save(output_path, "WEBP", quality=90)
                print(f"[OK] {filename} → {output_path}")

            except Exception as e:
                print(f"[ERROR] No se pudo convertir {filename}: {e}")

if __name__ == "__main__":
    convert_images()
