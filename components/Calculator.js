import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Calculator() {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState(null);
    const [lastOperator, setLastOperator] = useState(null);

    const handlePress = (value) => {
        if (value === 'C') {
            setDisplay('');
            setResult(null);
            setLastOperator(null);
        } else if (value === '=') {
            calculate();
        } else if (value === '±') {
            toggleSign();
        } else if (value === '%') {
            handlePercentage();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else {
            setDisplay(display + value);
        }
    };

    const calculate = () => {
        if (display) {
            try {
                const calculation = eval(display);
                setDisplay(calculation.toString());
                setResult(calculation);
            } catch (error) {
                setDisplay('Error');
            }
        }
    };

    const handleOperator = (operator) => {
        if (display && !lastOperator) {
            setDisplay(display + operator);
            setLastOperator(operator);
        } else if (display && lastOperator) {
            calculate();
            setDisplay(display + operator);
            setLastOperator(operator);
        }
    };

    const toggleSign = () => {
        if (display) {
            const newValue = display.charAt(0) === '-' ? display.slice(1) : '-' + display;
            setDisplay(newValue);
        }
    };

    const handlePercentage = () => {
        if (display) {
            const value = parseFloat(display);
            if (!isNaN(value)) {
                setDisplay((value / 100).toString());
            }
        }
    };

    const buttons = [
        ['C', '±', '%', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '=']
    ];

    return (
        <View style={styles.container}>
            <View style={styles.calculator}>
                <View style={styles.displayContainer}>
                    <Text style={styles.displayText}>{display}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {buttons.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((button, buttonIndex) => (
                                <TouchableOpacity
                                    key={buttonIndex}
                                    style={[styles.button, button === '=' && styles.equalsButton]}
                                    onPress={() => handlePress(button)}
                                >
                                    <Text style={[styles.buttonText, button === '=' && styles.equalsButtonText]}>
                                        {button}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    calculator: {
        width: 300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    displayContainer: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
    },
    displayText: {
        fontSize: 48,
    },
    buttonsContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    button: {
        flex: 1,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#dcdcdc',
    },
    equalsButton: {
        backgroundColor: '#ffcc00',
    },
    buttonText: {
        fontSize: 24,
    },
    equalsButtonText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});
