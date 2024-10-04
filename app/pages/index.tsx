"use client";
import { useState } from 'react';
import { useCopilotReadable } from '@copilotkit/react-core';

type Habit = {
  id: number;
  title: string;
  category: 'toForm' | 'toGetRidOf';
  notes: string;
  daysFollowed: number;
  targetDays: number;
};

const Home = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<string>('');
  const [category, setCategory] = useState<'toForm' | 'toGetRidOf'>('toForm');
  const [notes, setNotes] = useState<string>('');
  const [targetDays, setTargetDays] = useState<number>(21); // Default target days is 21

  const addHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits([
        ...habits,
        {
          id: habits.length + 1,
          title: newHabit,
          category: category,
          notes: notes,
          daysFollowed: 0, // Starts with 0 days followed
          targetDays: targetDays,
        },
      ]);
      setNewHabit('');
      setNotes('');
      setTargetDays(11); // Reset to default target days
    }
  };

  const removeHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const incrementDays = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, daysFollowed: habit.daysFollowed + 1 }
          : habit
      )
    );
  };

  // Updated useCopilotReadable hook
  useCopilotReadable({
    description: "A list of user habits, including habits to form and to get rid of.",
    value: JSON.stringify(habits), // Pass habits list as JSON string
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>

      {/* Input for adding new habit */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'toForm' | 'toGetRidOf')}
          className="border p-2 rounded mr-2"
        >
          <option value="toForm">Habit to Form</option>
          <option value="toGetRidOf">Habit to Get Rid Of</option>
        </select>
        <input
          type="text"
          placeholder="Add notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Target Days"
          value={targetDays}
          onChange={(e) => setTargetDays(Number(e.target.value))}
          className="border p-2 rounded mr-2"
        />
        <button onClick={addHabit} className="bg-blue-500 text-white p-2 rounded">
          Add Habit
        </button>
      </div>

      {/* Habits Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Habits to Form</h2>
        <ul className="mb-4">
          {habits
            .filter((habit) => habit.category === 'toForm')
            .map((habit) => (
              <li key={habit.id} className="flex flex-col mb-4 border p-4 rounded">
                <div className="flex justify-between">
                  <div>
                    <strong>{habit.title}</strong> - {habit.notes}
                  </div>
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {/* Progress bar */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{
                        width: `${
                          (habit.daysFollowed / habit.targetDays) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-sm mt-1">
                    {habit.daysFollowed} / {habit.targetDays} days followed
                  </div>
                </div>
                {/* Button to increment days */}
                <button
                  onClick={() => incrementDays(habit.id)}
                  className="bg-green-500 text-white p-2 mt-2 rounded"
                >
                  +1 Day
                </button>
              </li>
            ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Habits to Get Rid Of</h2>
        <ul>
          {habits
            .filter((habit) => habit.category === 'toGetRidOf')
            .map((habit) => (
              <li key={habit.id} className="flex flex-col mb-4 border p-4 rounded">
                <div className="flex justify-between">
                  <div>
                    <strong>{habit.title}</strong> - {habit.notes}
                  </div>
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {/* Progress bar */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{
                        width: `${
                          (habit.daysFollowed / habit.targetDays) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-sm mt-1">
                    {habit.daysFollowed} / {habit.targetDays} days followed
                  </div>
                </div>
                {/* Button to increment days */}
                <button
                  onClick={() => incrementDays(habit.id)}
                  className="bg-green-500 text-white p-2 mt-2 rounded"
                >
                  +1 Day
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
