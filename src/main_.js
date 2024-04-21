// src/main.js
import { createApp, ref } from "vue";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {
    saveTask(state, task) {
      state.tasks.push({ task_name: task, status: false });
    },
    getTask(state) {
      state.tasks = state.tasks.filter((task) => !task.status);
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
    },
    finishTask(state, index) {
      state.tasks[index].status = true;
    },
  },
});

const app = createApp({
  data() {
    return {
      yourTask: "",
    };
  },
  computed: {
    tasks() {
      return store.state.tasks;
    },
  },
  methods: {
    saveTask() {
      store.commit("saveTask", this.yourTask);
    },
    getTask() {
      store.commit("getTask");
    },
    deleteTask(index) {
      store.commit("deleteTask", index);
    },
    finishTask(index) {
      store.commit("finishTask", index);
    },
  },
});

app.use(store);
app.mount("#app");
