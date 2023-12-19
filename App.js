import { useState } from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App () {
  const [courseGoals, setCourseGoals] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  function startAddGoalHandler () {
    setModalIsVisible(true)
  }

  function endAddGoalHandler () {
    setModalIsVisible(false)
  }

  function addGoalHandler (enteredGoalText) {
    // setCourseGoals([...courseGoals, enteredGoalText]); Not a better way
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      //Can convert the course goals string array to an object array with text and key so that FlatList can access this key of each item
      // { text: enteredGoalText, key: Math.random().toString() }

      //If the object doesn't have a property called 'key' but has an id like this, the keyExtractor prop should be used in FlatList
      { text: enteredGoalText, id: Math.random().toString() }
    ])
    endAddGoalHandler()
  }

  function deleteGoalHandler (id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter(goal => goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#a065ec'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
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
                <GoalItem
                  id={itemData.item.id}
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              )
            }}
            //To extract the key from the items if the item object doesn't have a property named key
            keyExtractor={(item, index) => {
              return item.id
            }}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1
  },
  goalsContainer: {
    flex: 5
  }
})
