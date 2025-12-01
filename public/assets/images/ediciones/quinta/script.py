import os, random
folder_path = os.path.dirname(__file__)

files = os.listdir(folder_path)

for file_index, file in enumerate(files):
    if os.path.isfile(file):
        file_extension = os.path.splitext(file)[1]

        if file_extension == '.jpg':
            file_path = os.path.join(folder_path, file)

            new_file_name = f'{file_index}{file_extension}'
            new_file_path = os.path.join(folder_path, new_file_name)

            if os.path.exists(new_file_path):
                random_number = random.randint(500, 1000)
                new_file_name_random = f'{random_number}{file_extension}'
                new_file_path_random = os.path.join(folder_path, new_file_name_random)
                print(new_file_path)
                print(new_file_path_random)
                os.rename(new_file_path, new_file_path_random)

            os.rename(file_path, new_file_path)