import numpy as np

# Load the class names file
class_names = np.load('class_names.npy', allow_pickle=True)

# Print the contents to check
print(class_names)
