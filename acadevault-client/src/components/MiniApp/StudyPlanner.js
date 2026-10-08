"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { fadeIn, cardVariants } from "@/lib/animations";
import useAnalytics from "@/hooks/useAnalytics";
import { useLocalStorage } from "react-use";

// This component allows students to create a weekly study schedule on a Dashboard or Student Home page. Users can add tasks with details (subject, duration, priority), reorder them via drag-and-drop, and persist the schedule in localStorage. A visual timeline displays tasks by day.

const StudyPlanner = () => {
  const [tasks, setTasks] = useLocalStorage("acadevault-study-plan", []);
  const [newTask, setNewTask] = useState({
    subject: "",
    duration: 1,
    priority: "Medium",
    day: "Monday",
  });
  const [error, setError] = useState("");
  const { trackEvent } = useAnalytics();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addTask = () => {
    if (!newTask.subject.trim()) {
      setError("Subject is required");
      trackEvent("study_planner_error", { error: "Empty subject" });
      return;
    }
    if (newTask.duration <= 0) {
      setError("Duration must be positive");
      trackEvent("study_planner_error", { error: "Invalid duration" });
      return;
    }

    const task = { ...newTask, id: `task-${Date.now()}` };
    setTasks([...tasks, task]);
    setNewTask({ subject: "", duration: 1, priority: "Medium", day: "Monday" });
    setError("");
    trackEvent("study_task_added", { subject: task.subject, day: task.day });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    trackEvent("study_task_deleted", { taskId: id });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
    trackEvent("study_task_reordered", { taskId: movedTask.id });
  };

  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-600" />
        Study Planner
      </h3>
      <div className="space-y-4">
        {/* Task Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Subject</label>
            <input
              type="text"
              value={newTask.subject}
              onChange={(e) =>
                setNewTask({ ...newTask, subject: e.target.value })
              }
              placeholder="e.g., Calculus"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              aria-label="Task subject"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">
              Duration (hrs)
            </label>
            <input
              type="number"
              value={newTask.duration}
              onChange={(e) =>
                setNewTask({ ...newTask, duration: Number(e.target.value) })
              }
              min="0.5"
              step="0.5"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              aria-label="Task duration"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              aria-label="Task priority"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Day</label>
            <select
              value={newTask.day}
              onChange={(e) => setNewTask({ ...newTask, day: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              aria-label="Task day"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={addTask}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          aria-label="Add study task"
        >
          <Plus className="w-5 h-5 inline mr-2" /> Add Task
        </button>
        {error && (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}
      </div>
      {/* Task Timeline */}
      {/* <DragDropContext onDragEnd={onDragEnd}>
        {days.map((day) => {
          const dayTasks = tasks.filter((task) => task.day === day);
          if (!dayTasks.length) return null;
          return (
            <div key={day} className="mt-6">
              <h4 className="text-lg font-medium text-gray-700 mb-2">{day}</h4>
              <Droppable droppableId={day}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {dayTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            className={cn(
                              "p-4 mb-2 rounded-lg bg-white/50 flex justify-between items-center",
                              task.priority === "High" &&
                                "border-l-4 border-red-500",
                              task.priority === "Medium" &&
                                "border-l-4 border-yellow-500",
                              task.priority === "Low" &&
                                "border-l-4 border-green-500"
                            )}
                          >
                            <div>
                              <p className="font-semibold text-gray-800">
                                {task.subject}
                              </p>
                              <p className="text-sm text-gray-600">
                                {task.duration} hrs
                              </p>
                            </div>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-2 text-red-600 hover:text-red-800"
                              aria-label={`Delete task ${task.subject}`}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext> */}
    </motion.div>
  );
};

export default StudyPlanner;
