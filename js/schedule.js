document.addEventListener('DOMContentLoaded', function() {
    const addTaskForm = document.getElementById("add-task-form");
    const scheduleTable = document.getElementById("schedule-table");
    const clearButton = document.getElementById("clear-chedule-btn");
    const saveButton = document.getElementById("save-chedule-btn");
    const loadButton = document.getElementById("load-chedule-btn");
    
    addTaskForm.onsubmit = () => {
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
        localStorage.setItem('schedule', scheduleTable.innerHTML);
    };

    loadButton.onclick = () => {
        scheduleTable.innerHTML =  localStorage.getItem('schedule');
    };
});