

export const colors = {
    buttonGreen: '#008000',  // green for buttons
    buttonDarkGreen: '#006400',     // Dark green for buttons when pressed
    white: '#FFFFFF',
    themeBG: '#7FFF00',    // Light green for background or other elements
};

export const buttonStyles = {
    button: {
        height: 50,
        width: 200,
        backgroundColor: colors.buttonGreen,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonPressed: {
        backgroundColor: colors.buttonDarkGreen,
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
};
