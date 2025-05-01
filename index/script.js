// Backend Data Structure
const trainsDB = [
    { id: 1, trainName: 'Rajdhani Express (12951)', from: 'Mumbai Central', to: 'New Delhi', departure: '16:35', arrival: '08:35', status: 'On Time', progress: 45, capacity: 840, availableSeats: 285, fare: 2250 },
    { id: 2, trainName: 'Shatabdi Express (12009)', from: 'Mumbai Central', to: 'Ahmedabad', departure: '06:25', arrival: '13:10', status: 'Delayed', progress: 30, capacity: 720, availableSeats: 142, fare: 1295 },
    { id: 3, trainName: 'Duronto Express (12261)', from: 'Chennai Central', to: 'New Delhi', departure: '18:45', arrival: '20:30', status: 'On Time', progress: 75, capacity: 910, availableSeats: 350, fare: 2420 },
    { id: 4, trainName: 'Vande Bharat (22201)', from: 'New Delhi', to: 'Varanasi', departure: '06:00', arrival: '14:00', status: 'On Time', progress: 20, capacity: 530, availableSeats: 128, fare: 1850 },
    { id: 5, trainName: 'Gatimaan Express (12049)', from: 'New Delhi', to: 'Agra Cantt', departure: '08:10', arrival: '09:50', status: 'Delayed', progress: 60, capacity: 480, availableSeats: 165, fare: 755 },
    
];

const stationData = [
    { id: 1, name: 'Mumbai Central (MMCT)', location: 'Mumbai, Maharashtra', platforms: 7, status: 'Operational', currentTrains: 4 },
    { id: 2, name: 'New Delhi Railway Station (NDLS)', location: 'New Delhi, Delhi', platforms: 16, status: 'Operational', currentTrains: 8 },
    { id: 3, name: 'Howrah Junction (HWH)', location: 'Kolkata, West Bengal', platforms: 23, status: 'Maintenance', currentTrains: 5 },
    { id: 4, name: 'Chennai Central (MAS)', location: 'Chennai, Tamil Nadu', platforms: 12, status: 'Operational', currentTrains: 6 },
    { id: 5, name: 'Chhatrapati Shivaji Terminus (CSMT)', location: 'Mumbai, Maharashtra', platforms: 18, status: 'Operational', currentTrains: 7 }
];

const bookingsDB = [];

// Booking Class
class Booking {
    constructor(trainId, userId, seats, totalFare) {
        this.id = bookingsDB.length + 1;
        this.trainId = trainId;
        this.userId = userId;
        this.seats = seats;
        this.totalFare = totalFare;
        this.status = 'Confirmed';
        this.bookingDate = new Date();
    }
}

// Simulated user session
const currentUser = {
    id: 'USER123',
    name: 'Rahul Kumar',
    email: 'rahul@example.com'
};

// Booking Management
function createBooking(trainId, seats) {
    const train = trainsDB.find(t => t.id === trainId);
    if (!train) {
        throw new Error('Train not found');
    }
    if (train.availableSeats < seats) {
        throw new Error('Not enough seats available');
    }

    const totalFare = train.fare * seats;
    const booking = new Booking(trainId, currentUser.id, seats, totalFare);
    bookingsDB.push(booking);

    // Update available seats
    train.availableSeats -= seats;

    return booking;
}

// Tab Switching
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        document.getElementById(tabId).classList.add('active');

        if (tabId === 'schedule') {
            renderSchedule();
        } else if (tabId === 'stations') {
            renderStations();
        } else if (tabId === 'bookings') {
            renderBookings();
        }
    });
});

// Render Schedule
// function renderSchedule(filteredTrains = trainsDB) {
//     const scheduleContainer = document.getElementById('schedule');
//     scheduleContainer.innerHTML = `
//         <div class="tracker-section">
//             <h2 class="section-title">Live Train Tracker</h2>
//             ${filteredTrains.length > 0 ? filteredTrains.map(train => `
//                 <div class="tracker-card">
//                     <div class="tracker-header">
//                         <div class="tracker-title">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                 <path d="M4 15.5v-7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7a2 2 0 0 1-2 2h-12a2 2 0 1-2-2z"/><path d="M6.5 15.5h11"/><path d="M8 15.5v3.5"/><path d="M16 15.5v3.5"/><path d="M8 11.5h8"/>
//                             </svg>
//                             <h3>${train.trainName}</h3>
//                         </div>
//                         <span class="status-badge ${train.status === 'On Time' ? 'on-time' : 'delayed'}">
//                             ${train.status}
//                         </span>
//                     </div>
//                     <div class="tracker-route">
//                         <div class="route-point">
//                             <div class="point-label">${train.from}</div>
//                             <div class="point-time">${train.departure}</div>
//                         </div>
//                         <div class="route-progress">
//                             <div class="progress-bar">
//                                 <div class="progress-fill" style="width: ${train.progress}%"></div>
//                                 <div class="train-indicator" style="left: ${train.progress}%">
//                                     <div class="train-tooltip">Current Position</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="route-point">
//                             <div class="point-label">${train.to}</div>
//                             <div class="point-time">${train.arrival}</div>
//                         </div>
//                     </div>
//                     <div class="booking-info">
//                         <div class="seats-info">Available Seats: ${train.availableSeats}/${train.capacity}</div>
//                         <div class="fare-info">Fare: ₹${train.fare}</div>
//                         <button onclick="handleBooking(${train.id})" class="btn-primary">Book Now</button>
//                     </div>
//                 </div>
//             `).join('') : `<p>No trains found matching your search.</p>`}
//         </div>
//     `;
// }

function handleSearch() {
    const query = document.getElementById('trainSearch').value.toLowerCase();
    const filteredTrains = trainsDB.filter(train =>
        train.trainName.toLowerCase().includes(query) ||
        train.from.toLowerCase().includes(query) ||
        train.to.toLowerCase().includes(query)
    );
    renderSchedule(filteredTrains);
}


// Render Stations
function renderStations() {
    const stationsContainer = document.getElementById('stations');
    stationsContainer.innerHTML = stationData.map(station => `
        <div class="card">
            <div class="card-header">
                <div>
                    <h3 class="card-title">${station.name}</h3>
                    <div class="card-route">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${station.location}
                    </div>
                </div>
                <div style="text-align: right;">
                    <span class="status-badge ${station.status === 'Operational' ? 'on-time' : 'maintenance'}">
                        ${station.status}
                    </span>
                    <div class="station-info">
                        <div>${station.platforms} Platforms</div>
                        <div>Current Trains: ${station.currentTrains}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Bookings
function renderSchedule(filteredTrains = trainsDB) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = `
        <div class="tracker-section">
            <h2 class="section-title">Live Train Tracker</h2>
            ${filteredTrains.length > 0 ? filteredTrains.map(train => `
                <div class="tracker-card">
                    <div class="tracker-header">
                        <div class="tracker-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 15.5v-7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7a2 2 0 0 1-2 2h-12a2 2 0 1-2-2z"/><path d="M6.5 15.5h11"/><path d="M8 15.5v3.5"/><path d="M16 15.5v3.5"/><path d="M8 11.5h8"/>
                            </svg>
                            <h3>${train.trainName}</h3>
                        </div>
                        <span class="status-badge ${train.status === 'On Time' ? 'on-time' : 'delayed'}">
                            ${train.status}
                        </span>
                    </div>
                    <div class="tracker-route">
                        <div class="route-point">
                            <div class="point-label">${train.from}</div>
                            <div class="point-time">${train.departure}</div>
                        </div>
                        <div class="route-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${train.progress}%"></div>
                                <div class="train-indicator" style="left: ${train.progress}%">
                                    <div class="train-tooltip">Current Position</div>
                                </div>
                            </div>
                        </div>
                        <div class="route-point">
                            <div class="point-label">${train.to}</div>
                            <div class="point-time">${train.arrival}</div>
                        </div>
                    </div>
                    <div class="booking-info">
                        <div class="seats-info">Available Seats: ${train.availableSeats}/${train.capacity}</div>
                        <div class="fare-info">Fare: ₹${train.fare}</div>
                        <button onclick="redirectToBookingPage(${train.id})" class="btn-primary">Book Now</button>
                    </div>
                </div>
            `).join('') : `<p>No trains found matching your search.</p>`}
        </div>
    `;
}


// Booking Handler
// function handleBooking(trainId) {
//     try {
//         const seats = parseInt(prompt('How many seats would you like to book?')) || 0;
//         if (seats <= 0) {
//             alert('Please enter a valid number of seats');
//             return;
//         }
//         const booking = createBooking(trainId, seats);
//         alert(`Booking confirmed! Booking ID: #${booking.id}`);
//         renderSchedule();
//         document.querySelector('[data-tab="bookings"]').click();
//     } catch (error) {
//         alert(error.message);
//     }
// }

async function handleBooking(trainId) {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");
    const seats = parseInt(prompt("How many seats would you like to book?"), 10);

    if (!name || !email || seats <= 0) {
        alert("Invalid input! Please fill all fields correctly.");
        return;
    }

    const bookingData = { name, email, trainId, seats };

    try {
        const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(` Booking successful! Your Booking ID: ${result.bookingId}`);
        } else {
            alert(" Booking failed: " + result.error);
        }
    } catch (error) {
        alert(" Error connecting to the server.");
    }
}



// Update train progress periodically
function updateTrainProgress() {
    trainsDB.forEach(train => {
        if (train.status === 'On Time') {
            train.progress += 1;
            if (train.progress >= 100) {
                train.progress = 0;
            }
        }
    });
    if (document.querySelector('[data-tab="schedule"].active')) {
        renderSchedule();
    }
}

// Initialize
renderSchedule();
setInterval(updateTrainProgress, 3000);

// Toggle Burger Menu
function toggleMenu() {
    const sidebar = document.getElementById("sidebarMenu");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}

// Show My Bookings
function showBookings() {
    document.getElementById("bookingsSection").style.display = "none";
    document.getElementById("trainStatusSection").style.display = "none";
    document.getElementById("loginSignupSection").style.display = "none";

    const bookingsContainer = document.getElementById("bookingsSection");
    bookingsContainer.innerHTML = `<h2>My Bookings</h2>`;

    if (bookingsDB.length === 0) {
        bookingsContainer.innerHTML += `<p>No bookings found.</p>`;
        return;
    }

    bookingsDB.forEach(booking => {
        const train = trainsDB.find(t => t.id === booking.trainId);
        bookingsContainer.innerHTML += `
            <div class="booking-card">
                <p><strong>Train:</strong> ${train.trainName}</p>
                <p><strong>Seats:</strong> ${booking.seats}</p>
                <p><strong>Total Fare:</strong> ₹${booking.totalFare}</p>
                <p><strong>Status:</strong> ${booking.status}</p>
            </div>
        `;
    });
}

// Show Train Running Status
function showTrainStatus() {
    document.getElementById("bookingsSection").style.display = "none";
    document.getElementById("trainStatusSection").style.display = "block";
    document.getElementById("loginSignupSection").style.display = "none";

    const statusContainer = document.getElementById("trainStatusSection");
    statusContainer.innerHTML = `<h2>Live Train Running Status</h2>`;

    trainsDB.forEach(train => {
        statusContainer.innerHTML += `
            <div class="train-status-card">
                <p><strong>${train.trainName}</strong></p>
                <p><strong>From:</strong> ${train.from} → <strong>To:</strong> ${train.to}</p>
                <p><strong>Status:</strong> <span class="${train.status === 'On Time' ? 'on-time' : 'delayed'}">${train.status}</span></p>
                <p><strong>Progress:</strong> ${train.progress}%</p>
            </div>
        `;
    });
}

// Show Login/Signup
// function showLoginSignup() {
//     // Show Login/Signup - Redirect to Login/Signup page

// }

//     document.getElementById("bookingsSection").style.display = "none";
//     document.getElementById("trainStatusSection").style.display = "none";
//     document.getElementById("loginSignupSection").style.display = "block";

//     document.getElementById("loginSignupSection").innerHTML = `
//         <h2>Login / Signup</h2>
//         <input type="text" id="username" placeholder="Enter Username">
//         <input type="password" id="password" placeholder="Enter Password">
//         <button onclick="login()">Login</button>
//         <p>Don't have an account? <button onclick="signup()">Sign Up</button></p>
//     `;
// }

// // Login Function
// function login() {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
    
//     if (!username || !password) {
//         alert("Please enter valid credentials!");
//         return;
//     }

//     alert(`Welcome, ${username}! You are now logged in.`);
// }

// // Signup Function
// function signup() {
//     alert("Signup functionality will be implemented soon.");
// }
function showLoginSignup() {
    window.location.href = 'login-signup.html';

}
function redirectToBookingPage(trainId) {
    const url = `form-page.html?trainId=${trainId}`;
    window.location.href = url; // This will redirect to your form page
}
let bookings = [
    { trainName: "Express Train", passengerName: "John Doe", numSeats: 2 },
    { trainName: "City Express", passengerName: "Alice Brown", numSeats: 1 }
];
function loadBookings() {
    const bookingsContainer = document.getElementById("bookingsContainer");
    bookingsContainer.innerHTML = "";

    // Check if a new booking is present in sessionStorage
    const newBooking = sessionStorage.getItem("newBooking");

    if (newBooking) {
        // Parse new booking data
        const bookingData = JSON.parse(newBooking);

        // Convert trainId to a train name (if applicable)
        let trainName = "Unknown Train"; // Default value
        if (bookingData.trainId == "1") trainName = "Express Train";
        if (bookingData.trainId == "2") trainName = "City Express";

        // Add new booking to existing array
        bookings.push({
            trainName: trainName,
            passengerName: bookingData.passengerName,
            numSeats: bookingData.numSeats
        });

        // Clear sessionStorage to prevent duplication
        sessionStorage.removeItem("newBooking");
    }

    // Display bookings in the section
    bookings.forEach((booking, index) => {
        const bookingDiv = document.createElement("div");
        bookingDiv.innerHTML = `
            <h3>Booking ${index + 1}</h3>
            <p><strong>Train:</strong> ${booking.trainName}</p>
            <p><strong>Passenger:</strong> ${booking.passengerName}</p>
            <p><strong>Seats:</strong> ${booking.numSeats}</p>
            <hr>
        `;
        bookingsContainer.appendChild(bookingDiv);
    });
}

// Load bookings when the page loads
document.addEventListener("DOMContentLoaded", loadBookings);
