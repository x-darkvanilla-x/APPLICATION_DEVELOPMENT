import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const ToDoList: React.FC = () => {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from storage: ", error);
    }
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to save tasks to storage: ", error);
    }
  };

  const handleAddTask = () => {
    if (task) {
      const newTask: Task = { id: tasks.length + 1, text: task, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks); 
      setTask("");
      setAddTask(false);
    }
  };
  
  const handleToggleTask = (taskId: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks); 
  };

  const handleRemoveTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks); 
  };

  return (
    <View style={styles.container}>
      <View>
        {addTask ? (
          <>
            <Text variant="titleMedium">What is to be Done?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Pay Bills"
              value={task}
              onChangeText={setTask}
            />
          </>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
                  {item.text}
                </Text>
                <View style={styles.taskActions}>
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => handleToggleTask(item.id)}
                  >
                    <Text style={styles.completeButtonText}>
                      {item.completed ? "Undo" : "Done"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveTask(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ alignSelf: "center" }} variant="titleMedium">No tasks added yet</Text>
            }
          />
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {addTask ? (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddTask}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Task</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={{...styles.addButton,  backgroundColor: addTask? "#ff3333" : "#22bb33"}}
          onPress={() => setAddTask(!addTask)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            {addTask ? "Cancel" : "Add Task"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "space-evenly",
  },
  textInput: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 10,
  },
  saveButton: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: "#22bb33",
    alignSelf: "center",
  },
  saveButtonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    fontSize: 18,
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  taskActions: {
    flexDirection: "row",
  },
  completeButton: {
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#22bb33",
  },
  completeButtonText: {
    color: "white",
    paddingRight: 10,
    paddingLeft: 10,
  },
  removeButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#ff3333",
    paddingRight: 10,
    paddingLeft: 10,
  },
  removeButtonText: {
    color: "white",
  },
  addButton: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: "#22bb33",
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default ToDoList;
