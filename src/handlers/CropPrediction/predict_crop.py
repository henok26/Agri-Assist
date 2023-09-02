# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score

# # Load the dataset
# dataset = pd.read_csv('src/handlers/CropPrediction/crop_data.csv')

# # Split the dataset into features (X) and label (y)
# X = dataset.iloc[:, :-1]
# y = dataset.iloc[:, -1]

# # Split the dataset into train and test sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# # Train the random forest classifier
# classifier = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
# classifier.fit(X_train, y_train)

# # Predict the labels for the test set
# y_pred = classifier.predict(X_test)

# # Calculate the accuracy of the model
# accuracy = accuracy_score(y_test, y_pred)
# print(f"Accuracy: {accuracy:.2f}")

# # Use the model to make predictions on new data
# n = 300
# p = 9  
# k = 42
# temp = 20
# hum = 20
# ph = 6.2
# rainfall = 202
# label = classifier.predict([[n, p, k, temp, hum, ph , rainfall]])
# print(f"Predicted crop: {label[0]}")



import sys
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Load the dataset
dataset = pd.read_csv('src/handlers/CropPrediction/crop_data.csv')

# Split the dataset into features (X) and label (y)
X = dataset.iloc[:, :-1]
y = dataset.iloc[:, -1]

# Train the random forest classifier
classifier = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
classifier.fit(X, y)

# Read the input values from the command line arguments
n = float(sys.argv[1])
p = float(sys.argv[2])
k = float(sys.argv[3])
temp = float(sys.argv[4])
hum = float(sys.argv[5])
ph = float(sys.argv[6])
rainfall = float(sys.argv[7])

# Use the model to make predictions on the input values
label = classifier.predict([[n, p, k, temp, hum, ph, rainfall]])

# Print the predicted crop
print(label[0])