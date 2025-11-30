document.addEventListener("DOMContentLoaded", () => {

    // Fake API Data
    let students = [
        {id:1, name:"Alice", age:17, email:"alice@mail.com"},
        {id:2, name:"Bob", age:19, email:"bob@mail.com"},
        {id:3, name:"Charlie", age:18, email:"charlie@mail.com"},
    ];

    // HTML Elements
    const tbody = document.getElementById("studentBody");
    const ageFilter = document.getElementById("ageFilter");
    const tzSelect = document.getElementById("tzSelect");
    const currentTime = document.getElementById("currentTime");
    const studentNameInput = document.getElementById("studentName");
    const studentAgeInput  = document.getElementById("studentAge");
    const studentEmailInput= document.getElementById("studentEmail");
    const addBtn   = document.getElementById("addBtn");
    const updateBtn= document.getElementById("updateBtn");
    const cancelEdit = document.getElementById("cancelEdit");
    const filterInput = document.getElementById("filterInput");

    let editingId = null;

    // Render Table
    function renderTable(list){
        tbody.innerHTML="";
        list.forEach(s=>{
            const row = document.createElement("tr");
            row.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>${s.age}</td><td>${s.email}</td>`;
            row.onclick = ()=> startEdit(s.id);
            tbody.appendChild(row);
        });
    }

    renderTable(students);

    // Filter by minimum age
    document.getElementById("filterBtn").onclick = ()=>{
        const minAge = Number(ageFilter.value);
        if(minAge) renderTable(students.filter(s=>s.age>=minAge));
    };

    document.getElementById("resetFilter").onclick = ()=>{
        ageFilter.value="";
        renderTable(students);
    };

    // Sort by name
    document.getElementById("sortBtn").onclick = ()=>{
        renderTable([...students].sort((a,b)=>a.name.localeCompare(b.name)));
    };

    // Filter by name input
    filterInput.addEventListener("input", ()=>{
        const val = filterInput.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLowerCase().includes(val));
        renderTable(filtered);
    });

    // Timezone clock
    function updateTime(){
        const tz = tzSelect.value || "Asia/Bangkok";
        const now = new Date();
        currentTime.textContent = now.toLocaleString("en-GB",{timeZone:tz});
    }
    setInterval(updateTime,1000);
    tzSelect.onchange = updateTime;
    updateTime();

    // Add Student
    function addStudent() {
        const name = studentNameInput.value.trim();
        const age  = Number(studentAgeInput.value);
        const email = studentEmailInput.value.trim();

        if(!name || age <= 0 || !email.includes("@")) {
            alert("Invalid input!");
            return;
        }

        const id = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
        students.push({ id, name, age, email });
        renderTable(students);
        highlightRow(id);
        resetForm();
    }
    addBtn.onclick = addStudent;

    // Start Edit
    function startEdit(id){
        const s = students.find(x=>x.id===id);
        if(!s) return;
        editingId = id;
        studentNameInput.value = s.name;
        studentAgeInput.value  = s.age;
        studentEmailInput.value= s.email;
        addBtn.disabled = true;
        updateBtn.disabled = false;
    }

    // Update Student
    updateBtn.onclick = () => {
        if(editingId === null) return;
        const s = students.find(x=>x.id===editingId);
        s.name = studentNameInput.value.trim();
        s.age  = Number(studentAgeInput.value);
        s.email= studentEmailInput.value.trim();
        renderTable(students);
        highlightRow(editingId);
        resetForm();
    };

    // Cancel Edit
    cancelEdit.onclick = () => resetForm();

    // Reset Form
    function resetForm(){
        studentNameInput.value="";
        studentAgeInput.value="";
        studentEmailInput.value="";
        editingId=null;
        addBtn.disabled=false;
        updateBtn.disabled=true;
    }

    // Delete
    tbody.addEventListener("contextmenu", e=>{
        e.preventDefault();
        const row = e.target.closest("tr");
        if(!row) return;
        const id = Number(row.cells[0].textContent);
        const s = students.find(x=>x.id===id);
        if(!s) return;

        if(confirm(`Delete student ${s.name}?`)){
            students = students.filter(x=>x.id!==id);
            renderTable(students);
        }
    });

    // Highlight row after add/edit
    function highlightRow(id){
        const row = [...tbody.rows].find(r => Number(r.cells[0].textContent) === id);
        if(!row) return;
        row.classList.add("highlight");
        setTimeout(()=> row.classList.remove("highlight"), 1500);
    }

});