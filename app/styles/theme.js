export const colors = {
  buttonGreen: "#4CAF50", // green for buttons
  buttonDarkGreen: "#66BB6A", // Dark green for buttons when pressed
  alerts: "#FF7043", // to contrast against the green theme
  themeBG: "#E8FFE9", // Light green for background or other elements
  highlights: "FFC107", //to emphasize important features
  white: "111111",
};

export const buttonStyles = {
  button: {
    height: 50,
    width: 200,
    backgroundColor: colors.buttonGreen,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: colors.buttonDarkGreen,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
};
