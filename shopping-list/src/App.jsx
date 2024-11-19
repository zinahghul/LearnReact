import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling

// Function to get the appropriate emoji based on food/clothing name
const getFoodEmoji = (item) => {
    const foodEmojis = {
        // Fruits
        "apple": "🍎", "banana": "🍌", "grapes": "🍇", "orange": "🍊", "strawberry": "🍓",
        "watermelon": "🍉", "cherry": "🍒", "peach": "🍑", "pear": "🍐", "pineapple": "🍍",
        "kiwi": "🥝", "lemon": "🍋",

        // Vegetables
        "carrot": "🥕", "potato": "🥔", "tomato": "🍅", "cucumber": "🥒", "broccoli": "🥦",
        "corn": "🌽", "eggplant": "🍆", "pepper": "🌶️", "onion": "🧅", "garlic": "🧄",

        // Meats
        "chicken": "🍗", "steak": "🥩", "fish": "🐟", "bacon": "🥓", "sausage": "🌭",

        // Desserts
        "cake": "🍰", "pie": "🥧", "cookie": "🍪", "donut": "🍩", "ice cream": "🍦",
        "popsicle": "🍡", "chocolate": "🍫",

        // Drinks
        "coffee": "☕", "tea": "🍵", "beer": "🍺", "wine": "🍷", "cocktail": "🍸", "juice": "🧃",
        "milk": "🥛", "soda": "🥤",

        // Breads & Grains
        "bread": "🍞", "croissant": "🥐", "bagel": "🥯", "pasta": "🍝", "rice": "🍚", "noodles": "🍜",
        "taco": "🌮", "burrito": "🌯",

        // Other foods
        "pizza": "🍕", "hamburger": "🍔", "hotdog": "🌭", "sandwich": "🥪", "salad": "🥗",
        "sushi": "🍣", "ramen": "🍜", "dumpling": "🥟", "noodle": "🍲",

        // Miscellaneous
        "cheese": "🧀", "butter": "🧈", "honey": "🍯", "olive": "🫒", "popcorn": "🍿",
        "fruit": "🍉", // Generic fruit emoji

        // Clothing Emojis
        "shirt": "👕", "pants": "👖", "jacket": "🧥", "sweater": "🧶", "dress": "👗", 
        "shoes": "👟", "hat": "👒", "scarf": "🧣", "gloves": "🧤", "socks": "🧦"
    };

    return foodEmojis[item.toLowerCase()] || "🍴"; // Return a plate emoji if no match found
};

// Function to determine the category of an item
const getCategory = (item) => {
    const foodItems = [
        "apple", "banana", "grapes", "orange", "strawberry", "watermelon", "cherry", "peach",
        "pear", "pineapple", "kiwi", "lemon", "carrot", "potato", "tomato", "cucumber", "broccoli",
        "corn", "eggplant", "pepper", "onion", "garlic", "chicken", "steak", "fish", "bacon",
        "sausage", "cake", "pie", "cookie", "donut", "ice cream", "popsicle", "chocolate", "coffee",
        "tea", "beer", "wine", "cocktail", "juice", "milk", "soda", "bread", "croissant", "bagel",
        "pasta", "rice", "noodles", "taco", "burrito", "pizza", "hamburger", "hotdog", "sandwich",
        "salad", "sushi", "ramen", "dumpling", "noodle", "cheese", "butter", "honey", "olive", "popcorn"
    ];
    
    const clothingItems = [
        "shirt", "pants", "jacket", "sweater", "dress", "shoes", "hat", "scarf", "gloves", "socks"
    ];

    if (foodItems.includes(item.toLowerCase())) {
        return 'Food';
    }
    if (clothingItems.includes(item.toLowerCase())) {
        return 'Clothes';
    }
    return 'Other'; // Default category
};

export default function App() {
    const [tasks, setTasks] = useState([]); // List of tasks
    const [inputValue, setInputValue] = useState(''); // Input value for new task
    const [boughtTasks, setBoughtTasks] = useState([]); // List of bought tasks

    // Dynamic Date and Time with Day of the Week
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date()); // Update time every second
        }, 1000);

        return () => clearInterval(timerId); // Clean up interval on unmount
    }, []);

    // Function to format the date with day of the week
    const formatDate = (date) => {
        const options = {
            weekday: 'long', // Day of the week (e.g., "Monday")
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true, // 12-hour clock format
        };
        return date.toLocaleString('en-US', options); // Format date to include day of the week
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim()) {
            const category = getCategory(inputValue); // Get category for task
            setTasks([...tasks, { item: inputValue, category, emoji: getFoodEmoji(inputValue) }]);
            setInputValue(''); // Clear the input after adding a task
        }
    };

    const handleDeleteTask = (index) => {
        const newTaskList = tasks.filter((task, i) => i !== index);
        setTasks(newTaskList);
    };

    const handleMarkAsBought = (task, index) => {
        setBoughtTasks([...boughtTasks, task]);
        handleDeleteTask(index);
    };

    // Function to clear bought items
    const handleClearBoughtItems = () => {
        setBoughtTasks([]); // Clear the bought items list
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Shopping List 🛒</h1>

            {/* Display current time with day of the week */}
            <div className="date-time-container">
                <h2 className="date-time">{formatDate(currentTime)}</h2>
            </div>

            {/* Input field and add button */}
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Add an item to buy"
                    className="task-input"
                />
                <button onClick={handleAddTask} className="add-btn">Add</button>
            </div>

            {/* Task Lists */}
            <div className="category-section">
                <h2>Items to buy:</h2>
                <ul className="task-list">
                    {tasks.map((task, index) => (
                        <li key={index} className="task-item">
                            <span>{task.emoji} {task.item} ({task.category})</span>
                            <div className="task-actions">
                                <button
                                    className="task-buy-btn"
                                    onClick={() => handleMarkAsBought(task, index)}
                                >
                                    ✅
                                </button>
                                <button
                                    className="task-delete-btn"
                                    onClick={() => handleDeleteTask(index)}
                                >
                                    ❌
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bought items section */}
            {boughtTasks.length > 0 && (
                <div className="bought-items-section">
                    <h2 className="bought-items-title">Bought Items 🏷️</h2>
                    <ul className="task-list">
                        {boughtTasks.map((task, index) => (
                            <li key={index} className="task-item">
                                <span>{task.emoji} {task.item}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="clear-bought-btn" onClick={handleClearBoughtItems}>
                        Clear Bought Items
                    </button>
                </div>
            )}
        </div>
    );
}
