document.addEventListener('DOMContentLoaded', function() {    
    const addTaskForm = document.getElementById("add-task-form");
    const scheduleTable = document.getElementById("schedule-table");
    const clearButton = document.getElementById("clear-chedule-btn");
    const saveButton = document.getElementById("save-chedule-btn");
    const loadButton = document.getElementById("load-chedule-btn");
    const setRandomInputButton = document.getElementById("set-random-input-btn");

    localStorage.setItem('schedule-table', scheduleTable.rows[0].innerHTML);
    
    addTaskForm.onsubmit = (event) => {
        event.preventDefault();
    
        let eventName = document.getElementById("event-name").value;
        let eventStartTime = document.getElementById("event-start-time").value;
        let eventDuration = document.getElementById("event-duration").value;
        let eventComment = document.getElementById("event-comment").value;

        if(eventName.trim() === '' || eventStartTime.trim() === '' || eventDuration.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }
        
        let row = scheduleTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        
        cell1.textContent = eventName;
        cell2.textContent = eventStartTime;
        cell3.textContent = eventDuration;
        cell4.textContent = eventComment;
    };

    clearButton.onclick = () => {
        scheduleTable.innerHTML = scheduleTable.rows[0].innerHTML;
    };

    saveButton.onclick = () => {
        localStorage.setItem('schedule-table', scheduleTable.innerHTML);
    };

    loadButton.onclick = () => {
        scheduleTable.innerHTML = localStorage.getItem('schedule-table');
    };

    setRandomInputButton.onclick = () => {
        document.getElementById('event-name').value = generateRandomString(10);
        document.getElementById('event-start-time').value = generateRandomDateTime();
        document.getElementById('event-duration').value = generateRandomTime();
        document.getElementById('event-comment').value = generateRandomString(20);

        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        function generateRandomDateTime() {
            const now = new Date();
            const randomYear = now.getFullYear() + Math.floor(Math.random() * 2);
            const randomMonth = Math.floor(Math.random() * 12) + 1; 
            const randomDay = Math.floor(Math.random() * 28) + 1; 
            const randomHour = Math.floor(Math.random() * 24); 
            const randomMinute = Math.floor(Math.random() * 60); 
            return `${randomYear}-${randomMonth.toString().padStart(2, '0')}-${randomDay.toString().padStart(2, '0')}T${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
        }

        function generateRandomTime() {
            const randomHour = Math.floor(Math.random() * 24);
            const randomMinute = Math.floor(Math.random() * 60);
            return `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
        }
    };
});