import { useState } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList
} from 'react-native'

export default function App () {
  const [enteredGoalText, setEnteredGoalText] = useState('')
  const [courseGoals, setCourseGoals] = useState([])

  function goalInputHandler (enteredText) {
    setEnteredGoalText(enteredText)
  }
  function addGoalHandler () {
    // setCourseGoals([...courseGoals, enteredGoalText]); Not a better way
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      //Can convert the course goals string array to an object array with text and key so that FlatList can access this key of each item
      // { text: enteredGoalText, key: Math.random().toString() }

      //If the object doesn't have a property called 'key' but has an id like this, the keyExtractor prop should be used in FlatList
      { text: enteredGoalText, id: Math.random().toString() }
    ])
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Your course goal!'
          style={styles.textInput}
          onChangeText={goalInputHandler}
        />
        <Button title='Add goal' onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {/* //ScrollView is not good for longer lists because all of the items will be rendered at once even if they are not visible
        <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map(goal => (
            <View key={goal} style={styles.goalItem}>
              <Text style={styles.goalItemText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          data={courseGoals}
          alwaysBounceVertical={false}
          renderItem={itemData => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalItemText}>{itemData.item.text}</Text>
              </View>
            )
          }}
          //To extract the key from the items if the item object doesn't have a property named key
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc'
  },
  goalItemText: {
    color: 'white'
  }
})
