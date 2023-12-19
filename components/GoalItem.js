import { StyleSheet, View, Text, Pressable } from 'react-native'

function GoalItem (props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={props.onDeleteItem.bind(this, props.id)}
        android_ripple={{ color: '#210644' }}
        style={pressedData => pressedData.pressed && styles.pressedItem}
      >
        <Text style={styles.goalItemText}>{props.text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc'
  },
  goalItemText: {
    color: 'white',
    padding: 8
  },
  pressedItem: {
    opacity: 0.5
  }
})

export default GoalItem
