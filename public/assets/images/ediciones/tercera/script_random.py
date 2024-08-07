import os, random
folder_path = os.path.dirname(__file__)

files = os.listdir(folder_path)

for file_index, file in enumerate(files):
    if os.path.isfile(file):
        file_extension = os.path.splitext(file)[1]

        if file_extension == '.jpg':
            file_path = os.path.join(folder_path, file)

            random_number = random.randint(100, 1000)
            new_file_name = f'{random_number}{file_extension}'
            new_file_path = os.path.join(folder_path, new_file_name)

            os.rename(file_path, new_file_path)